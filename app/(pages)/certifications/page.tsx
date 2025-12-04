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
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card card-hover overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary text-xs">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">Issued by: {cert.issuer}</p>

                <a
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full text-sm py-2.5"
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
            className="btn-primary"
          >
            View All on LinkedIn
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </main>
  )
}
