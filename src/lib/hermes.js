export function getHermesEndpoint() {
  if (import.meta.env.VITE_HERMES_ENDPOINT) {
    return import.meta.env.VITE_HERMES_ENDPOINT;
  }
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
}

export function getHermesHeaders(extra = {}) {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return {
    'Content-Type': 'application/json',
    'apikey': anonKey,
    'Authorization': anonKey ? `Bearer ${anonKey}` : '',
    'x-api-key': import.meta.env.VITE_DASHBOARD_API_KEY || 'DigitallyDefined-OS-2026',
    ...extra,
  };
}

export async function sendToHermes(message, context = {}) {
  const res = await fetch(getHermesEndpoint(), {
    method: 'POST',
    headers: getHermesHeaders(),
    body: JSON.stringify({
      // 'public.chat' bypasses the function's DASHBOARD_API_KEY check and
      // returns { success, reply, provider, model } — matches the mentor use case.
      action: import.meta.env.VITE_HERMES_ACTION || 'public.chat',
      message,
      ...context,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Hermes request failed: ${res.status}`);
  }

  return res.json();
}

export default { getHermesEndpoint, getHermesHeaders, sendToHermes };
