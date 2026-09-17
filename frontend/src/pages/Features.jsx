import { FeatureHero } from "../components/FeatureHero";
import { FeaturesGrid } from "../components/FeaturesGrid";
import { FeatureDashboard } from "../components/FeatureDashboard";
import { WhyApnaSchool } from "../components/WhyApnaSchool";
import { ReadyCTA } from "../components/ReadyCTA";
import { Footer } from "../components/Footer";

export const Features = () => {
  return (
    <main>
      <FeatureHero />
      <FeaturesGrid />
      <FeatureDashboard />
      <WhyApnaSchool />
      <ReadyCTA />
      <Footer />
    </main>
  );
};