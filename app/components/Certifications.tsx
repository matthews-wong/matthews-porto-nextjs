import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const certifications = [
  {
    name: "DevOps Professional Certificate",
    issuer: "PagerDuty",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.23.23.png?raw=true",
  },
  {
    name: "Network Defense Essentials",
    issuer: "EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.24.21.png?raw=true",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.49.57.png?raw=true",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.30.52.png?raw=true",
  },
  {
    name: "Ethical Hacking Essentials",
    issuer: "EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.31.50.png?raw=true",
  },
  {
    name: "Cybersecurity Awareness Professional Certification",
    issuer: "Certiprof",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.33.08.png?raw=true",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="min-h-screen py-20 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Notable Certifications
          </span>
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Subtle card glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500" />

              <div className="glass-effect p-6 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 relative">
                <div className="relative w-full pb-[75%] mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  {cert.name}
                </h3>
                <p className="text-indigo-400">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="https://www.linkedin.com/in/matthewswong/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block glass-effect px-6 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10"
          >
            View all of my certifications on LinkedIn
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

