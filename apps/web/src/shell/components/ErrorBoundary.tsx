import { Component, type ErrorInfo, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex max-w-sm flex-col items-center text-center"
          >
            <div className="bg-danger/10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
              <AlertTriangle className="text-danger h-6 w-6" />
            </div>
            <h2 className="text-foreground mb-1 text-lg font-semibold">Something went wrong</h2>
            <p className="text-muted/60 mb-4 text-sm">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Try again
            </button>
            {import.meta.env.DEV && this.state.error && (
              <pre className="bg-surface-elevated text-muted/60 mt-4 max-w-full overflow-x-auto rounded-lg p-3 text-left text-xs">
                {this.state.error.message}
              </pre>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
