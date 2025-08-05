"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import dynamic from 'next/dynamic'
import Header from "./components/Header"
import Hero from "./components/Hero"

// Simple dynamic imports with SSR for better SEO and performance
const About = dynamic(() => import("./components/About"), { ssr: true })
const Education = dynamic(() => import("./components/Education"), { ssr: true })
const Experience = dynamic(() => import("./components/Experience"), { ssr: true })
const Certifications = dynamic(() => import("./components/Certifications"), { ssr: true })
const Hackathon = dynamic(() => import("./components/Hackathon"), { ssr: true })
const Projects = dynamic(() => import("./components/Projects"), { ssr: true })
const Footer = dynamic(() => import("./components/Footer"), { ssr: true })
// Only chatbot stays client-side (interactive component)
const Chatbot = dynamic(() => import("./components/Chatbot"), { ssr: false })

// Define section types for TypeScript
type SectionName = 'about' | 'education' | 'experience' | 'certifications' | 'hackathon' | 'projects' | 'contact' | 'chatbot'

type VisibleSections = {
  [K in SectionName]?: boolean
}

// Extend window type for global scroll function
declare global {
  interface Window {
    scrollToSection?: (sectionId: SectionName) => void
  }
}

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({
    contact: true // Preload contact section since it's important
  })
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Optimized scroll to section with preloading
  const scrollToSection = useCallback((sectionId: SectionName) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Force load the section immediately if not visible
    if (!visibleSections[sectionId]) {
      setVisibleSections(prev => ({ ...prev, [sectionId]: true }))
      
      // Wait a frame for React to render, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        })
      })
    } else {
      // Section already loaded, scroll immediately
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [visibleSections])

  // Make scrollToSection available globally for buttons
  useEffect(() => {
    window.scrollToSection = scrollToSection
    return () => {
      delete window.scrollToSection
    }
  }, [scrollToSection])

  // Memoized callback to prevent re-creating observer on every render
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const newVisible: VisibleSections = {}
    let hasChanges = false

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.id as SectionName
        if (sectionName && !visibleSections[sectionName]) {
          newVisible[sectionName] = true
          hasChanges = true
        }
      }
    })

    // Only update state if there are actual changes
    if (hasChanges) {
      setVisibleSections(prev => ({ ...prev, ...newVisible }))
    }
  }, [visibleSections])

  useEffect(() => {
    // Create observer only once
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px',
      threshold: 0.1
    })

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    // Add smooth scroll behavior globally
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [handleIntersection])

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
      
      <div id="contact" data-section className="min-h-[100px]">
        {visibleSections.contact && <Footer />}
      </div>

      {/* Load chatbot when contact section is visible */}
      {visibleSections.contact && <Chatbot />}
      
      <SpeedInsights />
      <Analytics />
    </div>
  )
}