import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { Metadata } from "next";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://matthewswong.tech";

const socialLinks = [
  { href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
  { href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Matthews Wong Portfolio - Software Engineer",
    template: "%s | Matthews Wong Portfolio"
  },
  description: "Innovative Software engineer and IT student specializing in Automation, Web Development, CI/CD, and infrastructure automation. Explore cutting-edge tech solutions and projects.",
  applicationName: "Matthews Wong Portfolio",
  authors: [{ name: "Matthews Wong", url: BASE_URL }],
  generator: "Next.js",
  keywords: [
    "DevOps", "Cloud Computing", "CI/CD", "Ansible", 
    "Infrastructure as Code", "Software Engineering", 
    "Technopreneurship", "Automation", "Docker", "AWS"
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
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Matthews Wong - Software Engineer & IT Student",
    description: "Innovative portfolio showcasing Innovative Web Applications, DevOps, and software engineering expertise.",
    url: BASE_URL,
    siteName: "Matthews Wong Portfolio",
    images: [{
      url: "/og-image.svg",
      width: 1200,
      height: 630,
      alt: "Matthews Wong Portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthews Wong - DevOps & Software Engineering",
    description: "Innovative Software engineer and IT student",
    images: ["/og-image.svg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512"
      }
    ]
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Matthews Wong",
              "jobTitle": "Software Engineer & IT Student",
              "url": BASE_URL,
              "sameAs": socialLinks.map(link => link.href),
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Swiss German University"
              }
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}