"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
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
}

const experiences: Experience[] = [
  {
    company: "Commsult Indonesia",
    logo: "/images/commsult-logo.png",
    location: "Jakarta, Indonesia",
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
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
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
            {t("subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t("title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t("description")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 opacity-20"
            style={{ backgroundColor: 'var(--text-secondary)' }}
          />

          {/* Companies */}
          <div className="space-y-12">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: expIndex * 0.1 }}
              >
                {/* Company Header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Logo */}
                  <div 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0 p-2 border-2 relative z-10"
                    style={{ backgroundColor: 'white', borderColor: 'var(--border-color)' }}
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

                  {/* Company Info */}
                  <div className="pt-1 md:pt-3">
                    <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {exp.company}
                    </h2>
                    {exp.location && (
                      <div className="flex items-center gap-1.5 mt-1" style={{ color: 'var(--text-secondary)' }}>
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Roles */}
                <div className="ml-[23px] md:ml-[31px] pl-8 border-l-0 space-y-8">
                  {exp.roles.map((role, roleIndex) => (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: expIndex * 0.1 + roleIndex * 0.05 }}
                    >
                      {/* Role dot */}
                      <div className="relative">
                        <div 
                          className="absolute -left-[36px] md:-left-[40px] top-1.5 w-3 h-3 rounded-full border-2"
                          style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}
                        />
                      </div>

                      {/* Role content */}
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {role.title}
                        </h3>
                        <p className="text-sm font-medium mb-4" style={{ color: 'var(--accent-primary)' }}>
                          {role.duration}
                        </p>

                        {/* Description */}
                        <ul className="space-y-2.5">
                          {role.description.map((point, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-3 text-sm md:text-base leading-relaxed"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.5 }}
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-16 pt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                Interested in working together?
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Let's discuss your project
              </p>
            </div>
            <Link 
              href="/contact"
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
            >
              Get in touch →
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
