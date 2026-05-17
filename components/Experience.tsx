'use client'

import styles from './Experience.module.css'
import experiencesData from '@/data/experience.json'

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Career</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className={styles.box}>
          <div className={styles.list}>
            {experiencesData.map((exp) => (
              <div key={exp.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <div className={styles.itemRight}>
                  <h3 className={styles.role}>{exp.company}</h3>
                  <p className={styles.sub}>{exp.role}{exp.description ? ` · ${exp.description}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
