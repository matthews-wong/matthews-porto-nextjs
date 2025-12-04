"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { useTranslations } from "next-intl"
import { 
  ArrowRight,
  Code2,
  Server,
  BotMessageSquare,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Folder,
  ExternalLink,
  Zap,
  Star,
  Globe
} from "lucide-react"


const techStacks = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, modern web applications with cutting-edge frameworks.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    color: "var(--accent-cyan)",
  },
  {
    id: "devops",
    icon: Server,
    title: "DevOps Engineering",
    description: "Architecting scalable infrastructure with automated deployment pipelines.",
    skills: ["Docker", "CI/CD", "Ansible", "Grafana", "Prometheus"],
    color: "var(--accent-lime)",
  },
  {
    id: "ai",
    icon: BotMessageSquare,
    title: "AI Development",
    description: "Creating intelligent applications with machine learning and NLP.",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "Hugging Face", "XGBoost"],
    color: "var(--accent-pink)",
  },
]

const products = [
  {
    id: "aifeeds",
    title: "AI Feeds",
    description: "Anti doom-scrolling. Scroll through curated AI repositories to expand your knowledge.",
    href: "https://aifeeds.matthewswong.tech/",
    icon: Zap,
    color: "var(--accent-cyan)",
    tagline: "Learn, Don't Scroll",
    image: "/AiFeeds.png",
  },
  {
    id: "reviewci",
    title: "Review CI",
    description: "A pipeline reader that evaluates your CI/CD pipelines and gives actionable insights.",
    href: "https://reviewci.matthewswong.tech/",
    icon: Server,
    color: "var(--accent-lime)",
    tagline: "Pipeline Intelligence",
    image: "/ReviewCI.png",
  },
]

const commercialWebsites = [
  {
    id: "tiktok",
    title: "TikTok Agency Incubator",
    description: "Web app from official TikTok campaign. Built in a fast-paced agency environment.",
    href: "https://tiktokagencyincubator.com",
    image: "/tiktok-agency.png",
    tags: ["Campaign", "Agency"],
  },
  {
    id: "parcel",
    title: "Parcel Cirebon",
    description: "E-commerce platform helping this store grow online visibility for Christmas parcels and more.",
    href: "https://parcelcirebon.com",
    image: "/parcel-cirebon.png",
    tags: ["E-commerce", "Growth"],
  },
  {
    id: "jid",
    title: "Jakarta Intl Denso",
    description: "Car wash company website. Boosted SEO and increased online visibility for local customers.",
    href: "https://jakartaintldenso.com",
    image: "/jid-web.png",
    tags: ["SEO", "Business"],
  },
  {
    id: "shibui",
    title: "Shibui Matcha Bar",
    description: "Landing page for matcha bar & cafe. Grew visitor traffic and boosted online visibility.",
    href: "https://shibui.id",
    image: "/shibui-lp.png",
    tags: ["Landing Page", "Cafe"],
  },
]

