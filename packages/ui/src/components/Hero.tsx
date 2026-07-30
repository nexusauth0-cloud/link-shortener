import { Container } from './Container'
import { Button } from './Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <Container className="text-center">
        <div className="animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-gray-100 sm:text-6xl lg:text-7xl">
            Shorten Links.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Amplify Impact.
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Transform your long URLs into powerful, trackable short links. Built for speed, designed
            for scale.
          </p>
        </div>

        <div className="animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
            <Button variant="secondary">View Documentation</Button>
          </div>
        </div>

        <div className="animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
          <p className="mt-6 text-sm text-gray-500">No credit card required. Free tier included.</p>
        </div>
      </Container>
    </section>
  )
}
