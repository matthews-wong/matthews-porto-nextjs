"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// TypeScript interfaces
interface Project {
  id: number
  title: string
  image?: string
  images?: string[]
  description: string
  features: string[]
  totalUsers?: number
}

interface FullscreenModalProps {
  project: Project
  onClose: () => void
  initialImageIndex?: number
}

interface ImageSliderProps {
  images: string[]
  title: string
  onFullscreen?: (index: number) => void
}

// Enhanced Fullscreen Modal Component
const FullscreenModal: React.FC<FullscreenModalProps> = ({ project, onClose, initialImageIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([initialImageIndex]))

  const images = project.images || (project.image ? [project.image] : [])

  const handleNext = useCallback(() => {
    if (images.length <= 1) return
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentIndex(nextIndex)
    setLoadedImages((prev) => new Set([...prev, nextIndex]))
  }, [currentIndex, images.length])

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(prevIndex)
    setLoadedImages((prev) => new Set([...prev, prevIndex]))
  }, [currentIndex, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") onClose()
      if (e.key === "i") setShowInfo((prev) => !prev)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev, onClose])

  // Preload adjacent images
  useEffect(() => {
    if (images.length <= 1) return

    const nextIndex = (currentIndex + 1) % images.length
    const prevIndex = (currentIndex - 1 + images.length) % images.length

    setLoadedImages((prev) => new Set([...prev, nextIndex, prevIndex]))
  }, [currentIndex, images.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
      onClick={onClose}
    >
      {/* Top bar with controls */}
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white text-lg font-medium truncate max-w-[60%]">{project.title}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className={cn(
              "p-2 rounded-full transition-all",
              showInfo ? "bg-blue-500 text-white" : "bg-black/50 text-white hover:bg-black/70",
            )}
            aria-label={showInfo ? "Hide info" : "Show info"}
          >
            <Info size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            aria-label="Close fullscreen"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          {images.map(
            (src, index) =>
              loadedImages.has(index) && (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full max-w-7xl max-h-[80vh] mx-auto">
                    {isLoading && index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      onLoadingComplete={() => {
                        if (index === currentIndex) setIsLoading(false)
                      }}
                    />
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-4 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all transform hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all transform hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Project info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-black/70 backdrop-blur-md p-6 max-h-[50vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              {project.title}
            </h3>
            <p className="text-slate-300 mb-4 text-base leading-relaxed">{project.description}</p>
            <h4 className="text-lg font-semibold mb-2 text-blue-400">Key Features:</h4>
            <ul className="list-none text-slate-200 text-base space-y-2 mb-6">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
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

// Optimized Image Slider Component
const ImageSlider: React.FC<ImageSliderProps> = ({ images, title, onFullscreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])) // Only load first image initially

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentIndex(nextIndex)
    // Preload next image
    setLoadedImages((prev) => new Set([...prev, nextIndex, (nextIndex + 1) % images.length]))
  }, [currentIndex, images.length])

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(prevIndex)
    // Preload previous image
    setLoadedImages((prev) => new Set([...prev, prevIndex, (prevIndex - 1 + images.length) % images.length]))
  }, [currentIndex, images.length])

  return (
    <div className="relative w-full aspect-video bg-slate-800/50 rounded-lg overflow-hidden group">
      <div className="relative w-full h-full">
        {/* Only render images that have been viewed or are adjacent */}
        {images.map(
          (src, index) =>
            loadedImages.has(index) && (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0} // Only prioritize first image
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ),
        )}
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white transition-all transform hover:bg-black/70 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white transition-all transform hover:bg-black/70 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {onFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFullscreen(currentIndex)
            }}
            className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white transition-all transform hover:bg-black/70 hover:scale-110"
            aria-label="View fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// ProjectCard Component with lazy loading
