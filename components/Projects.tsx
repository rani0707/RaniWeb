'use client'

import { useRef, useState } from 'react'
import styles from './Projects.module.css'
import ProjectModal from './ProjectModal'
import projectsData from '@/data/projects.json'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)
  const ref = useRef<HTMLElement>(null)

  return (
    <section className={styles.section} id="projects" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className={styles.box}>
          <div className={styles.grid}>
            {projectsData.map((project) => (
              <article
                key={project.id}
                className={styles.card}
              >
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.year}>{project.year}</span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardGit}
                        aria-label="GitHub"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <button
                  className={styles.detailBtn}
                  onClick={() => setSelectedProject(project)}
                >
                  상세보기
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
