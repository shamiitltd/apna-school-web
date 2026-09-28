/**
 * Centralized Schema.org Structured Data Generators for Apna School
 * Strictly follows Google Search Central and Schema.org guidelines.
 */

const BASE_URL = "https://apnaschool.in";
const ORG_NAME = "Apna School";
const ORG_LOGO = `${BASE_URL}/favicon.png`;

/**
 * Organization Schema
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: ORG_NAME,
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: ORG_LOGO,
    caption: "Apna School Logo",
  },
  description:
    "Apna School is a comprehensive, intuitive school management system empowering schools, educators, and parents with automated admissions, attendance, fees, and examination reports.",
  email: "support@apnaschool.in",
  telephone: "+91-98765-43210",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/ApnaSchoolApp",
    "https://linkedin.com/company/apnaschool",
    "https://instagram.com/apnaschool",
    "https://youtube.com/@apnaschool",
  ],
});

/**
 * WebSite Schema with SearchAction
 */
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: ORG_NAME,
  description: "Modern, easy-to-use school management software for Indian schools.",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

/**
 * SoftwareApplication Schema
 */
export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#software`,
  name: "Apna School Management Software",
  operatingSystem: "Web Browser, Android, iOS (Cloud-Based SaaS)",
  applicationCategory: "BusinessApplication, EducationalApplication",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    category: "Free Trial Available",
    availability: "https://schema.org/InStock",
  },
  description:
    "Cloud-based school management platform featuring student enrollment, daily biometric/manual attendance tracking, fee collection with digital receipts, automated report cards, and parent communication portals.",
  featureList: [
    "Student Information Management",
    "Attendance Tracking & Daily SMS Alerts",
    "Fee Management & Digital Invoicing",
    "Exam Schedules & Automated Report Cards",
    "Teacher & Staff Payroll Management",
    "Parent Portal & Mobile Communication",
  ],
});

/**
 * FAQPage Schema
 */
export const getFAQPageSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Article / BlogPosting Schema
 */
export const getArticleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "Apna School Editorial Team",
  category = "Education",
  wordCount,
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  headline: title,
  description: description,
  image: image ? [image] : [`${BASE_URL}/og-image.png`],
  datePublished: datePublished || "2026-09-01T00:00:00+05:30",
  dateModified: dateModified || datePublished || "2026-09-28T00:00:00+05:30",
  author: {
    "@type": "Person",
    name: authorName,
  },
  publisher: {
    "@type": "Organization",
    name: ORG_NAME,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
    },
  },
  articleSection: category,
  inLanguage: "en-IN",
  ...(wordCount ? { wordCount } : {}),
});

/**
 * BreadcrumbList Schema
 */
export const getBreadcrumbsSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
  })),
});
