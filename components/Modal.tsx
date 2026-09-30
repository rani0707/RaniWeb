'use client'

import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ children, onClose }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  // Stable close handler so the effect doesn't re-bind listeners on every render
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !containerRef.current) return
      // Focus trap: cycle within the modal's focusable children
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && (active === first || !containerRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (typeof document === 'undefined') return

    // Remember the element that had focus before opening so we can restore it
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Move initial focus inside the modal
    const focusables =
      containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    const target = focusables?.[0] ?? containerRef.current
    target?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      // Restore focus to the previously focused element on unmount
      previouslyFocusedRef.current?.focus?.()
    }
  }, [handleKeyDown])

  // SSR guard – render nothing on the server, then portal to the body on the client
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="presentation"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={styles.container}
      >
        <span id={titleId} className={styles.srOnly}>
          상세 정보
        </span>
        {children}
      </div>
    </div>,
    document.body,
  )
}