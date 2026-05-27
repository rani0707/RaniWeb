/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
              "script-src-attr 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "style-src-elem 'self' 'unsafe-inline'",
              "style-src-attr 'unsafe-inline'",
              "img-src 'self' data: blob: https://static.cloudflareinsights.com",
              "font-src 'self' data:",
              "connect-src 'self' https://static.cloudflareinsights.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
