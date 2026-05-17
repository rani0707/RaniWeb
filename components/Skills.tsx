'use client'

import styles from './Skills.module.css'
import skillCategoriesData from '@/data/skills.json'

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
        </div>

        <div className={styles.box}>
          <div className={styles.grid}>
            {skillCategoriesData.map((category) => (
              <div key={category.title} className={styles.category}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.skillList}>
                  {category.skills.map((skill) => (
                    <span key={skill} className={styles.skillItem}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
