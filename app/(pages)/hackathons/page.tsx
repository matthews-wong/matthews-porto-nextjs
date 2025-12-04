"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Award } from "lucide-react"
import { useTranslations } from "next-intl"

const hackathons = [
  {
    id: 1,
    title: "PwC Capture the Flag",
    event: "Hackaday Event",
    date: "2023",
    description: "Participated in a cybersecurity challenge organized by PwC, focusing on identifying vulnerabilities and securing systems.",
    image: "/images/hackathon/PWC-Hackathon.jpg",
    achievements: ["Security Challenge"],
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

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
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

        {/* Featured Carousel */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Achievements */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hackathons[currentIndex].achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5"
                        style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
                      >
                        <Award className="w-3 h-3" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl md:text-3xl font-bold mb-2 text-white">
                    {hackathons[currentIndex].title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-3 text-white/70">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                      {hackathons[currentIndex].event}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                      {hackathons[currentIndex].date}
                    </span>
                  </div>
                  
                  <p className="text-sm md:text-base text-white/80 max-w-2xl line-clamp-2 md:line-clamp-none">
                    {hackathons[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Top controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white text-sm"
              >
                {isAutoplay ? "⏸" : "▶"}
              </button>
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                {currentIndex + 1} / {hackathons.length}
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {hackathons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6' : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  opacity: index === currentIndex ? 1 : 0.4
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* All Events Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            All Events
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                onClick={() => setCurrentIndex(index)}
                className="cursor-pointer group"
              >
                <div 
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-2 transition-all duration-300 ${
                    index === currentIndex ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ 
                    ringColor: 'var(--accent-primary)',
                    ringOffsetColor: 'var(--bg-primary)'
                  }}
                >
                  <Image
                    src={hackathon.image}
                    alt={hackathon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Date badge */}
                  <div className="absolute bottom-2 left-2">
                    <span 
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-black/50 text-white backdrop-blur-sm"
                    >
                      {hackathon.date}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {index === currentIndex && (
                    <div 
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  )}
                </div>
                
                <h4 
                  className="font-medium text-sm line-clamp-1 mb-0.5 group-hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {hackathon.title}
                </h4>
                <p 
                  className="text-xs line-clamp-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {hackathon.event}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
