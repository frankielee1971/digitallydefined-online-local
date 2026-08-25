// lib/supabase-edge.js
// Shared helper for calling Supabase Edge Functions directly
// Replaces all Vercel Serverless Function proxies

export const getSupabaseEdgeUrl = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
};

export const getSupabaseEdgeHeaders = (extra = {}) => {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const apiKey = import.meta.env.VITE_DASHBOARD_API_KEY;
  if (!apiKey && import.meta.env.DEV) {
    console.warn('[Hermes] VITE_DASHBOARD_API_KEY is not set. Dashboard API calls will fail.');
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'x-api-key': apiKey } : {}),
    ...extra,
  };
  if (anonKey) {
    headers['apikey'] = anonKey;
    headers['Authorization'] = `Bearer ${anonKey}`;
  }
  return headers;
};

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
