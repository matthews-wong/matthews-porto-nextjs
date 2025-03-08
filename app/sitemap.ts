// Define the sitemap entry type
type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: "yearly" | "monthly" | "weekly" | "daily" | "hourly" | "always" | "never"
  priority?: number
  images?: {
    loc: string
    title?: string
    caption?: string
  }[]
}

import type { MetadataRoute } from "next"

// Extend the sitemap types to include image entries
type SitemapImage = {
  loc: string
  title?: string
  caption?: string
}

type ExtendedSitemapEntry = MetadataRoute.Sitemap[0] & {
  images?: SitemapImage[]
}

export default function sitemap(): SitemapEntry[] {
  const BASE_URL = "https://www.matthewswong.tech"
  const lastModified = new Date("2025-02-08")

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      priority: 1.0,
      changeFrequency: "weekly",
      images: [
        {
          loc: `${BASE_URL}/images/og-image.svg`,
          title: "Matthews Wong - Software Engineer Portfolio",
          caption: "Professional portfolio showcasing software engineering, AI, and DevOps projects",
        },
        {
            loc: `${BASE_URL}/images/profile-pic.avif`,
            title: "Matthews Wong - Software Engineer Portfolio",
            caption: "A Software Engineer based in Indonesia",
          },
      ],
    },
    {
      url: `${BASE_URL}/#!about`,
      lastModified,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/#education`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/#!experience`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/#!certifications`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${BASE_URL}/#!hackathon`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
      images: [
        {
          loc: `${BASE_URL}/images/hackathon/PWC-Hackathon.jpg`,
          title: "PwC Capture the Flag - Hackaday Event",
        },
       
        {
          loc: `${BASE_URL}/images/hackathon/AI-Hackathon1.jpg`,
          title: "AI Hackathon Held By AI Indonesia Society",
        },
        {
          loc: `${BASE_URL}/images/hackathon/Pwc-hackathon-2024.jpg`,
          title: "PwC Capture the Flag - Hackaday Event",
        },
        {
          loc: `${BASE_URL}/images/hackathon/commsult-software-workshop.jpeg`,
          title: "Software Development Workshop held by Commsult",
        },
        {
          loc: `${BASE_URL}/images/hackathon/web3-networking-event.jpeg`,
          title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
        },
        {
          loc: `${BASE_URL}/images/Blockchain1.jpeg`,
          title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
        },
        {
          loc: `${BASE_URL}/images/Symposium1.jpeg`,
          title: "SGU IT Symposium & Project Showcase",
        },
        {
          loc: `${BASE_URL}/images/Symposium2.jpeg`,
          title: "SGU IT Symposium & Project Showcase",
        },
        {
          loc: `${BASE_URL}/images/Symposium3.jpeg`,
          title: "SGU IT Symposium & Project Showcase",
        },
      ],
    },
    {
      url: `${BASE_URL}/#!projects`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${BASE_URL}/#!contact`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    },
  ]
}

