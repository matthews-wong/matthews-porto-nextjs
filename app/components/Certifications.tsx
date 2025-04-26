import Image from "next/image"
import Link from "next/link"

const certifications = [
  {
    name: "DevOps Professional Certificate",
    issuer: "Issued by : PagerDuty",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.23.23.png?raw=true",
    credentialLink:
      "https://www.linkedin.com/learning/certificates/bbcb00b5be6b209a134a9e6e3865ef4cce66c62fcaf7dee882adc22e8a5acf21",
  },
  {
    name: "Network Defense Essentials",
    issuer: "Issued by : EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.24.21.png?raw=true",
    credentialLink:
      "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=seYJXFBB5L37ScZF3bq4kApRq1wVKIMCa99Z3VfO9GY%3D",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "Issued by : AWS Academy",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-01-30%20at%2020.49.57.png?raw=true",
    credentialLink: "https://www.credly.com/badges/71d44c50-3507-4f04-91c3-f9ac534885f1/public_url",
  },
  {
    name: "SQL (Advanced)",
    issuer: "Issued by : HackerRank",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.30.52.png?raw=true",
    credentialLink: "https://www.hackerrank.com/certificates/983098e12ce8",
  },
  {
    name: "Ethical Hacking Essentials",
    issuer: "Issued by : EC-Council",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.31.50.png?raw=true",
    credentialLink:
      "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=VirAFMeOhp+60XjMJagC3IpLZl7TJN9jnJ4YTR6tjlQ%3D",
  },
  {
    name: "Cybersecurity Awareness Professional Certification",
    issuer: "Issued by : Certiprof",
    image:
      "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Screenshot%202025-02-02%20at%2021.33.08.png?raw=true",
    credentialLink: "https://app.kajabi.com/certificates/c5f43dd9",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Notable Certifications
          </span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="glass-effect p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 relative flex flex-col h-full overflow-hidden">
                <div className="relative w-full pb-[75%] mb-4 overflow-hidden rounded-2xl">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-2xl transition-transform duration-300 group-hover:scale-105 object-cover"
                    priority={index < 3} // Only prioritize the first 3 images
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    {cert.name}
                  </h3>
                  <p className="text-indigo-400 mb-4">{cert.issuer}</p>
                </div>
                <Link
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <button className="group relative w-full overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 transition-all duration-300 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2 text-blue-100 group-hover:text-white transition-colors duration-300">
                      <span className="text-sm font-medium">View Credential</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="https://www.linkedin.com/in/matthewswong/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block glass-effect px-6 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10"
          >
            View all of my certifications on LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}
