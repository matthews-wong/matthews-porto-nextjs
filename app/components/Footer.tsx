"use client"

import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp, FaCodepen } from "react-icons/fa"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollButton(latest > 300)
  })

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/MatthewsWongOfficial", label: "GitHub" },
    { icon: FaEnvelope, href: "mailto:matthewswong2610@gmail.com", label: "Email" },
    { icon: FaCodepen, href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer id="contact" className="bg-slate-900/60 backdrop-blur-lg py-16 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 ${
          showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollButton ? 1 : 0, y: showScrollButton ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp size={16} />
      </motion.button>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect!
        </motion.h2>
        <motion.div
          className="flex justify-center flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ y: 0, scale: 1 }}
              >
                <IconComponent size={24} />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            )
          })}
        </motion.div>
        <motion.p
          className="text-xs sm:text-sm text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          © 2025 Matthews Wong. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

