"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { useTranslations } from "next-intl"
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Folder, 
  MessageCircle,
  ArrowRight,
  Code2,
  Server,
  BotMessageSquare,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Zap,
  Star
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

const sections = [
  {
    id: "experience",
    title: "Experience",
    description: "Professional journey and internships",
    icon: Briefcase,
    href: "/experience",
    color: "var(--accent-yellow)",
  },
  {
    id: "education",
    title: "Education",
    description: "Academic background and activities",
    icon: GraduationCap,
    href: "/education",
    color: "var(--accent-cyan)",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Featured work and case studies",
    icon: Folder,
    href: "/projects",
    color: "var(--accent-pink)",
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Professional credentials and badges",
    icon: Award,
    href: "/certifications",
    color: "var(--accent-lime)",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description: "Competitions and events",
    icon: Trophy,
    href: "/hackathons",
    color: "var(--accent-orange)",
  },
]

export default function Home() {
  const t = useTranslations()

  return (
    <div className="min-h-screen pattern-grid" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-brutal-yellow border-brutal shadow-brutal rotate-12 hidden lg:block" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-brutal-pink border-brutal shadow-brutal -rotate-6 hidden lg:block" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-brutal-cyan border-brutal shadow-brutal rotate-45 hidden lg:block" />

        <div className="container mx-auto max-w-6xl relative z-10">
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

              <p className="text-lg text-neutral-300 max-w-xl mb-8 mx-auto lg:mx-0">
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
                  { icon: Github, href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
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
              initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Background shapes */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-brutal-pink border-brutal shadow-brutal-lg rotate-3" />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-brutal-cyan border-brutal shadow-brutal-lg -rotate-3" />
                
                {/* Main image container */}
                <div className="relative w-full h-full border-brutal shadow-brutal-xl overflow-hidden bg-white">
                  <Image
                    src="/images/profile-pic.avif"
                    alt="Matthews Wong"
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="/images/profile-pic-tiny.avif"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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

      {/* Tech Expertise Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
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

      {/* Explore More Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
              {t("sections.discoverDescription")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={section.href}>
                  <div 
                    className="group p-6 border-brutal shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                  >
                    <div 
                      className="w-12 h-12 flex items-center justify-center border-brutal shadow-brutal mb-4"
                      style={{ backgroundColor: section.color }}
                    >
                      <section.icon className="w-6 h-6 text-brutal-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase">
                      {section.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase" style={{ color: section.color }}>
                      <span>{t("sections.exploreButton")}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
              <p className="text-lg mb-8 max-w-xl mx-auto text-brutal-dark/80">
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
                { label: "GitHub", href: "https://github.com/MatthewsWongOfficial" },
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