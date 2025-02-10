import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

const socialLinks = [
  { href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
  { href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
];

export const metadata = {
  title: "Matthews Wong Portfolio",
  description:
    "Welcome to the personal portfolio of Matthews Wong, a Software Engineer and IT Student specializing in Technopreneurship. Passionate about cloud computing, CI/CD pipelines, containerization, and infrastructure automation. Explore my projects, skills, and experiences in the world of IT and software development.",
  keywords: [
    "DevOps",
    "Cloud Computing",
    "CI/CD",
    "Ansible",
    "Infrastructure as Code",
    "IT Student",
    "Technopreneurship",
    "Software Engineering",
    "Automation",
    "Portfolio",
  ],
  author: "Matthews Wong",
  robots: "index, follow",
  openGraph: {
    title: "Matthews Wong - DevOps Engineer & IT Student",
    description:
      "A showcase of projects, skills, and experiences in DevOps, cloud infrastructure, and IT innovation.",
    type: "website",
    url: "https://matthewswong.tech",
    images: [
      {
        url: "https://matthewswong.tech/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Matthews Wong Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "Matthews Wong - DevOps Engineer & IT Student",
    description:
      "A showcase of projects, skills, and experiences in DevOps, cloud infrastructure, and IT innovation.",
    image: "https://matthewswong.tech/images/og-image.svg",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://matthewswong.tech" />

        {/* Preconnect & Preload Fonts for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          as="style"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        {/* OpenGraph for Facebook & LinkedIn */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Matthews Wong",
              "jobTitle": "Software Engineer & IT Student",
              "url": "https://matthewswong.tech",
              "sameAs": socialLinks.map((link) => link.href),
              "description":
                "A passionate Software Engineer and IT Student specializing in Technopreneurship, with expertise in cloud computing, CI/CD pipelines, containerization, and infrastructure automation.",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Swiss German University",
              },
              "knowsAbout": [
                "DevOps",
                "Cloud Computing",
                "CI/CD",
                "Kubernetes",
                "Infrastructure as Code",
                "Software Engineering",
                "Automation",
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Indonesia",
                "postalCode": "45131",
                "addressCountry": "ID",
              },
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "GitHub",
                  "url": "https://github.com/MatthewsWongOfficial",
                },
                {
                  "@type": "Organization",
                  "name": "LinkedIn",
                  "url": "https://www.linkedin.com/in/matthewswong",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
