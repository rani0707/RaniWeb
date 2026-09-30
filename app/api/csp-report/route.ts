export const dynamic = 'force-dynamic'

/**
 * Receives CSP violation reports from the browser.
 *
 * The browser posts `application/csp-report` with a body of
 * `{ "csp-report": { "document-uri": "...", "violated-directive": "...", ... } }`.
 *
 * We accept any content-type and accept any shape, log a structured warning,
 * and intentionally do not echo the report back to the client.
 */
async function parseReport(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/csp-report')) {
    try {
      return await request.json()
    } catch {
      return null
    }
  }
  if (contentType.includes('application/reports+json')) {
    // Reporting API v0 — array of report objects
    try {
      return await request.json()
    } catch {
      return null
    }
  }
  try {
    return await request.json()
  } catch {
    try {
      return await request.formData()
    } catch {
      return null
    }
  }
}

export async function POST(request: Request) {
  const report = await parseReport(request)
  // Structured log so it can be scraped by log aggregation (e.g. Loki / Cloudflare Logs).
  // We never trust the report contents; redact referrers and only print
  // directive + violated resource type at most.
  console.warn('[csp-violation]', JSON.stringify(report))
  return new Response(null, { status: 204 })
}

export async function GET() {
  // GET should never happen on a report endpoint — respond 405 to make
  // misconfigured clients fail loudly instead of silently swallowing.
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  })
}