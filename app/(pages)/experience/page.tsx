"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BriefcaseIcon, Calendar, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

interface Role {
  title: string
  duration: string
  description: string[]
}

interface Experience {
  company: string
  logo: string
  location?: string
  roles: Role[]
  accentColor: string
}

const experiences: Experience[] = [
  {
    company: "Commsult Indonesia",
    logo: "/images/commsult-logo.png",
    location: "Jakarta, Indonesia",
    accentColor: "var(--accent-primary)",
    roles: [
      {
        title: "DevOps Engineer (Part-Time)",
        duration: "Sep 2025 - Present",
        description: [
          "Migrate services from Public IP architecture to Load Balancers for improved scalability and security.",
          "Integrate SonarQube into CI/CD pipelines to enforce code quality and vulnerability checks.",
          "Handle day-to-day deployments across multiple environments.",
          "Develop and maintain automation scripts to optimize operational workflows.",
          "Collaborate with developers to ensure stable and efficient release processes.",
        ],
      },
      {
        title: "DevOps Engineer (Intern)",
        duration: "Jan 2025 - Sep 2025",
        description: [
          "Ensure uptime for German and Indonesian websites with uptime alerts.",
          "Monitor system performance using Grafana.",
          "Configure On-Call system with escalation chains.",
          "Set up alerts to notify developers via phone.",
          "Work with Ansible, Docker Swarm, and other DevOps tools.",
        ],
      },
      {
        title: "Software Development Engineer in Test",
        duration: "Jul 2024 - Jan 2025",
        description: [
          "Developed and executed automated UI tests.",
          "Used WebdriverIO, Xpath Selector, and Mocha framework for front-end validation.",
          "Integrated Allure reporting framework for comprehensive test reporting.",
          "Designed reusable test scripts to enhance testing efficiency and reduce maintenance efforts.",
        ],
      },
    ],
  },
  {
    company: "id/x partners",
    logo: "/images/idx.png",
    location: "Remote",
    accentColor: "var(--accent-light)",
    roles: [
      {
        title: "Project-Based Virtual Intern : Data Scientist x Rakamin Academy",
        duration: "May 2024 - Jun 2024",
        description: [
          "Mastered data storytelling techniques to effectively communicate insights derived from data analysis",
          "Demonstrated proficiency in data visualization, creating compelling and informative visual representations of complex data",
          "Conducted thorough exploratory data analysis (EDA), uncovering key patterns and trends in datasets to drive informed decision-making.",
        ],
      },
    ],
  },
  {
    company: "PT Bank Mandiri (Persero) Tbk",
    logo: "/images/logo-bank-mandiri.png",
    location: "Remote",
    accentColor: "var(--accent-gray)",
    roles: [
      {
        title: "Project-Based Virtual Intern : Mobile Apps Developer x Rakamin Academy",
        duration: "Jan 2024 - Feb 2024",
        description: [
          "Engaged in Android development, utilizing Android Studio, UI/Design Patterns, Security, RecyclerView, and SQLite Database",
          "Demonstrated proficiency in programming languages such as XML, Gradle, and Kotlin, applying OOP concepts effectively",
        ],
      },
    ],
  },
]

export default function ExperiencePage() {
  const t = useTranslations("experience")

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 w-1 h-full opacity-20" style={{ backgroundColor: 'var(--accent-primary)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl relative z-10">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-bold uppercase border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 flex items-center justify-center border-2 shadow-brutal"
              style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
            >
              <BriefcaseIcon className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
            </div>
            <span 
              className="px-4 py-1.5 text-sm font-bold uppercase border-2"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
            >
              {t("subtitle")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t("description")}
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-2 shadow-brutal p-6 md:p-8 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              {/* Company header */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 p-2 flex-shrink-0 border-2 shadow-brutal"
                  style={{ backgroundColor: exp.accentColor, borderColor: 'var(--border-color)' }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
                    {exp.company}
                  </h3>
                  {exp.location && (
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <MapPin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-6">
                {exp.roles.map((role, roleIndex) => (
                  <div 
                    key={role.title} 
                    className={roleIndex !== 0 ? "pt-6 border-t-3 border-black/30" : ""}
                  >
                    <div className="mb-5">
                      <h4 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{role.title}</h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <div 
                          className="flex items-center gap-2 px-4 py-1.5 border-2 text-sm font-bold"
                          style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{role.duration}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {role.description.map((point, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-4"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span 
                            className="w-2 h-2 mt-2.5 flex-shrink-0"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                          />
                          <span className="text-base md:text-lg leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Link href="/contact">
            <button 
              className="px-10 py-4 font-black uppercase text-lg border-2 shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
            >
              Let's Work Together →
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
