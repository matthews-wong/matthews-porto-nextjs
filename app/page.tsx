"use client"

import { Suspense, lazy } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Chatbot from "./components/Chatbot"

// Lazy load components that are not immediately visible
const About = lazy(() => import("./components/About"))
const Education = lazy(() => import("./components/Education"))
const Experience = lazy(() => import("./components/Experience"))
const Certifications = lazy(() => import("./components/Certifications"))
const Hackathon = lazy(() => import("./components/Hackathon"))
const Projects = lazy(() => import("./components/Projects"))
const Footer = lazy(() => import("./components/Footer"))

// Loading component with skeleton
const LoadingComponent = () => (
  <div className="animate-pulse space-y-8 p-4">
    <div className="h-64 bg-slate-700 rounded"></div>
    <div className="h-96 bg-slate-700 rounded"></div>
    <div className="h-72 bg-slate-700 rounded"></div>
  </div>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header and Hero are loaded immediately */}
      <Header />
      <Hero />

      {/* Wrap other components in Suspense with skeleton loading */}
      <Suspense fallback={<LoadingComponent />}>
        <About />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Education />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Certifications />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Hackathon />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<LoadingComponent />}>
        <Footer />
      </Suspense>

      {/* Chatbot component */}
      <Chatbot />

      {/* Speed Insights for performance monitoring */}
      <SpeedInsights />
    </div>
  )
}
