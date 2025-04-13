"use client"

import type React from "react"
import { useRef, useMemo, useState, useEffect } from "react"
import { motion, useTransform, useInView, useScroll, useSpring } from "framer-motion"
import { Code2, Server, BotMessageSquare, Sparkles, User, Briefcase, GraduationCap, MapPin } from "lucide-react"

interface FloatingOrbProps {
  className?: string
  delay?: number
  duration?: number
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ className, delay = 0, duration = 20 }) => (
  <motion.div
    className={`absolute w-64 h-64 rounded-full ${className}`}
    animate={{
      y: [0, -20, 0, 20, 0],
      scale: [1, 1.05, 1, 0.95, 1],
      opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
    }}
    transition={{
      repeat: Number.POSITIVE_INFINITY,
      duration,
      delay,
      ease: "easeInOut",
    }}
  />
)

const ParallaxText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  )
}

const BentoCard: React.FC<{
  children: React.ReactNode
  className?: string
  gradient?: string
  highlight?: boolean
  cols?: string
  rows?: string
}> = ({
  children,
  className = "",
  gradient = "from-blue-500/10 to-purple-500/10",
  highlight = false,
  cols = "col-span-1",
  rows = "row-span-1",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={`${cols} ${rows} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <div className="h-full w-full relative overflow-hidden rounded-2xl">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl`}
          animate={{
            filter: ["blur(15px)", "blur(20px)", "blur(15px)"],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div
          className={`glass-effect h-full p-6 backdrop-blur-xl ${highlight ? "bg-white/8" : "bg-white/5"} 
          border ${highlight ? "border-white/20" : "border-white/10"} rounded-2xl relative transition-all duration-300 
          hover:bg-white/10 hover:border-white/20 shadow-md shadow-blue-500/5 hover:shadow-lg hover:shadow-blue-500/20`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

const Card3D: React.FC<{ children: React.ReactNode; className?: string; depth?: number }> = ({
  children,
  className = "",
  depth = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const springScale = useSpring(scale, { stiffness: 400, damping: 90 })

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      style={{
        scale: springScale,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "tween", duration: 0.2 },
      }}
    >
      <div style={{ transform: `translateZ(${depth}px)` }}>{children}</div>
    </motion.div>
  )
}

const ProgressTracker = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  )
}

const ScrollReveal: React.FC<{
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
}> = ({ children, className = "", direction = "up", delay = 0, duration = 0.5, threshold = 0.1 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const directionMap = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={directionMap[direction]}
      animate={isInView ? { y: 0, x: 0, opacity: 1 } : directionMap[direction]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StaggeredList: React.FC<{
  items: React.ReactNode[]
  staggerDelay?: number
  className?: string
  itemClassName?: string
}> = ({ items, staggerDelay = 0.1, className = "", itemClassName = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={className}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: isInView ? index * staggerDelay : 0,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={itemClassName}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}

const SkillPill: React.FC<{
  skill: string
  color?: string
}> = ({ skill, color = "blue" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    pink: "bg-pink-500",
    cyan: "bg-cyan-500",
    amber: "bg-amber-500",
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
  }

  return (
    <motion.div
      ref={ref}
      className="relative h-8 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10"
      whileHover={{
        scale: 1.03,
        transition: { type: "tween", duration: 0.2 },
      }}
    >
      <motion.div
        className={`absolute inset-0 ${colorMap[color] || colorMap.blue} opacity-20`}
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
      <div className="absolute inset-0 flex items-center px-4">
        <span className="text-white font-medium text-sm md:text-base truncate">{skill}</span>
      </div>
    </motion.div>
  )
}

const About: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])

  const bioContent = useMemo(
    () => [
      {
        icon: <User className="w-8 h-8 text-blue-300" />,
        title: "Hello",
        content: "I am Matthews Wong, a passionate software engineer.",
        gradient: "from-blue-500/10 to-indigo-500/10",
      },
      {
        icon: <Briefcase className="w-8 h-8 text-purple-300" />,
        title: "Professional",
        content:
          "DevOps Engineer intern at Commsult Indonesia, developing CI/CD pipelines and Grafana observability tools.",
        gradient: "from-purple-500/10 to-pink-500/10",
      },
      {
        icon: <GraduationCap className="w-8 h-8 text-cyan-300" />,
        title: "Education",
        content: "Pursuing an Information Technology degree at Swiss German University.",
        gradient: "from-cyan-500/10 to-blue-500/10",
      },
      {
        icon: <MapPin className="w-8 h-8 text-emerald-300" />,
        title: "Location",
        content: "Tangerang, Indonesia",
        gradient: "from-emerald-500/10 to-green-500/10",
      },
    ],
    [],
  )

  const techStacks = useMemo(
    () => [
      {
        id: "web",
        icon: <Code2 className="w-8 h-8 md:w-10 md:h-10 text-blue-300" />,
        title: "Web Development",
        description:
          "Crafting responsive, intuitive digital experiences with modern frameworks and pixel-perfect precision.",
        skills: [
          { name: "Next.js", color: "blue" },
          { name: "React.js", color: "cyan" },
          { name: "TypeScript", color: "indigo" },
          { name: "UI Libraries", color: "purple" },
          { name: "Express.js", color: "green" },
        ],
        gradient: "from-blue-500/20 to-cyan-500/20",
        shadow: "shadow-blue-500/10",
        highlight: "bg-blue-500/5",
        cardColor: "from-blue-600/20 to-cyan-600/20",
      },
      {
        id: "devops",
        icon: <Server className="w-8 h-8 md:w-10 md:h-10 text-purple-300" />,
        title: "DevOps Engineering",
        description:
          "Architecting scalable infrastructure solutions with automated pipelines for seamless deployment and monitoring.",
        skills: [
          { name: "Docker", color: "blue" },
          { name: "CI/CD Pipelines", color: "indigo" },
          { name: "Ansible", color: "purple" },
          { name: "Grafana", color: "purple" },
          { name: "Prometheus", color: "pink" },
        ],
        gradient: "from-purple-500/20 to-pink-500/20",
        shadow: "shadow-purple-500/10",
        highlight: "bg-purple-500/5",
        cardColor: "from-purple-600/20 to-pink-600/20",
      },
      {
        id: "ai",
        icon: <BotMessageSquare className="w-8 h-8 md:w-10 md:h-10 text-green-300" />,
        title: "AI Development",
        description:
          "Leveraging machine learning algorithms and natural language processing to create intelligent, data-driven applications.",
        skills: [
          { name: "Python", color: "green" },
          { name: "XGBoost", color: "emerald" },
          { name: "Scikit-Learn", color: "cyan" },
          { name: "Hugging Face", color: "blue" },
          { name: "TensorFlow", color: "amber" },
        ],
        gradient: "from-green-500/20 to-emerald-500/20",
        shadow: "shadow-green-500/10",
        highlight: "bg-green-500/5",
        cardColor: "from-green-600/20 to-emerald-600/20",
      },
    ],
    [],
  )

  // For the particles section
  const particles = Array(15)
    .fill(0)
    .map((_, i) => ({
      id: i,
      position: {
        x: (i % 5) * 20 - 50,
        y: Math.floor(i / 5) * 20 - 50,
      },
      color: ["bg-blue-500", "bg-purple-500", "bg-indigo-500", "bg-cyan-500", "bg-pink-500"][i % 5],
    }))

  // In the About component, add this to handle client-side animations only:
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.section
      id="about"
      className="min-h-screen py-20 sm:py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      <ProgressTracker />

      {/* Background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5"
        style={{ opacity: backgroundOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Background orbs */}
      <div className="absolute -left-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-blue-500/5 blur-3xl" duration={25} />
      </div>

      <div className="absolute -right-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-indigo-500/5 blur-3xl" delay={2} duration={30} />
      </div>

      {/* Particle effects - only render when mounted */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute w-1 h-1 rounded-full ${particle.color}`}
              initial={{ x: `${particle.position.x}vw`, y: `${particle.position.y}vh`, opacity: 0.2 }}
              animate={{
                y: [`${particle.position.y}vh`, `${particle.position.y + 5}vh`, `${particle.position.y}vh`],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3 + (particle.id % 4),
                delay: particle.id * 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative">
        <ParallaxText className="mx-auto text-center mb-16 relative">
          <ScrollReveal>
            <div className="inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white text-4xl md:text-6xl font-bold">
                About Me
              </span>
              <motion.div
                className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"
                animate={{ scaleX: [0.5, 1.2, 0.5] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </ScrollReveal>
        </ParallaxText>

        {/* Bento Grid Layout */}
        <div className="mx-auto space-y-16">
          {/* Bio Section - Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bioContent.map((item, index) => (
              <BentoCard key={item.title} gradient={item.gradient}>
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex justify-center items-center w-12 h-12 bg-white/5 rounded-xl">
                      <motion.div
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, delay: index * 1.2 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-blue-300 font-medium text-xl">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 text-lg flex-grow">{item.content}</p>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* Tech Expertise Title */}
          <ScrollReveal>
            <ParallaxText className="mx-auto text-center mb-10 relative">
              <div className="inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white text-4xl md:text-5xl font-bold">
                  Tech Expertise
                </span>
                <motion.div
                  className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-cyan-400/40 to-emerald-400/40 rounded-full"
                  animate={{ scaleX: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </ParallaxText>
          </ScrollReveal>

          {/* Tech Stacks - Using the layout from the second file */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {techStacks.map((stack, stackIndex) => (
              <Card3D key={stack.id} className={`tech-stack-section relative h-full`} depth={40}>
                <ScrollReveal direction="up" delay={stackIndex * 0.15} duration={0.7}>
                  <motion.div
                    className="relative h-full"
                    onMouseEnter={() => setIsHovered(stack.id)}
                    onMouseLeave={() => setIsHovered(null)}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} rounded-xl`}
                      initial={{ opacity: 0.4 }}
                      animate={{
                        opacity: isHovered === stack.id ? 0.6 : 0.4,
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                      }}
                    />
                    <div
                      className={`glass-effect p-6 sm:p-8 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 relative h-full
                      transition-all duration-300 hover:border-white/20 shadow-md ${stack.shadow} group hover:shadow-lg hover:shadow-blue-500/20`}
                    >
                      <div
                        className={`flex items-center gap-4 ${stack.highlight} p-5 rounded-xl backdrop-blur-sm mb-6 border border-white/5`}
                      >
                        <motion.div
                          className="bg-gradient-to-br from-white/5 to-transparent p-2 rounded-lg"
                          animate={{
                            rotate: isHovered === stack.id ? [0, 5, 0, -5, 0] : 0,
                          }}
                          transition={{
                            duration: 5,
                            repeat: isHovered === stack.id ? Number.POSITIVE_INFINITY : 0,
                            ease: "easeInOut",
                          }}
                        >
                          {stack.icon}
                        </motion.div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white">{stack.title}</h3>
                      </div>

                      <p className="text-slate-300 mb-6 pl-2 border-l-2 border-white/10 italic">{stack.description}</p>

                      <StaggeredList
                        items={stack.skills.map((skill) => (
                          <SkillPill key={skill.name} skill={skill.name} color={skill.color} />
                        ))}
                        staggerDelay={0.1}
                        className="space-y-3 mt-6"
                      />
                    </div>
                  </motion.div>
                </ScrollReveal>
              </Card3D>
            ))}
          </div>

          {/* Call to Action */}
          <ScrollReveal direction="up" className="mt-12 md:mt-16">
            <Card3D className="relative" depth={40}>
              <div className="relative overflow-hidden rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-xl"
                  initial={{ filter: "blur(20px)" }}
                  animate={{
                    filter: ["blur(20px)", "blur(25px)", "blur(20px)"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative glass-effect p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 hover:border-white/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left w-full md:w-2/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-3 md:mb-4">
                          Let's Create Something Amazing
                        </h3>
                        <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl">
                          Interested in collaborating or learning more about my projects? Feel free to reach out and
                          let's explore how we can bring your ideas to life.
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex w-full md:w-auto mt-4 md:mt-0"
                    >
                      <a href="#contact" className="relative inline-flex group w-full md:w-auto">
                        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
                        <button className="relative inline-flex items-center justify-center w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="mr-3">Get in Touch</span>
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </div>
    </motion.section>
  )
}

export default About
