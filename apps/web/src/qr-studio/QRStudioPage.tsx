'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { Button, Badge } from '@nexuslinks/ui'
import { mockQRCodes } from '../mock/data'
import { fadeInUp, stagger } from '@nexuslinks/ui'
import {
  Download,
  Square,
  Circle,
  RotateCcw,
  Upload,
  Check,
  Grid3X3,
  RefreshCw,
  Eye,
  Link2,
  Scan,
  X,
} from 'lucide-react'

type Pattern = 'squares' | 'dots' | 'rounded' | 'diamond'
type CornerStyle = 'square' | 'rounded' | 'circle' | 'pinch'
type FrameStyle = 'none' | 'solid' | 'gradient' | 'inset'

const patterns: { id: Pattern; label: string; icon: React.ElementType }[] = [
  { id: 'squares', label: 'Squares', icon: Square },
  { id: 'dots', label: 'Dots', icon: Circle },
  { id: 'rounded', label: 'Rounded', icon: Grid3X3 },
  { id: 'diamond', label: 'Diamond', icon: RotateCcw },
]

const cornerStyles: { id: CornerStyle; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'circle', label: 'Circle' },
  { id: 'pinch', label: 'Pinch' },
]

const frameStyles: { id: FrameStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'solid', label: 'Solid' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'inset', label: 'Inset' },
]

const presetColors = [
  '#7C3AED',
  '#22D3EE',
  '#22C55E',
  '#F59E0B',
  '#EF4444',
  '#3B82F6',
  '#EC4899',
  '#FFFFFF',
  '#000000',
  '#A855F7',
]

function QRPreview({
  fgColor,
  bgColor,
  pattern,
  frameStyle,
}: {
  fgColor: string
  bgColor: string
  pattern: Pattern
  frameStyle: FrameStyle
}) {
  const size = 220
  const innerSize = 180
  const offset = (size - innerSize) / 2
  const modules = []

  const seed = 42
  const pseudoRandom = (i: number) => (seed * (i + 1) * 7 + i * 13) % 3 !== 0

  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 21; col++) {
      const isFinder = (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7)
      const isTiming = row === 6 || col === 6
      if (isFinder) {
        const isOuter = row === 0 || row === 6 || col === 0 || col === 6
        const isInner = row >= 2 && row <= 4 && col >= 2 && col <= 4
        const shouldFill = isOuter || isInner
        if (shouldFill) {
          modules.push({ row, col, fill: true, isFinder: true })
        }
      } else if (isTiming) {
        const shouldFill = (row + col) % 2 === 0
        if (shouldFill) modules.push({ row, col, fill: true })
      } else if (pseudoRandom(row * 21 + col)) {
        modules.push({ row, col, fill: true })
      }
    }
  }

  const cellSize = innerSize / 21

  const getModuleShape = (_fill: boolean) => {
    const base = { stroke: 'none', strokeWidth: 0, rx: 0, ry: 0 }
    if (pattern === 'dots' || pattern === 'diamond') {
      return { ...base, rx: cellSize / 2, ry: cellSize / 2 }
    }
    if (pattern === 'rounded') {
      return { ...base, rx: cellSize * 0.25, ry: cellSize * 0.25 }
    }
    return base
  }

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill={bgColor} rx={0} />

        {frameStyle === 'solid' && (
          <rect
            x={2}
            y={2}
            width={size - 4}
            height={size - 4}
            fill="none"
            stroke={fgColor}
            strokeWidth={3}
            rx={8}
          />
        )}
        {frameStyle === 'gradient' && (
          <>
            <defs>
              <linearGradient id="frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={fgColor} />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
            <rect
              x={2}
              y={2}
              width={size - 4}
              height={size - 4}
              fill="none"
              stroke="url(#frame-grad)"
              strokeWidth={3}
              rx={8}
            />
          </>
        )}
        {frameStyle === 'inset' && (
          <>
            <rect
              x={3}
              y={3}
              width={size - 6}
              height={size - 6}
              fill="none"
              stroke={fgColor}
              strokeWidth={1.5}
              rx={4}
              opacity={0.5}
            />
            <rect
              x={8}
              y={8}
              width={size - 16}
              height={size - 16}
              fill="none"
              stroke={fgColor}
              strokeWidth={1}
              rx={3}
              opacity={0.3}
            />
          </>
        )}

        {modules.map((m, i) => {
          const shape = getModuleShape(m.fill)
          const x = offset + m.col * cellSize
          const y = offset + m.row * cellSize
          const c = cellSize - 0.5
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={c}
              height={c}
              fill={m.fill ? (m.isFinder ? fgColor : fgColor) : 'none'}
              rx={m.isFinder ? c * 0.15 : shape.rx}
              ry={m.isFinder ? c * 0.15 : shape.ry}
              className={m.isFinder ? '' : 'transition-all'}
            />
          )
        })}

        {pattern === 'diamond' &&
          modules
            .filter((m) => m.fill && !m.isFinder)
            .map((m, i) => {
              const x = offset + m.col * cellSize + cellSize / 2
              const y = offset + m.row * cellSize + cellSize / 2
              const r = cellSize * 0.4
              return (
                <rect
                  key={`d-${i}`}
                  x={x - r / 2}
                  y={y - r / 2}
                  width={r}
                  height={r}
                  fill={fgColor}
                  transform={`rotate(45, ${x}, ${y})`}
                  rx={1}
                />
              )
            })}

        <circle cx={size / 2} cy={size / 2} r={10} fill={bgColor} />
        <Scan className="text-muted/80" style={{ position: 'absolute', top: '50%', left: '50%' }} />
      </svg>
    </div>
  )
}

