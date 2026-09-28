import { Hero } from "../components/Hero";
import { HomeFeatures } from "../components/HomeFeatures";
import { HomeMid } from "../components/HomeMid";
import { Three_Steps } from "../components/Three_Steps";
import { LaunchOffer } from "../components/LaunchOffer";
import { Footer } from "../components/Footer";
import { NewsletterHome } from "../components/NewsletterHome";
import { SEOHead } from "../components/SEOHead";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
} from "../utils/seoSchemas";

export const Home = () => {
  const structuredData = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getSoftwareApplicationSchema(),
  ];

  return (
    <>
      <SEOHead
        title="Simple School Management Software for Modern Schools"
        description="Apna School is an all-in-one, intuitive school management system designed for Indian schools. Simplify student records, fee collection, attendance tracking, and parent communication."
        canonicalUrl="https://apnaschool.in/"
        structuredData={structuredData}
      />
      <Hero />
      <HomeFeatures />
      <HomeMid />
      <Three_Steps />
      <LaunchOffer />
      <NewsletterHome />
      <Footer />
    </>
  );
};