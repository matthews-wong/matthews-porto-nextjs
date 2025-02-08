import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

// Define social links for SEO
const socialLinks = [
  { href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
  { href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
];

export const metadata = {
  title: "Matthews Wong Portfolio",
  description: "Welcome to the personal portfolio of Matthews Wong, a Software Engineer and IT Student specializing in Technopreneurship. Passionate about cloud computing, CI/CD pipelines, containerization, and infrastructure automation. Explore my projects, skills, and experiences in the world of IT and software development.",
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
    "Portfolio"
  ],
  author: "Matthews Wong",
  robots: "index, follow",
  openGraph: {
    title: "Matthews Wong - DevOps Engineer & IT Student",
    description: "A showcase of projects, skills, and experiences in DevOps, cloud infrastructure, and IT innovation.",
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
  icons: {
    icon: "/favicon.ico"
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add canonical link to avoid duplicate content issues */}
        <link rel="canonical" href="https://matthewswong.tech" />
        
        {/* Add preconnect for Google Fonts to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        {/* LinkedIn-specific meta tags */}
        <meta property="linkedin:author" content="Matthews Wong" />
        <meta property="linkedin:title" content="Matthews Wong - DevOps Engineer & IT Student" />
        <meta property="linkedin:description" content="A showcase of projects, skills, and experiences in DevOps, cloud infrastructure, and IT innovation. Expert in cloud computing, CI/CD pipelines, containerization, and infrastructure automation." />
        <meta property="linkedin:image" content="https://matthewswong.tech/images/og-image.svg" />
        
        {/* Add structured data for better search engine and LinkedIn understanding */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Matthews Wong",
            "jobTitle": "Software Engineer & IT Student",
            "url": "https://matthewswong.tech",
            "sameAs": socialLinks.map(link => link.href),
            "description": "A passionate Software Engineer and IT Student specializing in Technopreneurship, with expertise in cloud computing, CI/CD pipelines, containerization, and infrastructure automation.",
            "alumniOf": {
              "@type": "University",
              "name": "Swiss German University"
            },
            "knowsAbout": [
              "DevOps",
              "Cloud Computing",
              "CI/CD",
              "Kubernetes",
              "Infrastructure as Code",
              "Software Engineering",
              "Automation"
            ],
            "workLocation": {
              "@type": "Internship",
              "address": {
                "@type": "45131",
                "addressCountry": "Indonesia"
              }
            },
            "memberOf": [
              {
                "@type": "Organization",
                "name": "GitHub",
                "url": "https://github.com/MatthewsWongOfficial"
              },
              {
                "@type": "Organization",
                "name": "LinkedIn",
                "url": "https://www.linkedin.com/in/matthewswong"
              }
            ]
          })}
        </script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}