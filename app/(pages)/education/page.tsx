"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  GraduationCap,
  Feather,
  MonitorPlay,
  GamepadIcon,
  Church,
  Handshake,
  MapPin,
} from "lucide-react"
import { useTranslations } from "next-intl"

const activities = [
  {
    role: "Secretary",
    organization: "Badminton Club",
    period: "2022-2024",
    icon: Feather,
  },
  {
    role: "Member",
    organization: "IT Student Association",
    period: "2022-Present",
    icon: MonitorPlay,
  },
  {
    role: "Event Division",
    organization: "Chess Club",
    period: "2022-2023",
    icon: GamepadIcon,
  },
  {
    role: "Head of Creative",
    organization: "Bible Fellowship",
    period: "2023-2024",
    icon: Church,
  },
]

const skills = [
  "Software Development",
  "System Architecture", 
  "Business Modeling",
  "Market Analysis",
  "Entrepreneurship",
  "Problem Solving",
]

export default function EducationPage() {
  const t = useTranslations("education")

  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
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

        {/* Main Content - Two Column on Desktop */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column - University Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            {/* University Header */}
            <div className="flex items-start gap-4 mb-8">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 p-2 rounded-2xl border-2 shadow-brutal flex-shrink-0"
                style={{ backgroundColor: '#ffffff', borderColor: 'var(--border-color)' }}
              >
                <Image
                  src="/images/sgu-logo.jpg"
                  alt="SGU Logo"
                  width={72}
                  height={72}
                  className="rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="pt-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
                  Swiss German University
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    Tangerang, Indonesia
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    2022 - 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Degree */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Bachelor of Information Technology
                </h2>
                <span 
                  className="px-3 py-1 text-xs font-bold uppercase rounded-full"
                  style={{ backgroundColor: 'var(--accent-lime)', color: 'var(--text-dark)' }}
                >
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Handshake className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Specializing in <span style={{ color: 'var(--text-primary)' }}>Technopreneurship</span>
                </span>
              </div>
            </div>

            {/* About the Journey */}
            <div className="mb-8">
              <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                I'm pursuing a unique path that blends <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>technology with entrepreneurship</span>. 
                My studies focus on building technical expertise while developing the business acumen to 
                turn innovative ideas into real-world solutions.
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Beyond academics, I actively participate in campus organizations where I've developed 
                leadership skills, creative direction, and event management experience.
              </p>
            </div>

            {/* Skills as flowing tags */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="px-4 py-2 text-sm font-medium rounded-full border-2 transition-all hover:-translate-y-0.5"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Activities & Campus Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Campus Image */}
            <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/sgu-location.webp"
                alt="Swiss German University Campus"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/80">
                Campus Life
              </span>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
                Campus Activities
              </h3>
              
              <div className="space-y-0">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-3 py-3 border-b last:border-b-0"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <div 
                      className="w-8 h-8 flex items-center justify-center rounded-lg"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                      <activity.icon className="w-4 h-4" style={{ color: 'var(--text-dark)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {activity.role}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {activity.organization}
                      </div>
                    </div>
                    <span className="text-xs tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                      {activity.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
