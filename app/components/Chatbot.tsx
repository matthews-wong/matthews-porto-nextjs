"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Trash2,
  Sparkles,
  Globe,
  User,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  FolderGit2,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Groq from "groq-sdk"

interface Message {
  type: "user" | "bot"
  content: string
}

interface UserPreferences {
  name: string
  language: "english" | "indonesian"
}

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  keywords: string[]
}

const CONTEXT_ENGLISH = `
Matthews Wong is an Information Technology student at Swiss German University, specializing in Technopreneurship. He is passionate about continuous learning and is involved in various international tech communities to stay up-to-date with the latest advancements.

### Current Role:
- **DevOps Engineer Intern at Commsult Indonesia** (Jan 2025 - Present)
  - Responsible for managing infrastructure using tools such as Ansible and Docker Swarm.
  - Works with deployment and CI/CD processes, focusing on automating tasks and improving system reliability.
  - Ensure uptime for German and Indonesian websites with uptime alerts.
  - Monitor system performance using Grafana
  - 

### Previous Experience:
- **Software Development Engineer in Test Intern(SDET) at Commsult Indonesia** (Jul 2024 - Jan 2025)
  - Developed and executed automated UI tests using WebdriverIO, XPath Selector, and Mocha framework.
  - Built dynamic API tests leveraging Supertest and Jest, ensuring data-driven testing with expected response validation.
  - Integrated Allure reporting framework to provide detailed test reports.

- **Project-Based Virtual Intern: Data Scientist at id/x partners x Rakamin Academy** (May 2024 - Jun 2024)
  - Conducted exploratory data analysis (EDA) to uncover key patterns and trends in datasets.
  - Mastered data storytelling techniques and created visual representations of complex data.
  - Worked on a machine learning model using XGBoost, achieving a portfolio consisting of 46% good loans and 0% risky loans.

- **Project-Based Virtual Intern: Mobile Apps Developer at PT Bank Mandiri (Persero) Tbk** (Jan 2024 - Feb 2024)
  - Developed a real-time news platform Android application using Kotlin, AndroidX, Jetpack Compose, and Material Design.
  - Applied object-oriented programming (OOP) principles and utilized SQLite for local storage.
  - Conducted unit testing using JUnit.

### Certifications:
- **Ethical Hacking Essentials & Network Defense Certification** - Issued by :  EC-Council
- **DevOps Certified** - Issued by : PagerDuty
- **Cybersecurity Awareness Certified** - Issued by : Certiprof
- **SQL (Advanced) & Rest API** – Issued by : HackerRank
- **Docker Foundation Professional Certificate** - Issued by : Docker
- **Advanced Website Conversion rate Optimization** - Issued by : Simplilearn
- **Large Language Models** Issued by : Google Cloud Skills Boost 
- **Career Essential in Generative AI** Issued by : Microsoft and Linkedin
- **Career Essential Software Development** Issued by Microsoft and Linkedin 

### Education:
- **Bachelor's degree in Information Technology**, Swiss German University (Aug 2022 - Aug 2026)
  - Active member of several clubs:
    - Badminton Club (Secretary)
    - IT Student Association (Member)
    - Chess Club (Head of Event Division)
    - SGU Bible Fellowship (Head of Creative Division)

### Key Projects:
1. **Observer KPU: All-in-One Election Solution** (Feb 2024 - Jun 2024)
   - Developed a web application for real-time election data in Indonesia using React.js and Express.js.
   - Integrated SIREKAP API and utilized web scraping techniques to display real-time news.
   - Built a GROQ AI-powered chatbot to provide users with factual information about candidates and political dynamics.

2. **STADPASS - Stadium Navigation App Utilizing Bluetooth Low Energy** (Oct 2023 - Mar 2024)
   - Developed a BLE-based app for stadium navigation, guiding users to amenities and seats.
   - Enabled mobile food ordering and notifications about nearby food stalls.
   - Focused on enhancing the fan experience using BLE technology.

3. **Wazuh Implementation to Monitor IT Security (Windows and Linux Workstations)** (Sep 2023 - Dec 2023)
   - Analyzed security logs from both Windows and Linux systems using Wazuh and SIEM tools.
   - Utilized Elasticsearch and Kibana to perform in-depth log analysis and identify security threats.

   ### Company Information  
  Commsult Indonesia is a strategic partner of **Commsult AG**, a Germany-based company specializing in innovative IT solutions to optimize business processes. In Indonesia, the company focuses on delivering **customized software development services** and **IT consulting**, tailored to meet the specific needs of businesses. Commsult Indonesia is known for its expertise in developing **mobile software applications** and streamlining operations to improve efficiency. With a team of experienced professionals, the company works closely with clients to deliver high-quality, innovative solutions.  

   ### Skills:
- **Programming Languages**: JavaScript (React.js, Node.js), Python, Java
- **DevOps Tools**: Ansible, Docker, Docker Swarm, CI/CD pipelines
- **Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure Reporting
- **Data Science & Machine Learning**: XGBoost, Data Storytelling, Exploratory Data Analysis (EDA)
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API development , Next.js 
- **Cloud & Infrastructure**: Docker
- **Version Control & Collaboration**: Git

### Hackathon Experience:
- **AI Hackathon by Indonesia AI Society**: Participated in an AI-focused hackathon, where I developed and fine-tuned **Random Forest classification models** to enhance predictive accuracy. Conducted **comparative analysis** of different machine learning approaches, optimized hyperparameters, and leveraged data preprocessing techniques to improve model performance.  
- **PwC Capture The Flag (CTF)**: Engaged in a high-intensity **cybersecurity competition**, solving real-world security challenges, including **binary exploitation, cryptography, web security, and reverse engineering**. Collaborated with cybersecurity enthusiasts, applied ethical hacking techniques, and enhanced problem-solving skills under pressure.

### Contact  
- **Matthews Wong**  
  - **Email**: matthewswong2610@gmail.com  
  - **LinkedIn**: Matthews Wong
  - Open to collaborations, discussions, and knowledge-sharing opportunities.  
`

