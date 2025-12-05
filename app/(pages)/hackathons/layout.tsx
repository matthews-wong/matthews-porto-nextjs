import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hackathons - Matthews Wong",
  description: "Hackathons and tech events participated by Matthews Wong. Competitions and achievements in the tech community.",
}

export default function HackathonsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
