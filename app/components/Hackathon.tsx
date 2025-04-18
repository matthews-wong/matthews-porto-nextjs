"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample hackathon data - using the same data structure
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

export default function HackathonGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const fullscreenRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Track visible cards for performance optimization
  useEffect(() => {
    if (!isMobile || !mobileScrollRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIndices = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number.parseInt(entry.target.getAttribute("data-index") || "0"))

        setVisibleCards(visibleIndices)
      },
      {
        root: mobileScrollRef.current,
        rootMargin: "50px 0px",
        threshold: 0.1,
      },
    )

    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.setAttribute("data-index", index.toString())
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [isMobile])

  // Scroll to active card on mobile
  useEffect(() => {
    if (isMobile && mobileScrollRef.current) {
      const activeCardIndex = Math.min(2, hackathons.length - 1)

      // Add a small delay to ensure the DOM is fully rendered
      setTimeout(() => {
        if (cardRefs.current[activeCardIndex]) {
          // Use a more precise scrolling method
          const card = cardRefs.current[activeCardIndex]
          const container = mobileScrollRef.current

          if (card && container) {
            const cardRect = card.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()

            const scrollTop = card.offsetTop - container.offsetTop - containerRect.height / 2 + cardRect.height / 2

            container.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            })
          }
        }
      }, 600)
    }
  }, [isMobile])

  // Handle navigation
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hackathons.length)
    setShowInfo(false)
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hackathons.length) % hackathons.length)
    setShowInfo(false)
  }, [])

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
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
  }, [])

  // Handle autoplay toggle
  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => !prev)
  }, [])

  // Toggle detailed information
  const toggleInfo = useCallback(() => {
    setShowInfo((prev) => !prev)
  }, [])

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

    if (isAutoplay && !isMobile) {
      timer = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => clearInterval(timer)
  }, [isAutoplay, handleNext, isMobile])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape" && isFullscreen) document.exitFullscreen()
      if (e.key === "i") toggleInfo()
      // Remove the space key handler
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrevious, isFullscreen, toggleAutoplay, toggleInfo])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrevious()
    }
  }

  const preloadImages = useCallback(() => {
    if (typeof window === "undefined") return

    const nextIndex = (currentIndex + 1) % hackathons.length
    const prevIndex = (currentIndex - 1 + hackathons.length) % hackathons.length

    // Use a single Image instance and load images sequentially
    const preloader = new window.Image()

    // Load next image first (more likely to be needed)
    preloader.onload = () => {
      // After next image is loaded, load previous image
      preloader.src = hackathons[prevIndex].image
    }

    // Start loading next image
    preloader.src = hackathons[nextIndex].image
  }, [currentIndex])

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    preloadImages()
  }, [currentIndex, preloadImages])

  // Mobile Card Component with Parallax Effect
  const MobileCard = ({ hackathon, index }: { hackathon: (typeof hackathons)[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const isVisible = visibleCards.includes(index) || visibleCards.length === 0

    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
    })

    // Enhanced parallax effects - more subtle and performant
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.97])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

    // Removed rotateX for better performance
    // const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -3])

    // Image parallax effect (more subtle)
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -10])

    return (
      <motion.div
        ref={(el) => {
          cardRef.current = el
          cardRefs.current[index] = el
        }}
        style={{
          y,
          scale,
          opacity,
          transformPerspective: 1200,
        }}
        className="mb-12 last:mb-24 px-4 max-w-md mx-auto w-full"
        initial={{ opacity: 0.8, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05, // Reduced delay for faster rendering
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(8,_112,_184,_0.15)] border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-sm">
          <div className="relative h-56 w-full overflow-hidden">
            {isVisible && (
              <motion.div style={{ y: imageY }} className="h-full w-full">
                <Image
                  src={hackathon.image || "/placeholder.svg"}
                  alt={hackathon.title}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  priority={index < 3}
                  quality={85}
                  loading={index < 5 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            )}

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white drop-shadow-md">{hackathon.title}</h3>
            </div>
          </div>

          <div className="p-5 bg-black/20">
            <p className="text-sm text-white mb-3 drop-shadow-sm">{hackathon.shortDesc}</p>
            <p className="text-sm text-gray-200">{hackathon.description}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  // Mobile Storytelling View with Improved Scrolling
  const MobileGalleryView = () => {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <motion.div
          className="mb-8 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300">
            Hackathon Experiences
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-purple-500 mx-auto rounded-full mt-3"></div>
        </motion.div>

        <div
          ref={mobileScrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden pb-16 pt-2 scroll-smooth will-change-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch", // Add smooth scrolling for iOS
          }}
        >
          <style jsx global>{`
            #mobile-gallery-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div id="mobile-gallery-container" ref={cardsContainerRef} className="relative">
            {hackathons.map((hackathon, index) => (
              <MobileCard key={hackathon.id} hackathon={hackathon} index={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop Gallery View with 3D Effects
  const DesktopGalleryView = () => {
    // Animation variants
    const slideVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9,
        rotateY: direction > 0 ? 15 : -15,
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9,
        rotateY: direction < 0 ? 15 : -15,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      }),
    }

    // Thumbnail animation
    const thumbnailVariants = {
      inactive: {
        opacity: 0.5,
        scale: 0.9,
        filter: "grayscale(100%) brightness(70%)",
      },
      active: {
        opacity: 1,
        scale: 1,
        filter: "grayscale(0%) brightness(100%)",
      },
    }

    return (
      <div
        className="container mx-auto px-4 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300">
            Hackathon Experiences
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-purple-500 mx-auto rounded-full mt-3"></div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-5xl aspect-[16/9]">
          <div className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_20px_80px_rgba(8,_112,_184,_0.3)]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-sm rounded-xl p-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-500/10 rounded-xl" />
            </div>

            {/* Main image carousel - separate image from caption for stable title */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Static caption section that doesn't animate with image changes */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10",
                  showInfo ? "h-full flex flex-col justify-end" : "",
                )}
              >
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                    {hackathons[currentIndex].title}
                  </h3>
                  <p className="text-base text-gray-300">{hackathons[currentIndex].shortDesc}</p>

                  {showInfo && (
                    <motion.div
                      key={`info-${currentIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mt-4"
                    >
                      <p className="text-base text-gray-200 max-w-3xl">{hackathons[currentIndex].description}</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Image container with animations */}
              <AnimatePresence initial={false} custom={currentIndex} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 perspective-1000"
                >
                  <div className="absolute inset-0.5 rounded-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src={hackathons[currentIndex].image || "/placeholder.svg"}
                        alt={hackathons[currentIndex].title}
                        fill
                        sizes="(max-width: 1200px) 80vw, 70vw"
                        priority={currentIndex === 0}
                        className={cn(
                          "object-cover transition-all duration-700",
                          isFullscreen ? "object-contain" : "object-cover",
                          showInfo ? "brightness-50" : "brightness-100 hover:scale-105",
                        )}
                        onLoadingComplete={() => setIsLoading(false)}
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Control buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={toggleInfo}
                className={cn(
                  "p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500",
                  showInfo ? "bg-purple-500 text-white" : "bg-black/50 text-white hover:bg-black/70",
                )}
                aria-label={showInfo ? "Hide details" : "Show details"}
              >
                <Info size={16} />
              </button>
              <button
                onClick={toggleAutoplay}
                className={cn(
                  "p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500",
                  isAutoplay ? "bg-purple-500 text-white" : "bg-black/50 text-white hover:bg-black/70",
                )}
                aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-20 right-6 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
              {currentIndex + 1} / {hackathons.length}
            </div>
          </div>
        </div>

        {/* Thumbnails row with improved styling */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="relative overflow-hidden px-1">
            <div className="flex gap-3 overflow-x-auto py-3 px-1 scrollbar-hide snap-x snap-mandatory">
              {hackathons.map((hackathon, index) => (
                <motion.div
                  key={hackathon.id}
                  variants={thumbnailVariants}
                  initial="inactive"
                  animate={currentIndex === index ? "active" : "inactive"}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "shrink-0 cursor-pointer snap-start",
                    "w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden",
                    "border-2 transition-all duration-300 transform hover:scale-105",
                    currentIndex === index ? "border-purple-500 ring-2 ring-purple-500/50" : "border-transparent",
                  )}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={hackathon.image || "/placeholder.svg"}
                      alt={`Thumbnail for ${hackathon.title}`}
                      fill
                      sizes="100px"
                      className={cn(
                        "object-cover transition-all duration-500",
                        currentIndex === index ? "scale-110" : "scale-100",
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fullscreen View with Enhanced Experience
  const FullscreenView = () => {
    return (
      <>
        <div className="fixed inset-0 bg-black z-40"></div>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full max-h-screen">
            <div className="relative w-full h-full overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={hackathons[currentIndex].image || "/placeholder.svg"}
                      alt={hackathons[currentIndex].title}
                      fill
                      sizes="100vw"
                      priority
                      className={cn(
                        "object-contain transition-transform duration-500",
                        showInfo ? "brightness-50" : "brightness-100",
                      )}
                    />
                  </div>

                  <motion.div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent",
                      showInfo ? "h-full flex flex-col justify-end" : "",
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-3xl font-semibold text-white mb-2">{hackathons[currentIndex].title}</h3>
                      <p className="text-lg text-gray-300">{hackathons[currentIndex].shortDesc}</p>

                      {showInfo && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="mt-6"
                        >
                          <p className="text-lg text-gray-200 max-w-3xl">{hackathons[currentIndex].description}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons - larger in fullscreen */}
              <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={28} />
              </button>

              {/* Control buttons */}
              <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                <button
                  onClick={toggleInfo}
                  className={cn(
                    "p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500",
                    showInfo ? "bg-purple-500 text-white" : "bg-black/50 text-white hover:bg-black/70",
                  )}
                  aria-label={showInfo ? "Hide details" : "Show details"}
                >
                  <Info size={18} />
                </button>
                <button
                  onClick={toggleAutoplay}
                  className={cn(
                    "p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500",
                    isAutoplay ? "bg-purple-500 text-white" : "bg-black/50 text-white hover:bg-black/70",
                  )}
                  aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoplay ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Exit fullscreen"
                >
                  <Minimize size={18} />
                </button>
              </div>

              {/* Slide counter */}
              <div className="absolute bottom-24 right-8 bg-black/50 text-white px-4 py-2 rounded-full text-base">
                {currentIndex + 1} / {hackathons.length}
              </div>

              {/* Keyboard shortcuts help */}
              <div className="absolute bottom-6 left-6 text-white/70 text-sm">
                <p>
                  Press <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>{" "}
                  <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd> to navigate •{" "}
                  <kbd className="px-2 py-1 bg-white/10 rounded">i</kbd> for info •{" "}
                  <kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd> to pause
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <section
      id="hackathon"
      className="min-h-screen py-8 md:py-16 relative overflow-hidden"
      ref={sectionRef}
      aria-label="Hackathon Experiences Gallery"
    >
      {/* Background effects - only visible when not in fullscreen */}
      {!isFullscreen && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-purple-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        </>
      )}

      <div ref={fullscreenRef} className="relative z-10">
        {isMobile ? <MobileGalleryView /> : isFullscreen ? <FullscreenView /> : <DesktopGalleryView />}
      </div>
    </section>
  )
}