const CONTEXT_INDONESIAN = `
Matthews Wong adalah mahasiswa Teknologi Informasi di Swiss German University, dengan spesialisasi Technopreneurship. Dia memiliki semangat untuk terus belajar dan terlibat dalam berbagai komunitas teknologi internasional untuk tetap mengikuti perkembangan terbaru.

### Peran Saat Ini:
- **DevOps Engineer Intern di Commsult Indonesia** (Jan 2025 - Sekarang)
  - Bertanggung jawab untuk mengelola infrastruktur menggunakan alat seperti Ansible dan Docker Swarm.
  - Bekerja dengan proses deployment dan CI/CD, fokus pada otomatisasi tugas dan meningkatkan keandalan sistem.
  - Memastikan uptime untuk website Jerman dan Indonesia dengan peringatan uptime.
  - Memantau kinerja sistem menggunakan Grafana

### Pengalaman Sebelumnya:
- **Software Development Engineer in Test Intern(SDET) di Commsult Indonesia** (Jul 2024 - Jan 2025)
  - Mengembangkan dan menjalankan tes UI otomatis menggunakan WebdriverIO, XPath Selector, dan framework Mocha.
  - Membangun tes API dinamis memanfaatkan Supertest dan Jest, memastikan pengujian berbasis data dengan validasi respons yang diharapkan.
  - Mengintegrasikan framework pelaporan Allure untuk memberikan laporan tes yang detail.

- **Project-Based Virtual Intern: Data Scientist di id/x partners x Rakamin Academy** (Mei 2024 - Jun 2024)
  - Melakukan analisis data eksplorasi (EDA) untuk mengungkap pola dan tren utama dalam dataset.
  - Menguasai teknik storytelling data dan membuat representasi visual dari data kompleks.
  - Bekerja pada model machine learning menggunakan XGBoost, mencapai portofolio yang terdiri dari 46% pinjaman baik dan 0% pinjaman berisiko.

- **Project-Based Virtual Intern: Mobile Apps Developer di PT Bank Mandiri (Persero) Tbk** (Jan 2024 - Feb 2024)
  - Mengembangkan aplikasi Android platform berita real-time menggunakan Kotlin, AndroidX, Jetpack Compose, dan Material Design.
  - Menerapkan prinsip pemrograman berorientasi objek (OOP) dan menggunakan SQLite untuk penyimpanan lokal.
  - Melakukan pengujian unit menggunakan JUnit.

### Sertifikasi:
- **Ethical Hacking Essentials & Network Defense Certification** - Dikeluarkan oleh: EC-Council
- **DevOps Certified** - Dikeluarkan oleh: PagerDuty
- **Cybersecurity Awareness Certified** - Dikeluarkan oleh: Certiprof
- **SQL (Advanced) & Rest API** – Dikeluarkan oleh: HackerRank
- **Docker Foundation Professional Certificate** - Dikeluarkan oleh: Docker
- **Advanced Website Conversion rate Optimization** - Dikeluarkan oleh: Simplilearn
- **Large Language Models** Dikeluarkan oleh: Google Cloud Skills Boost 
- **Career Essential in Generative AI** Dikeluarkan oleh: Microsoft dan Linkedin
- **Career Essential Software Development** Dikeluarkan oleh Microsoft dan Linkedin 

### Pendidikan:
- **Gelar Sarjana Teknologi Informasi**, Swiss German University (Agt 2022 - Agt 2026)
  - Anggota aktif beberapa klub:
    - Klub Bulu Tangkis (Sekretaris)
    - Asosiasi Mahasiswa IT (Anggota)
    - Klub Catur (Kepala Divisi Acara)
    - SGU Bible Fellowship (Kepala Divisi Kreatif)

### Proyek Utama:
1. **Observer KPU: Solusi Pemilu All-in-One** (Feb 2024 - Jun 2024)
   - Mengembangkan aplikasi web untuk data pemilu real-time di Indonesia menggunakan React.js dan Express.js.
   - Mengintegrasikan API SIREKAP dan menggunakan teknik web scraping untuk menampilkan berita real-time.
   - Membangun chatbot bertenaga GROQ AI untuk memberikan pengguna informasi faktual tentang kandidat dan dinamika politik.

2. **STADPASS - Aplikasi Navigasi Stadion Memanfaatkan Bluetooth Low Energy** (Okt 2023 - Mar 2024)
   - Mengembangkan aplikasi berbasis BLE untuk navigasi stadion, memandu pengguna ke fasilitas dan tempat duduk.
   - Mengaktifkan pemesanan makanan mobile dan notifikasi tentang warung makanan terdekat.
   - Fokus pada peningkatan pengalaman penggemar menggunakan teknologi BLE.

3. **Implementasi Wazuh untuk Memantau Keamanan IT (Workstation Windows dan Linux)** (Sep 2023 - Des 2023)
   - Menganalisis log keamanan dari sistem Windows dan Linux menggunakan alat Wazuh dan SIEM.
   - Memanfaatkan Elasticsearch dan Kibana untuk melakukan analisis log mendalam dan mengidentifikasi ancaman keamanan.

### Informasi Perusahaan  
Commsult Indonesia adalah mitra strategis dari **Commsult AG**, perusahaan berbasis Jerman yang mengkhususkan diri dalam solusi IT inovatif untuk mengoptimalkan proses bisnis. Di Indonesia, perusahaan ini fokus pada penyediaan **layanan pengembangan perangkat lunak yang disesuaikan** dan **konsultasi IT**, disesuaikan untuk memenuhi kebutuhan spesifik bisnis. Commsult Indonesia dikenal karena keahliannya dalam mengembangkan **aplikasi perangkat lunak mobile** dan merampingkan operasi untuk meningkatkan efisiensi. Dengan tim profesional berpengalaman, perusahaan bekerja sama dengan klien untuk memberikan solusi inovatif berkualitas tinggi.

### Keterampilan:
- **Bahasa Pemrograman**: JavaScript (React.js, Node.js), Python, Java
- **Alat DevOps**: Ansible, Docker, Docker Swarm, pipeline CI/CD
- **Pengujian**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Pelaporan Allure
- **Data Science & Machine Learning**: XGBoost, Data Storytelling, Analisis Data Eksplorasi (EDA)
- **Pengembangan Web**: HTML, CSS, JavaScript, React.js, Express.js, pengembangan REST API, Next.js 
- **Cloud & Infrastruktur**: Docker
- **Kontrol Versi & Kolaborasi**: Git

### Pengalaman Hackathon:
- **AI Hackathon oleh Indonesia AI Society**: Berpartisipasi dalam hackathon yang berfokus pada AI, di mana saya mengembangkan dan menyempurnakan **model klasifikasi Random Forest** untuk meningkatkan akurasi prediktif. Melakukan **analisis komparatif** dari berbagai pendekatan machine learning, mengoptimalkan hyperparameter, dan memanfaatkan teknik preprocessing data untuk meningkatkan kinerja model.  
- **PwC Capture The Flag (CTF)**: Terlibat dalam **kompetisi keamanan siber** intensitas tinggi, menyelesaikan tantangan keamanan dunia nyata, termasuk **eksploitasi biner, kriptografi, keamanan web, dan rekayasa balik**. Berkolaborasi dengan penggemar keamanan siber, menerapkan teknik hacking etis, dan meningkatkan keterampilan pemecahan masalah di bawah tekanan.

### Kontak  
- **Matthews Wong**  
  - **Email**: matthewswong2610@gmail.com  
  - **LinkedIn**: Matthews Wong
  - Terbuka untuk kolaborasi, diskusi, dan kesempatan berbagi pengetahuan.
`

