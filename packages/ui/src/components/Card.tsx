import type { ReactNode } from 'react'

interface CardProps {
  title: string
  description: string
  icon: ReactNode
}

export function Card({ title, description, icon }: CardProps) {
  return (
    <div className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:bg-gray-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 transition-colors group-hover:bg-blue-600/20">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-100">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  )
}
