export function getHermesEndpoint() {
  if (import.meta.env.VITE_HERMES_ENDPOINT) {
    return import.meta.env.VITE_HERMES_ENDPOINT;
  }
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
}

export function getHermesHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_DASHBOARD_API_KEY || 'DigitallyDefined-OS-2026',
    ...extra,
  };
}

export async function sendToHermes(message, context = {}) {
  const res = await fetch(getHermesEndpoint(), {
    method: 'POST',
    headers: getHermesHeaders(),
    body: JSON.stringify({
      action: 'mentor-chat',
      message,
      ...context,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Hermes request failed: ${res.status}`);
  }

  return res.json();
}

export default { getHermesEndpoint, getHermesHeaders, sendToHermes };
