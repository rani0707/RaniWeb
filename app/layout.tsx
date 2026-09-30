import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RANI | Portfolio',
  description: '사용자 경험을 중시하는 개발자 RANI의 포트폴리오입니다.',
  keywords: ['portfolio', 'developer', 'react', 'nextjs', 'frontend'],
  authors: [{ name: 'RANI' }],
  metadataBase: new URL('https://www.raniweb.kr'),
  openGraph: {
    title: 'RANI | Portfolio',
    description: '사용자 경험을 중시하는 개발자 RANI의 포트폴리오입니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.raniweb.kr',
    siteName: 'RANI Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RANI | Portfolio',
    description: '사용자 경험을 중시하는 개발자 RANI의 포트폴리오입니다.',
  },
  icons: {
    icon: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Pull the per-request nonce generated in middleware.ts so any inline
  // <script>/<style> we render here can be allowed by the CSP.
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <html lang="ko" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider nonce={nonce}>{children}</ThemeProvider>
      </body>
    </html>
  )
}