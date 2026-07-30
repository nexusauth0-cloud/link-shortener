const STORAGE_KEY = 'link-shortener-history'

export function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8)
}

export function getHistory(): { id: string; original: string; short: string; createdAt: number }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveToHistory(entry: { id: string; original: string; short: string; createdAt: number }): void {
  const history = getHistory()
  history.unshift(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)))
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function lookupCode(code: string): { original: string } | undefined {
  const history = getHistory()
  return history.find((e) => e.short.endsWith(`/s/${code}`) || e.id === code)
}
