'use client'

import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Modal from './Modal'
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

// In-memory rate limiter to prevent abuse
const rateLimiter = {
  requests: new Map<string, number[]>(),
  limit: 10,
  windowMs: 60000, // 1 minute

  isAllowed(clientId: string): boolean {
    const now = Date.now()
    const timestamps = this.requests.get(clientId) || []
    const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs)

    if (validTimestamps.length >= this.limit) {
      return false
    }

    validTimestamps.push(now)
    this.requests.set(clientId, validTimestamps)
    return true
  }
}

type MarkdownComponents = React.ComponentPropsWithoutRef<'img'> & React.ComponentPropsWithoutRef<'a'>

// Validate md file path to prevent directory traversal
function isValidMdFile(filename: string): boolean {
  return /^[a-zA-Z0-9_-]+\.md$/.test(filename)
}

// Sanitize URLs in markdown content to prevent javascript: and other dangerous schemes
function sanitizeUrl(url: string): string {
  if (/^(https?|mailto):\/\//i.test(url)) return url
  if (/^#/.test(url)) return url
  return '#'
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mdContent, setMdContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const clientIdRef = useRef<string>(`modal-${Date.now()}-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!isValidMdFile(project.mdFile)) {
      setError('유효하지 않은 프로젝트 파일입니다.')
      setLoading(false)
      return
    }

    if (!rateLimiter.isAllowed(clientIdRef.current)) {
      setError('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetch(`/content/projects/${project.mdFile}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`파일을 찾을 수 없습니다 (${res.status})`)
        }
        return res.text()
      })
      .then((text) => {
        setMdContent(text)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message || '상세 내용을 불러오는 중 오류가 발생했습니다.')
        setMdContent(`# ${project.title}\n\n상세 내용이 없습니다.`)
        setLoading(false)
      })
  }, [project])

  const markdownComponents: Partial<Record<string, React.ComponentType<MarkdownComponents>>> = {
    img: ({ src, alt }) => {
      const imgSrc = typeof src === 'string' && (src.startsWith('/') || src.startsWith('../') || src.startsWith('./') || /^https?:\/\//.test(src)) ? src : undefined
      return <img src={imgSrc} alt={alt || ''} style={{ maxWidth: '100%', height: 'auto' }} />
    },
    a: ({ href, children }) => (
      <a href={href ? sanitizeUrl(href) : undefined} target="_blank" rel="noopener noreferrer nofollow">
        {children}
      </a>
    ),
  }

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
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
        ) : error ? (
          <div className={styles.modalError}>{error}</div>
        ) : (
          <div className={styles.mdContent}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
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
    </Modal>
  )
}