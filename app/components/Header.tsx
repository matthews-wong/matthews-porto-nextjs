"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useTranslations, useLocale as useCurrentLocale } from "next-intl"
import { useLocale } from "@/lib/locale"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("nav")
  const currentLocale = useCurrentLocale()
  const { setLocale, isPending } = useLocale()

  const navItems = [
    { label: t("experience"), href: "/experience" },
    { label: t("education"), href: "/education" },
    { label: t("projects"), href: "/projects" },
    { label: t("certifications"), href: "/certifications" },
    { label: t("hackathons"), href: "/hackathons" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setLangOpen(false)
    if (langOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [langOpen])

  // Check if path is active (handles trailing slashes)
  const isActive = (href: string) => {
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href
    return normalizedPathname === normalizedHref
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-200 ${
          scrolled
            ? "border-b-2 shadow-brutal"
            : ""
        }`}
        style={{ 
          backgroundColor: scrolled ? 'var(--bg-primary)' : 'transparent',
          borderColor: 'var(--border-color)'
        }}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-bold uppercase transition-all ${
                    isActive(item.href)
                      ? "border-2 shadow-brutal -translate-x-0.5 -translate-y-0.5"
                      : "hover:border-2 border-2 border-transparent hover:shadow-brutal"
                  }`}
                  style={
                    isActive(item.href)
                      ? { backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }
                      : { color: 'var(--text-primary)' }
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLangOpen(!langOpen)
                  }}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold uppercase border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                  style={{ backgroundColor: 'var(--accent-gray)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLocale.toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 border-2 shadow-brutal overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <button
                        onClick={() => {
                          setLocale("en")
                          setLangOpen(false)
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-bold uppercase hover:bg-white/10 border-b"
                        style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                      >
                        🇺🇸 English
                      </button>
                      <button
                        onClick={() => {
                          setLocale("id")
                          setLangOpen(false)
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-bold uppercase hover:bg-white/10"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        🇮🇩 Indonesia
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm border-l-2 lg:hidden"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex flex-col h-full">
                {/* Header with Language Switcher */}
                <div 
                  className="flex items-center justify-between px-6 h-16 border-b-2"
                  style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLocale("en")}
                      className="px-3 py-1 text-sm font-bold uppercase border-2 shadow-brutal"
                      style={{ 
                        backgroundColor: currentLocale === 'en' ? 'var(--accent-primary)' : 'var(--accent-light)', 
                        color: 'var(--text-dark)', 
                        borderColor: 'var(--border-color)' 
                      }}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLocale("id")}
                      className="px-3 py-1 text-sm font-bold uppercase border-2 shadow-brutal"
                      style={{ 
                        backgroundColor: currentLocale === 'id' ? 'var(--accent-primary)' : 'var(--accent-gray)', 
                        color: 'var(--text-dark)', 
                        borderColor: 'var(--border-color)' 
                      }}
                    >
                      ID
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-3">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 text-base font-bold uppercase border-2 shadow-brutal transition-all ${
                        pathname === "/" ? "" : "hover:-translate-x-0.5 hover:-translate-y-0.5"
                      }`}
                      style={
                        pathname === "/"
                          ? { backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }
                          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
                      }
                    >
                      {pathname === "/" && (
                        <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--text-dark)' }} />
                      )}
                      {t("home")}
                    </Link>
                    {navItems.map((item, index) => {
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 text-base font-bold uppercase border-2 shadow-brutal transition-all ${
                            active ? "" : "hover:-translate-x-0.5 hover:-translate-y-0.5"
                          }`}
                          style={
                            active
                              ? { backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }
                              : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
                          }
                        >
                          {active && (
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: 'var(--text-dark)' }} />
                          )}
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}