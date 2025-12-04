"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

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
  const images = project.images || (project.image ? [project.image] : [])

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-white/60">{project.category}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Image */}
      <div className="flex-grow flex items-center justify-center relative px-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-w-6xl max-h-[70vh]">
          <Image src={images[currentIndex]} alt={project.title} fill className="object-contain" />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Footer with dots and info */}
      <div className="p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mb-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
        <p className="text-center text-white/70 text-sm max-w-2xl mx-auto">{project.description}</p>
      </div>
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

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === category
                  ? ''
                  : 'hover:opacity-80'
              }`}
              style={
                activeCategory === category
                  ? { backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }
                  : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
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
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src={project.images?.[0] || project.image || ""}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: 'white', color: 'var(--text-dark)' }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
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
