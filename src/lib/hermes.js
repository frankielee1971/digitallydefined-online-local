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
  // Developer-mode requests go to the dedicated (protected) mentor.dev action,
  // which returns structured guidance (filePath, codeSnippet, exactChange).
  // Everyone else uses hermes.agent, which activates the full Hermes brain.
  const action =
    (import.meta.env.VITE_HERMES_ACTION) ||
    (context.devMode ? 'mentor.dev' : 'hermes.agent');

  const res = await fetch(getHermesEndpoint(), {
    method: 'POST',
    headers: getHermesHeaders(),
    body: JSON.stringify({
      action,
      message,
      system: context.system || null,
      toolState: context.toolState || null,
      page: context.page || null,
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
