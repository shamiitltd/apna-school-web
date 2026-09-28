import { HowItWorksHero } from "../components/HowItWorksHero";
import { HowItWorksSteps } from "../components/HowItWorksSteps";
import { HowItWorksDrive } from "../components/HowItWorksDrive";
import { ReadyCTA } from "../components/ReadyCTA";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema } from "../utils/seoSchemas";

export const HowItWorks = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "How It Works", url: "/how-it-works" },
  ];

  return (
    <main>
      <SEOHead
        title="How It Works | 3 Easy Steps to Modernize Your School Operations"
        description="Learn how Apna School works in 3 simple steps: create your institution profile, bulk-import your student data, and automate daily fee, attendance, and exam management effortlessly."
        canonicalUrl="https://apnaschool.in/how-it-works"
        structuredData={getBreadcrumbsSchema(breadcrumbs)}
      />
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksDrive />
      <ReadyCTA />
      <Footer />
    </main>
  );
};

