"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  LightbulbIcon,
  BookOpenCheck,
  GraduationCap,
  Users,
  Feather,
  MonitorPlay,
  GamepadIcon,
  Church,
  Handshake,
  Code,
  BriefcaseIcon,
} from "lucide-react"

interface FloatingOrbProps {
  className?: string
}

interface Activity {
  role: string
  organization: string
  period: string
  description: string
  skills: string[]
  icon: React.ReactNode
}

const FloatingOrb = ({ className }: FloatingOrbProps) => (
  <div className={`absolute w-64 h-64 rounded-full ${className}`} />
)

export default function Education() {
  const [activeActivity, setActiveActivity] = useState<number | null>(null)

  const activities: Activity[] = [
    {
      role: "Secretary",
      organization: "Badminton Club",
      period: "Aug 2022-Jan 2024",
      description: "Managed club communications, organized tournaments, and coordinated member activities.",
      skills: ["Event Management", "Leadership", "Communication"],
      icon: <Feather className="h-5 w-5 text-blue-300" />,
    },
    {
      role: "Member",
      organization: "IT Student Association /Himaprodi",
      period: "Aug 2022 - Present",
      description:
        "Participated in tech workshops, networking events, and collaborative coding projects focused on startup solutions.",
      skills: ["Networking", "Project Management", "Tech Innovation"],
      icon: <MonitorPlay className="h-5 w-5 text-indigo-300" />,
    },
    {
      role: "Event Division",
      organization: "Chess Club",
      period: "Aug 2022 - Aug 2023",
      description: "Planned and executed chess tournaments, workshops, and community outreach programs.",
      skills: ["Strategic Planning", "Team Coordination", "Problem Solving"],
      icon: <GamepadIcon className="h-5 w-5 text-purple-300" />,
    },
    {
      role: "Head of Creative Division",
      organization: "SGU BibleFellowship",
      period: "Dec 2023 -Dec 2024",
      description: "Lead a team creating visual media, promotional materials, and event branding.",
      skills: ["Creative Direction", "Digital Design"],
      icon: <Church className="h-5 w-5 text-pink-300" />,
    },
  ]

  return (
    <section id="education" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Modern animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Container to match certifications width */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              Education
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Main education card */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            {/* University banner */}
            <div className="h-48 md:h-56 relative overflow-hidden rounded-t-2xl">
              <Image
                src="/images/sgu-location.webp"
                alt="Swiss German University Campus"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = "/placeholder.svg?height=400&width=800"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>

              {/* Logo positioning */}
              <div className="absolute bottom-6 left-6 flex items-center">
                <div className="p-1.5 bg-slate-900/80 border border-white/20 rounded-lg shadow-2xl">
                  <Image
                    src="/images/sgu-logo.jpg"
                    alt="SGU Logo"
                    width={64}
                    height={64}
                    className="rounded-md bg-white"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
                <div className="ml-4 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Swiss German University</h3>
                  <p className="text-sm text-blue-200">Est. 2000</p>
                </div>
              </div>
            </div>

            {/* University info */}
            <div className="px-5 md:px-8 py-8">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <p className="text-xl text-indigo-300 font-medium">
                      Bachelor&apos;s degree, Information Technology
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 ml-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <span className="text-white/70">Aug 2022 - Aug 2026</span>
                    </div>
                    <span className="hidden sm:inline-block text-white/60">•</span>
                    <span className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-xs font-medium text-green-300 w-fit">
                      In Progress
                    </span>
                  </div>
                </div>

                {/* Specialization card */}
                <div className="lg:text-right">
                  <div className="relative">
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-xl blur opacity-30"></div>

                    {/* Glass card */}
                    <div className="relative px-5 py-3 bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden flex items-center gap-3">
                      {/* Icon container */}
                      <div className="flex items-center justify-center p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                        <Handshake className="h-5 w-5 text-blue-300" />
                      </div>

                      <div className="relative z-10">
                        <span className="block text-xs uppercase tracking-wider text-blue-300 font-medium">
                          Specialization
                        </span>
                        <h4 className="text-lg font-bold text-white">Technopreneurship</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technopreneurship highlight section */}
              <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 rounded-2xl border border-blue-500/20 overflow-hidden mb-8 shadow-lg">
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-b border-white/5 flex items-center gap-3">
                  <div className="p-1.5 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
                    <LightbulbIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Why I Chose Technopreneurship in IT</h4>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-slate-300 mb-6">
                    I'm pursuing a unique educational path that blends my passion for technology with an entrepreneurial
                    mindset. Through the Technopreneurship in IT specialization, I'm learning not only advanced software
                    development but also how to recognize real-world market opportunities and turn innovative ideas into
                    impactful tech-driven businesses.
                  </p>

                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <div className="p-1.5 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/20">
                      <BookOpenCheck className="h-5 w-5 text-green-400" />
                    </div>
                    What I've Learned
                  </h4>

                  {/* Improved grid for better mobile experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex gap-3 bg-slate-800/50 rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex-shrink-0 p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Code className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-1 text-lg">Technical Expertise</h5>
                        <p className="text-slate-300">
                          Advanced software development, system architecture, and emerging technologies
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 bg-slate-800/50 rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex-shrink-0 p-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <BriefcaseIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-1 text-lg">Business Acumen</h5>
                        <p className="text-slate-300">
                          Market analysis, business modeling, and entrepreneurial strategies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities section with improved layout */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-xl font-semibold text-white flex items-center gap-3">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    Activities & Societies
                  </h4>
                  <div className="text-xs px-2 py-1 rounded-lg bg-slate-800/70 text-slate-400 border border-white/5">
                    Click cards for details
                  </div>
                </div>

                {/* Improved grid layout for activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className={`relative rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer border shadow-md ${
                        activeActivity === index
                          ? "border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-slate-900"
                          : "border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-blue-500/30"
                      }`}
                      onClick={() => setActiveActivity(activeActivity === index ? null : index)}
                    >
                      <div className="p-4">
                        <div className="flex gap-3 items-start">
                          <div
                            className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${
                              activeActivity === index
                                ? "from-blue-500/30 to-purple-500/30 border border-blue-500/30"
                                : "from-slate-700 to-slate-800 border border-white/10"
                            }`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h5 className="font-semibold text-white leading-tight">{activity.organization}</h5>
                              <div
                                className={`transform transition-transform duration-300 ${
                                  activeActivity === index ? "rotate-180 text-blue-400" : "text-slate-400"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-indigo-300 text-sm font-medium">{activity.role}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full">
                                {activity.period}
                              </span>
                            </div>

                            {activeActivity === index && (
                              <div className="mt-3 pt-3 border-t border-white/10 transition-all duration-300">
                                <p className="text-slate-300 text-sm mb-3">{activity.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {activity.skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-slate-300 border border-white/10"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
