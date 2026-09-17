import { HowItWorksHero } from "../components/HowItWorksHero";
import { HowItWorksSteps } from "../components/HowItWorksSteps";
import { HowItWorksDrive } from "../components/HowItWorksDrive";
import { ReadyCTA } from "../components/ReadyCTA";
import { Footer } from "../components/Footer";

export const HowItWorks = () => {
  return (
    <main>
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksDrive />
      <ReadyCTA />
      <Footer />
    </main>
  );
};
