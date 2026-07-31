import { Glow, GradientBackground } from '@nexuslinks/ui'
import { Navbar } from '../sections/Navbar'
import { HeroSection } from '../sections/HeroSection'
import { UrlDemo } from '../sections/UrlDemo'
import { LiveMetrics } from '../sections/LiveMetrics'
import { AnalyticsShowcase } from '../sections/AnalyticsShowcase'
import { FeaturesGrid } from '../sections/FeaturesGrid'
import { WorldMap } from '../sections/WorldMap'
import { DeveloperSection } from '../sections/DeveloperSection'
import { Pricing } from '../sections/Pricing'
import { Testimonials } from '../sections/Testimonials'
import { FAQ } from '../sections/FAQ'
import { FinalCTA } from '../sections/FinalCTA'
import { Footer } from '../sections/Footer'

export default function LandingPage() {
  return (
    <div className="bg-bg relative min-h-screen overflow-hidden">
      <GradientBackground variant="mesh" />
      <Glow color="primary" size="lg" className="left-1/2 top-0 -translate-x-1/2" />
      <Glow color="accent" size="sm" className="bottom-0 right-0" />
      <Glow color="primary" size="sm" className="left-0 top-1/3" />

      <Navbar />
      <HeroSection />
      <UrlDemo />
      <LiveMetrics />
      <AnalyticsShowcase />
      <FeaturesGrid />
      <WorldMap />
      <DeveloperSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
