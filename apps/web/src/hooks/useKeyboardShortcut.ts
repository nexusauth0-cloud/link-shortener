'use client'

import { useEffect } from 'react'

type KeyHandler = (e: KeyboardEvent) => void

interface Shortcut {
  key: string
  meta?: boolean
  ctrl?: boolean
  shift?: boolean
  handler: KeyHandler
}

export function useKeyboardShortcut(shortcuts: Shortcut[], deps: unknown[] = []) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const s of shortcuts) {
        const metaMatch = s.meta ? e.metaKey || e.ctrlKey : true
        const ctrlMatch = s.ctrl ? e.ctrlKey : true
        const shiftMatch = s.shift ? e.shiftKey : true
        const keyMatch = e.key.toLowerCase() === s.key.toLowerCase()

        if (metaMatch && ctrlMatch && shiftMatch && keyMatch) {
          e.preventDefault()
          s.handler(e)
          return
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts, ...deps])
}
