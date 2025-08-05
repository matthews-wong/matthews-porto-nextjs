"use client"
import { useState, useEffect, useRef } from "react"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import dynamic from 'next/dynamic'
import Header from "./components/Header"
import Hero from "./components/Hero"

// Simple dynamic imports - load only when visible
const About = dynamic(() => import("./components/About"), { ssr: false })
const Education = dynamic(() => import("./components/Education"), { ssr: false })
const Experience = dynamic(() => import("./components/Experience"), { ssr: false })
const Certifications = dynamic(() => import("./components/Certifications"), { ssr: false })
const Hackathon = dynamic(() => import("./components/Hackathon"), { ssr: false })
const Projects = dynamic(() => import("./components/Projects"), { ssr: false })
const Footer = dynamic(() => import("./components/Footer"), { ssr: false })
const Chatbot = dynamic(() => import("./components/Chatbot"), { ssr: false })

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({ hero: true })
  const observerRef = useRef()

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id
            setVisibleSections(prev => ({ ...prev, [sectionName]: true }))
          }
        })
      },
      { rootMargin: '100px' }
    )

    document.querySelectorAll('[data-section]').forEach(el => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      
      <div id="about" data-section className="min-h-[200px]">
        {visibleSections.about && <About />}
      </div>
      
      <div id="education" data-section className="min-h-[200px]">
        {visibleSections.education && <Education />}
      </div>
      
      <div id="experience" data-section className="min-h-[200px]">
        {visibleSections.experience && <Experience />}
      </div>
      
      <div id="certifications" data-section className="min-h-[200px]">
        {visibleSections.certifications && <Certifications />}
      </div>
      
      <div id="hackathon" data-section className="min-h-[200px]">
        {visibleSections.hackathon && <Hackathon />}
      </div>
      
      <div id="projects" data-section className="min-h-[200px]">
        {visibleSections.projects && <Projects />}
      </div>
      
      <div id="footer" data-section className="min-h-[100px]">
        {visibleSections.footer && <Footer />}
      </div>

      {visibleSections.footer && <Chatbot />}
      
      <SpeedInsights />
      <Analytics />
    </div>
  )
}