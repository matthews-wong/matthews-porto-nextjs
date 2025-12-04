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
  accentColor: string
}

const activities: Activity[] = [
  {
    role: "Secretary",
    organization: "Badminton Club",
    period: "Aug 2022-Jan 2024",
    description: "Managed club communications, organized tournaments, and coordinated member activities.",
    skills: ["Event Management", "Leadership", "Communication"],
    icon: <Feather className="h-5 w-5" />,
    accentColor: "var(--accent-primary)",
  },
  {
    role: "Member",
    organization: "IT Student Association /Himaprodi",
    period: "Aug 2022 - Present",
    description: "Participated in tech workshops, networking events, and collaborative coding projects.",
    skills: ["Networking", "Project Management", "Tech Innovation"],
    icon: <MonitorPlay className="h-5 w-5" />,
    accentColor: "var(--accent-primary)",
  },
  {
    role: "Event Division",
    organization: "Chess Club",
    period: "Aug 2022 - Aug 2023",
    description: "Planned and executed chess tournaments, workshops, and community outreach programs.",
    skills: ["Strategic Planning", "Team Coordination", "Problem Solving"],
    icon: <GamepadIcon className="h-5 w-5" />,
    accentColor: "var(--accent-gray)",
  },
  {
    role: "Head of Creative Division",
    organization: "SGU BibleFellowship",
    period: "Dec 2023 - Dec 2024",
    description: "Lead a team creating visual media, promotional materials, and event branding.",
    skills: ["Creative Direction", "Digital Design"],
    icon: <Church className="h-5 w-5" />,
    accentColor: "var(--accent-light)",
  },
]

export default function EducationPage() {
  const [activeActivity, setActiveActivity] = useState<number | null>(null)
  const t = useTranslations("education")

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 right-0 w-1 h-full opacity-20" style={{ backgroundColor: 'var(--accent-primary)' }} />
      
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
              <GraduationCap className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
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

        {/* Main Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border-2 shadow-brutal overflow-hidden mb-8"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          {/* University Banner */}
          <div className="h-48 md:h-56 relative overflow-hidden border-b-2" style={{ borderColor: 'var(--border-color)' }}>
            <Image
              src="/images/sgu-location.webp"
              alt="Swiss German University Campus"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-6 flex items-center gap-4">
              <div 
                className="p-2 border-2 shadow-brutal"
                style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
              >
                <Image
                  src="/images/sgu-logo.jpg"
                  alt="SGU Logo"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black uppercase drop-shadow-lg" style={{ color: 'var(--text-primary)' }}>Swiss German University</h3>
                <span 
                  className="inline-block px-3 py-1 text-xs font-bold uppercase border-2 mt-1"
                  style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                >
                  Est. 2000
                </span>
              </div>
            </div>
          </div>

          {/* University Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 mb-8">
              <div className="flex-1">
                <p className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Bachelor's degree, Information Technology
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div 
                    className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold border-2"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Aug 2022 - Aug 2026</span>
                  </div>
                  <span 
                    className="px-4 py-1.5 text-xs font-bold uppercase border-2"
                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                  >
                    In Progress
                  </span>
                </div>
              </div>

              <div 
                className="flex items-center gap-3 px-4 py-3 border-2 shadow-brutal"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center border-2"
                  style={{ backgroundColor: 'var(--accent-gray)', borderColor: 'var(--border-color)' }}
                >
                  <Handshake className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Specialization</span>
                  <h4 className="font-black uppercase" style={{ color: 'var(--text-primary)' }}>Technopreneurship</h4>
                </div>
              </div>
            </div>

            {/* Technopreneurship Section */}
            <div className="border-2 p-6 mb-8" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 flex items-center justify-center border-2"
                  style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                >
                  <LightbulbIcon className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                </div>
                <h4 className="font-black uppercase" style={{ color: 'var(--text-primary)' }}>Why I Chose Technopreneurship in IT</h4>
              </div>

              <p className="mb-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm pursuing a unique educational path that blends my passion for technology with an entrepreneurial
                mindset. Through the Technopreneurship in IT specialization, I'm learning not only advanced software
                development but also how to recognize real-world market opportunities and turn innovative ideas into
                impactful tech-driven businesses.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 flex items-center justify-center border-2"
                  style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--border-color)' }}
                >
                  <BookOpenCheck className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                </div>
                <h4 className="font-black uppercase" style={{ color: 'var(--text-primary)' }}>What I've Learned</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 shadow-brutal" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 flex items-center justify-center border-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-gray)', borderColor: 'var(--border-color)' }}
                    >
                      <Code className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Technical Expertise</h5>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Advanced software development, system architecture, and emerging technologies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 shadow-brutal" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 flex items-center justify-center border-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                    >
                      <BriefcaseIcon className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Business Acumen</h5>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Market analysis, business modeling, and entrepreneurial strategies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 flex items-center justify-center border-2"
                  style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                >
                  <Users className="h-5 w-5" style={{ color: 'var(--text-dark)' }} />
                </div>
                <h4 className="font-black uppercase" style={{ color: 'var(--text-primary)' }}>Activities & Societies</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer border-2 shadow-brutal transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                    style={{ 
                      backgroundColor: activeActivity === index ? activity.accentColor : 'var(--bg-primary)',
                      borderColor: 'var(--border-color)'
                    }}
                    onClick={() => setActiveActivity(activeActivity === index ? null : index)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 flex items-center justify-center border-2 flex-shrink-0"
                          style={{ 
                            backgroundColor: activeActivity === index ? 'var(--text-primary)' : activity.accentColor,
                            borderColor: 'var(--border-color)'
                          }}
                        >
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 
                              className="font-bold text-base truncate"
                              style={{ color: activeActivity === index ? 'var(--text-dark)' : 'var(--text-primary)' }}
                            >
                              {activity.organization}
                            </h5>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform flex-shrink-0 ml-2 ${activeActivity === index ? "rotate-180" : ""}`}
                              style={{ color: activeActivity === index ? 'var(--text-dark)' : 'var(--text-secondary)' }}
                            />
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span 
                              className="text-sm font-bold"
                              style={{ color: activeActivity === index ? 'var(--text-dark)' : 'var(--accent-primary)' }}
                            >
                              {activity.role}
                            </span>
                            <span 
                              className="text-sm"
                              style={{ color: activeActivity === index ? 'var(--text-dark)' : 'var(--text-secondary)' }}
                            >
                              • {activity.period}
                            </span>
                          </div>

                          {activeActivity === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3"
                              style={{ borderTop: '2px solid rgba(0,0,0,0.2)' }}
                            >
                              <p className="text-base mb-3" style={{ color: 'var(--text-dark)' }}>
                                {activity.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {activity.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 text-xs font-bold border-2"
                                    style={{ backgroundColor: 'var(--text-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
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
