import BlogPost from "../models/BlogPost.js";

const SITE_URL = "https://apnaschool.in";

export const getDynamicSitemap = async (req, res) => {
  try {
    const publishedBlogs = await BlogPost.find({ status: "Published" })
      .select("_id title updatedAt createdAt")
      .sort({ updatedAt: -1 });

    const staticRoutes = [
      { url: "/", changefreq: "weekly", priority: "1.0", lastmod: new Date().toISOString() },
      { url: "/features", changefreq: "monthly", priority: "0.9", lastmod: new Date().toISOString() },
      { url: "/how-it-works", changefreq: "monthly", priority: "0.8", lastmod: new Date().toISOString() },
      { url: "/pricing", changefreq: "monthly", priority: "0.8", lastmod: new Date().toISOString() },
      { url: "/about", changefreq: "monthly", priority: "0.7", lastmod: new Date().toISOString() },
      { url: "/mission", changefreq: "monthly", priority: "0.7", lastmod: new Date().toISOString() },
      { url: "/careers", changefreq: "monthly", priority: "0.6", lastmod: new Date().toISOString() },
      { url: "/help-center", changefreq: "monthly", priority: "0.7", lastmod: new Date().toISOString() },
      { url: "/video-tutorials", changefreq: "monthly", priority: "0.6", lastmod: new Date().toISOString() },
      { url: "/updates", changefreq: "weekly", priority: "0.7", lastmod: new Date().toISOString() },
      { url: "/faq", changefreq: "monthly", priority: "0.7", lastmod: new Date().toISOString() },
      { url: "/privacy", changefreq: "monthly", priority: "0.5", lastmod: new Date().toISOString() },
      { url: "/refund", changefreq: "monthly", priority: "0.5", lastmod: new Date().toISOString() },
      { url: "/blog", changefreq: "daily", priority: "0.9", lastmod: new Date().toISOString() },
      { url: "/contact", changefreq: "monthly", priority: "0.6", lastmod: new Date().toISOString() },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Static pages
    for (const route of staticRoutes) {
      xml += `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod.split("T")[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    }

    // Dynamic Blog Posts
    for (const blog of publishedBlogs) {
      const lastModDate = (blog.updatedAt || blog.createdAt || new Date()).toISOString().split("T")[0];
      xml += `  <url>
    <loc>${SITE_URL}/blog/${blog._id}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Error generating sitemap");
  }
};
