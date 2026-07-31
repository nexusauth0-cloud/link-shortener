import { AppIcon } from '@nexuslinks/ui'

export function OGImage() {
  return (
    <div className="flex h-[630px] w-[1200px] flex-col items-center justify-center bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
      <div className="relative flex flex-col items-center">
        <AppIcon size={120} />
        <h1 className="mt-6 text-6xl font-bold tracking-tight text-white">
          Nexus{' '}
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] bg-clip-text text-transparent">
            Links
          </span>
        </h1>
        <p className="mt-4 text-xl text-[#94A3B8]">
          Enterprise link management. Developer-first. Premium by design.
        </p>
      </div>
    </div>
  )
}
