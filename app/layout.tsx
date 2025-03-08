import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const BASE_URL = "https://matthewswong.tech"

const socialLinks = [
  { href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
  { href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
]

// Move themeColor to viewport export
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Matthews Wong Portfolio - Software Engineer",
    template: "%s | Matthews Wong Portfolio",
  },
  description:
    "Matthews Wong - Innovative Software Engineer and IT student from Indonesia specializing in Automation, Web Development, CI/CD, and infrastructure automation. Part of Anak IT Indonesia community. Explore cutting-edge tech solutions and projects.",
  applicationName: "Matthews Wong Portfolio",
  authors: [{ name: "Matthews Wong", url: BASE_URL }],
  generator: "Next.js",
  keywords: [
    "DevOps",
    "Cloud Computing",
    "CI/CD",
    "Ansible",
    "Infrastructure as Code",
    "Software Engineering",
    "Technopreneurship",
    "Automation",
    "Docker",
    "AWS",
    "Matthews Wong",
    "Web Developer",
    "Full Stack Developer",
    "Indonesia Developer",
    "Tech Portfolio",
    "Anak IT Indonesia",
    "Software Engineer Indonesia",
    "Indonesian Developer",
    "IT Professional Indonesia",
    "Tech Talent Indonesia",
    "Indonesian Software Expert",
    "Jakarta Developer",
    "Southeast Asia Tech",
    "ASEAN Developer",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Matthews Wong",
  publisher: "Matthews Wong",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID", // Changed to Indonesian locale
    title: "Matthews Wong - Software Engineer & IT Student Indonesia",
    description:
      "Innovative portfolio showcasing Web Applications, DevOps, and software engineering expertise from an Anak IT Indonesia professional.",
    url: BASE_URL,
    siteName: "Matthews Wong Portfolio",
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Matthews Wong Portfolio - Anak IT Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthews Wong - DevOps & Software Engineering Indonesia",
    description:
      "Innovative Software engineer and IT student from Indonesia. Anak IT Indonesia professional specializing in modern web technologies.",
    images: [`${BASE_URL}/og-image.svg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Matthews Wong",
              jobTitle: "Software Engineer & IT Student",
              url: BASE_URL,
              sameAs: socialLinks.map((link) => link.href),
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Swiss German University",
              },
              knowsAbout: [
                "DevOps",
                "Cloud Computing",
                "CI/CD",
                "Ansible",
                "Infrastructure as Code",
                "Software Engineering",
                "Web Development",
                "Automation",
                "Docker",
                "AWS",
                "Anak IT Indonesia",
              ],
              worksFor: {
                "@type": "Organization",
                name: "commsult Indonesia", 
              },
              nationality: {
                "@type": "Country",
                name: "Indonesia",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "Indonesia",
              },
              memberOf: [
                {
                  "@type": "Organization",
                  name: "Redhat Student Organization",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

