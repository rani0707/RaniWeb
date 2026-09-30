/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Tighten the image optimisation allow-list. Wildcards are removed so that
  // every external host needs to be enumerated explicitly.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raniweb.kr' },
      { protocol: 'https', hostname: 'www.raniweb.kr' },
      { protocol: 'https', hostname: 'localhost' },
    ],
    // Mitigate processor exhaustion attacks from user-controlled SVGs
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers() {
    // Long-lived cache headers on fingerprinted assets break Next.js dev mode,
    // so only emit them when explicitly building for production. We early-
    // return synchronously so Next.js' static config analysis sees no
    // Cache-Control on /_next/static during development.
    const baseHeaders = [
      // App pages: rely on `proxy.ts` for CSP / isolation headers.
      // We still set a conservative X-DNS-Prefetch-Control here so that it
      // applies even if the proxy is bypassed (e.g. during build probes).
      {
        source:
          '/((?!_next/static|_next/image|_next/data|favicon.ico|logo.png).*)',
        headers: [{ key: 'X-DNS-Prefetch-Control', value: 'on' }],
      },
      // Security.txt / favicon served with no-store so changes propagate fast
      {
        source: '/(favicon.ico|logo.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      // Markdown project content is fetched via fetch() from the client; it
      // should never be treated as long-lived cacheable content.
      {
        source: '/content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]

    if (process.env.NODE_ENV !== 'production') return baseHeaders

    return [
      ...baseHeaders,
      // Long-lived cache for fingerprinted static assets (production only)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      // Public assets served from /public (project images, etc.)
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },
}

module.exports = nextConfig