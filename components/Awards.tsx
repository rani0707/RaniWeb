'use client'

import styles from './Awards.module.css'
import awardsData from '@/data/awards.json'

export default function Awards() {
  return (
    <section className={styles.section} id="awards">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Achievement</span>
          <h2 className="section-title">Awards & Recognition</h2>
        </div>

        <div className={styles.box}>
          <div className={styles.grid}>
            {awardsData.map((award, index) => (
              <article key={award.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.rank}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.year}>{award.year}</span>
                </div>
                <h3 className={styles.title}>{award.title}</h3>
                <span className={styles.organization}>{award.organization}</span>
                <p className={styles.description}>{award.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
