"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { FC } from "react"

interface Role {
  title: string
  duration: string
  description: string[]
}

interface Experience {
  company: string
  logo: string
  roles: Role[]
}

const experiences: Experience[] = [
  {
    company: "Commsult Indonesia",
    logo: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/commsult-logo.png?raw=true",
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
    logo: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/RQ8J4BVWEN684XEJ32PPLTHR34CSDCQY2WFWBQ7C-6184f0df.png?raw=true",
    roles: [
      {
        title: "Project-Based Virtual Intern : Data Scientist id/x partners x Rakamin Academy",
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
    logo: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Bank_Mandiri_logo_2016.svg.png?raw=true",
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

const Experience: FC = () => {
  return (
    <section id="experience" className="min-h-screen py-24 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
            Experiences
          </span>
        </motion.h2>

        <div className="grid gap-8 md:gap-12 relative z-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Subtle card glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />

              <div className="glass-effect p-8 md:p-12 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 relative">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                  {/* Updated logo container with more opacity */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/60 p-2 flex-shrink-0 shadow-lg backdrop-blur-sm">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={exp.logo || "/placeholder.svg"}
                        alt={exp.company}
                        width={120}
                        height={120}
                        className="w-full h-full object-contain rounded-xl"
                        priority
                      />
                    </motion.div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                      {exp.company}
                    </h3>
                    {exp.roles.map((role, roleIndex) => (
                      <div key={role.title} className={roleIndex !== 0 ? "mt-6 pt-6 border-t border-white/10" : ""}>
                        <h4 className="text-xl md:text-2xl font-semibold text-indigo-400 mb-2">{role.title}</h4>
                        <p className="text-lg md:text-xl text-slate-300 mb-2">{role.duration}</p>
                        <p className="text-base md:text-lg text-slate-400 mb-4">Internship</p>
                        <ul className="list-disc list-inside text-slate-300 space-y-2 text-base md:text-lg">
                          {role.description.map((point, i) => (
                            <li key={i} className="transition-colors duration-300 hover:text-blue-400">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

