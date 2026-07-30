import { useState, useEffect } from "react"
import { Navbar } from "./sections/Navbar"
import { HeroSection } from "./sections/HeroSection"
import { InteractiveDemo } from "./sections/InteractiveDemo"
import { StatsSection } from "./sections/StatsSection"
import { DashboardPreview } from "./sections/DashboardPreview"
import { FeaturesSection } from "./sections/FeaturesSection"
import { HowItWorks } from "./sections/HowItWorks"
import { Testimonials } from "./sections/Testimonials"
import { PricingSection } from "./sections/PricingSection"
import { FAQSection } from "./sections/FAQSection"
import { FinalCTA } from "./sections/FinalCTA"
import { Footer } from "./sections/Footer"

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [isVisible])

  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-foreground antialiased selection:bg-primary/30 selection:text-primary-lighter">
      <div
        className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, color-mix(in srgb, var(--color-secondary) 4%, transparent), transparent 40%)`,
        }}
      />

      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <InteractiveDemo />
        <StatsSection />
        <DashboardPreview />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
