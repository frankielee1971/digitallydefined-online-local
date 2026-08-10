// lib/supabase-edge.js
// Shared helper for calling Supabase Edge Functions directly
// Replaces all Vercel Serverless Function proxies

export const getSupabaseEdgeUrl = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
};

export const getSupabaseEdgeHeaders = (extra = {}) => ({
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_DASHBOARD_API_KEY || 'DigitallyDefined-OS-2026',
  ...extra,
});

export async function callSupabaseEdge(action, payload = {}, extraHeaders = {}) {
  const res = await fetch(getSupabaseEdgeUrl(), {
    method: 'POST',
    headers: getSupabaseEdgeHeaders(extraHeaders),
    body: JSON.stringify({ action, ...payload }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export default { getSupabaseEdgeUrl, getSupabaseEdgeHeaders, callSupabaseEdge };
