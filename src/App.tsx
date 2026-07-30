import { useState, useEffect, useCallback } from 'react'
import type { LinkEntry } from './types'
import { generateShortCode, getHistory, saveToHistory, isValidUrl, lookupCode } from './utils'

function App() {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState<LinkEntry | null>(null)
  const [history, setHistory] = useState<LinkEntry[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const baseUrl = `${window.location.origin}/s/`

  useEffect(() => {
    const match = window.location.pathname.match(/^\/s\/(\w+)$/)
    if (match) {
      const entry = lookupCode(match[1])
      if (entry) {
        window.location.replace(entry.original)
      }
    }
    setHistory(getHistory())
  }, [])

  const handleShorten = useCallback(() => {
    const trimmed = url.trim()
    if (!trimmed) return
    const finalUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    if (!isValidUrl(finalUrl)) return

    const code = generateShortCode()
    const entry: LinkEntry = {
      id: code,
      original: finalUrl,
      short: `${baseUrl}${code}`,
      createdAt: Date.now(),
    }

    saveToHistory(entry)
    setShortened(entry)
    setHistory(getHistory())
    setUrl('')
  }, [url, baseUrl])

  const handleCopy = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleShorten()
    },
    [handleShorten],
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-2">Link Shortener</h1>
        <p className="text-gray-400 text-center mb-8">Paste a long URL to make it short</p>

        <div className="flex gap-2 mb-8">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/very/long/url"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
          <button
            onClick={handleShorten}
            disabled={!url.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            Shorten
          </button>
        </div>

        {shortened && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-400 mb-1">Original URL</p>
            <p className="text-gray-300 truncate mb-3">{shortened.original}</p>
            <p className="text-sm text-gray-400 mb-1">Shortened URL</p>
            <div className="flex items-center gap-2">
              <a
                href={shortened.short}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium truncate"
              >
                {shortened.short}
              </a>
              <button
                onClick={() => handleCopy(shortened.short, shortened.id)}
                className="shrink-0 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
              >
                {copiedId === shortened.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">History</h2>
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 bg-gray-800/50 border border-gray-800 rounded-lg px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <a
                      href={entry.short}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm block truncate"
                    >
                      {entry.short}
                    </a>
                    <p className="text-gray-500 text-xs truncate mt-0.5">{entry.original}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(entry.short, entry.id)}
                    className="shrink-0 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
                  >
                    {copiedId === entry.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
