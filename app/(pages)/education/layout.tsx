import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Education - Matthews Wong",
  description: "Educational background and academic achievements of Matthews Wong. Information Technology student at Swiss German University.",
}

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
