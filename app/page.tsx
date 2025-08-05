"use client"
import { useRef, useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"

// Ultra-lightweight dynamic imports - no loading states to reduce bundle
const About = () => import("./components/About")
const Education = () => import("./components/Education")
const Experience = () => import("./components/Experience")
const Certifications = () => import("./components/Certifications")
const Hackathon = () => import("./components/Hackathon")
const Projects = () => import("./components/Projects")
const Footer = () => import("./components/Footer")
const Chatbot = () => import("./components/Chatbot")

// Minimal intersection observer - no callbacks, direct DOM manipulation
const useMinimalObserver = () => {
  const observer = useRef<IntersectionObserver>()
  
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          const componentName = target.dataset.component
          
          if (componentName && !target.dataset.loaded) {
            target.dataset.loaded = "true"
            
            try {
              let Component
              switch (componentName) {
                case 'About': Component = (await About()).default; break
                case 'Education': Component = (await Education()).default; break
                case 'Experience': Component = (await Experience()).default; break
                case 'Certifications': Component = (await Certifications()).default; break
                case 'Hackathon': Component = (await Hackathon()).default; break
                case 'Projects': Component = (await Projects()).default; break
                case 'Footer': Component = (await Footer()).default; break
                case 'Chatbot': Component = (await Chatbot()).default; break
              }
              
              if (Component) {
                const { createRoot } = await import('react-dom/client')
                const root = createRoot(target)
                root.render(<Component />)
              }
            } catch (error) {
              console.error(`Failed to load ${componentName}:`, error)
            }
          }
          
          observer.current?.unobserve(target)
        }
      })
    }, { threshold: 0.1, rootMargin: '50px' })
    
    return () => observer.current?.disconnect()
  }, [])
  
  return observer.current
}

export default function Home() {
  const observerRef = useRef<IntersectionObserver>()
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          const componentName = target.dataset.component
          
          if (componentName && !target.dataset.loaded) {
            target.dataset.loaded = "true"
            
            try {
              let ComponentModule
              switch (componentName) {
                case 'About': ComponentModule = await About(); break
                case 'Education': ComponentModule = await Education(); break
                case 'Experience': ComponentModule = await Experience(); break
                case 'Certifications': ComponentModule = await Certifications(); break
                case 'Hackathon': ComponentModule = await Hackathon(); break
                case 'Projects': ComponentModule = await Projects(); break
                case 'Footer': ComponentModule = await Footer(); break
                case 'Chatbot': ComponentModule = await Chatbot(); break
              }
              
              if (ComponentModule?.default) {
                const { createRoot } = await import('react-dom/client')
                const root = createRoot(target)
                root.render(<ComponentModule.default />)
              }
            } catch (error) {
              console.error(`Failed to load ${componentName}:`, error)
            }
          }
          
          observerRef.current?.unobserve(target)
        }
      })
    }, { threshold: 0.05, rootMargin: '100px' })
    
    // Observe all lazy sections
    document.querySelectorAll('[data-component]').forEach(el => {
      observerRef.current?.observe(el)
    })
    
    // Load analytics after everything else
    setTimeout(async () => {
      try {
        const [{ SpeedInsights }, { Analytics }] = await Promise.all([
          import('@vercel/speed-insights/next'),
          import('@vercel/analytics/next')
        ])
        
        const analyticsContainer = document.createElement('div')
        document.body.appendChild(analyticsContainer)
        
        const { createRoot } = await import('react-dom/client')
        const root = createRoot(analyticsContainer)
        root.render(
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )
      } catch (error) {
        console.error('Analytics failed to load:', error)
      }
    }, 3000)
    
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen w-full bg-slate-900">
      {/* Critical path - load immediately */}
      <Header />
      <Hero />
      
      {/* Lazy sections - just empty divs that get populated on scroll */}
      <div id="about" data-component="About" className="min-h-[200px]" />
      <div id="education" data-component="Education" className="min-h-[200px]" />
      <div id="experience" data-component="Experience" className="min-h-[200px]" />
      <div id="certifications" data-component="Certifications" className="min-h-[200px]" />
      <div id="hackathon" data-component="Hackathon" className="min-h-[200px]" />
      <div id="projects" data-component="Projects" className="min-h-[200px]" />
      <div id="footer" data-component="Footer" className="min-h-[100px]" />
      
      {/* Chatbot - load when user reaches 80% of page */}
      <div 
        data-component="Chatbot" 
        className="fixed bottom-4 right-4 z-50"
        style={{ transform: 'translateY(200%)', transition: 'transform 0.3s ease' }}
      />
    </div>
  )
}