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
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent" onClick={(e) => e.stopPropagation()}>
        <div className="text-white text-lg font-medium truncate max-w-[60%]">{project.title}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={cn("p-2 rounded-full transition-all", showInfo ? "bg-blue-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}
          >
            <Info size={20} />
          </button>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
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
            <button onClick={handlePrev} className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
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
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-black/70 backdrop-blur-md p-6 max-h-[50vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-slate-300 mb-4">{project.description}</p>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start text-slate-200">
                  <span className="text-blue-400 mr-2">•</span> {feature}
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
              <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
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
              className="card card-hover overflow-hidden group"
            >
              {/* Image */}
              <div
                className="relative aspect-video cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.images?.[0] || project.image || ""}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary text-xs">
                    {project.category}
                  </span>
                </div>

                {/* View button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-5 py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg text-slate-900 dark:text-white font-medium flex items-center gap-2 shadow-lg">
                    <Maximize size={16} />
                    View Project
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
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
