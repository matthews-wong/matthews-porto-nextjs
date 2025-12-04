"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const t = useTranslations()

  const blogMeta: Record<string, { image: string; date: string; readTime: string; translationKey: string }> = {
    "building-saas-ai-gymbro": {
      image: "/my-product.png",
      date: `${t("common.november")} 2024`,
      readTime: `5 ${t("common.minRead")}`,
      translationKey: "aiGymbro",
    },
    "life-at-swiss-german-university": {
      image: "/images/sgu-location.webp",
      date: `${t("common.october")} 2024`,
      readTime: `4 ${t("common.minRead")}`,
      translationKey: "sgu",
    },
    "pwc-capture-the-flag": {
      image: "/images/hackathon/PWC-Hackathon.jpg",
      date: `${t("common.september")} 2024`,
      readTime: `4 ${t("common.minRead")}`,
      translationKey: "ctf",
    },
  }

  const meta = blogMeta[slug]

  if (!meta) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t("blog.postNotFound")}
          </h1>
          <Link href="/blog" className="text-[var(--accent-primary)] hover:underline">
            {t("blog.backToBlog")}
          </Link>
        </div>
      </main>
    )
  }

  const title = t(`blog.posts.${meta.translationKey}.title`)
  const category = t(`blog.posts.${meta.translationKey}.category`)

  // Render content based on slug
  const renderContent = () => {
    if (slug === "building-saas-ai-gymbro") {
      return (
        <>
          <p>{t("blog.posts.aiGymbro.content.intro")}</p>

          <h2>{t("blog.posts.aiGymbro.content.sparkTitle")}</h2>
          <p>{t("blog.posts.aiGymbro.content.sparkContent")}</p>

          <h2>{t("blog.posts.aiGymbro.content.techStackTitle")}</h2>
          <p>{t("blog.posts.aiGymbro.content.techStackIntro")}</p>
          <ul>
            <li><strong>Next.js</strong> for the frontend and API routes</li>
            <li><strong>TypeScript</strong> for type safety across the codebase</li>
            <li><strong>Tailwind CSS</strong> for rapid UI development</li>
            <li><strong>OpenAI API</strong> for the conversational AI capabilities</li>
            <li><strong>Vercel</strong> for seamless deployment and hosting</li>
          </ul>

          <h2>{t("blog.posts.aiGymbro.content.challengesTitle")}</h2>
          <p>{t("blog.posts.aiGymbro.content.challengesIntro")}</p>
          <ul>
            <li><strong>Prompt Engineering:</strong> Getting the AI to give consistent, helpful, and safe fitness advice took countless iterations</li>
            <li><strong>User Experience:</strong> Making the interface intuitive enough that users could get value within seconds of landing on the site</li>
            <li><strong>Performance:</strong> Ensuring fast response times even with AI-generated content</li>
          </ul>

          <h2>{t("blog.posts.aiGymbro.content.lessonsTitle")}</h2>
          <p>{t("blog.posts.aiGymbro.content.lessonsIntro")}</p>
          <ul>
            <li><strong>Start small, iterate fast:</strong> My first version was extremely basic, but it helped me validate the idea quickly</li>
            <li><strong>Listen to users:</strong> Every piece of feedback is gold. Users showed me features I never would have thought of</li>
            <li><strong>Ship imperfect:</strong> Waiting for perfection is the enemy of progress. Launch, learn, improve</li>
          </ul>

          <h2>{t("blog.posts.aiGymbro.content.whatsNextTitle")}</h2>
          <p>{t("blog.posts.aiGymbro.content.whatsNextContent")}</p>

          <p>
            {t("blog.posts.aiGymbro.content.cta")}{" "}
            <a href="https://www.aigymbro.web.id" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
              aigymbro.web.id
            </a>
          </p>
        </>
      )
    }

    if (slug === "life-at-swiss-german-university") {
      return (
        <>
          <p>{t("blog.posts.sgu.content.intro")}</p>

          <h2>{t("blog.posts.sgu.content.campusTitle")}</h2>
          <p>{t("blog.posts.sgu.content.campusContent1")}</p>
          <p>{t("blog.posts.sgu.content.campusContent2")}</p>

          <h2>{t("blog.posts.sgu.content.jackTitle")}</h2>
          <p>{t("blog.posts.sgu.content.jackContent1")}</p>
          <p>{t("blog.posts.sgu.content.jackContent2")}</p>
          <p>{t("blog.posts.sgu.content.jackContent3")}</p>

          <h2>{t("blog.posts.sgu.content.depthTitle")}</h2>
          <p>{t("blog.posts.sgu.content.depthIntro")}</p>
          <ul>
            <li><strong>Full-stack Web Development:</strong> Building complete applications from frontend to backend</li>
            <li><strong>DevOps & Automation:</strong> Making deployment and operations seamless</li>
            <li><strong>AI & Machine Learning:</strong> Creating intelligent applications</li>
          </ul>
          <p>{t("blog.posts.sgu.content.depthConclusion")}</p>

          <h2>{t("blog.posts.sgu.content.academicTitle")}</h2>
          <p>{t("blog.posts.sgu.content.academicContent")}</p>
          <p>{t("blog.posts.sgu.content.coursesIntro")}</p>
          <ul>
            <li><strong>Software Engineering:</strong> Where I learned the discipline of building maintainable, scalable software</li>
            <li><strong>Database Systems:</strong> Understanding how data flows and is stored in modern applications</li>
            <li><strong>Web Development:</strong> Building full-stack applications from scratch</li>
            <li><strong>AI & Machine Learning:</strong> Exploring the cutting-edge of technology</li>
          </ul>

          <h2>{t("blog.posts.sgu.content.beyondTitle")}</h2>
          <p>{t("blog.posts.sgu.content.beyondContent1")}</p>
          <p>{t("blog.posts.sgu.content.beyondContent2")}</p>

          <h2>{t("blog.posts.sgu.content.lessonTitle")}</h2>
          <p>{t("blog.posts.sgu.content.lessonContent1")}</p>
          <p>{t("blog.posts.sgu.content.lessonContent2")}</p>
        </>
      )
    }

    if (slug === "pwc-capture-the-flag") {
      return (
        <>
          <p>{t("blog.posts.ctf.content.intro")}</p>

          <h2>{t("blog.posts.ctf.content.whatIsTitle")}</h2>
          <p>{t("blog.posts.ctf.content.whatIsContent")}</p>
          <p>{t("blog.posts.ctf.content.categoriesIntro")}</p>
          <ul>
            <li><strong>Web Exploitation:</strong> Finding vulnerabilities in web applications</li>
            <li><strong>Cryptography:</strong> Breaking encryption and decoding messages</li>
            <li><strong>Reverse Engineering:</strong> Analyzing binaries to understand their behavior</li>
            <li><strong>Forensics:</strong> Investigating digital artifacts and recovering data</li>
            <li><strong>OSINT:</strong> Open-source intelligence gathering</li>
          </ul>

          <h2>{t("blog.posts.ctf.content.pwcTitle")}</h2>
          <p>{t("blog.posts.ctf.content.pwcContent1")}</p>
          <p>{t("blog.posts.ctf.content.pwcContent2")}</p>

          <h2>{t("blog.posts.ctf.content.challengesTitle")}</h2>
          <p>{t("blog.posts.ctf.content.challengesContent1")}</p>
          <p>{t("blog.posts.ctf.content.challengesContent2")}</p>

          <h2>{t("blog.posts.ctf.content.takeawaysTitle")}</h2>
          <p>{t("blog.posts.ctf.content.takeawaysIntro")}</p>
          <ul>
            <li><strong>Think like an attacker:</strong> To defend systems, you need to understand how they can be exploited</li>
            <li><strong>Documentation is key:</strong> Keeping notes on your approach helps when you hit dead ends</li>
            <li><strong>Teamwork matters:</strong> Different perspectives can crack problems that seem impossible alone</li>
            <li><strong>Stay humble:</strong> There's always more to learn in cybersecurity</li>
          </ul>

          <h2>{t("blog.posts.ctf.content.pathTitle")}</h2>
          <p>{t("blog.posts.ctf.content.pathContent1")}</p>
          <p>{t("blog.posts.ctf.content.pathContent2")}</p>

          <h2>{t("blog.posts.ctf.content.adviceTitle")}</h2>
          <p>{t("blog.posts.ctf.content.adviceIntro")}</p>
          <ul>
            <li>Start with beginner-friendly platforms like PicoCTF or OverTheWire</li>
            <li>Learn the fundamentals of networking, programming, and operating systems</li>
            <li>Join a team or community—learning with others accelerates growth</li>
            <li>Don't be afraid to fail—every failed attempt teaches you something</li>
            <li>Have fun! CTF is meant to be challenging but enjoyable</li>
          </ul>
          <p>{t("blog.posts.ctf.content.conclusion")}</p>
        </>
      )
    }

    return null
  }

  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/blog"
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Category */}
          <div className="mb-4">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
            >
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {meta.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {meta.readTime}
            </span>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={meta.image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none"
            style={{ 
              '--tw-prose-body': 'var(--text-secondary)',
              '--tw-prose-headings': 'var(--text-primary)',
              '--tw-prose-links': 'var(--accent-primary)',
              '--tw-prose-bold': 'var(--text-primary)',
              '--tw-prose-bullets': 'var(--text-secondary)',
            } as React.CSSProperties}
          >
            <style jsx global>{`
              .prose h2 {
                color: var(--text-primary);
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose p {
                color: var(--text-secondary);
                line-height: 1.8;
                margin-bottom: 1.25rem;
              }
              .prose ul {
                color: var(--text-secondary);
                margin-bottom: 1.25rem;
              }
              .prose li {
                margin-bottom: 0.5rem;
              }
              .prose strong {
                color: var(--text-primary);
              }
              .prose a {
                color: var(--accent-primary);
                text-decoration: none;
              }
              .prose a:hover {
                text-decoration: underline;
              }
            `}</style>
            {renderContent()}
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
              style={{ color: 'var(--accent-primary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("blog.backToAll")}
            </Link>
          </div>
        </motion.article>
      </div>
    </main>
  )
}
