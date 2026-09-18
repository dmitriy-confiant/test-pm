export const dynamic = 'force-dynamic';

const WC_BASE_URL = process.env.WC_BASE_URL || 'http://localhost:8000';

export async function GET() {
  const target = `${WC_BASE_URL}/ping`;
  try {
    const res = await fetch(target, { cache: 'no-store' });
    if (res.status === 204 || res.status === 304) {
      return new Response(null, { status: res.status });
    }
    const body = await res.json();
    return Response.json(body, { status: res.status });
  } catch {
    return Response.json(
      { service: 'test-pm', status: 'error', target, error: 'test-wc is unreachable' },
      { status: 502 },
    );
  }
}
