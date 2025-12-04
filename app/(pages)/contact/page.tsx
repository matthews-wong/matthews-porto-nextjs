"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FaLinkedin, FaGithub, FaEnvelope, FaCodepen } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"
import { Check, AlertCircle, Send, ArrowLeft, Mail, MapPin } from "lucide-react"
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
}

const socialLinks: SocialLink[] = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/matthewswong", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/matthews-wong", label: "GitHub" },
  { icon: FaEnvelope, href: "mailto:matthewswong2610@gmail.com", label: "Email" },
  { icon: FaCodepen, href: "https://codepen.io/Matthews-Wong", label: "Codepen" },
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
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--accent-primary)' }}>
            {t("subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t("title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Form - Takes more space */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t("form.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 rounded-lg border text-base"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Your name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm" style={{ color: '#ef4444' }}>
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t("form.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 rounded-lg border text-base"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="your.email@example.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm" style={{ color: '#ef4444' }}>
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t("form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[140px] resize-none rounded-lg border text-base"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="What would you like to discuss?"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm" style={{ color: '#ef4444' }}>
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || Object.values(errors).some((e) => e)}
                className="w-full py-3.5 rounded-full font-semibold text-base transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--text-dark)' }} />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("form.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                >
                  <Mail className="w-4 h-4" style={{ color: 'var(--text-dark)' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>matthewswong2610@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <MapPin className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Tangerang, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: 'var(--border-color)' }} />

            {/* Social Links */}
            <div>
              <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                      title={social.label}
                    >
                      <IconComponent className="text-lg" style={{ color: 'var(--text-primary)' }} />
                    </a>
                  )
                })}
              </div>
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              className="p-8 max-w-sm w-full rounded-2xl"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <Check className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
              <p className="text-center mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Thank you for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 rounded-full font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              className="p-8 max-w-sm w-full rounded-2xl"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto bg-red-500">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Oops!</h3>
              <p className="text-center mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Something went wrong. Please try again later.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 bg-red-500"
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
