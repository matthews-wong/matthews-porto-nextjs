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
}

const experiences: Experience[] = [
  {
    company: "Commsult Indonesia",
    logo: "/images/commsult-logo.png",
    location: "Jakarta, Indonesia",
    roles: [
      {
        title: "DevOps Engineer",
        duration: "Jan 2025 - Present",
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
          "Integrate Allure reporting framework to provide comprehensive and detailed test reports",
          "Design reusable test scripts to enhance testing efficiency and reduce maintenance efforts",
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
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <BriefcaseIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t("subtitle")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("description")}
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card card-hover p-6 md:p-8"
            >
              {/* Company header */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 p-2 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {exp.company}
                  </h3>
                  {exp.location && (
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />
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
                    className={roleIndex !== 0 ? "pt-6 border-t border-slate-200 dark:border-slate-800" : ""}
                  >
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{role.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>{role.duration}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400">
                          Internship
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {role.description.map((point, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span>{point}</span>
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
            <button className="btn-primary">
              Let's Work Together
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
