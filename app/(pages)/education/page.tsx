"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  GraduationCap,
  Users,
  Feather,
  MonitorPlay,
  GamepadIcon,
  Church,
  Handshake,
  Code,
  BriefcaseIcon,
  BookOpenCheck,
  LightbulbIcon,
  ChevronDown,
} from "lucide-react"
import { useTranslations } from "next-intl"

interface Activity {
  role: string
  organization: string
  period: string
  description: string
  skills: string[]
  icon: React.ReactNode
}

const activities: Activity[] = [
  {
    role: "Secretary",
    organization: "Badminton Club",
    period: "Aug 2022-Jan 2024",
    description: "Managed club communications, organized tournaments, and coordinated member activities.",
    skills: ["Event Management", "Leadership", "Communication"],
    icon: <Feather className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    role: "Member",
    organization: "IT Student Association /Himaprodi",
    period: "Aug 2022 - Present",
    description: "Participated in tech workshops, networking events, and collaborative coding projects.",
    skills: ["Networking", "Project Management", "Tech Innovation"],
    icon: <MonitorPlay className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
  },
  {
    role: "Event Division",
    organization: "Chess Club",
    period: "Aug 2022 - Aug 2023",
    description: "Planned and executed chess tournaments, workshops, and community outreach programs.",
    skills: ["Strategic Planning", "Team Coordination", "Problem Solving"],
    icon: <GamepadIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
  },
  {
    role: "Head of Creative Division",
    organization: "SGU BibleFellowship",
    period: "Dec 2023 - Dec 2024",
    description: "Lead a team creating visual media, promotional materials, and event branding.",
    skills: ["Creative Direction", "Digital Design"],
    icon: <Church className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
  },
]

export default function EducationPage() {
  const [activeActivity, setActiveActivity] = useState<number | null>(null)
  const t = useTranslations("education")

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
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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

        {/* Main Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card overflow-hidden mb-8"
        >
          {/* University Banner */}
          <div className="h-48 md:h-56 relative overflow-hidden">
            <Image
              src="/images/sgu-location.webp"
              alt="Swiss German University Campus"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-6 flex items-center gap-4">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <Image
                  src="/images/sgu-logo.jpg"
                  alt="SGU Logo"
                  width={56}
                  height={56}
                  className="rounded-lg"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Swiss German University</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm">Est. 2000</p>
              </div>
            </div>
          </div>

          {/* University Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 mb-8">
              <div className="flex-1">
                <p className="text-lg text-slate-900 dark:text-white font-medium mb-2">
                  Bachelor's degree, Information Technology
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Aug 2022 - Aug 2026</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                    In Progress
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <Handshake className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Specialization</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Technopreneurship</h4>
                </div>
              </div>
            </div>

            {/* Technopreneurship Section */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                  <LightbulbIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Why I Chose Technopreneurship in IT</h4>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                I'm pursuing a unique educational path that blends my passion for technology with an entrepreneurial
                mindset. Through the Technopreneurship in IT specialization, I'm learning not only advanced software
                development but also how to recognize real-world market opportunities and turn innovative ideas into
                impactful tech-driven businesses.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-green-50 dark:bg-green-500/10 rounded-lg">
                  <BookOpenCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">What I've Learned</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-lg flex-shrink-0">
                      <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-1">Technical Expertise</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Advanced software development, system architecture, and emerging technologies</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-purple-50 dark:bg-purple-500/10 rounded-lg flex-shrink-0">
                      <BriefcaseIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-1">Business Acumen</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Market analysis, business modeling, and entrepreneurial strategies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Activities & Societies</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className={`cursor-pointer rounded-xl border transition-all duration-300 ${
                      activeActivity === index
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
                    }`}
                    onClick={() => setActiveActivity(activeActivity === index ? null : index)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-slate-900 dark:text-white truncate">{activity.organization}</h5>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${
                              activeActivity === index ? "rotate-180" : ""
                            }`} />
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-blue-600 dark:text-blue-400">{activity.role}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{activity.period}</span>
                          </div>

                          {activeActivity === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700"
                            >
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{activity.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {activity.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="badge text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
