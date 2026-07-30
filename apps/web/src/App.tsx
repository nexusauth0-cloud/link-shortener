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
import { Footer } from "@nexuslinks/ui"

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-foreground antialiased selection:bg-primary/20 selection:text-primary-light">
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
