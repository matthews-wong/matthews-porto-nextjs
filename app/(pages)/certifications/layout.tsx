import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications and credentials earned by Matthews Wong in DevOps, Cloud, and Software Development.",
}

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
