"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Award, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

const certifications = [
  {
    name: "DevOps Professional Certificate",
    issuer: "PagerDuty",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.23.23.png?raw=true",
    credentialLink:
      "https://www.linkedin.com/learning/certificates/bbcb00b5be6b209a134a9e6e3865ef4cce66c62fcaf7dee882adc22e8a5acf21",
    category: "DevOps",
  },
  {
    name: "Network Defense Essentials",
    issuer: "EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.24.21.png?raw=true",
    credentialLink:
      "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=seYJXFBB5L37ScZF3bq4kApRq1wVKIMCa99Z3VfO9GY%3D",
    category: "Security",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.49.57.png?raw=true",
    credentialLink: "https://www.credly.com/badges/71d44c50-3507-4f04-91c3-f9ac534885f1/public_url",
    category: "Cloud",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.30.52.png?raw=true",
    credentialLink: "https://www.hackerrank.com/certificates/983098e12ce8",
    category: "Database",
  },
  {
    name: "Ethical Hacking Essentials",
    issuer: "EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.31.50.png?raw=true",
    credentialLink:
      "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=VirAFMeOhp+60XjMJagC3IpLZl7TJN9jnJ4YTR6tjlQ%3D",
    category: "Security",
  },
  {
    name: "Cybersecurity Awareness Professional",
    issuer: "Certiprof",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.33.08.png?raw=true",
    credentialLink: "https://app.kajabi.com/certificates/c5f43dd9",
    category: "Security",
  },
]

export default function CertificationsPage() {
  const t = useTranslations("certifications")

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
              <Award className="w-7 h-7" style={{ color: 'var(--text-dark)' }} />
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

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-2 overflow-hidden transition-all duration-300 shadow-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden border-b-2" style={{ borderColor: 'var(--border-color)' }}>
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1.5 text-xs font-bold uppercase border-2"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                  >
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                  {cert.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--accent-primary)' }}>Issued by: {cert.issuer}</p>

                <a
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-sm py-3 font-bold uppercase border-2 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
                  style={{ backgroundColor: 'var(--accent-light)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <a
            href="https://www.linkedin.com/in/matthewswong/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 font-black uppercase text-lg border-2 shadow-brutal transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)', borderColor: 'var(--border-color)' }}
          >
            View All on LinkedIn
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </main>
  )
}
