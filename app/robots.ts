import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://www.matthewswong.tech"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