function ColorPicker({
  label,
  value,
  onChange,
  colors,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  colors: string[]
}) {
  return (
    <div>
      <label className="text-muted/60 mb-2 block text-xs font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={label}
          />
          <div
            className="border-border h-8 w-8 cursor-pointer rounded-lg border transition-transform hover:scale-110"
            style={{ background: value }}
          />
        </div>
        <div className="flex gap-1">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`h-6 w-6 rounded-full border-2 transition-all ${
                value === c ? 'border-foreground scale-110' : 'border-transparent'
              }`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function RecentQRCard({ qr, onSelect }: { qr: (typeof mockQRCodes)[0]; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="hover:bg-surface/30 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
    >
      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
        <Scan className="text-primary h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-medium">{qr.name}</p>
        <p className="text-muted/40 text-xs">{qr.scans.toLocaleString()} scans</p>
      </div>
      <Badge variant="default" className="text-[10px]">
        {qr.url}
      </Badge>
    </button>
  )
}

export default function QRStudioPage() {
  const [fgColor, setFgColor] = useState('#7C3AED')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [pattern, setPattern] = useState<Pattern>('squares')
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>('square')
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('none')
  const [showExport, setShowExport] = useState(false)
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'pdf'>('png')
  const [exporting, setExporting] = useState(false)
  const [logoUploaded, setLogoUploaded] = useState(false)
  const [logoDragOver, setLogoDragOver] = useState(false)
  const [url, setUrl] = useState('nexus.links/summer-sale')

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setShowExport(false)
    }, 1500)
  }

  const resetColors = () => {
    setFgColor('#7C3AED')
    setBgColor('#FFFFFF')
  }

  return (
    <PageLayout>
      <PageHeader title="QR Studio" description="Design and customize QR codes for your links" />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6 lg:col-span-2"
        >
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Display</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <ColorPicker
                label="Foreground"
                value={fgColor}
                onChange={setFgColor}
                colors={presetColors}
              />
              <ColorPicker
                label="Background"
                value={bgColor}
                onChange={setBgColor}
                colors={['#FFFFFF', '#050816', '#0c1224', '#131c34']}
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={resetColors}>
                <RotateCcw className="h-3.5 w-3.5" />
                Reset colors
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Pattern</h3>
            <div className="grid grid-cols-4 gap-2">
              {patterns.map((p) => {
                const Icon = p.icon
                return (
                  <button
                    key={p.id}
                    onClick={() => setPattern(p.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg px-3 py-3 text-xs transition-all ${
                      pattern === p.id
                        ? 'bg-primary/15 text-primary ring-primary/30 ring-1'
                        : 'text-muted/50 hover:bg-surface/30 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {p.label}
                  </button>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Corner Style</h3>
            <div className="grid grid-cols-4 gap-2">
              {cornerStyles.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setCornerStyle(cs.id)}
                  className={`rounded-lg px-3 py-3 text-xs transition-all ${
                    cornerStyle === cs.id
                      ? 'bg-primary/15 text-primary ring-primary/30 ring-1'
                      : 'text-muted/50 hover:bg-surface/30 hover:text-foreground'
                  }`}
                >
                  {cs.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Frame</h3>
            <div className="grid grid-cols-4 gap-2">
              {frameStyles.map((fs) => (
                <button
                  key={fs.id}
                  onClick={() => setFrameStyle(fs.id)}
                  className={`rounded-lg px-3 py-3 text-xs transition-all ${
                    frameStyle === fs.id
                      ? 'bg-primary/15 text-primary ring-primary/30 ring-1'
                      : 'text-muted/50 hover:bg-surface/30 hover:text-foreground'
                  }`}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Logo (Optional)</h3>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setLogoDragOver(true)
              }}
              onDragLeave={() => setLogoDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setLogoDragOver(false)
                setLogoUploaded(true)
              }}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
                logoDragOver
                  ? 'border-primary bg-primary/5'
                  : logoUploaded
                    ? 'border-success/30 bg-success/5'
                    : 'border-border hover:border-border-hover'
              }`}
            >
              {logoUploaded ? (
                <>
                  <Check className="text-success mb-2 h-8 w-8" />
                  <p className="text-foreground text-sm font-medium">Logo uploaded</p>
                  <button
                    onClick={() => setLogoUploaded(false)}
                    className="text-muted/40 hover:text-danger mt-1 text-xs"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <Upload className="text-muted/30 mb-2 h-8 w-8" />
                  <p className="text-muted/50 text-sm">Drop logo here or click to browse</p>
                  <p className="text-muted/30 mt-1 text-xs">PNG, SVG up to 2MB</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Preview</h3>
            <div className="flex justify-center">
              <div className="rounded-2xl bg-white p-4 shadow-xl shadow-black/20">
                <QRPreview
                  fgColor={fgColor}
                  bgColor={bgColor}
                  pattern={pattern}
                  frameStyle={frameStyle}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-surface/20 flex items-center gap-2 rounded-lg px-3 py-2">
                <Link2 className="text-muted/40 h-3.5 w-3.5" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-foreground flex-1 bg-transparent text-xs outline-none"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={() => setShowExport(true)}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="secondary" size="md" onClick={() => {}}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">Recent QR Codes</h3>
            <div className="space-y-1">
              {mockQRCodes.map((qr) => (
                <RecentQRCard key={qr.id} qr={qr} onSelect={() => {}} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !exporting && setShowExport(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="border-border bg-surface w-full max-w-sm rounded-xl border p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Export QR Code</h3>
                <button
                  onClick={() => setShowExport(false)}
                  className="text-muted/40 hover:text-foreground rounded-lg p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-muted/60 mb-2 text-xs font-medium">Format</p>
                <div className="flex gap-2">
                  {(['png', 'svg', 'pdf'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium uppercase transition-all ${
                        exportFormat === fmt
                          ? 'bg-primary text-white'
                          : 'bg-surface-elevated text-muted/50 hover:text-foreground'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-muted/60 mb-2 text-xs font-medium">Size</p>
                <div className="flex gap-2">
                  {['512', '1024', '2048'].map((s) => (
                    <button
                      key={s}
                      className="bg-surface-elevated text-muted/50 hover:text-foreground flex-1 rounded-lg px-4 py-2 text-xs"
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" /> Download {exportFormat.toUpperCase()}
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
