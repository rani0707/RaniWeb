'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './Projects.module.css'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  year: string
  github: string
  url: string
  mdFile: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mdContent, setMdContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    setLoading(true)
    fetch(`/content/projects/${project.mdFile}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then((text) => {
        setMdContent(text)
        setLoading(false)
      })
      .catch(() => {
        setMdContent(`# ${project.title}\n\n상세 내용이 없습니다.`)
        setLoading(false)
      })
  }, [project])

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="닫기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className={styles.modalHeader}>
          <span className={styles.modalYear}>{project.year}</span>
          <div className={styles.modalTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.modalTag}>{tag}</span>
            ))}
          </div>
        </div>
        <h2 className={styles.modalTitle}>{project.title}</h2>

        {loading ? (
          <div className={styles.modalLoading}>로딩 중...</div>
        ) : (
          <div className={styles.mdContent}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {mdContent}
            </ReactMarkdown>
          </div>
        )}

        {(project.github || project.url) && (
          <div className={styles.modalFooter}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalGitBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalUrlBtn}
              >
                방문하기
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
