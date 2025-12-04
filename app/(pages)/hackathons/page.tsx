"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, Calendar, Users } from "lucide-react"
import { useTranslations } from "next-intl"

const hackathons = [
  {
    id: 1,
    title: "PwC Capture the Flag",
    event: "Hackaday Event",
    date: "2023",
    description: "Participated in a cybersecurity challenge organized by PwC, focusing on identifying vulnerabilities and securing systems.",
    image: "/images/hackathon/PWC-Hackathon.jpg",
    achievements: ["Top 20 Finalist", "Security Challenge"],
  },
  {
    id: 2,
    title: "Blockchain Training",
    event: "Pelita Bangsa Academy",
    date: "2024",
    description: "An intensive full-day, one-week workshop focusing on Web3 technologies and smart contract development.",
    image: "/images/hackathon/web3-training-documentation.jpg",
    achievements: ["Certificate of Completion", "Web3 Skills"],
  },
  {
    id: 3,
    title: "AI Hackathon",
    event: "AI Indonesia Society",
    date: "2024",
    description: "Built a predictive model for insurance and analyzed data patterns during this 2-day hackathon.",
    image: "/images/hackathon/AI-Hackathon1.jpg",
    achievements: ["ML Model Development", "Data Analysis"],
  },
  {
    id: 4,
    title: "PwC CTF 2024",
    event: "Annual Hackaday",
    date: "2024",
    description: "Engaged in advanced cybersecurity challenges with real-world threat scenarios at PwC Indonesia's annual event.",
    image: "/images/hackathon/Pwc-hackathon-2024.jpg",
    achievements: ["Security Expert", "Problem Solving"],
  },
  {
    id: 5,
    title: "Software Development Workshop",
    event: "Commsult Indonesia",
    date: "2024",
    description: "Comprehensive workshop on software development best practices. Won Best Project award and earned internship.",
    image: "/images/hackathon/commsult-software-workshop.jpeg",
    achievements: ["Best Project", "Internship Offer"],
  },
  {
    id: 6,
    title: "Web3 Networking Event",
    event: "Pelita Bangsa Academy",
    date: "2024",
    description: "Networked with Web3 developers and attended sessions featuring Indodax speakers.",
    image: "/images/hackathon/web3-networking-event.jpeg",
    achievements: ["Industry Networking", "Web3 Insights"],
  },
  {
    id: 7,
    title: "Blockchain Bootcamp",
    event: "Pelita Bangsa Academy",
    date: "2024",
    description: "Deep dive into Web3 concepts, use cases, and the tech stack involved in real-world blockchain implementations.",
    image: "/images/Blockchain1.jpeg",
    achievements: ["Blockchain Fundamentals", "Smart Contracts"],
  },
  {
    id: 8,
    title: "IT Symposium",
    event: "SGU Project Showcase",
    date: "2024",
    description: "Showcased our innovative web application, Observer KPU—a 2024 election web app integrated with LLM technology.",
    image: "/images/Symposium1.jpeg",
    achievements: ["Most Favorite Project", "Best Presentation"],
  },
]

export default function HackathonsPage() {
  const t = useTranslations("hackathons")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % hackathons.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + hackathons.length) % hackathons.length)
  }, [])

  useEffect(() => {
    if (!isAutoplay) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [isAutoplay, handleNext])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
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
              <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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

        {/* Featured Carousel */}
        <div className="max-w-5xl mx-auto mb-16" ref={containerRef}>
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={hackathons[currentIndex].image}
                  alt={hackathons[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathons[currentIndex].achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-xs text-blue-200 font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {hackathons[currentIndex].title}
                  </h2>
                  <div className="flex items-center gap-4 text-slate-300 text-sm mb-3">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {hackathons[currentIndex].event}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {hackathons[currentIndex].date}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl">{hackathons[currentIndex].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium">
              {currentIndex + 1} / {hackathons.length}
            </div>

            {/* Autoplay control */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/20 transition-all"
            >
              {isAutoplay ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {hackathons.map((hackathon, index) => (
              <button
                key={hackathon.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-blue-500 ring-2 ring-blue-500/30"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={hackathon.image}
                  alt={hackathon.title}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* All Events Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">All Events</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer group rounded-xl overflow-hidden border transition-all duration-300 ${
                  index === currentIndex
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={hackathon.image}
                    alt={hackathon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs text-white/80">{hackathon.date}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-0.5 line-clamp-1">{hackathon.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{hackathon.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
