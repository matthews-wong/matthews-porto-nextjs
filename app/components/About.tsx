"use client"

import type React from "react"
import { useRef, useMemo, useState, useEffect } from "react"
import { motion, useInView} from "framer-motion"
import {
  Code2,
  Server,
  BotMessageSquare,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Maximize2,
  Minimize2,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SkillPillProps {
  skill: string
  color?: string
}

const SkillPill = ({ skill, color = "blue" }: SkillPillProps) => {
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
    <div className="relative h-7 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-colors">
      <div className={`absolute inset-0 ${colorMap[color] || colorMap.blue} opacity-20`} />
      <div className="absolute inset-0 flex items-center px-3">
        <span className="text-white font-medium text-sm truncate">{skill}</span>
      </div>
    </div>
  )
}

const ScrollReveal: React.FC<{
  children: React.ReactNode
  className?: string
  threshold?: number
}> = ({ children, className = "", threshold = 0.1 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

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
      },
    ],
    [],
  )

  const [isSimplified, setIsSimplified] = useState(false)
  const [generatingText, setGeneratingText] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [textToGenerate, setTextToGenerate] = useState("")

  useEffect(() => {
    if (generatingText && textToGenerate) {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= textToGenerate.length) {
          setGeneratedText(textToGenerate.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setGeneratingText(false)
        }
      }, 15) // Speed of text generation

      return () => clearInterval(interval)
    }
  }, [generatingText, textToGenerate])

  const toggleSimplifiedView = () => {
    if (!isSimplified) {
      // When switching to simplified view, set up the text to be generated
      const simplifiedText = "Hello! I'm a software engineer solving real-world problems through innovative solutions."
      setTextToGenerate(simplifiedText)
      setGeneratedText("")
      setGeneratingText(true)
    }
    setIsSimplified(!isSimplified)
  }

  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 relative overflow-hidden" ref={containerRef}>


      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Grid background - simplified */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <ScrollReveal className="mx-auto text-center mb-16 relative">
          <div className="inline-block relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white text-4xl md:text-6xl font-bold tracking-tight">
              About Me
            </span>
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="mx-auto space-y-16">
          {/* Bio Section - Narrative Format with Photo */}
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:border-white/20 shadow-md shadow-blue-500/5 transition-colors">
                <div className="flex flex-col lg:flex-row">
                  {/* Text Content */}
                  <div className="p-5 sm:p-6 md:p-8 lg:w-3/5">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6">
                      <User className="w-5 h-5 text-blue-300" />
                      <span className="text-blue-300 font-medium">Matthews Wong</span>
                    </div>

                    {/* Scrollable container with soft fade edges like Instagram comments */}
                    <div className="relative">
                      {/* Top fade gradient */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/5 to-transparent z-10 pointer-events-none rounded-t-xl" />
                      
                      {/* Scrollable content */}
                      <div className="max-h-[280px] md:max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2 py-4">
                        <div className="space-y-4 md:space-y-5 text-slate-300">
                      {/* Mobile-optimized content with collapsible sections */}
                      <div className="md:hidden">
                        {isSimplified ? (
                          <div>
                            <p className="text-base leading-relaxed">
                              {generatingText ? (
                                <>
                                  {generatedText}
                                  <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1"></span>
                                </>
                              ) : (
                                generatedText ||
                                "Hello! I'm a software engineer solving real-world problems through innovative solutions."
                              )}
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
                                  Based in Tangerang, Indonesia. Passionate about AI, machine learning, and staying
                                  active with badminton and gym.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-base leading-relaxed">
                              Hello! I'm a <span className="text-white font-medium">passionate software engineer</span>{" "}
                              with a strong drive to solve real-world problems through innovative solutions. My journey
                              in technology is driven by curiosity and a desire to build meaningful digital experiences.
                            </p>

                            <p className="text-base leading-relaxed mt-3">
                              Currently, I'm pursuing an{" "}
                              <span className="text-white font-medium">Information Technology degree</span> at Swiss
                              German University while working as a{" "}
                              <span className="text-white font-medium">DevOps Engineer intern</span> at Commsult
                              Indonesia.
                            </p>

                            <p className="text-base leading-relaxed mt-3">
                              Based in <span className="text-white font-medium">Tangerang, Indonesia</span>, I'm
                              constantly exploring new technologies and approaches to solving complex problems.
                            </p>
                          </>
                        )}

                        {/* Mobile Simplify button */}
                        <div className="mt-4">
                          <Button
                            onClick={toggleSimplifiedView}
                            className={cn(
                              "relative w-full text-white border-0 shadow-md",
                              isSimplified
                                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30"
                                : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30",
                            )}
                            size="sm"
                          >
                            <div className="flex items-center justify-center gap-2">
                              {isSimplified ? (
                                <>
                                  <Maximize2 className="w-3.5 h-3.5 text-blue-200" />
                                  <span>Show Detailed</span>
                                </>
                              ) : (
                                <>
                                  <Minimize2 className="w-3.5 h-3.5 text-purple-200" />
                                  <span>Simplify</span>
                                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                                </>
                              )}
                            </div>
                          </Button>
                        </div>
                      </div>

                      {/* Desktop content - enhanced */}
                      <div className="hidden md:block">
                        {isSimplified ? (
                          <div>
                            <p className="text-lg leading-relaxed">
                              {generatingText ? (
                                <>
                                  {generatedText}
                                  <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1"></span>
                                </>
                              ) : (
                                generatedText ||
                                "Hello! I'm a software engineer solving real-world problems through innovative solutions."
                              )}
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
                                  Based in Tangerang, Indonesia. Passionate about AI, machine learning, and staying
                                  active with badminton and gym.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-lg leading-relaxed">
                              Hello! I'm a <span className="text-white font-medium">passionate software engineer</span>{" "}
                              with a strong drive to solve real-world problems through innovative solutions. My journey
                              in technology is driven by curiosity and a desire to build meaningful digital experiences.
                            </p>

                            <p className="text-lg leading-relaxed mt-5">
                              Currently, I'm pursuing an{" "}
                              <span className="text-white font-medium">Information Technology degree</span> at Swiss
                              German University while working as a{" "}
                              <span className="text-white font-medium">DevOps Engineer intern</span> at Commsult
                              Indonesia. In this role, I develop CI/CD pipelines and Grafana observability tools,
                              combining my passion for automation with practical business applications.
                            </p>

                            <p className="text-lg leading-relaxed mt-5">
                              Based in <span className="text-white font-medium">Tangerang, Indonesia</span>, I'm
                              constantly exploring new technologies and approaches to solving complex problems. I
                              believe in writing maintainable code and creating intuitive user experiences.
                            </p>

                            <p className="text-lg leading-relaxed mt-5">
                              When I'm not coding, you can find me exploring new technologies and experimenting with AI
                              and machine learning concepts. For a refreshing break, you'll often find me recharging on
                              the badminton court or at the gym, staying active and energized.
                            </p>
                          </>
                        )}

                        {/* Enhanced Simplify button */}
                        <div className="mt-6">
                          <Button
                            onClick={toggleSimplifiedView}
                            className={cn(
                              "relative text-white border-0 shadow-lg",
                              isSimplified
                                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30"
                                : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {isSimplified ? (
                                <>
                                  <Maximize2 className="w-4 h-4 text-blue-200" />
                                  <span>Show Detailed</span>
                                </>
                              ) : (
                                <>
                                  <Minimize2 className="w-4 h-4 text-purple-200" />
                                  <span>Simplify</span>
                                  <Sparkles className="w-4 h-4 text-purple-200" />
                                </>
                              )}
                            </div>
                          </Button>
                        </div>
                      </div>
                        </div>
                      </div>
                      
                      {/* Bottom fade gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/5 to-transparent z-10 pointer-events-none rounded-b-xl" />
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                        <Briefcase className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-100 text-sm font-medium">DevOps Engineer</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                        <GraduationCap className="w-4 h-4 text-purple-300" />
                        <span className="text-purple-100 text-sm font-medium">IT Student</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                        <MapPin className="w-4 h-4 text-cyan-300" />
                        <span className="text-cyan-100 text-sm font-medium">Tangerang, Indonesia</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo - Only visible on desktop */}
                  <div className="hidden lg:block lg:w-2/5 relative overflow-hidden rounded-r-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <div className="h-full">
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
            <div className="mx-auto text-center mb-10 relative">
              <div className="inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white text-4xl md:text-5xl font-bold tracking-tight">
                  Tech Expertise
                </span>
                <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-cyan-400/40 to-emerald-400/40 rounded-full" />
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stacks - Optimized for performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {techStacks.map((stack) => (
              <ScrollReveal key={stack.id}>
                <div className="relative h-full rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors hover:translate-y-[-5px]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} opacity-40`} />
                  <div className="p-5 sm:p-6 backdrop-blur-sm bg-white/5 relative h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-white/5 p-2 rounded-lg">{stack.icon}</div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{stack.title}</h3>
                    </div>

                    <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">{stack.description}</p>

                    <div className="space-y-2.5 mt-5">
                      {stack.skills.map((skill) => (
                        <div key={skill.name}>
                          <SkillPill skill={skill.name} color={skill.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action */}
          <ScrollReveal className="mt-12 md:mt-16">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-xl" />

              <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left w-full md:w-2/3">
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-3 md:mb-4 tracking-tight">
                      Let's Create Something Amazing
                    </h3>
                    <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
                      Interested in collaborating or learning more about my projects? Feel free to reach out and let's
                      explore how we can bring your ideas to life.
                    </p>
                  </div>

                  <div className="flex w-full md:w-auto mt-4 md:mt-0">
                    <a href="#contact" className="relative inline-flex w-full md:w-auto">
                      <div className="absolute opacity-70 -inset-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md hover:opacity-100 hover:-inset-1 transition-all"></div>
                    <button 
                        onClick={() => window.scrollToSection?.('contact')}
                        className="relative inline-flex items-center justify-center w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <span className="mr-3">Get in Touch</span>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default About
