/* ============================================================
   VYVE Portal Session Tracker — tracking.js
   Add <script src="tracking.js" defer></script> to every
   live and replay HTML page (after auth.js)
   ============================================================ */

const VYVE_TRACKER_URL = "https://script.google.com/macros/s/AKfycbzf8DQByTcoz8wIO1gbqXeCyp312_1wyJfrP2pBsPP5WJORHsKKBvjsLUDfVAmUZpty/exec";
const VYVE_HEARTBEAT_INTERVAL = 30000; // 30 seconds

function vyveGetSessionName() {
  const path = window.location.pathname;
  if (path.includes('yoga'))        return 'Yoga, Pilates & Stretch';
  if (path.includes('mindfulness')) return 'Mindfulness & Mindset';
  if (path.includes('workouts'))    return 'Workouts';
  if (path.includes('checkin'))     return 'Weekly Check-In';
  if (path.includes('therapy'))     return 'Group Therapy';
  if (path.includes('events'))      return 'Events & Run Club';
  if (path.includes('education'))   return 'Education & Experts';
  return 'Unknown';
}

function vyveGetEventType() {
  const path = window.location.pathname;
  if (path.includes('-live')) return 'live_accessed';
  if (path.includes('-rp'))   return 'replay_accessed';
  return 'page_viewed';
}

// Send via script tag — follows Google redirects, no CORS issues
function vyveSendLog(payload) {
  const params = new URLSearchParams({
    email:   payload.email,
    event:   payload.event,
    session: payload.session,
    url:     payload.url,
    minutes: payload.minutes || ''
  });
  const script = document.createElement('script');
  script.src = VYVE_TRACKER_URL + '?' + params.toString();
  script.onload  = () => { if (script.parentNode) script.parentNode.removeChild(script); };
  script.onerror = () => { if (script.parentNode) script.parentNode.removeChild(script); };
  document.head.appendChild(script);
}

function vyveLogAccess() {
  const user = window.vyveCurrentUser;
  if (!user || !user.email) return;
  vyveSendLog({
    email:   user.email,
    event:   vyveGetEventType(),
    session: vyveGetSessionName(),
    url:     window.location.href,
    minutes: ''
  });
}

function vyveStartHeartbeat() {
  const user = window.vyveCurrentUser;
  if (!user || !user.email) return;
  setInterval(() => {
    const minutes = parseFloat(((Date.now() - vyvePageStartTime) / 60000).toFixed(2));
    if (minutes < 0.1) return;
    vyveSendLog({
      email:   user.email,
      event:   'session_watched',
      session: vyveGetSessionName(),
      url:     window.location.href,
      minutes: minutes
    });
  }, VYVE_HEARTBEAT_INTERVAL);
}

const vyvePageStartTime = Date.now();

function vyveWaitAndLogAccess(attempts) {
  attempts = attempts || 0;
  if (window.vyveCurrentUser && window.vyveCurrentUser.email) {
    vyveLogAccess();
    vyveStartHeartbeat();
  } else if (attempts < 20) {
    setTimeout(() => vyveWaitAndLogAccess(attempts + 1), 500);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  vyveWaitAndLogAccess();
});
