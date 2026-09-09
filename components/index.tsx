'use client'

import { Suspense } from 'react'
import Header from './Header'
import Hero from './Hero'
import Projects from './Projects'
import Skills from './Skills'
import Experience from './Experience'
import Certifications from './Certifications'
import Awards from './Awards'
import Footer from './Footer'
import MobileHome from './mobile/MobileHome'

/**
 * 모바일/데스크탑 토글 방식:
 * - React 조건부 렌더링 대신 두 트리를 모두 렌더
 * - CSS 클래스(mobile-only / desktop-only)의 display 토글로 전환
 * - SSR·CSR 마크업이 동일 → hydration mismatch 없음
 * - 미디어쿼리 변경 시 React 리렌더 불필요 → 부드러운 전환
 * - Header는 페이지에 단 한 번만 렌더 (두 트리에 중복 X)
 */
export default function Home() {
  return (
    <>
      {/* ── Header는 한 번만 ── */}
      <Header />

      {/* ── 모바일 트리 ── */}
      <div className="mobile-only">
        <MobileHome />
      </div>

      {/* ── 데스크탑 트리 ── */}
      <div className="desktop-only">
        <main>
          <Hero />
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Skills />
          <Experience />
          <Certifications />
          <Awards />
          <Footer />
        </main>
      </div>
    </>
  )
}
