import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Sample hackathon data - replace with your actual data
const hackathons = [
  {
    id: 1,
    title: "PwC Capture the Flag - Hackaday Event",
    image: "/images/hackathon/PWC-Hackathon.jpg",
  },
  {
    id: 2,
    title: "Blockchain Training Documentation",
    image: "/images/hackathon/web3-training-documentation.jpg",
  },
  {
    id: 3,
    title: "AI Hackathon Held By AI Indonesia Society",
    image: "/images/hackathon/AI-Hackathon1.jpg",
  },
  {
    id: 4,
    title: "PwC Capture the Flag - Hackaday Event",
    image: "/images/hackathon/Pwc-hackathon-2024.jpg",
  },
  {
    id: 5,
    title: "Software Development Workshop held by commsult",
    image: "/images/hackathon/commsult-software-workshop.jpeg",
  },
  {
    id: 6,
    title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
    image: "/images/hackathon/web3-networking-event.jpeg",
  },
  {
    id: 7,
    title: "Blockchain Workshop and Training by Pelita Bangsa Academy",
    image: "/images/Blockchain1.jpeg",
  },
  {
    id: 8,
    title: "SGU IT Symposium & Project Showcase",
    image: "/images/Symposium1.jpeg",
  },
  {
    id: 9,
    title: "SGU IT Symposium & Project Showcase",
    image: "/images/Symposium2.jpeg",
  },
  {
    id: 10,
    title: "SGU IT Symposium & Project Showcase",
    image: "/images/Symposium3.jpeg",
  },

]

export default function Hackathon() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

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

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1 === hackathons.length ? 0 : prevIndex + 1))
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? hackathons.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [handleNext])

  return (
<section id="hackathon" className="min-h-[80vh] py-10 md:py-20 relative overflow-hidden">
{/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-6 relative">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Hackathon Experiences
          </span>
        </motion.h2>

        <div className="relative w-full max-w-4xl mx-auto aspect-video px-2 md:px-6">
          {/* Subtle slider glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500" />

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
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                {/* Glass effect border */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl p-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl" />
                </div>

                {/* Image container */}
                <div className="absolute inset-1 overflow-hidden rounded-lg">
                  <Image
                    src={hackathons[currentIndex].image || "/placeholder.svg"}
                    alt={hackathons[currentIndex].title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-semibold text-white text-center">{hackathons[currentIndex].title}</h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Next slide"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
