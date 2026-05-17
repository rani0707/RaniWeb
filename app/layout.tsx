import type { Metadata } from 'next'
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
  openGraph: {
    title: 'RANI | Portfolio',
    description: '사용자 경험을 중시하는 개발자 RANI의 포트폴리오입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RANI | Portfolio',
    description: '사용자 경험을 중시하는 개발자 RANI의 포트폴리오입니다.',
  },
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
