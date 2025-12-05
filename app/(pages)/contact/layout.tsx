import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Matthews Wong",
  description: "Get in touch with Matthews Wong. Contact form and social links for collaboration and opportunities.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
