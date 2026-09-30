import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Edge-runtime proxy that:
 *  - Generates a per-request CSP nonce
 *  - Sets the nonce on request headers (`x-nonce`) so Next.js can stamp it on
 *    its own inline scripts/styles
 *  - Emits a strict, nonce-based Content-Security-Policy header on the
 *    response (no `unsafe-inline`, no `unsafe-eval`)
 *  - Adds isolation / cache hardening headers on top of the CSP
 *
 * In Next.js 16 the `middleware` file was renamed to `proxy`, but the
 * runtime API is identical.
 */

const NONCE_HEADER = 'x-nonce'

function generateNonce(): string {
  // Web Crypto is available in the Edge runtime
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes))
}

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // `'strict-dynamic'` lets scripts loaded by a nonced script run,
    // which is the recommended pattern for Next.js + nonce.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://static.cloudflareinsights.com`,
    `script-src-elem 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`,
    "script-src-attr 'none'",
    `style-src 'self' 'nonce-${nonce}'`,
    `style-src-elem 'self' 'nonce-${nonce}'`,
    // Inline JSX `style={{...}}` has been migrated to CSS modules, so we
    // can lock this down to `none`. If a regression appears it will be
    // visible in CSP reports and caught in CI.
    "style-src-attr 'none'",
    "img-src 'self' data: blob: https://static.cloudflareinsights.com",
    "font-src 'self' data:",
    "connect-src 'self' https://static.cloudflareinsights.com https://*.cloudflareinsights.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "manifest-src 'self'",
    "media-src 'self'",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
    // Send violation reports to our local endpoint AND to a hypothetical
    // Sentry/endpoint later via `report-to`.
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ].join('; ')
}

const ISOLATION_HEADERS: ReadonlyArray<[string, string]> = [
  ['X-Frame-Options', 'SAMEORIGIN'],
  ['X-Content-Type-Options', 'nosniff'],
  [
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  ],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  [
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()',
  ],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'same-site'],
  ['X-Permitted-Cross-Domain-Policies', 'none'],
]

export function proxy(request: NextRequest) {
  const nonce = generateNonce()
  const csp = buildCsp(nonce)

  // Propagate the nonce so Next.js can stamp it on its inline scripts/styles
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(NONCE_HEADER, nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('Content-Security-Policy', csp)
  response.headers.set(NONCE_HEADER, nonce)
  // Reporting-API endpoint declaration. Browsers that support `report-to`
  // (Chromium-based) will use this; legacy browsers fall back to `report-uri`.
  response.headers.set(
    'Reporting-Endpoints',
    'csp-endpoint="/api/csp-report"',
  )
  for (const [key, value] of ISOLATION_HEADERS) {
    response.headers.set(key, value)
  }

  return response
}

// `source` must be a string literal — Next.js parses it at compile time.
// Excludes API, static assets, Next internals, favicon, logo, and image files.
export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|_next/data|favicon.ico|logo.png|.*\\.png$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)',
      missing: [{ type: 'header', key: 'next-router-prefetch' }],
    },
  ],
}