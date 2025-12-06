import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts and stories from Matthews Wong. Articles about tech, development, and personal experiences.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
