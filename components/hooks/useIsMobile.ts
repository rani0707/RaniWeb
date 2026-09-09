'use client'

import { useEffect, useState } from 'react'

/**
 * 모바일(<=768px) 여부를 반환하는 훅.
 * SSR/hydration mismatch를 피하기 위해 첫 렌더는 false로 고정하고,
 * 마운트 이후에만 실제 폭을 반영한다.
 */
export default function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}
