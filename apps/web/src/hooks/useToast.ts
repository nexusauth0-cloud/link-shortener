'use client'

import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let toastId = 0

const listeners: Array<(toast: Toast) => void> = []

export function subscribeToToast(listener: (toast: Toast) => void) {
  listeners.push(listener)
  return () => {
    const idx = listeners.indexOf(listener)
    if (idx !== -1) listeners.splice(idx, 1)
  }
}

function emitToast(toast: Toast) {
  listeners.forEach((l) => l(toast))
}

export function showToast(message: string, type: Toast['type'] = 'success') {
  const toast: Toast = { id: `t${++toastId}`, message, type }
  emitToast(toast)
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
    }, 3000)
  }, [])

  return { toasts, addToast, showToast }
}
