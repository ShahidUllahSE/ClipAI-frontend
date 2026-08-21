import {
  AiServices,
  Benefits,
  FinalCta,
  Hero,
  HowItWorks,
  Pricing,
  Tools,
  TrustStrip,
} from '@/features/landing'

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AiServices />
      <Tools />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FinalCta />
    </>
  )
}
