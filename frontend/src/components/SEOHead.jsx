import { useEffect } from "react";

const SITE_URL = "https://apnaschool.in";
const DEFAULT_TITLE = "Apna School | Simple & Powerful School Management Software";
const DEFAULT_DESC = "Apna School is a comprehensive, modern school management system designed to streamline student admissions, attendance, fees, exams, and parent-teacher communication effortlessly.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage,
  noIndex = false,
  structuredData = null,
  articleData = null,
}) => {
  const finalTitle = title ? `${title} | Apna School` : DEFAULT_TITLE;
  const finalDesc = description || DEFAULT_DESC;
  const finalImage = ogImage || DEFAULT_IMAGE;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const finalCanonical = canonicalUrl || `${SITE_URL}${currentPath}`;

  useEffect(() => {
    // 1. Update Title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMeta = (nameAttr, nameVal, content) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, nameVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Primary Meta Tags
    setMeta("name", "description", finalDesc);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("name", "googlebot", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("name", "bingbot", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large");
    
    // 3. Open Graph / Facebook
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", finalDesc);
    setMeta("property", "og:url", finalCanonical);
    setMeta("property", "og:image", finalImage);
    setMeta("property", "og:site_name", "Apna School");
    setMeta("property", "og:locale", "en_IN");

    // 4. Twitter / X Cards
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", finalDesc);
    setMeta("name", "twitter:image", finalImage);
    setMeta("name", "twitter:site", "@ApnaSchoolApp");

    // 5. Article specific Open Graph if type is article
    if (ogType === "article" && articleData) {
      if (articleData.publishedTime) setMeta("property", "article:published_time", articleData.publishedTime);
      if (articleData.modifiedTime) setMeta("property", "article:modified_time", articleData.modifiedTime);
      if (articleData.author) setMeta("property", "article:author", articleData.author);
      if (articleData.section) setMeta("property", "article:section", articleData.section);
    }

    // 6. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", finalCanonical);

    // 7. Structured Data (JSON-LD)
    const existingScript = document.getElementById("json-ld-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "json-ld-structured-data";
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up script on unmount
      const s = document.getElementById("json-ld-structured-data");
      if (s) s.remove();
    };
  }, [finalTitle, finalDesc, finalCanonical, finalImage, ogType, noIndex, structuredData, articleData]);

  return null;
};
