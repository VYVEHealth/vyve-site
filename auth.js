/* ============================================================
   VYVE Auth + PostHog Tracking
   PostHog project: eu.i.posthog.com
   ============================================================ */

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_8gekeZglc1HBDu3d9kMuqOuRWn6HIChhnaiQi6uvonl', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2026-01-30'
});

const VYVE_AUTH0_DOMAIN    = "dev-340hbcgnjubvwb85.uk.auth0.com";
const VYVE_AUTH0_CLIENT_ID = "F7LMC3G7QCZOiAyxheEhAz3lhLcsAA7v";
const VYVE_AUTH0_SDK       = "https://cdn.auth0.com/js/auth0-spa-js/2.0.3/auth0-spa-js.production.js";
const VYVE_RETURN_TO_KEY   = "vyve_return_to";

let vyveAuth0Client = null;
window.vyveCurrentUser = null;

function vyveGetSessionType() {
  var path = window.location.pathname;
  if (path.includes('yoga'))        return 'Yoga, Pilates & Stretch';
  if (path.includes('checkin'))     return 'Weekly Check-in';
  if (path.includes('workouts'))    return 'Workout';
  if (path.includes('mindfulness')) return 'Mindfulness & Meditation';
  if (path.includes('education'))   return 'Education Talk';
  if (path.includes('therapy'))     return 'Therapy & Wellbeing';
  if (path.includes('events'))      return 'Events & Q&A';
  return 'Unknown';
}

function vyveRevealApp(message) {
  const app = document.getElementById('app');
  if (app) app.style.display = 'block';
  if (message) {
    let note = document.getElementById('vyveNotice');
    if (!note) {
      note = document.createElement('div');
      note.id = 'vyveNotice';
      note.style.cssText = 'position:sticky;top:0;z-index:9999;padding:10px 14px;background:#fff3cd;color:#5c4400;font:14px/1.4 Arial,sans-serif;border-bottom:1px solid #e6d38a';
      document.body.prepend(note);
    }
    note.textContent = message;
  }
}

function vyveSetMemberName(user) {
  const nameEl = document.getElementById('memberName');
  if (nameEl && user) nameEl.textContent = user.given_name || user.name || 'Member';
}

function vyveBindLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn || !vyveAuth0Client || logoutBtn.dataset.bound === 'true') return;
  logoutBtn.dataset.bound = 'true';
  logoutBtn.addEventListener('click', () => {
    try { sessionStorage.removeItem(VYVE_RETURN_TO_KEY); } catch (e) {}
    vyveAuth0Client.logout({ logoutParams: { returnTo: window.location.origin } });
  });
}

function vyveCapturePageView(user) {
  if (!window.posthog) return;
  try {
    if (user && user.sub) {
      posthog.identify(user.sub, { email: user.email, name: user.name });
    }
    var path = window.location.pathname;
    var isLive   = path.includes('-live');
    var isReplay = path.includes('-rp');
    var sessionType = vyveGetSessionType();
    posthog.capture('portal_page_viewed', {
      page: path, title: document.title,
      session_type: sessionType,
      page_type: isLive ? 'live' : isReplay ? 'replay' : 'other'
    });
    if (isLive && user) {
      posthog.capture('live_session_accessed', {
        email: user.email, session_type: sessionType, date: new Date().toISOString()
      });
    }
    if (isReplay && user) {
      posthog.capture('replay_page_accessed', {
        email: user.email, session_type: sessionType, date: new Date().toISOString()
      });
    }
  } catch (e) { console.warn('PostHog tracking failed', e); }
}

function vyveLoadAuth0Sdk() {
  return new Promise((resolve, reject) => {
    // ✅ FIXED: check window.auth0.createAuth0Client (v2 location)
    if (window.auth0 && typeof window.auth0.createAuth0Client === 'function') { resolve(); return; }
    const existing = document.querySelector(`script[src="${VYVE_AUTH0_SDK}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Auth0 SDK failed to load')), { once: true });
      setTimeout(() => {
        if (window.auth0 && typeof window.auth0.createAuth0Client === 'function') resolve();
      }, 1500);
      return;
    }
    const script = document.createElement('script');
    script.src = VYVE_AUTH0_SDK;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Auth0 SDK failed to load'));
    document.head.appendChild(script);
  });
}

async function vyveInitAuth() {
  try {
    await vyveLoadAuth0Sdk();

    // ✅ FIXED: use window.auth0.createAuth0Client not window.createAuth0Client
    if (!window.auth0 || typeof window.auth0.createAuth0Client !== 'function') {
      throw new Error('createAuth0Client is not available');
    }

    vyveAuth0Client = await window.auth0.createAuth0Client({
      domain: VYVE_AUTH0_DOMAIN,
      clientId: VYVE_AUTH0_CLIENT_ID,
      authorizationParams: { redirect_uri: window.location.origin },
      cacheLocation: 'localstorage'
    });

    const params = new URLSearchParams(window.location.search);
    if (params.has('code') && params.has('state')) {
      await vyveAuth0Client.handleRedirectCallback();
      const returnTo = sessionStorage.getItem(VYVE_RETURN_TO_KEY);
      window.history.replaceState({}, document.title, window.location.pathname);
      if (returnTo && returnTo !== window.location.href && returnTo !== window.location.origin + '/' && returnTo !== window.location.origin) {
        sessionStorage.removeItem(VYVE_RETURN_TO_KEY);
        window.location.replace(returnTo);
        return;
      }
      sessionStorage.removeItem(VYVE_RETURN_TO_KEY);
    }

    const isAuthenticated = await vyveAuth0Client.isAuthenticated();
    if (!isAuthenticated) {
      sessionStorage.setItem(VYVE_RETURN_TO_KEY, window.location.href);
      await vyveAuth0Client.loginWithRedirect();
      return;
    }

    const user = await vyveAuth0Client.getUser();
    window.vyveCurrentUser = user;
    vyveSetMemberName(user);
    vyveBindLogout();
    vyveRevealApp();
    vyveCapturePageView(user);

  } catch (error) {
    console.error('VYVE Auth initialisation failed:', error);
    vyveRevealApp('Preview mode: Auth0 failed to initialise, so this page has been shown without login.');
  }
}

document.addEventListener('DOMContentLoaded', vyveInitAuth);
