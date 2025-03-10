"use client"

import type React from "react"
import { useEffect, useRef, useMemo, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Server, BotMessageSquare } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface FloatingOrbProps {
  className?: string
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ className }) => (
  <div className={`absolute w-64 h-64 rounded-full ${className}`} />
)

const Card3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div 
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

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
    []
  )

  const techStacks = useMemo(
    () => [
      {
        id: "web",
        icon: <Code2 className="w-8 h-8 md:w-10 md:h-10" />,
        title: "Web Development",
        skills: ["Next.js", "React.js", "HTML", "JavaScript", "Express.js", "UI Libraries"],
        gradient: "from-blue-500/20 to-cyan-500/20",
        shadow: "shadow-blue-500/10",
        highlight: "bg-blue-500/5"
      },
      {
        id: "devops",
        icon: <Server className="w-8 h-8 md:w-10 md:h-10" />,
        title: "DevOps",
        skills: ["Ansible", "NGINX", "Docker", "Prometheus", "CI/CD Pipelines"],
        gradient: "from-purple-500/20 to-pink-500/20",
        shadow: "shadow-purple-500/10",
        highlight: "bg-purple-500/5"
      },
      {
        id: "ai",
        icon: <BotMessageSquare className="w-8 h-8 md:w-10 md:h-10" />,
        title: "AI Development",
        skills: ["Python", "XGBoost", "Scikit-Learn", "Hugging Face Transformers"],
        gradient: "from-green-500/20 to-emerald-500/20",
        shadow: "shadow-green-500/10",
        highlight: "bg-green-500/5"
      },
    ],
    []
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
        <div className="flex items-center h-[100px] gap-4 bg-white/5 p-5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md shadow-blue-500/5">
          <div className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full backdrop-blur-md">
            <span className="text-3xl md:text-4xl">{section.icon}</span>
          </div>
          <h3 className="text-blue-300 font-medium text-xl md:text-2xl">{section.title}</h3>
        </div>
        <div className="text-slate-300 leading-relaxed pl-6 border-l-2 border-blue-500/20 text-lg md:text-xl h-[100px] flex items-center bg-white/2 rounded-r-lg p-4 shadow-sm shadow-blue-500/5">
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
        }
      )
    })

    // Text animation
    const bioSections = document.querySelectorAll('.bio-section')
    
    bioSections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=150",
            end: "top center",
            scrub: 1,
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Refined background effects - more subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Refined grid background with more subtle animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Refined side effects - less intense */}
      <div className="absolute -left-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-blue-500/5 blur-3xl animate-float" />
        <div className="absolute top-1/3 left-12 w-1 h-24 bg-gradient-to-b from-blue-500/30 to-transparent animate-pulse" />
      </div>

      <div className="absolute -right-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-indigo-500/5 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-12 w-1 h-24 bg-gradient-to-b from-indigo-500/30 to-transparent animate-pulse delay-300" />
      </div>

      {/* Refined particle effects - more elegant */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-1 h-1 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute right-1/4 top-2/3 w-1 h-1 bg-purple-500 rounded-full animate-ping delay-300" />
        <div className="absolute left-1/3 bottom-1/4 w-1 h-1 bg-indigo-500 rounded-full animate-ping delay-700" />
        <div className="absolute left-2/3 top-1/4 w-1 h-1 bg-cyan-500 rounded-full animate-ping delay-200" />
        <div className="absolute right-1/3 top-1/2 w-1 h-1 bg-pink-500 rounded-full animate-ping delay-500" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mx-auto text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
                About Me
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"></div>
          </div>
        </motion.div>

        <div className="mx-auto space-y-16 md:space-y-20">
          {/* Refined Bio Section */}
          <Card3D className="relative">
            <motion.div
              className="relative bio-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl blur-lg"></div>
              <div className="glass-effect p-6 sm:p-8 md:p-10 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-md shadow-blue-500/5 relative transform transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div ref={textRef} className="space-y-6 relative">
                  {splitTextIntoSections}
                </div>
              </div>
            </motion.div>
          </Card3D>

          {/* Refined Tech Stack Title */}
          <motion.div
            className="mx-auto text-center mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block relative">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
                  My Tech Stack
                </span>
              </h2>
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Refined Tech Stacks with more subtle 3D effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {techStacks.map((stack) => (
              <Card3D key={stack.id} className="tech-stack-section relative h-full">
                <motion.div
                  className="relative h-full"
                  onMouseEnter={() => setIsHovered(stack.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} rounded-xl blur-lg transition-all duration-300 
                      ${isHovered === stack.id ? "opacity-70 scale-105" : "opacity-40 scale-100"}`}
                  />
                  <div
                    className={`glass-effect p-6 sm:p-8 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 relative h-full
                    transition-all duration-300 hover:border-white/20 shadow-md ${stack.shadow} group`}
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <div className={`flex items-center gap-4 ${stack.highlight} p-5 rounded-xl backdrop-blur-sm mb-8 border border-white/5`}
                         style={{ transform: "translateZ(20px)" }}>
                      <div className="bg-gradient-to-br from-white/5 to-transparent p-2 rounded-lg">
                        {stack.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white">{stack.title}</h3>
                    </div>
                    
                    <div className="pl-6 border-l border-white/10"
                         style={{ transform: "translateZ(5px)" }}>
                      <ul className="space-y-4 pt-2">
                        {stack.skills.map((skill, index) => (
                          <motion.li
                            key={skill}
                            className="text-slate-300 text-lg flex items-center gap-3 group/item"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                          >
                            <span className="w-2 h-2 bg-blue-400/70 rounded-full transition-all duration-300 group-hover/item:bg-blue-300 group-hover/item:scale-125" />
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About