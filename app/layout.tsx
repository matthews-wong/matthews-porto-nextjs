import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Matthews Wong Portfolio",
  description: "Welcome to the personal portfolio of Matthews Wong, a DevOps Engineer and IT Student specializing in Technopreneurship. Passionate about cloud computing, CI/CD pipelines, containerization, and infrastructure automation. Explore my projects, skills, and experiences in the world of IT and software development.",
  keywords: [
    "DevOps",
    "Cloud Computing",
    "CI/CD",
    "Kubernetes",
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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
