"use client"

import type React from "react"
import { useEffect, useRef, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Server, Brain } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface FloatingOrbProps {
  className?: string
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ className }) => (
  <div className={`absolute w-64 h-64 rounded-full ${className}`} />
)

const About: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const bioContent = useMemo(
    () => [
      {
        icon: "👋",
        title: "Hello!",
        content: "I'm Matthews Wong, an Information Technology student at Swiss German University.",
      },
      {
        icon: "🎯",
        title: "Specialization",
        content: "Focusing on Technopreneurship with a passion for innovation.",
      },
      {
        icon: "👨‍💻",
        title: "Current Role",
        content: "DevOps Engineer intern at Commsult Indonesia",
      },
    ],
    [],
  )

  const techStacks = useMemo(
    () => [
      {
        id: "web",
        icon: <Code2 className="w-8 h-8 md:w-10 md:h-10" />,
        title: "Web Development",
        skills: ["Next.js", "React.js", "HTML", "JavaScript", "Express.js", "UI Libraries"],
        gradient: "from-blue-500/20 to-cyan-500/20",
      },
      {
        id: "devops",
        icon: <Server className="w-8 h-8 md:w-10 md:h-10" />,
        title: "DevOps",
        skills: ["Ansible", "NGINX", "Docker", "Prometheus", "CI/CD Pipelines"],
        gradient: "from-purple-500/20 to-pink-500/20",
      },
      {
        id: "ai",
        icon: <Brain className="w-8 h-8 md:w-10 md:h-10" />,
        title: "AI Development",
        skills: ["Python", "XGBoost", "Scikit-Learn", "Hugging Face Transformers"],
        gradient: "from-green-500/20 to-emerald-500/20",
      },
    ],
    [],
  )

  const splitTextIntoSections = useMemo(() => {
    return bioContent.map((section) => (
      <motion.div
        key={section.title}
        className="mb-8 last:mb-0 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center md:h-[100px] gap-4 bg-white/5 p-5 rounded-full md:rounded-xl backdrop-blur-sm">
          <span className="text-4xl md:text-5xl">{section.icon}</span>
          <h3 className="text-blue-300 font-medium text-xl md:text-2xl">{section.title}</h3>
        </div>
        <div className="text-slate-300 leading-relaxed pl-6 border-l-2 border-white/10 text-lg md:text-xl md:h-[100px] flex items-center">
          {section.content}
        </div>
      </motion.div>
    ))
  }, [bioContent])

  useEffect(() => {
    if (!textRef.current) return

    const sections = document.querySelectorAll(".tech-stack-section")

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Side effects */}
      <div className="absolute -left-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-blue-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 left-12 w-1 h-32 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse" />
      </div>

      <div className="absolute -right-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-indigo-500/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-12 w-1 h-32 bg-gradient-to-b from-indigo-500/50 to-transparent animate-pulse delay-300" />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute right-1/4 top-2/3 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-300" />
        <div className="absolute left-1/3 bottom-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-ping delay-700" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
            About Me
          </span>
        </motion.h2>

        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          {/* Bio Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-effect p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
              <div ref={textRef} className="space-y-2">
                {splitTextIntoSections}
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
              My Tech Stack
            </span>
          </motion.h2>
          
          {/* Tech Stacks */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {techStacks.map((stack) => (
              <motion.div
                key={stack.id}
                className="tech-stack-section relative group"
                onMouseEnter={() => setIsHovered(stack.id)}
                onMouseLeave={() => setIsHovered(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} rounded-xl blur-xl transition-all duration-300 
                    ${isHovered === stack.id ? "opacity-100 scale-105" : "opacity-50 scale-100"}`}
                />
                <div
                  className="glass-effect p-6 sm:p-8 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 relative h-full
                  transition-all duration-300 group-hover:border-white/20"
                >
                  <div className="flex items-center gap-4 bg-white/5 p-5 rounded-full backdrop-blur-sm mb-8">
                    {stack.icon}
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{stack.title}</h3>
                  </div>
                  <div className="pl-6 border-l-2 border-white/10">
                    <ul className="space-y-4 pt-2">
                      {stack.skills.map((skill) => (
                        <motion.li
                          key={skill}
                          className="text-slate-300 text-lg md:text-xl flex items-center gap-3 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="w-2 h-2 bg-blue-400 rounded-full transition-all duration-300 group-hover/item:bg-blue-300 group-hover/item:scale-125" />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

