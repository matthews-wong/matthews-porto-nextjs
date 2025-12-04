import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getLocale } from "next-intl/server"
import { ThemeProvider } from "@/lib/theme-provider"
import Header from "./components/Header"
import Chatbot from "./components/Chatbot"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-jakarta",
})

const BASE_URL = "https://matthewswong.tech"

const socialLinks = [
  { href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
  { href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
]

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Matthews Wong - Software Engineer",
    template: "%s | Matthews Wong",
  },
  description:
    "Matthews Wong - Innovative Software Engineer and IT student from Indonesia specializing in DevOps, Web Development, and AI. Building technology solutions that make an impact.",
  applicationName: "Matthews Wong Portfolio",
  authors: [{ name: "Matthews Wong", url: BASE_URL }],
  generator: "Next.js",
  keywords: [
    "DevOps",
    "Cloud Computing",
    "CI/CD",
    "Software Engineering",
    "Web Development",
    "Full Stack Developer",
    "Indonesia Developer",
    "Matthews Wong",
    "Tech Portfolio",
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
    locale: "en_US",
    title: "Matthews Wong - Software Engineer",
    description:
      "Innovative portfolio showcasing Web Applications, DevOps, and software engineering expertise.",
    url: BASE_URL,
    siteName: "Matthews Wong Portfolio",
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Matthews Wong - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthews Wong - Software Engineer",
    description:
      "Innovative Software Engineer and IT student from Indonesia.",
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
  },
  manifest: "/site.webmanifest",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={jakarta.variable} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="id" href={`${BASE_URL}?locale=id`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
                "Software Engineering",
                "Web Development",
                "Automation",
                "Docker",
                "AWS",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Commsult Indonesia",
              },
              nationality: {
                "@type": "Country",
                name: "Indonesia",
              },
            }),
          }}
        />
      </head>
      <body className={`${jakarta.className} antialiased min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Chatbot />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}