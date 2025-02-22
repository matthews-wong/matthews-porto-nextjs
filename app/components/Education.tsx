"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { FC } from "react"

interface FloatingOrbProps {
  className?: string
}

interface Activity {
  role: string
  organization: string
  period: string
}

const FloatingOrb: FC<FloatingOrbProps> = ({ className }) => (
  <div className={`absolute w-64 h-64 rounded-full ${className}`} />
)

const Education: FC = () => {
  const activities: Activity[] = [
    {
      role: "Secretary",
      organization: "Badminton Club",
      period: "Aug 2022-Jan 2024",
    },
    {
      role: "Member",
      organization: "IT Student Association /Himaprodi",
      period: "Aug 2022 - Present",
    },
    {
      role: "Event Division",
      organization: "Chess Club",
      period: "Aug 2022 - Aug 2023",
    },
    {
      role: "Head of Creative Division",
      organization: "SGU BibleFellowship",
      period: "Dec 2023 - Present",
    },
  ]

  return (
    <section id="education" className="min-h-screen py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Side effects */}
      <div className="absolute -left-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-blue-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 left-12 w-1 h-32 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse" />
      </div>

      <div className="absolute -right-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-indigo-500/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-12 w-1 h-32 bg-gradient-to-b from-indigo-500/50 to-transparent animate-pulse delay-300" />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute right-1/4 top-2/3 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-300" />
        <div className="absolute left-1/3 bottom-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-ping delay-700" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
            Education
          </span>
        </motion.h2>

        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative group">
            {/* Glass card effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="glass-effect p-8 md:p-12 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 relative">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <motion.div
                    className="rounded-2xl overflow-hidden shadow-lg relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <Image
                      src="https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/swiss-german-5beba9eeaeebe136642cd0b8.jpg?raw=true"
                      alt="Swiss German University"
                      width={240}
                      height={180}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    Swiss German University
                  </h3>
                  <p className="text-xl md:text-2xl text-indigo-400 mb-2">
                    Bachelor&apos;s degree, Information Technology
                  </p>
                  <p className="text-lg md:text-xl text-slate-300 mb-4">Aug 2022 - Aug 2026</p>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 text-white/90">Activities and societies:</h4>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 text-base md:text-lg">
                    {activities.map((activity, index) => (
                      <li key={index} className="transition-colors duration-300 hover:text-blue-400">
                        {activity.organization} - {activity.role} ({activity.period})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education