const suggestedQuestionsEnglish = [
  "What is Matthews' current role?",
  "What are Matthews' main skills?",
  "What projects has Matthews worked on?",
  "What certifications does Matthews have?",
  "How can I contact Matthews?",
]

const suggestedQuestionsIndonesian = [
  "Apa peran Matthews saat ini?",
  "Apa keterampilan utama Matthews?",
  "Proyek apa yang telah dikerjakan Matthews?",
  "Sertifikasi apa yang dimiliki Matthews?",
  "Bagaimana cara menghubungi Matthews?",
]

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "indonesian">("english")
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true)
  const [detectedSections, setDetectedSections] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  // Define sections for navigation
  const sections: Section[] = [
    {
      id: "about",
      title: selectedLanguage === "indonesian" ? "Tentang" : "About",
      icon: <BookOpen size={16} />,
      keywords: ["about", "overview", "introduction", "tentang", "pengenalan"],
    },
    {
      id: "education",
      title: selectedLanguage === "indonesian" ? "Pendidikan" : "Education",
      icon: <GraduationCap size={16} />,
      keywords: ["education", "university", "degree", "school", "pendidikan", "universitas", "gelar", "sekolah"],
    },
    {
      id: "experience",
      title: selectedLanguage === "indonesian" ? "Pengalaman" : "Experience",
      icon: <Briefcase size={16} />,
      keywords: ["experience", "work", "job", "role", "intern", "pengalaman", "kerja", "pekerjaan", "peran", "magang"],
    },
    {
      id: "certifications",
      title: selectedLanguage === "indonesian" ? "Sertifikasi" : "Certifications",
      icon: <Award size={16} />,
      keywords: ["certification", "certificate", "sertifikasi", "sertifikat"],
    },
    {
      id: "hackathon",
      title: selectedLanguage === "indonesian" ? "Hackathon" : "Hackathon",
      icon: <Trophy size={16} />,
      keywords: ["hackathon", "competition", "contest", "kompetisi", "kontes"],
    },
    {
      id: "projects",
      title: selectedLanguage === "indonesian" ? "Proyek" : "Projects",
      icon: <FolderGit2 size={16} />,
      keywords: ["project", "app", "application", "solution", "proyek", "aplikasi", "solusi"],
    },
    {
      id: "contact",
      title: selectedLanguage === "indonesian" ? "Kontak" : "Contact",
      icon: <Phone size={16} />,
      keywords: ["contact", "email", "linkedin", "kontak", "surel"],
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true)
    }, 4000) // 4 seconds delay

    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }, [messages])

  // Fix for scrolling issue - only prevent background scrolling on mobile when scrolling inside chat
  useEffect(() => {
    // Function to handle touch events on mobile
    const handleTouchMove = (e: TouchEvent) => {
      // Only for mobile devices
      if (window.innerWidth < 768) {
        const target = e.target as HTMLElement
        const chatScrollArea = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")

        // If we're in the chat window but not in the scrollable area, prevent default
        if (isOpen && chatWindowRef.current?.contains(target) && !chatScrollArea?.contains(target)) {
          e.preventDefault()
        }
      }
    }

    // Function to handle wheel events on desktop
    const handleWheel = (e: WheelEvent) => {
      // Don't prevent scrolling on desktop
      if (window.innerWidth >= 768) {
        return
      }

      // For mobile, only prevent if not in scroll area
      const target = e.target as HTMLElement
      const chatScrollArea = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")

      if (isOpen && chatWindowRef.current?.contains(target) && !chatScrollArea?.contains(target)) {
        e.preventDefault()
      }
    }

    if (isOpen) {
      // Only add overflow hidden to body on mobile
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden"
      }

      // Add event listeners
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("wheel", handleWheel, { passive: false })
    } else {
      // Restore normal scrolling when chat is closed
      document.body.style.overflow = ""
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("wheel", handleWheel)
    }

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("wheel", handleWheel)
    }
  }, [isOpen])

  // Function to detect sections in a message
  const detectSectionsInMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()
    const detected: string[] = []

    sections.forEach((section) => {
      if (section.keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase()))) {
        detected.push(section.id)
      }
    })

    return detected
  }

  // Fix the formatResponse function to handle bold text spacing better
  const formatResponse = (response: string) => {
    // Enhanced text formatting for better chat appearance with responsive fixes

    // Add section IDs to headings
    response = response.replace(/(?:^|\n)###\s+(.*?)(?=\n|$)/g, (match, title) => {
      const id = title
        .toLowerCase()
        .trim()
        .replace(/[^\w]+/g, "-")
      return `<h3 id="${id}" class="text-lg font-bold text-violet-300 mt-4 mb-1 scroll-mt-4">${title}</h3>`
    })

    // Handle code blocks \`\`\`code\`\`\` with responsive overflow
    response = response.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-slate-800/80 p-3 rounded-lg my-2 overflow-x-auto text-xs text-emerald-400 max-w-full whitespace-pre-wrap break-words backdrop-blur-sm border border-slate-700/50">$1</pre>',
    )

    // Handle inline code `code` with word-break
    response = response.replace(
      /`([^`]+)`/g,
      '<code class="bg-slate-800/80 px-1.5 py-0.5 rounded text-xs text-emerald-400 break-words border border-slate-700/50">$1</code>',
    )

    // Handle Bullet points with responsive design
    response = response.replace(
      /(?:^|\n)[-+]\s+(.*?)(?=\n|$)/g,
      '<div class="flex items-start my-1 gap-1.5"><span class="text-violet-400 flex-shrink-0">•</span><span class="flex-1 break-words">$1</span></div>',
    )

    // Handle Numbered lists with responsive design
    response = response.replace(
      /(?:^|\n)(\d+)\.\s+(.*?)(?=\n|$)/g,
      '<div class="flex items-start my-1 gap-1.5"><span class="text-violet-400 font-medium flex-shrink-0">$1.</span><span class="flex-1 break-words">$2</span></div>',
    )

    // Handle Bold (**text**) with responsive text - IMPROVED SPACING
    response = response.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-bold text-violet-300 break-words inline-block">$1</span>',
    )

    // Handle Italic (*text* or _text_) with responsive text
    response = response.replace(/\*(.*?)\*/g, '<span class="italic text-slate-300 break-words inline-block">$1</span>')
    response = response.replace(/_(.*?)_/g, '<span class="italic text-slate-300 break-words inline-block">$1</span>')

    // Fix cases where both Bold and Italic are mixed
    response = response.replace(
      /<span[^>]*font-bold[^>]*>\s*<span[^>]*italic[^>]*>(.*?)<\/span>\s*<\/span>/g,
      '<span class="font-bold italic text-violet-300 break-words inline-block">$1</span>',
    )

    // Convert newline characters to <br /> with better spacing
    response = response.replace(/\n\n/g, '<div class="h-3"></div>')
    response = response.replace(/\n/g, "<br />")

    // Handle horizontal rules
    response = response.replace(/(?:^|\n)---(?:\n|$)/g, '<hr class="my-2 border-slate-700" />')

    // Handle blockquotes with word-break
    response = response.replace(
      /(?:^|\n)>\s+(.*?)(?=\n|$)/g,
      '<blockquote class="border-l-4 border-violet-500 pl-3 italic text-slate-400 my-2 break-words">$1</blockquote>',
    )

    // Ensure URLs are properly handled and don't overflow
    response = response.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" class="text-violet-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    return response
  }

  // Simplified section buttons rendering
  const renderSectionButtons = () => {
    if (detectedSections.length === 0) return null

    return (
      <div className="mt-2 mb-4">
        <div className="flex flex-wrap gap-2">
          {detectedSections.map((sectionId) => {
            const section = sections.find((s) => s.id === sectionId)
            if (!section) return null

            return (
              <Button
                key={sectionId}
                variant="outline"
                size="sm"
                className="bg-slate-800/60 text-violet-300 border-violet-500/30 hover:bg-slate-700/80 hover:text-violet-200 flex items-center gap-1.5 py-1 h-auto text-xs"
                onClick={() => handleSend(`Tell me about Matthews' ${section.title}`)}
              >
                {section.icon}
                <span>{section.title}</span>
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  // Improve the system prompt for better responses
  const systemPrompt =
    userPreferences?.language === "indonesian"
      ? `Anda adalah asisten AI untuk Matthews Wong. Gunakan konteks berikut untuk menjawab pertanyaan tentang Matthews:
    ${CONTEXT_INDONESIAN}
    
    Berikan respons yang ringkas, informatif, dan ramah. Format respons dengan **tebal** untuk penekanan penting, *miring* untuk sorotan halus, dan gunakan poin atau daftar bernomor untuk kejelasan. Untuk pengguna mobile, jaga agar respons Anda relatif singkat (maksimal 3-4 paragraf) dan terformat dengan baik.
    
    Penting: 
    1. Selalu mulai respons Anda dengan menyapa pengguna dengan nama mereka (${userPreferences?.name}). Misalnya: "Halo ${userPreferences?.name}, senang bertemu dengan Anda!" atau "Terima kasih atas pertanyaan Anda, ${userPreferences?.name}."
    2. Berikan informasi yang paling relevan terlebih dahulu, lalu detail tambahan.
    3. Gunakan bahasa yang jelas dan mudah dipahami.
    4. Jika Anda tidak yakin tentang sesuatu, akui keterbatasan Anda dan tawarkan informasi yang Anda ketahui.
    
    Ketika Anda menyebutkan bagian seperti "Pendidikan", "Pengalaman", "Sertifikasi", "Hackathon", "Proyek", atau "Kontak", SELALU gunakan format judul ### [Nama Bagian] untuk memudahkan navigasi. Pastikan judul bagian berada pada baris tersendiri dan diikuti oleh konten bagian.`
      : `You are an AI assistant for Matthews Wong. Use the following context to answer questions about Matthews:
    ${CONTEXT_ENGLISH}
    
    Provide concise, informative, and friendly responses. Format the response with **bold** for important emphasis, *italic* for subtle highlights, and use bullet points or numbered lists for clarity. For mobile users, keep your responses relatively brief (max 3-4 paragraphs) and well-formatted.
    
    Important:
    1. Always begin your response by greeting the user by their name (${userPreferences?.name}). For example: "Hello ${userPreferences?.name}, nice to meet you!" or "Thanks for your question, ${userPreferences?.name}."
    2. Provide the most relevant information first, then additional details.
    3. Use clear and easy-to-understand language.
    4. If you're unsure about something, acknowledge your limitations and offer what you do know.
    
    When you mention sections like "Education", "Experience", "Certifications", "Hackathon", "Projects", or "Contact", ALWAYS use the heading format ### [Section Name] to make navigation easier. Make sure the section heading is on its own line and followed by the section content.`

  const handleSend = async (message: string) => {
    if (!message.trim()) return

    // Detect sections in the message
    const detected = detectSectionsInMessage(message)
    setDetectedSections(detected)

    setMessages((prev) => [...prev, { type: "user", content: message }])
    setInputValue("")
    setIsLoading(true)

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama-3.3-70b-versatile",
        max_completion_tokens: 1024,
        temperature: 0.1,
        stream: true, // Enable streaming
      })

      let responseContent = ""
      setMessages((prev) => [...prev, { type: "bot", content: "" }]) // Add an empty bot message to start streaming

      for await (const chunk of chatCompletion) {
        const chunkContent = chunk.choices[0]?.delta?.content || ""
        responseContent += chunkContent

        // Update the last message with the new chunk
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage.type === "bot") {
            return [...prev.slice(0, -1), { type: "bot", content: formatResponse(responseContent) }]
          }
          return prev
        })
      }
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage =
        userPreferences?.language === "indonesian"
          ? `Maaf ${userPreferences?.name}, saya mengalami kesulitan terhubung saat ini. Silakan coba lagi nanti atau hubungi Matthews langsung di matthewswong2610@gmail.com.`
          : `I apologize ${userPreferences?.name}, but I'm having trouble connecting right now. Please try again later or reach out to Matthews directly at matthewswong2610@gmail.com.`

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: errorMessage,
        },
      ])
    }

    setIsLoading(false)
  }

  const handleNewChat = () => {
    setMessages([])
    setDetectedSections([])
  }

  const handleSubmitPreferences = () => {
    if (nameInput.trim()) {
      setUserPreferences({
        name: nameInput,
        language: selectedLanguage,
      })
      setShowWelcomeScreen(false)

      // Add initial greeting message
      const greeting =
        selectedLanguage === "indonesian"
          ? `Halo ${nameInput}! Saya asisten AI Matthews. Apa yang ingin Anda ketahui tentang Matthews hari ini?`
          : `Hello ${nameInput}! I'm Matthews' AI assistant. What would you like to know about Matthews today?`

      setMessages([{ type: "bot", content: greeting }])
    }
  }

  const getWelcomeText = () => {
    return userPreferences?.language === "indonesian"
      ? `👋 Hai ${userPreferences.name}! Silakan tanyakan apa saja tentang Matthews.`
      : `👋 Hi ${userPreferences.name}! Feel free to ask me anything about Matthews.`
  }

  const getBubbleTitle = () => {
    return userPreferences?.language === "indonesian" ? "Asisten AI Matthews" : "Matthews' AI Assistant"
  }

  const getSuggestedQuestions = () => {
    return userPreferences?.language === "indonesian" ? suggestedQuestionsIndonesian : suggestedQuestionsEnglish
  }

  const getWelcomeScreenTitle = () => {
    return userPreferences?.language === "indonesian"
      ? "Selamat datang di Asisten AI Matthews"
      : "Welcome to Matthews' AI Assistant"
  }

  return (
    <>
      {/* Floating Bubble with improved animation */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-4 z-50 max-w-[calc(100vw-32px)]"
          >
            <div className="relative">
              <div
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border border-violet-400/30 backdrop-blur-sm hover:scale-105"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative">
                    <Sparkles size={18} className="text-violet-200 flex-shrink-0" />
                    <div className="absolute inset-0 animate-ping opacity-30">
                      <Sparkles size={18} className="text-violet-200 flex-shrink-0" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-violet-100 truncate">{getBubbleTitle()}</p>
                </div>
                <p className="text-xs text-violet-50 break-words">
                  {userPreferences ? getWelcomeText() : "👋 Hi there! Click to get started."}
                </p>
              </div>
              {/* Improved Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowBubble(false)
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300 border border-red-400/30 shadow-md hover:scale-110"
                aria-label="Close Bubble"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Toggle Button with improved animation */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 border border-violet-400/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Open Chat"
      >
        <MessageCircle size={22} className="drop-shadow-md" />
      </motion.button>

      {/* Modernized Chat Window with improved animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 z-50 w-full sm:w-auto max-h-[100vh] sm:max-h-[90vh] px-4 sm:px-0 flex items-end sm:items-start justify-center sm:justify-end"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <Card
              ref={chatWindowRef}
              className="w-full sm:w-[350px] md:w-[400px] shadow-2xl bg-slate-900/95 backdrop-blur-lg border-slate-700/50 rounded-2xl overflow-hidden mx-auto sm:mx-0 mb-4 sm:mb-0 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-violet-600/20">
                      <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-violet-500/50 animate-ping absolute"></div>
                    </div>
                    <span className="truncate">
                      {userPreferences?.language === "indonesian"
                        ? "Chat dengan AI Matthews"
                        : "Chat with Matthews' AI"}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNewChat}
                      className="h-8 w-8 rounded-full hover:bg-slate-700/70 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label="New Chat"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-700/70 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label="Close Chat"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {showWelcomeScreen ? (
                  <div className="p-4 space-y-6">
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
                      <h3 className="text-lg font-medium text-white mb-4 text-center">
                        {selectedLanguage === "indonesian"
                          ? "Selamat Datang di Asisten AI Matthews"
                          : "Welcome to Matthews' AI Assistant"}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm text-slate-300 mb-1.5 block">
                            {selectedLanguage === "indonesian" ? "Nama Anda" : "Your Name"}
                          </Label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                              size={16}
                            />
                            <Input
                              id="name"
                              value={nameInput}
                              onChange={(e) => setNameInput(e.target.value)}
                              placeholder={selectedLanguage === "indonesian" ? "Masukkan nama Anda" : "Enter your name"}
                              className="pl-9 bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500 focus:ring-violet-500 focus:border-violet-500"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-slate-300 mb-1.5 block">
                            {selectedLanguage === "indonesian" ? "Pilih Bahasa" : "Select Language"}
                          </Label>
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-slate-400" />
                            <RadioGroup
                              value={selectedLanguage}
                              onValueChange={(value) => setSelectedLanguage(value as "english" | "indonesian")}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="english" id="english" />
                                <Label htmlFor="english" className="text-slate-300">
                                  English
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="indonesian" id="indonesian" />
                                <Label htmlFor="indonesian" className="text-slate-300">
                                  Indonesian
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmitPreferences}
                      disabled={!nameInput.trim()}
                      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
                    >
                      {selectedLanguage === "indonesian" ? "Mulai Chat" : "Start Chatting"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <ScrollArea
                      className="h-[60vh] sm:h-[400px] p-3 sm:p-4 touch-auto"
                      ref={scrollAreaRef}
                      data-prevent-scroll-propagation="true"
                    >
                      {messages.length === 0 ? (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-xl p-3 sm:p-4 border border-slate-700/30 backdrop-blur-sm">
                            <p className="text-sm text-slate-200 mb-2 font-medium">
                              {userPreferences?.language === "indonesian"
                                ? `👋 Hai ${userPreferences.name}! Saya asisten AI Matthews. Saya dapat membantu Anda mempelajari lebih lanjut tentang:`
                                : `👋 Hi ${userPreferences.name}! I'm Matthews' AI assistant. I can help you learn more about:`}
                            </p>
                            <ul className="space-y-1.5 ml-4 text-xs text-slate-300">
                              <li className="flex items-start gap-1.5">
                                <span className="text-violet-400 flex-shrink-0">•</span>
                                <span className="break-words">
                                  {userPreferences?.language === "indonesian"
                                    ? "Pengalaman kerja dan proyek-proyeknya"
                                    : "His work experience and projects"}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-violet-400 flex-shrink-0">•</span>
                                <span className="break-words">
                                  {userPreferences?.language === "indonesian"
                                    ? "Keterampilan dan sertifikasi"
                                    : "Skills and certifications"}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-violet-400 flex-shrink-0">•</span>
                                <span className="break-words">
                                  {userPreferences?.language === "indonesian"
                                    ? "Pendidikan dan minat"
                                    : "Education and interests"}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-violet-400 flex-shrink-0">•</span>
                                <span className="break-words">
                                  {userPreferences?.language === "indonesian"
                                    ? "Informasi kontak"
                                    : "Contact information"}
                                </span>
                              </li>
                            </ul>
                          </div>

                          <p className="text-xs text-slate-400 px-1">
                            {userPreferences?.language === "indonesian"
                              ? "Anda dapat bertanya apa saja, atau pilih dari pertanyaan ini:"
                              : "You can ask me anything, or choose from these questions:"}
                          </p>
                          <div className="space-y-2">
                            {getSuggestedQuestions().map((question, index) => (
                              <motion.div
                                key={question}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <Button
                                  variant="secondary"
                                  className="w-full justify-start text-left h-auto py-2.5 px-3.5 whitespace-normal rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 border border-slate-700/30 shadow-sm transition-all duration-200 hover:translate-x-1 text-xs sm:text-sm backdrop-blur-sm"
                                  onClick={() => handleSend(question)}
                                >
                                  {question}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((message, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 max-w-[85%] ${
                                  message.type === "user"
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md"
                                    : "bg-gradient-to-br from-slate-800/90 to-slate-800/60 text-slate-200 border border-slate-700/30 shadow-md backdrop-blur-sm"
                                }`}
                              >
                                {message.type === "bot" ? (
                                  <div
                                    className="text-xs sm:text-sm leading-relaxed prose prose-invert prose-sm max-w-none break-words space-y-1"
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                  />
                                ) : (
                                  <p className="text-xs sm:text-sm break-words">{message.content}</p>
                                )}
                              </div>
                            </motion.div>
                          ))}

                          {/* Section Navigation Buttons */}
                          {detectedSections.length > 0 && renderSectionButtons()}

                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="rounded-xl px-3 py-2 bg-slate-800/60 border border-slate-700/30 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                                  <span className="text-xs text-slate-300">
                                    {userPreferences?.language === "indonesian" ? "Berpikir..." : "Thinking..."}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </ScrollArea>
                    <div className="border-t border-slate-700/50 p-3 sm:p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleSend(inputValue)
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={
                            userPreferences?.language === "indonesian" ? "Ketik pesan Anda..." : "Type your message..."
                          }
                          className="flex-1 bg-slate-800/60 text-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 border border-slate-700/30 placeholder:text-slate-500 backdrop-blur-sm transition-all duration-200"
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
                              e.preventDefault()
                              handleSend(inputValue)
                            }
                          }}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 flex-shrink-0 h-10 w-10 shadow-md hover:shadow-lg hover:shadow-violet-500/20"
                          disabled={isLoading || !inputValue.trim()}
                        >
                          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
