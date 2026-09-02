'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'
import projectsData from '@/data/projects.json'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const projectCount = projectsData.length

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className={styles.hero} id="about">
      <div className={styles.container}>
        <div className={`${styles.content} ${mounted ? styles.visible : ''}`} aria-hidden={!mounted}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for work
          </div>

          <h1 className={styles.title}>
            안녕하세요,<br />
            Developer<br />
            <span className={styles.highlight}>RANI</span>입니다.
          </h1>

          <p className={styles.description}>
            사용자 경험을 중시하는 개발자입니다.<br />
            깔끔하고 효율적인 코드로 의미 있는 서비스를 만들어갑니다.
          </p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3+</span>
              <span className={styles.statLabel}>Years</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{projectCount}+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Clients</span>
            </div>
          </div>

          <div className={styles.actions}>
            <a href="#projects" className={styles.primaryBtn}>
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="mailto:support@raniweb.kr" className={styles.secondaryBtn}>
              Contact
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden={!mounted}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarPlaceholder}>
              <Image
                src="/logo.png"
                alt="RANI"
                width={280}
                height={280}
                className={styles.avatarImage}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
