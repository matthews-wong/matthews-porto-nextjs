"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export default function BlogPage() {
  const t = useTranslations()

  const blogs = [
    {
      id: "building-saas-ai-gymbro",
      title: t("blog.posts.aiGymbro.title"),
      excerpt: t("blog.posts.aiGymbro.excerpt"),
      image: "/my-product.png",
      date: `${t("common.november")} 2024`,
      readTime: `5 ${t("common.minRead")}`,
      category: t("blog.posts.aiGymbro.category"),
    },
    {
      id: "life-at-swiss-german-university",
      title: t("blog.posts.sgu.title"),
      excerpt: t("blog.posts.sgu.excerpt"),
      image: "/images/sgu-location.webp",
      date: `${t("common.october")} 2024`,
      readTime: `4 ${t("common.minRead")}`,
      category: t("blog.posts.sgu.category"),
    },
    {
      id: "pwc-capture-the-flag",
      title: t("blog.posts.ctf.title"),
      excerpt: t("blog.posts.ctf.excerpt"),
      image: "/images/hackathon/PWC-Hackathon.jpg",
      date: `${t("common.september")} 2024`,
      readTime: `4 ${t("common.minRead")}`,
      category: t("blog.posts.ctf.category"),
    },
  ]

  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--accent-primary)' }}>
            {t("blog.subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t("blog.title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t("blog.description")}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.id}`} className="group block">
                <article 
                  className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-72 h-48 md:h-44 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
                      >
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center py-2">
                    <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </span>
                    </div>
                    
                    <h2 
                      className="text-xl md:text-2xl font-bold mb-3 group-hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {blog.title}
                    </h2>
                    
                    <p 
                      className="text-sm md:text-base leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {blog.excerpt}
                    </p>

                    <div 
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <span>{t("blog.readMore")}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
