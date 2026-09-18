export const dynamic = 'force-dynamic';

const WC_PING_URL = process.env.WC_PING_URL || 'http://localhost:3001/api/ping';

export async function GET() {
  try {
    const res = await fetch(WC_PING_URL, { cache: 'no-store' });
    const body = await res.json();
    return Response.json(body, { status: res.status });
  } catch (err) {
    return Response.json(
      { service: 'test-pm', status: 'error', target: WC_PING_URL, error: String(err) },
      { status: 502 },
    );
  }
}