export default function Home() {
  const t = useTranslations()
  
  // Check if mobile (disable parallax on mobile)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Lightweight parallax effect using CSS transforms (GPU accelerated) - desktop only
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, isMobile ? 1 : 0])
  const decorY = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 80])

  return (
    <div className="min-h-screen pattern-grid" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative shapes with parallax */}
        <motion.div 
          style={{ y: decorY, opacity: heroOpacity }}
          className="absolute top-20 left-10 w-20 h-20 bg-brutal-yellow border-brutal shadow-brutal rotate-12 hidden lg:block" 
        />
        <motion.div 
          style={{ y: decorY, opacity: heroOpacity }}
          className="absolute top-40 right-20 w-16 h-16 bg-brutal-pink border-brutal shadow-brutal -rotate-6 hidden lg:block" 
        />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto max-w-6xl relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 text-center lg:text-left"
            >

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                {t("hero.greeting")}{" "}
                <span 
                  className="inline-block px-4 py-1 -rotate-1"
                  style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--text-dark)' }}
                >
                  {t("hero.name")}
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-wide">
                {t("hero.title")}
              </p>

              <p className="text-lg text-neutral-100 font-medium max-w-xl mb-8 mx-auto lg:mx-0">
                {t("hero.description")}
              </p>  

              {/* CTAs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2 }}
                    className="btn-brutal"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("hero.getInTouch")}
                  </motion.button>
                </Link>
                <Link href="/projects">
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2 }}
                    className="btn-brutal-cyan"
                  >
                    <Folder className="w-5 h-5" />
                    {t("hero.viewProjects")}
                  </motion.button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-3">
                {[
                  { icon: Github, href: "https://github.com/matthews-wong", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:matthewswong2610@gmail.com", label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="p-3 bg-brutal-purple border-brutal shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                  >
                    <social.icon className="w-5 h-5 text-brutal-dark" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-64 h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px]">
                {/* Simple gradient backdrop */}
                <div 
                  className="absolute inset-x-4 top-8 bottom-0 rounded-t-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 111, 32, 0.15) 0%, rgba(59, 59, 59, 0.8) 40%, #2E2E2E 100%)',
                  }}
                />
                
                {/* Glow effect - clipped to not show at bottom */}
                <div 
                  className="absolute inset-0 z-10 overflow-hidden"
                  style={{ clipPath: 'inset(0 0 20px 0)' }}
                >
                  <div 
                    className="relative w-full h-full"
                    style={{
                      filter: 'drop-shadow(0 0 2px #FF6F20) drop-shadow(0 0 12px rgba(255,111,32,0.3))',
                    }}
                  >
                    <Image
                      src="/Matthews-Wong.png"
                      alt=""
                      fill
                      className="object-contain object-bottom"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                
                {/* Main image without glow */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/Matthews-Wong.png"
                    alt="Matthews Wong"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
                
                {/* Smooth fade base at bottom */}
                <div 
                  className="absolute -bottom-2 left-0 right-0 h-24 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 40%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section 
        className="py-16 md:py-24 px-4 sm:px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-6" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Section Title */}
            <div className="inline-block mb-10">
              <h2 
                className="text-3xl md:text-4xl font-black uppercase px-6 py-3 -rotate-1"
                style={{ 
                  backgroundColor: 'var(--accent-yellow)', 
                  color: 'var(--text-dark)',
                  border: '3px solid var(--border-color)',
                  boxShadow: 'var(--shadow-brutal)'
                }}
              >
                {t("about.title")}
              </h2>
            </div>
        

            {/* About Content */}
            <div 
              className="max-w-4xl p-6 md:p-8 border-brutal shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
                <p>
                  {t("about.intro")}{" "}
                  <span className="font-bold text-white">{t("about.role")}</span>{" "}
                  {t("about.description1")}
                </p>
                <p>
                  {t("about.currentRole")}{" "}
                  <span className="font-bold text-white">{t("about.degree")}</span>{" "}
                  {t("about.atUniversity")}{" "}
                  <span className="font-bold text-white">{t("about.position")}</span>{" "}
                  {t("about.atCompany")}
                </p>
                <p>{t("about.hobbies")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Product Banner */}
      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://www.aigymbro.web.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div 
                className="relative overflow-hidden border-brutal shadow-brutal-lg transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-xl cursor-pointer rounded-2xl"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* Content wrapper - reversed order on mobile (image first) */}
                <div className="flex flex-col-reverse lg:flex-row items-stretch">
                  {/* Text Content */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 z-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span 
                        className="px-3 py-1 text-xs font-black uppercase border-2 rounded-full"
                        style={{ 
                          backgroundColor: 'var(--accent-lime)', 
                          color: 'var(--text-dark)',
                          borderColor: 'var(--border-color)'
                        }}
                      >
                        🚀 My Product
                      </span>
                      <span 
                        className="px-3 py-1 text-xs font-black uppercase border-2 rounded-full"
                        style={{ 
                          backgroundColor: 'var(--accent-primary)', 
                          color: 'var(--text-dark)',
                          borderColor: 'var(--border-color)'
                        }}
                      >
                        Live Now
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 uppercase">
                      AI Gym Bro
                    </h3>
                    <p className="text-neutral-300 mb-6 max-w-md text-sm md:text-base">
                      Your AI-powered fitness companion. Get personalized workout plans and nutrition advice.
                    </p>
                    <div 
                      className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 font-black uppercase text-sm md:text-base border-brutal shadow-brutal transition-all hover:shadow-brutal-lg rounded-full self-start"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)', 
                        color: 'var(--text-dark)'
                      }}
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>

                  {/* Image with orange overlay */}
                  <div className="relative w-full lg:w-1/2 h-40 sm:h-48 md:h-56 lg:h-72 rounded-t-xl lg:rounded-t-none lg:rounded-r-xl overflow-hidden">
                    <Image
                      src="/my-product.png"
                      alt="AI Gym Bro - My SaaS Product"
                      fill
                      className="object-cover object-center"
                    />
                    {/* Orange overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255, 111, 32, 0.3) 0%, rgba(255, 111, 32, 0.15) 50%, rgba(255, 111, 32, 0.35) 100%)'
                      }}
                    />
                    {/* Gradient fade to bottom on mobile, to left on desktop */}
                    <div 
                      className="absolute inset-0 lg:hidden"
                      style={{ 
                        background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 40%)'
                      }}
                    />
                    <div 
                      className="absolute inset-0 hidden lg:block"
                      style={{ 
                        background: 'linear-gradient(to right, var(--bg-card) 0%, transparent 30%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tech Expertise Section */}
      <section 
        className="py-16 md:py-24 px-4 sm:px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-6" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 
              className="inline-block text-3xl md:text-4xl font-black uppercase px-6 py-3 rotate-1"
              style={{ 
                backgroundColor: 'var(--accent-cyan)', 
                color: 'var(--text-dark)',
                border: '3px solid var(--border-color)',
                boxShadow: 'var(--shadow-brutal)'
              }}
            >
              {t("techExpertise.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {techStacks.map((stack, index) => (
              <motion.div
                key={stack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-brutal shadow-brutal p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div 
                  className="w-14 h-14 flex items-center justify-center border-brutal shadow-brutal mb-5"
                  style={{ backgroundColor: stack.color }}
                >
                  <stack.icon className="w-7 h-7 text-brutal-dark" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase">
                  {stack.title}
                </h3>
                <p className="text-neutral-400 mb-5">
                  {stack.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 text-sm font-bold border-2 border-white/20"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Websites Section - Highlighted */}
      <section 
        className="py-16 md:py-24 px-4 sm:px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-6" 
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h2 
                className="inline-block text-3xl md:text-4xl font-black uppercase px-6 py-3 rotate-1"
                style={{ 
                  backgroundColor: 'var(--accent-yellow)', 
                  color: 'var(--text-dark)',
                  border: '3px solid var(--border-color)',
                  boxShadow: 'var(--shadow-brutal)'
                }}
              >
                Commercial Websites
              </h2>
              <span 
                className="px-3 py-1.5 text-xs font-black uppercase rounded-full border-2 animate-pulse"
                style={{ 
                  backgroundColor: 'var(--accent-yellow)', 
                  color: 'var(--text-dark)',
                  borderColor: 'var(--border-color)'
                }}
              >
                ⭐ Highlight
              </span>
            </div>
            <p className="text-lg text-neutral-400 max-w-2xl">
              Websites I've built for businesses to enhance their online presence and drive growth.
            </p>
          </motion.div>

          {/* Horizontal scroll container */}
          <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {commercialWebsites.map((site, index) => (
                <motion.a
                  key={site.id}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group block flex-shrink-0 w-[300px] sm:w-[340px] snap-start"
                >
                  <div 
                    className="relative overflow-hidden rounded-2xl border-brutal shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg h-full"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                  >
                    {/* Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={site.image}
                        alt={site.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div 
                        className="absolute inset-0"
                        style={{ 
                          background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)'
                        }}
                      />
                      {/* Tags on image */}
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {site.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 text-xs font-bold uppercase rounded-full"
                            style={{ 
                              backgroundColor: 'var(--accent-yellow)',
                              color: 'var(--text-dark)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2">
                        {site.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                        {site.description}
                      </p>

                      {/* CTA */}
                      <div 
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase transition-all group-hover:gap-3"
                        style={{ color: 'var(--accent-yellow)' }}
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discover More - My Products Section */}
      <section 
        className="py-16 md:py-24 px-4 sm:px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-6" 
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 
              className="inline-block text-3xl md:text-4xl font-black uppercase px-6 py-3 -rotate-1"
              style={{ 
                backgroundColor: 'var(--accent-pink)', 
                color: 'var(--text-dark)',
                border: '3px solid var(--border-color)',
                boxShadow: 'var(--shadow-brutal)'
              }}
            >
              {t("sections.discoverMore")}
            </h2>
            <p className="text-lg text-neutral-400 mt-6 max-w-2xl">
              Tools I've built to solve real problems. Try them out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.a
                key={product.id}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                <div 
                  className="relative overflow-hidden rounded-2xl border-brutal shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: `linear-gradient(to top, var(--bg-card) 0%, transparent 60%)`
                      }}
                    />
                    {/* Tagline badge */}
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-3 py-1 text-xs font-bold uppercase rounded-full"
                        style={{ 
                          backgroundColor: product.color,
                          color: 'var(--text-dark)'
                        }}
                      >
                        {product.tagline}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: product.color }}
                      >
                        <product.icon className="w-5 h-5 text-brutal-dark" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase">
                        {product.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* CTA */}
                    <div 
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase transition-all group-hover:gap-3"
                      style={{ color: product.color }}
                    >
                      <span>Try it now</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 md:py-24 px-4 sm:px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-6" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 md:p-12 border-brutal shadow-brutal-xl -rotate-1"
            style={{ backgroundColor: 'var(--accent-yellow)' }}
          >
            <div className="rotate-1">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-brutal-dark" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-brutal-dark mb-4 uppercase">
                {t("cta.title")}
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto text-brutal-dark font-semibold">
                {t("cta.description")}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 2, y: 2 }}
                  className="btn-brutal-dark text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t-4 border-black" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-bold text-neutral-400">
              © {new Date().getFullYear()} Matthews Wong. {t("footer.rights")}
            </p>
            <div className="flex gap-4">
              {[
                { label: "GitHub", href: "https://github.com/matthews-wong" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/matthewswong" },
                { label: "Email", href: "mailto:matthewswong2610@gmail.com" },
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="text-sm font-bold uppercase transition-colors text-neutral-400 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <SpeedInsights />
      <Analytics />
    </div>
  )
}