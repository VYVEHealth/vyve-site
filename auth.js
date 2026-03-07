const VYVE_AUTH0_DOMAIN = "dev-340hbcgnjubvwb85.uk.auth0.com";
const VYVE_AUTH0_CLIENT_ID = "F7LMC3G7QCZOiAyxheEhAz3lhLcsAA7v";
const VYVE_AUTH0_SDK = "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js";
const VYVE_RETURN_TO_KEY = "vyve_return_to";

let vyveAuth0Client = null;

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
    posthog.capture('portal page viewed', {
      page: window.location.pathname,
      title: document.title,
      source: new URLSearchParams(window.location.search).get('source') || 'direct'
    });
  } catch (e) {
    console.warn('PostHog tracking failed', e);
  }
}

function vyveLoadAuth0Sdk() {
  return new Promise((resolve, reject) => {
    // v2 CDN exposes via window.auth0 namespace
    if (window.auth0 && typeof window.auth0.createAuth0Client === 'function') {
      resolve(); return;
    }
    const script = document.createElement('script');
    script.src = VYVE_AUTH0_SDK;
    script.onload = () => {
      setTimeout(() => {
        if (window.auth0 && typeof window.auth0.createAuth0Client === 'function') {
          resolve();
        } else {
          reject(new Error('Auth0 SDK loaded but window.auth0.createAuth0Client not found'));
        }
      }, 50);
    };
    script.onerror = () => reject(new Error('Auth0 SDK failed to load'));
    document.head.appendChild(script);
  });
}

async function vyveInitAuth() {
  try {
    await vyveLoadAuth0Sdk();

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