const ProjectCard: React.FC<{
  project: Project
  isFeature: boolean
  onOpenFullscreen: (project: Project, initialIndex?: number) => void
}> = ({ project, isFeature, onOpenFullscreen }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <motion.div
      className="relative w-full md:w-4/5 mx-auto group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 h-full flex flex-col">
        {isFeature && project.image ? (
          <div
            className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-t-xl"
            onClick={() => onOpenFullscreen(project)}
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              onLoadingComplete={() => setIsImageLoaded(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenFullscreen(project)
                }}
              >
                <Maximize size={16} />
                <span>View Fullscreen</span>
              </button>
            </div>
          </div>
        ) : project.images ? (
          <div className="p-4 pb-0 cursor-pointer" onClick={() => onOpenFullscreen(project)}>
            <ImageSlider
              images={project.images}
              title={project.title}
              onFullscreen={(index) => onOpenFullscreen(project, index)}
            />
          </div>
        ) : null}

        <div className="p-4 flex-grow flex flex-col">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {project.title}
          </h3>
          <p className="text-slate-300 mb-4 text-base leading-relaxed flex-grow">{project.description}</p>
          <div className="mt-auto">
            <h4 className="text-lg font-semibold mb-2 text-indigo-400">
              {isFeature ? "Main Features:" : "Key Highlights:"}
            </h4>
            <ul className="list-none text-slate-200 text-base space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start hover:text-blue-300 transition-colors duration-300">
                  <span className="text-indigo-400 mr-2">•</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Project data
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
  },
]

const otherProjects: Project[] = [
  {
    id: 3,
    title: "Credit Risk Analysis and Prediction Modeling with XGBoost",
    images: [
      "/images/rakamin/rakamin-01.png",
      "/images/rakamin/rakamin-04.png",
      "/images/rakamin/rakamin-05.png",
      "/images/rakamin/rakamin-06.png",
      "/images/rakamin/rakamin-07.png",
      "/images/rakamin/rakamin-08.png",
      "/images/rakamin/rakamin-09.png",
      "/images/rakamin/rakamin-10.png",
      "/images/rakamin/rakamin-11.png",
      "/images/rakamin/rakamin-12.png",
      "/images/rakamin/rakamin-13.png",
      "/images/rakamin/rakamin-14.png",
      "/images/rakamin/rakamin-15.png",
      "/images/rakamin/rakamin-16.png",
      "/images/rakamin/rakamin-17.png",
      "/images/rakamin/rakamin-18.png",
      "/images/rakamin/rakamin-19.png",
      "/images/rakamin/rakamin-20.png",
      "/images/rakamin/rakamin-21.png",
      "/images/rakamin/rakamin-22.png",
    ],
    description: "Developed a comprehensive credit risk analysis using advanced XGBoost modeling techniques.",
    features: [
      "Built predictive models for risk assessment and mitigation.",
      "Delivered actionable insights through data visualization.",
      "Enhanced financial performance through strategic risk management.",
      "Conducted exploratory data analysis (EDA) to uncover key patterns and trends",
      "Skills: Exploratory Data Analysis, Data Modeling, XGBoost, Python.",
    ],
  },
  {
    id: 4,
    title: "Security Onion - Network Monitoring with Zeek",
    images: [
      "/images/1.png",
      "/images/5.png",
      "/images/6.png",
      "/images/7.png",
      "/images/8.png",
      "/images/9.png",
      "/images/10.png",
      "/images/17.png",
      "/images/18.png",
      "/images/19.png",
      "/images/20.png",
      "/images/21.png",
      "/images/22.png",
      "/images/23.png",
      "/images/24.png",
      "/images/25.png",
      "/images/26.png",
      "/images/27.png",
      "/images/28.png",
    ],
    description: "Developed and implemented a comprehensive network security monitoring solution using Security Onion.",
    features: [
      "Deployed Security Onion on a cloud server for network monitoring.",
      "Simulated network attacks (HTTP load tests, SSH brute force, DoS).",
      "Analyzed logs and alerts to identify attack patterns.",
      "Provided actionable insights to strengthen network defenses.",
      "Automated log parsing and Webhook Alert to Discord",
      "Skills: Security Onion, SIEM, Network Traffic Analysis, Log Analysis.",
    ],
  },
]

const Projects: React.FC = () => {
  const [fullscreenProject, setFullscreenProject] = useState<{ project: Project; initialIndex?: number } | null>(null)

  const handleOpenFullscreen = useCallback((project: Project, initialIndex = 0) => {
    setFullscreenProject({ project, initialIndex })
  }, [])

  return (
    <section id="projects" className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-4 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isFeature={true} onOpenFullscreen={handleOpenFullscreen} />
          ))}
        </div>

        <motion.h3
          className="text-3xl md:text-4xl font-extrabold mb-6 text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Other Projects
          </span>
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isFeature={false} onOpenFullscreen={handleOpenFullscreen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreenProject && (
          <FullscreenModal
            project={fullscreenProject.project}
            initialImageIndex={fullscreenProject.initialIndex}
            onClose={() => setFullscreenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
