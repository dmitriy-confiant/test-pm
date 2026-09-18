export const dynamic = 'force-dynamic';

const WC_BASE_URL = (process.env.WC_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

// Statuses the fetch spec forbids a body on; Response.json() throws for these.
const NULL_BODY_STATUSES = new Set([204, 205, 304]);

export async function GET() {
  const target = `${WC_BASE_URL}/ping`;

  let res;
  try {
    res = await fetch(target, { cache: 'no-store' });
  } catch {
    return Response.json(
      { service: 'test-pm', status: 'error', target, error: 'test-wc is unreachable' },
      { status: 502 },
    );
  }

  if (NULL_BODY_STATUSES.has(res.status)) {
    return new Response(null, { status: res.status });
  }

  let body;
  try {
    body = await res.json();
  } catch {
    return Response.json(
      {
        service: 'test-pm',
        status: 'error',
        target,
        error: 'test-wc returned a non-JSON response',
      },
      { status: 502 },
    );
  }

  return Response.json(body, { status: res.status });
}
