const SELLABLE_ENDPOINT = 'https://dijjlppdljpcgyoakdnq.supabase.co/functions/v1/sellable';

export async function fetchSellableProperties() {
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!anonKey) {
    throw new Error('Missing required environment variable: SUPABASE_ANON_KEY');
  }

  let response;
  try {
    response = await fetch(SELLABLE_ENDPOINT, {
      method: 'GET',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error(`Failed to reach Supabase function "${SELLABLE_ENDPOINT}": ${error.message}`, { cause: error });
  }

  if (!response.ok) {
    throw new Error(`Supabase function "${SELLABLE_ENDPOINT}" returned ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Supabase function "${SELLABLE_ENDPOINT}" returned unexpected content type: ${contentType || '(none)'}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Supabase function "${SELLABLE_ENDPOINT}" returned invalid JSON`, { cause: error });
  }

  if (!Array.isArray(data)) {
    throw new Error(
      `Supabase function "${SELLABLE_ENDPOINT}" returned an unexpected shape: expected an array, got ${data === null ? 'null' : typeof data}`
    );
  }

  return data;
}
