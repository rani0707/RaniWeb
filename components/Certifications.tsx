'use client'

import styles from './Certifications.module.css'
import certificationsData from '@/data/certifications.json'

export default function Certifications() {
  return (
    <section className={styles.section} id="certifications">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications</h2>
        </div>

        <div className={styles.box}>
          <div className={styles.grid}>
            {certificationsData.map((cert) => (
              <article key={cert.id} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 15l-2 5l9-11h-6l2-5l-9 11h6z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.year}>{cert.year}</span>
                  <h3 className={styles.name}>{cert.name}</h3>
                  <span className={styles.issuer}>{cert.issuer}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
