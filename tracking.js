/* ============================================================
   VYVE Portal Session Tracker — tracking.js
   Add <script src="tracking.js" defer></script> to every
   live and replay HTML page (after auth.js)
   ============================================================ */

const VYVE_TRACKER_URL = "https://script.google.com/macros/s/AKfycbyfpOBk4dxprsZiVK4BwznCDL3sHpYoEzJC1P0vYgv3OQJxJPb_Non80KOznbmnjHOJ/exec";
const VYVE_HEARTBEAT_INTERVAL = 30000; // send minutes update every 30 seconds

// Detect session name from current URL
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

// Detect event type from URL
function vyveGetEventType() {
  const path = window.location.pathname;
  if (path.includes('-live')) return 'live_accessed';
  if (path.includes('-rp'))   return 'replay_accessed';
  return 'page_viewed';
}

// Send log using hidden iframe form — bypasses CORS entirely
function vyveSendLog(payload) {
  const iframe = document.createElement('iframe');
  iframe.name = 'vyve_tracker_frame_' + Date.now();
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = VYVE_TRACKER_URL;
  form.target = iframe.name;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'data';
  input.value = JSON.stringify(payload);
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();

  setTimeout(() => {
    if (document.body.contains(form))   document.body.removeChild(form);
    if (document.body.contains(iframe)) document.body.removeChild(iframe);
  }, 5000);
}

// Log page access
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

// Heartbeat — sends cumulative minutes every 30 seconds
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

// Track time on page
const vyvePageStartTime = Date.now();

// Wait for Auth0 to identify user then log access + start heartbeat
function vyveWaitAndLogAccess(attempts) {
  attempts = attempts || 0;
  if (window.vyveCurrentUser && window.vyveCurrentUser.email) {
    vyveLogAccess();
    vyveStartHeartbeat();
  } else if (attempts < 20) {
    setTimeout(() => vyveWaitAndLogAccess(attempts + 1), 500);
  }
}

// Kick off
document.addEventListener('DOMContentLoaded', function () {
  vyveWaitAndLogAccess();
});
