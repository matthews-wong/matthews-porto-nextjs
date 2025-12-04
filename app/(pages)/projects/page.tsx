"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize, Info, Folder } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  image?: string
  images?: string[]
  description: string
  features: string[]
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "STADPASS - Stadium Navigation App",
    image: "/images/STADPASS Project.jpeg",
    description: "A mobile app designed to help users navigate stadiums using Bluetooth Low Energy (BLE) technology.",
    features: [
      "Real-time indoor navigation using BLE beacons.",
      "Interactive stadium maps with points of interest.",
      "Seamless integration with ticketing systems.",
      "User-friendly interface for quick wayfinding.",
      "In-app food purchase with real-time booth owner notifications",
    ],
    category: "Mobile App",
  },
  {
    id: 2,
    title: "Observer KPU - Election Web App with LLM",
    image: "/images/Observer KPU Project.jpeg",
    description:
      "An all-in-one election news resource with automated web scraping and an AI chatbot tuned with election and candidate data.",
    features: [
      "Automated web scraping for real-time election news.",
      "AI chatbot powered by a fine-tuned Large Language Model (LLM).",
      "Comprehensive candidate and election data analysis.",
      "User-friendly dashboard for election insights.",
    ],
    category: "Web App",
  },
  {
    id: 3,
    title: "Credit Risk Analysis with XGBoost",
    images: [
      "/images/rakamin/rakamin-01.png",
      "/images/rakamin/rakamin-04.png",
      "/images/rakamin/rakamin-05.png",
      "/images/rakamin/rakamin-06.png",
      "/images/rakamin/rakamin-07.png",
    ],
    description: "Developed a comprehensive credit risk analysis using advanced XGBoost modeling techniques.",
    features: [
      "Built predictive models for risk assessment and mitigation.",
      "Delivered actionable insights through data visualization.",
      "Enhanced financial performance through strategic risk management.",
      "Conducted exploratory data analysis (EDA) to uncover key patterns.",
    ],
    category: "Data Science",
  },
  {
    id: 4,
    title: "Security Onion - Network Monitoring",
    images: [
      "/images/1.png",
      "/images/5.png",
      "/images/6.png",
      "/images/7.png",
      "/images/8.png",
    ],
    description: "Developed and implemented a comprehensive network security monitoring solution using Security Onion.",
    features: [
      "Deployed Security Onion on a cloud server for network monitoring.",
      "Simulated network attacks (HTTP load tests, SSH brute force, DoS).",
      "Analyzed logs and alerts to identify attack patterns.",
      "Automated log parsing and Webhook Alert to Discord",
    ],
    category: "Security",
  },
]

interface FullscreenModalProps {
  project: Project
  onClose: () => void
  initialImageIndex?: number
}

const FullscreenModal = ({ project, onClose, initialImageIndex = 0 }: FullscreenModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex)
  const [showInfo, setShowInfo] = useState(false)
  const images = project.images || (project.image ? [project.image] : [])

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'rgba(46, 46, 46, 0.98)' }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 border-b-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} onClick={(e) => e.stopPropagation()}>
        <div className="text-lg font-bold truncate max-w-[60%]" style={{ color: 'var(--text-primary)' }}>{project.title}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={cn("p-2 border-2 transition-all", showInfo ? "shadow-brutal" : "")}
            style={{ 
              backgroundColor: showInfo ? 'var(--accent-primary)' : 'var(--bg-primary)', 
              color: showInfo ? 'var(--text-dark)' : 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
          >
            <Info size={20} />
          </button>
          <button 
            onClick={onClose} 
            className="p-2 border-2 transition-all hover:shadow-brutal"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-w-7xl max-h-[80vh] mx-auto">
          <Image src={images[currentIndex]} alt={project.title} fill className="object-contain" />
        </div>

        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev} 
              className="absolute left-4 p-3 border-2 transition-all hover:shadow-brutal"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-4 p-3 border-2 transition-all hover:shadow-brutal"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              <ChevronRight size={24} />
            </button>
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 border-2 text-sm font-bold"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute bottom-0 left-0 right-0 p-6 max-h-[50vh] overflow-y-auto border-t-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start text-base" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mr-3 mt-1 w-2 h-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const t = useTranslations("projects")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...new Set(projects.map((p) => p.category))]
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 w-1 h-full opacity-20" style={{ backgroundColor: 'var(--accent-primary)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl relative z-10">
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
              <Folder className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
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

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2 text-sm font-bold uppercase border-2 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={
                activeCategory === category
                  ? { backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)', boxShadow: '3px 3px 0px var(--shadow-color)' }
                  : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
              }
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-2 overflow-hidden group transition-all duration-300 shadow-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              {/* Image */}
              <div
                className="relative aspect-video cursor-pointer overflow-hidden border-b-2"
                style={{ borderColor: 'var(--border-color)' }}
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.images?.[0] || project.image || ""}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1.5 text-xs font-bold uppercase border-2"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* View button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="px-5 py-2.5 font-bold uppercase flex items-center gap-2 border-2 shadow-brutal"
                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                  >
                    <Maximize size={16} />
                    View Project
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-base mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1.5 font-medium border"
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      {feature.split(" ").slice(0, 3).join(" ")}...
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <FullscreenModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
