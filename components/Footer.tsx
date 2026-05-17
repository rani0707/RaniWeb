'use client'

import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>RANI</span>
            <p className={styles.tagline}>
              성장하는 개발자, <br></br>더 나은 세상을 만드는 것을 지향합니다.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Navigation</h4>
              <a href="#about" className={styles.link}>About</a>
              <a href="#projects" className={styles.link}>Projects</a>
              <a href="#skills" className={styles.link}>Skills</a>
              <a href="#experience" className={styles.link}>Experience</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Contact</h4>
              <a href="https://github.com/rani0707" className={styles.link} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="mailto:support@raniweb.kr" className={styles.link}>Email</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} RANI. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="mailto:support@raniweb.kr" className={styles.socialLink} aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://github.com/rani0707" className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
