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
import useIsMobile from './hooks/useIsMobile'
import MobileHome from './mobile/MobileHome'

export default function Home() {
  const isMobile = useIsMobile(768)

  // 모바일에서는 모바일 전용 단순화된 트리를 렌더링한다.
  // CSS Modules 스코핑 충돌과 미디어쿼리 누락 문제를 우회하기 위함.
  if (isMobile) {
    return (
      <>
        <Header />
        <MobileHome />
      </>
    )
  }

  return (
    <main>
      <Header />
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
  )
}
