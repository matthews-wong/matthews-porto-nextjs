"use client"

import type React from "react"
import { useRef, useMemo, useState, useEffect } from "react"
import { motion, useTransform, useInView, useScroll, useSpring } from "framer-motion"
import { Code2, Server, BotMessageSquare, Sparkles, User, Briefcase, GraduationCap, MapPin } from "lucide-react"
import Image from "next/image"

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

const SkillPill: React.FC<{
  skill: string
  color?: string
}> = ({ skill, color = "blue" }) => {
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
    <div className="relative h-7 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/15 hover:border-white/20">
      <div className={`absolute inset-0 ${colorMap[color] || colorMap.blue} opacity-20`} />
      <div className="absolute inset-0 flex items-center px-3">
        <span className="text-white font-medium text-sm truncate">{skill}</span>
      </div>
    </div>
  )
}

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])

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
      },
    ],
    [],
  )

  // Reduced particles for better performance
  const particles = Array(6)
    .fill(0)
    .map((_, i) => ({
      id: i,
      position: {
        x: (i % 3) * 30 - 45,
        y: Math.floor(i / 3) * 30 - 45,
      },
      color: ["bg-blue-500", "bg-purple-500", "bg-indigo-500"][i % 3],
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

      {/* Reduced particle effects for better performance */}
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
                duration: 4,
                delay: particle.id * 0.5,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative">
        <ParallaxText className="mx-auto text-center mb-16 relative">
          <ScrollReveal>
            <div className="inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white text-4xl md:text-6xl font-bold tracking-tight">
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
          {/* Bio Section - Narrative Format with Photo */}
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <div className="glass-effect backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-white/20 shadow-md shadow-blue-500/5">
                <div className="flex flex-col lg:flex-row">
                  {/* Text Content */}
                  <div className="p-5 sm:p-6 md:p-8 lg:w-3/5">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6">
                      <User className="w-5 h-5 text-blue-300" />
                      <span className="text-blue-300 font-medium">Matthews Wong</span>
                    </div>

                    <div className="space-y-4 md:space-y-5 text-slate-300">
                      {/* Mobile-optimized content with collapsible sections */}
                      <div className="md:hidden">
                        <p className="text-base leading-relaxed">
                          Hello! I'm a <span className="text-white font-medium">software engineer</span> solving
                          real-world problems through innovative solutions.
                        </p>

                        <div className="mt-3 flex flex-col gap-2">
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="text-white font-medium mb-1">Current Focus</h4>
                            <p className="text-sm text-slate-300">
                              IT student at Swiss German University & DevOps Engineer intern at Commsult Indonesia.
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <h4 className="text-white font-medium mb-1">Location & Interests</h4>
                            <p className="text-sm text-slate-300">
                              Based in Tangerang, Indonesia. Passionate about AI, machine learning, and staying active
                              with badminton and gym.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop content - unchanged */}
                      <div className="hidden md:block">
                        <p className="text-lg leading-relaxed tracking-wide">
                          Hello! I'm a <span className="text-white font-medium">passionate software engineer</span> with
                          a strong drive to solve real-world problems through innovative solutions. My journey in
                          technology is driven by curiosity and a desire to build meaningful digital experiences.
                        </p>

                        <p className="text-lg leading-relaxed tracking-wide mt-5">
                          Currently, I'm pursuing an{" "}
                          <span className="text-white font-medium">Information Technology degree</span> at Swiss German
                          University while working as a{" "}
                          <span className="text-white font-medium">DevOps Engineer intern</span> at Commsult Indonesia.
                          In this role, I develop CI/CD pipelines and Grafana observability tools, combining my passion
                          for automation with practical business applications.
                        </p>

                        <p className="text-lg leading-relaxed tracking-wide mt-5">
                          Based in <span className="text-white font-medium">Tangerang, Indonesia</span>, I'm constantly
                          exploring new technologies and approaches to solving complex problems. I believe in writing
                          maintainable code and creating intuitive user experiences.
                        </p>

                        <p className="text-lg leading-relaxed tracking-wide mt-5">
                          When I'm not coding, you can find me exploring new technologies and experimenting with AI and
                          machine learning concepts. For a refreshing break, you'll often find me recharging on the
                          badminton court or at the gym, staying active and energized.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Briefcase className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-100 text-sm font-medium">DevOps Engineer</span>
                      </motion.div>
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <GraduationCap className="w-4 h-4 text-purple-300" />
                        <span className="text-purple-100 text-sm font-medium">IT Student</span>
                      </motion.div>
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <MapPin className="w-4 h-4 text-cyan-300" />
                        <span className="text-cyan-100 text-sm font-medium">Tangerang, Indonesia</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Photo - Only visible on desktop */}
                  <div className="hidden lg:block lg:w-2/5 relative overflow-hidden rounded-r-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <div className="h-full">
                      {/* Replace with your actual photo */}
                      <div className="relative h-full w-full">
                        <Image
                          src="/images/hero.png"
                          alt="Matthews Wong"
                          className="object-cover"
                          fill
                          sizes="(max-width: 1024px) 0vw, 33vw"
                          priority
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 z-30">
                      <div className="flex items-center gap-3 p-3 backdrop-blur-md bg-black/30 rounded-lg border border-white/10">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Software Engineer</p>
                          <p className="text-white/70 text-xs">Coding ideas into real-world impact</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Expertise Title */}
          <ScrollReveal>
            <ParallaxText className="mx-auto text-center mb-10 relative">
              <div className="inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white text-4xl md:text-5xl font-bold tracking-tight">
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

          {/* Tech Stacks - Optimized for performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {techStacks.map((stack, stackIndex) => (
              <ScrollReveal key={stack.id} direction="up" delay={stackIndex * 0.1} duration={0.5}>
                <motion.div
                  className="relative h-full rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} opacity-40`} />
                  <div className="glass-effect p-5 sm:p-6 backdrop-blur-sm bg-white/5 relative h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-white/5 p-2 rounded-lg">{stack.icon}</div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{stack.title}</h3>
                    </div>

                    <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">{stack.description}</p>

                    <div className="space-y-2.5 mt-5">
                      {stack.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        >
                          <SkillPill skill={skill.name} color={skill.color} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
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
                        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-3 md:mb-4 tracking-tight">
                          Let's Create Something Amazing
                        </h3>
                        <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
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
