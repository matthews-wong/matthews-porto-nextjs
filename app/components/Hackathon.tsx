"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from "react-icons/fa"
import { MdOutlinePhotoLibrary } from "react-icons/md"
import Head from "next/head"

// Sample hackathon data - replace with your actual data
const hackathons = [
  {
    id: 1,
    title: "PwC Capture the Flag - Hackaday Event",
    shortDesc: "A cybersecurity challenge focused on identifying vulnerabilities and securing systems.",
    description:
      "Participated in a cybersecurity challenge organized by PwC, focusing on identifying vulnerabilities and securing systems.",
    image: "/images/hackathon/PWC-Hackathon.jpg",
  },
  {
    id: 2,
    title: "Blockchain Training Documentation",
    shortDesc: "Comprehensive documentation of blockchain technologies for enterprise solutions.",
    description:
      "Comprehensive documentation of blockchain technologies and implementation strategies for enterprise solutions.",
    image: "/images/hackathon/web3-training-documentation.jpg",
  },
  {
    id: 3,
    title: "AI Hackathon Held By AI Indonesia Society",
    shortDesc: "Developing innovative AI solutions to address real-world problems.",
    description: "Developed innovative AI solutions to address real-world problems in a collaborative environment.",
    image: "/images/hackathon/AI-Hackathon1.jpg",
  },
  {
    id: 4,
    title: "PwC Capture the Flag - Hackaday Event",
    shortDesc: "Advanced cybersecurity challenge with complex threat scenarios.",
    description: "Second edition of the cybersecurity challenge with advanced threat scenarios and defense strategies.",
    image: "/images/hackathon/Pwc-hackathon-2024.jpg",
  },
  {
    id: 5,
    title: "Software Development Workshop held by commsult",
    shortDesc: "Hands-on workshop covering modern software development practices.",
    description:
      "Hands-on workshop covering modern software development practices and tools for enterprise applications.",
    image: "/images/hackathon/commsult-software-workshop.jpeg",
  },
  {
    id: 6,
    title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
    shortDesc: "Intensive training on blockchain fundamentals and smart contracts.",
    description: "Intensive training on blockchain fundamentals, smart contracts, and decentralized applications.",
    image: "/images/hackathon/web3-networking-event.jpeg",
  },
  {
    id: 7,
    title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
    shortDesc: "Advanced session on blockchain implementation and real-world use cases.",
    description: "Advanced session focusing on blockchain implementation and real-world use cases.",
    image: "/images/Blockchain1.jpeg",
  },
  {
    id: 8,
    title: "SGU IT Symposium & Project Showcase",
    shortDesc: "Presenting innovative IT projects and networking with industry professionals.",
    description:
      "Presented innovative IT projects and networked with industry professionals at this prestigious symposium.",
    image: "/images/Symposium1.jpeg",
  },
  {
    id: 9,
    title: "SGU IT Symposium & Project Showcase",
    shortDesc: "Panel discussions and technology demonstrations at the symposium.",
    description: "Second day of the symposium featuring panel discussions and technology demonstrations.",
    image: "/images/Symposium2.jpeg",
  },
  {
    id: 10,
    title: "SGU IT Symposium & Project Showcase",
    shortDesc: "Showcasing award-winning projects and future technology trends.",
    description: "Final day showcasing award-winning projects and future technology trends.",
    image: "/images/Symposium3.jpeg",
  },
]

export default function Hackathon() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1 === hackathons.length ? 0 : prevIndex + 1))
  }, [])

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? hackathons.length - 1 : prevIndex - 1))
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (fullscreenRef.current?.requestFullscreen) {
        fullscreenRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay)
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isAutoplay) {
      timer = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => clearInterval(timer)
  }, [isAutoplay, handleNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowLeft") handlePrevious()
        if (e.key === "ArrowRight") handleNext()
        if (e.key === "Escape") setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleNext, handlePrevious])

  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Hackathon Experiences | Portfolio</title>
        <meta
          name="description"
          content="Explore my journey through various hackathons, workshops, and tech events. See the projects and experiences that have shaped my technical skills."
        />
        <meta
          name="keywords"
          content="hackathon, tech events, blockchain workshop, AI hackathon, cybersecurity, CTF, software development"
        />
        <meta property="og:title" content="Hackathon Experiences | Portfolio" />
        <meta
          property="og:description"
          content="Explore my journey through various hackathons, workshops, and tech events."
        />
        <meta property="og:image" content={hackathons[0].image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section
        id="hackathon"
        className="min-h-[80vh] py-10 md:py-20 relative overflow-hidden"
        ref={fullscreenRef}
        aria-label="Hackathon Experiences Gallery"
      >
        {/* Fullscreen mode background */}
        {isFullscreen && <div className="fixed inset-0 bg-black z-40"></div>}

        {/* Background effects - only visible when not in fullscreen */}
        {!isFullscreen && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          </>
        )}

        <div
          className={`container mx-auto px-4 relative ${isFullscreen ? "z-50 h-screen flex flex-col justify-center" : ""}`}
        >
          {/* Section heading - hide in fullscreen mode */}
          {!isFullscreen && (
            <motion.div
              className="mb-10 md:mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <MdOutlinePhotoLibrary className="h-7 w-7 text-blue-400" />
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
                  Hackathon Experiences
                </h2>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          )}

          <div
            className={`relative mx-auto ${isFullscreen ? "w-full h-full max-h-screen" : "w-full max-w-4xl aspect-[16/9]"}`}
          >
            {/* Slider container */}
            <div
              className={`relative w-full h-full overflow-hidden rounded-xl ${isFullscreen ? "rounded-none" : "shadow-2xl"}`}
            >
              {/* Glass effect border - only when not in fullscreen */}
              {!isFullscreen && (
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl p-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
                </div>
              )}

              {/* Slides */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Image */}
                    <div className={`absolute inset-0 ${isFullscreen ? "" : "inset-0.5 rounded-lg"}`}>
                      <div className="relative w-full h-full">
                        <Image
                          src={hackathons[currentIndex].image || "/placeholder.svg"}
                          alt={hackathons[currentIndex].title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          priority={currentIndex === 0}
                          className={`object-contain ${isFullscreen ? "object-contain" : "object-cover"} transition-transform duration-300 hover:scale-[1.02]`}
                          onLoadingComplete={() => setIsLoading(false)}
                        />
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                          {hackathons[currentIndex].title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-300">{hackathons[currentIndex].shortDesc}</p>
                        {isFullscreen && (
                          <p className="text-sm md:text-base text-gray-300 mt-3 max-w-3xl">
                            {hackathons[currentIndex].description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={isFullscreen ? 28 : 20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                aria-label="Next slide"
              >
                <FaChevronRight size={isFullscreen ? 28 : 20} />
              </button>

              {/* Controls overlay */}
              <div
                className={`absolute top-4 right-4 flex items-center gap-2 z-20 ${isFullscreen ? "top-6 right-6" : ""}`}
              >
                <button
                  onClick={toggleAutoplay}
                  className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isAutoplay ? "bg-blue-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
                  }`}
                  aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoplay ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
                </button>
              </div>

              {/* Slide counter - visible in both normal and fullscreen modes */}
              <div className="absolute bottom-20 right-6 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
                {currentIndex + 1} / {hackathons.length}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
