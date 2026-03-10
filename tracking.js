/* ============================================================
   VYVE Portal Session Tracker — tracking.js
   Add <script src="tracking.js" defer></script> to every
   live and replay HTML page (after auth.js)
   ============================================================ */

const VYVE_TRACKER_URL = "https://script.google.com/macros/s/AKfycbyRiAwc66-nP_I7Kkn82QIEEsfV02PTgJbNFM2pdYzes3irTEghaCbg4hLFSyoo-D2J/exec";

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

// Send log using a hidden form — bypasses CORS entirely
function vyveSendLog(minutesWatched) {
  const user = window.vyveCurrentUser;
  if (!user || !user.email) return;

  const payload = {
    email:   user.email,
    event:   minutesWatched !== undefined ? 'session_watched' : vyveGetEventType(),
    session: vyveGetSessionName(),
    url:     window.location.href,
    minutes: minutesWatched !== undefined ? minutesWatched : ""
  };

  // Build a hidden iframe + form to POST without triggering CORS preflight
  const iframe = document.createElement('iframe');
  iframe.name = 'vyve_tracker_frame';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = VYVE_TRACKER_URL;
  form.target = 'vyve_tracker_frame';

  // Append payload as a single field called "data"
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'data';
  input.value = JSON.stringify(payload);
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();

  // Clean up after submission
  setTimeout(() => {
    document.body.removeChild(form);
    document.body.removeChild(iframe);
  }, 3000);
}

// Track time on page
const vyvePageStartTime = Date.now();

// Wait for Auth0 to identify user then log access
function vyveWaitAndLogAccess(attempts) {
  attempts = attempts || 0;
  if (window.vyveCurrentUser && window.vyveCurrentUser.email) {
    vyveSendLog();
  } else if (attempts < 10) {
    setTimeout(() => vyveWaitAndLogAccess(attempts + 1), 500);
  }
}

// Log minutes watched on page leave
window.addEventListener('beforeunload', function () {
  const minutes = parseFloat(((Date.now() - vyvePageStartTime) / 60000).toFixed(2));
  if (minutes >= 0.5) {
    vyveSendLog(minutes);
  }
});

// Kick off
document.addEventListener('DOMContentLoaded', function () {
  vyveWaitAndLogAccess();
});
