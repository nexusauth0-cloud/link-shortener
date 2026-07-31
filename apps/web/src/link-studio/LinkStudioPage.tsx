'use client'

import { useState } from 'react'
import { PageLayout } from '../shell/components/PageLayout'
import { CreateLinkPanel } from './panels/CreateLinkPanel'
import { PreviewPanel } from './panels/PreviewPanel'
import { IntelligencePanel } from './panels/IntelligencePanel'
import { Link2, PanelRightClose, PanelRightOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LinkStudioPage() {
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)

  return (
    <PageLayout className="h-[calc(100vh-3.5rem)] overflow-hidden p-0">
      <div className="flex h-full flex-col">
        <div className="border-border/10 flex items-center justify-between border-b px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeftOpen(!leftOpen)}
              className="text-muted/50 hover:bg-surface/50 hover:text-foreground rounded-lg p-1.5 transition-colors"
              aria-label={leftOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {leftOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <Link2 className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm font-semibold">Link Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRightOpen(!rightOpen)}
              className="text-muted/50 hover:bg-surface/50 hover:text-foreground rounded-lg p-1.5 transition-colors"
              aria-label={rightOpen ? 'Close panel' : 'Open panel'}
            >
              {rightOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <AnimatePresence>
            {leftOpen && (
              <motion.div
                key="left"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="border-border/10 shrink-0 overflow-hidden border-r"
              >
                <CreateLinkPanel />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-hidden">
            <PreviewPanel />
          </div>

          <AnimatePresence>
            {rightOpen && (
              <motion.div
                key="right"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="border-border/10 shrink-0 overflow-hidden border-l"
              >
                <IntelligencePanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  )
}
