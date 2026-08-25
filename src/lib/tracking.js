// src/lib/tracking.js
// Lightweight event tracking for digitallydefined.online.
// Sends page views, CTA clicks, form submissions, quiz start/complete,
// product interest, scroll depth and session duration to the Supabase
// `analytics` Edge Function (project dijjlppdljpcgyoakdnq).
//
// Usage:
//   import { initTracking, trackEvent } from '../lib/tracking';
//   initTracking();                       // once in main.jsx
//   trackEvent('cta_click', { label });   // anywhere

const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://dijjlppdljpcgyoakdnq.supabase.co';

const ENDPOINT = `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/analytics`;
const SESSION_KEY = 'dd_session_id';
const SESSION_START_KEY = 'dd_session_start';
const FLUSH_INTERVAL = 8000; // ms between background flushes

let queue = [];
let initialized = false;
let maxScrollDepth = 0;
let currentPage = '/';

const getSessionId = () => {
  let id = null;
  try {
    id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(SESSION_KEY, id);
      window.localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }
  } catch {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
  return id;
};

const sessionAgeMs = () => {
  try {
    const start = Number(window.localStorage.getItem(SESSION_START_KEY) || Date.now());
    return Date.now() - start;
  } catch {
    return 0;
  }
};

const currentPath = () =>
  typeof window !== 'undefined' ? window.location.pathname || '/' : '/';

/** Queue an event; flushed in batches to keep network chatter low. */
export function trackEvent(eventType, metadata = {}) {
  const event = {
    event_type: eventType,
    page: metadata.page || currentPath(),
    session_id: getSessionId(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    metadata,
    ...(metadata.email ? { email: metadata.email } : {}),
    ...(metadata.product_name ? { product_name: metadata.product_name } : {}),
  };
  queue.push(event);
  if (queue.length >= 8) flush();
}

/** Send queued events immediately. Uses sendBeacon when unloading. */
export function flush(useBeacon = false) {
  if (!queue.length) return;
  const events = queue.splice(0, queue.length);
  const body = JSON.stringify({ action: 'track', events });
  try {
    if (useBeacon && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      return;
    }
    const apiKey = import.meta.env.VITE_DASHBOARD_API_KEY;
    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {}),
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the site; drop silently on failure.
  }
}

/** Page view for SPA route changes. */
export function trackPageView(page) {
  currentPage = page || currentPath();
  maxScrollDepth = 0;
  trackEvent('page_view', { page: currentPage });
}

/** Quiz lifecycle helpers. */
export const trackQuizStart = (source) => trackEvent('quiz_start', { source });

export const trackQuizComplete = ({ email, superpower } = {}) =>
  trackEvent('quiz_complete', { email, superpower });

/** Product / offer interest. */
export const trackProductInterest = (productName, extra = {}) =>
  trackEvent('product_interest', { product_name: productName, ...extra });

/** Form submission with optional lead email capture. */
export const trackFormSubmit = ({ formName, email, funnel_step } = {}) =>
  trackEvent('form_submit', {
    form_name: formName,
    ...(email ? { email, funnel_step } : {}),
  });

function initAutoCollection() {
  // --- CTA click delegation (buttons + anchor CTAs) ---
  document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target.closest('a, button') : null;
    if (!target) return;
    const isCta =
      target.matches('.btn, [class*="btn--"], [data-cta]') ||
      (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/'));
    if (!isCta && !target.dataset.cta) return;
    trackEvent('cta_click', {
      label:
        target.dataset.cta ||
        target.textContent?.trim().slice(0, 80) ||
        target.getAttribute('aria-label') ||
        'unknown',
      href: target.getAttribute('href') || undefined,
    });
  }, { passive: true });

  // --- Scroll depth (25/50/75/100 checkpoints) ---
  const checkpoints = [25, 50, 75, 100];
  const fired = new Set();
  window.addEventListener(
    'scroll',
    () => {
      const docHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const depth = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
      if (depth > maxScrollDepth) maxScrollDepth = depth;
      for (const cp of checkpoints) {
        if (depth >= cp && !fired.has(cp)) {
          fired.add(cp);
          trackEvent('scroll_depth', { depth: cp });
        }
      }
    },
    { passive: true },
  );

  // --- Session duration heartbeat every 30s ---
  const heartbeat = setInterval(() => {
    trackEvent('session_heartbeat', { age_ms: sessionAgeMs(), page: currentPath() });
  }, 30000);

  // --- End of session: duration via beacon ---
  const endSession = () => {
    trackEvent('session_end', {
      duration_ms: sessionAgeMs(),
      max_scroll_depth: maxScrollDepth,
      page: currentPath(),
    });
    flush(true);
    clearInterval(heartbeat);
  };
  window.addEventListener('pagehide', endSession);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') endSession();
  });

  // Background flush loop
  setInterval(() => flush(), FLUSH_INTERVAL);
}

/** Initialize tracking once at app boot. */
export function initTracking() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  getSessionId();
  trackEvent('session_start', {
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
  });
  trackPageView();
  initAutoCollection();

  // Expose for manual instrumentation / debugging.
  window.ddTrack = {
    trackEvent,
    trackPageView,
    flush,
    trackQuizStart,
    trackQuizComplete,
    trackProductInterest,
    trackFormSubmit,
  };
}

export default {
  initTracking,
  trackEvent,
  trackPageView,
  trackQuizStart,
  trackQuizComplete,
  trackProductInterest,
  trackFormSubmit,
  flush,
};
