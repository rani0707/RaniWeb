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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Skills />
        <Experience />
        <Certifications />
        <Awards />
      </main>
      <Footer />
    </>
  )
}
