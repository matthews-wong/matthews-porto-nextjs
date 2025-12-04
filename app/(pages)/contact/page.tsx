"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FaLinkedin, FaGithub, FaEnvelope, FaCodepen } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"
import { Check, AlertCircle, Send, ArrowLeft, MessageCircle, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name: string
  email: string
  message: string
}

interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/matthewswong",
    label: "LinkedIn",
    description: "Let's connect professionally",
  },
  {
    icon: FaGithub,
    href: "https://github.com/MatthewsWongOfficial",
    label: "GitHub",
    description: "Check out my code",
  },
  {
    icon: FaEnvelope,
    href: "mailto:matthewswong2610@gmail.com",
    label: "Email",
    description: "Send me a message",
  },
  {
    icon: FaCodepen,
    href: "https://codepen.io/Matthews-Wong",
    label: "Codepen",
    description: "See my experiments",
  },
]

export default function ContactPage() {
  const t = useTranslations("contact")
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "", message: "" })
  const form = useRef<HTMLFormElement>(null)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : ""
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "Please enter a valid email" : ""
      case "message":
        return value.trim().length < 10 ? "Message must be at least 10 characters" : ""
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(false)
      return
    }

    if (form.current) {
      try {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        )
        setShowSuccessModal(true)
        setFormData({ name: "", email: "", message: "" })
      } catch (error) {
        console.error(error)
        setShowErrorModal(true)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 right-0 w-1 h-full opacity-20" style={{ backgroundColor: 'var(--accent-primary)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl relative z-10">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-bold uppercase border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 flex items-center justify-center border-2 shadow-brutal"
              style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
            >
              <MessageCircle className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
            </div>
            <span 
              className="px-4 py-1.5 text-sm font-bold uppercase border-2"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
            >
              {t("subtitle")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div 
              className="p-6 md:p-8 border-2 shadow-brutal"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="p-3 border-2"
                  style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'var(--text-dark)' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Send a Message</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>I'll get back to you soon</p>
                </div>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
                    {t("form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 border-2 text-base font-medium"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-medium" style={{ color: '#ef4444' }}>
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
                    {t("form.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 border-2 text-base font-medium"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="your.email@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-medium" style={{ color: '#ef4444' }}>
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
                    {t("form.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[140px] resize-none border-2 text-base font-medium"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="What would you like to discuss?"
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-medium" style={{ color: '#ef4444' }}>
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || Object.values(errors).some((e) => e)}
                  className="w-full py-4 font-black uppercase text-base border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--text-dark)' }} />
                      {t("form.sending")}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {t("form.send")}
                    </div>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Contact Info */}
            <div>
              <h3 className="text-lg font-black uppercase mb-4" style={{ color: 'var(--text-primary)' }}>Quick Contact</h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center gap-4 p-4 border-2"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div 
                    className="p-2 border-2"
                    style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'var(--text-dark)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Email</p>
                    <p className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>matthewswong2610@gmail.com</p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-4 p-4 border-2"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div 
                    className="p-2 border-2"
                    style={{ backgroundColor: 'var(--accent-gray)', borderColor: 'var(--border-color)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: 'var(--text-dark)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Location</p>
                    <p className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>Tangerang, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-black uppercase mb-4" style={{ color: 'var(--text-primary)' }}>Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 border-2 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <IconComponent className="text-2xl mb-2" style={{ color: 'var(--accent-primary)' }} />
                      <h4 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{social.label}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{social.description}</p>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm font-medium pt-4" style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} Matthews Wong. All rights reserved.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              className="p-8 max-w-sm mx-4 border-2 shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mb-5 mx-auto border-2"
                style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
              >
                <Check className="w-8 h-8" style={{ color: 'var(--text-dark)' }} />
              </div>
              <h3 className="text-xl font-black uppercase text-center mb-3" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
              <p className="text-center mb-6 text-base" style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. I'll get back to you soon.</p>
              <button 
                onClick={() => setShowSuccessModal(false)} 
                className="w-full py-3 font-black uppercase border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              className="p-8 max-w-sm mx-4 border-2 shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mb-5 mx-auto border-2"
                style={{ backgroundColor: '#ef4444', borderColor: 'var(--border-color)' }}
              >
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black uppercase text-center mb-3" style={{ color: 'var(--text-primary)' }}>Oops!</h3>
              <p className="text-center mb-6 text-base" style={{ color: 'var(--text-secondary)' }}>Something went wrong. Please try again later.</p>
              <button 
                onClick={() => setShowErrorModal(false)} 
                className="w-full py-3 font-black uppercase text-white border-2 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ backgroundColor: '#ef4444', borderColor: 'var(--border-color)' }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
