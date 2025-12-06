import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://www.matthewswong.com"
  const lastModified = new Date("2025-02-08")

  // Blog posts
  const blogPosts = [
    { slug: "building-saas-ai-gymbro" },
    { slug: "life-at-swiss-german-university" },
    { slug: "pwc-capture-the-flag" },
  ]

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/education`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/certifications`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/hackathons`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
  ]

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified,
    priority: 0.8,
    changeFrequency: "monthly",
  }))

  return [...mainPages, ...blogPages]
}

