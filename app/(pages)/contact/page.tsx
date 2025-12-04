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
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t("subtitle")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
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
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Send a Message</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">I'll get back to you soon</p>
                </div>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm">
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("form.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                    placeholder="your.email@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm">
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("form.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 min-h-[140px] resize-none"
                    placeholder="What would you like to discuss?"
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm">
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || Object.values(errors).some((e) => e)}
                  className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("form.sending")}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
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
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Email</p>
                    <p className="text-slate-900 dark:text-white font-medium text-sm">matthewswong2610@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Location</p>
                    <p className="text-slate-900 dark:text-white font-medium text-sm">Tangerang, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <IconComponent className="text-slate-700 dark:text-white text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-0.5">{social.label}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{social.description}</p>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
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
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-sm mx-4 shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-5 mx-auto">
                <Check className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-3">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center mb-6 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
              <button onClick={() => setShowSuccessModal(false)} className="btn-primary w-full py-2.5">
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
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-sm mx-4 shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mb-5 mx-auto">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-3">Oops!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center mb-6 text-sm">Something went wrong. Please try again later.</p>
              <button onClick={() => setShowErrorModal(false)} className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
