import type { Metadata } from "next"

const blogTitles: Record<string, { title: string; description: string }> = {
  "building-saas-ai-gymbro": {
    title: "Building My First SaaS: AI Gym Bro - Matthews Wong",
    description: "The journey of building an AI-powered fitness companion from scratch.",
  },
  "life-at-swiss-german-university": {
    title: "My Experience at Swiss German University - Matthews Wong",
    description: "A reflection on studying Information Technology at SGU.",
  },
  "pwc-capture-the-flag": {
    title: "Competing in PwC Capture The Flag - Matthews Wong",
    description: "Diving into cybersecurity challenges at PwC's annual CTF competition.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = blogTitles[slug]

  if (!blog) {
    return {
      title: "Blog Post - Matthews Wong",
      description: "Blog post by Matthews Wong",
    }
  }

  return {
    title: blog.title,
    description: blog.description,
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
