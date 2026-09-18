export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({ service: 'test-pm', status: 'ok' });
}
