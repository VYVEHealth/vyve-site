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

// Send log to Google Sheets via Apps Script
function vyveSendLog(minutesWatched) {
  const user = window.vyveCurrentUser;
  if (!user || !user.email) return; // only log identified members

  const payload = {
    email:   user.email,
    event:   minutesWatched !== undefined ? 'session_watched' : vyveGetEventType(),
    session: vyveGetSessionName(),
    url:     window.location.href,
    minutes: minutesWatched !== undefined ? minutesWatched : ""
  };

  // Use sendBeacon for page-unload events (more reliable than fetch on close)
  if (minutesWatched !== undefined && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon(VYVE_TRACKER_URL, blob);
  } else {
    fetch(VYVE_TRACKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(err => console.warn('VYVE tracking failed:', err));
  }
}

// Track time on page
const vyvePageStartTime = Date.now();

// Log page access on load (after Auth0 identifies user)
// Waits up to 5 seconds for vyveCurrentUser to be set
function vyveWaitAndLogAccess(attempts) {
  attempts = attempts || 0;
  if (window.vyveCurrentUser && window.vyveCurrentUser.email) {
    vyveSendLog(); // log the access event
  } else if (attempts < 10) {
    setTimeout(() => vyveWaitAndLogAccess(attempts + 1), 500);
  }
}

// Log minutes watched on page leave
window.addEventListener('beforeunload', function () {
  const minutes = parseFloat(((Date.now() - vyvePageStartTime) / 60000).toFixed(2));
  if (minutes >= 0.5) { // only log if they spent at least 30 seconds
    vyveSendLog(minutes);
  }
});

// Kick off access log
document.addEventListener('DOMContentLoaded', function () {
  vyveWaitAndLogAccess();
});
