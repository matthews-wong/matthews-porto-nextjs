import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Matthews Wong",
  description: "Portfolio of projects by Matthews Wong. Web development, DevOps, and AI projects showcasing technical skills.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
