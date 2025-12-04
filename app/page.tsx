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
  ExternalLink
} from "lucide-react"

const skills = [
  { name: "Web Development", icon: Code2 },
  { name: "DevOps", icon: Server },
  { name: "AI & ML", icon: BotMessageSquare },
]

const techStacks = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, modern web applications with cutting-edge frameworks.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "devops",
    icon: Server,
    title: "DevOps Engineering",
    description: "Architecting scalable infrastructure with automated deployment pipelines.",
    skills: ["Docker", "CI/CD", "Ansible", "Grafana", "Prometheus"],
  },
  {
    id: "ai",
    icon: BotMessageSquare,
    title: "AI Development",
    description: "Creating intelligent applications with machine learning and NLP.",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "Hugging Face", "XGBoost"],
  },
]

const sections = [
  {
    id: "experience",
    title: "Experience",
    description: "Professional journey and internships",
    icon: Briefcase,
    href: "/experience",
  },
  {
    id: "education",
    title: "Education",
    description: "Academic background and activities",
    icon: GraduationCap,
    href: "/education",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Featured work and case studies",
    icon: Folder,
    href: "/projects",
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Professional credentials and badges",
    icon: Award,
    href: "/certifications",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description: "Competitions and events",
    icon: Trophy,
    href: "/hackathons",
  },
]

export default function Home() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  {t("hero.openToWork")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                {t("hero.greeting")}{" "}
                <span className="text-gradient">{t("hero.name")}</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-6">
                {t("hero.title")}
              </p>

              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-8 mx-auto lg:mx-0">
                {t("hero.description")}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full"
                  >
                    <skill.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("hero.getInTouch")}
                  </motion.button>
                </Link>
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    <Folder className="w-5 h-5" />
                    {t("hero.viewProjects")}
                  </motion.button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-3 mt-8">
                <a
                  href="https://github.com/MatthewsWongOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/matthewswong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:matthewswong2610@gmail.com"
                  className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 dark:opacity-30" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
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
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("about.title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 md:p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="badge badge-primary">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                    {t("about.devopsEngineer")}
                  </span>
                  <span className="badge badge-primary">
                    <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                    {t("about.itStudent")}
                  </span>
                  <span className="badge">
                    <MapPin className="w-3.5 h-3.5 mr-1.5" />
                    {t("about.city")}
                  </span>
                </div>

                <div className="space-y-4 text-slate-600 dark:text-slate-400">
                  <p className="text-lg leading-relaxed">
                    {t("about.intro")}{" "}
                    <span className="text-slate-900 dark:text-white font-medium">{t("about.role")}</span>{" "}
                    {t("about.description1")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("about.currentRole")}{" "}
                    <span className="text-slate-900 dark:text-white font-medium">{t("about.degree")}</span>{" "}
                    {t("about.atUniversity")}{" "}
                    <span className="text-slate-900 dark:text-white font-medium">{t("about.position")}</span>{" "}
                    {t("about.atCompany")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("about.hobbies")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Expertise Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
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
                className="card card-hover p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl mb-4">
                  <stack.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {stack.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {stack.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.skills.map((skill) => (
                    <span key={skill} className="badge text-xs">
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
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("sections.discoverMore")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                  <div className="group card card-hover p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                      <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      <span>{t("sections.exploreButton")}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center card p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 border-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t("cta.button")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} Matthews Wong. {t("footer.rights")}
            </p>
            <div className="flex gap-6">
              <a 
                href="https://github.com/MatthewsWongOfficial" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/matthewswong" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:matthewswong2610@gmail.com" 
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      <SpeedInsights />
      <Analytics />
    </div>
  )
}