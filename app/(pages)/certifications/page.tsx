"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
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
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
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

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
                  >
                    {cert.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                    <ExternalLink className="w-4 h-4" />
                    View Credential
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {cert.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {cert.issuer}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                View all certifications
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                See my complete credentials on LinkedIn
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/matthewswong/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
            >
              View on LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
