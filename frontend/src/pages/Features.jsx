import { FeatureHero } from "../components/FeatureHero";
import { FeaturesGrid } from "../components/FeaturesGrid";
import { FeatureDashboard } from "../components/FeatureDashboard";
import { WhyApnaSchool } from "../components/WhyApnaSchool";
import { ReadyCTA } from "../components/ReadyCTA";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { getBreadcrumbsSchema, getSoftwareApplicationSchema } from "../utils/seoSchemas";

export const Features = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
  ];

  const structuredData = [
    getSoftwareApplicationSchema(),
    getBreadcrumbsSchema(breadcrumbs),
  ];

  return (
    <main>
      <SEOHead
        title="Key Features | Student, Fee, and Attendance Management System"
        description="Explore the full suite of Apna School features: smart student database, daily attendance logging, digital fee invoicing, progress card generation, and automated parent SMS alerts."
        canonicalUrl="https://apnaschool.in/features"
        structuredData={structuredData}
      />
      <FeatureHero />
      <FeaturesGrid />
      <FeatureDashboard />
      <WhyApnaSchool />
      <ReadyCTA />
      <Footer />
    </main>
  );
};