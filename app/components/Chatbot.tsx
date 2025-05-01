"use client"

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
  RefreshCw,
  HelpCircle,
  Languages,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Groq from "groq-sdk"

// Add this to your global CSS or as a style tag
const noScrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

interface Message {
  type: "user" | "bot"
  content: string
}

interface UserPreferences {
  name: string
  language: "english" | "indonesian"
}

const CONTEXT_ENGLISH = `
Matthews Wong is an Information Technology student at Swiss German University, specializing in Technopreneurship. He is passionate about continuous learning and actively participates in international tech communities to stay current with emerging trends and technologies.

### Current Role:
- **DevOps Engineer Intern at Commsult Indonesia** (Jan 2025 – Present)
  - Manages infrastructure using tools such as Ansible and Docker Swarm.
  - Implements deployment automation and CI/CD pipelines to enhance reliability.
  - Maintains uptime for German and Indonesian websites, using monitoring and alerting tools.
  - Uses Grafana for system performance monitoring.

### Previous Experience:
- **Software Development Engineer in Test Intern (SDET) at Commsult Indonesia** (Jul 2024 – Jan 2025)
  - Built automated UI tests using WebdriverIO, XPath, and Mocha.
  - Developed API tests with Supertest and Jest, supporting data-driven validation.
  - Integrated Allure for test result reporting.

- **Data Scientist Intern at id/x partners x Rakamin Academy** (May 2024 – Jun 2024)
  - Performed exploratory data analysis to identify patterns and trends.
  - Presented insights through effective data storytelling and visualizations.
  - Built a machine learning model using XGBoost, resulting in 46% good loans and 0% risky loans.

- **Mobile App Developer Intern at PT Bank Mandiri (Persero) Tbk** (Jan 2024 – Feb 2024)
  - Developed a real-time news Android app using Kotlin, Jetpack Compose, and Material Design.
  - Applied object-oriented principles and integrated SQLite for local data storage.
  - Conducted unit testing using JUnit.

### Certifications:

- **Ethical Hacking Essentials** – issued by EC-Council  
   Focuses on the fundamentals of ethical hacking, penetration testing, and network defense strategies to identify and mitigate cybersecurity threats.
  
- **Network Defense Essentials** – issued by EC-Council  
   Covers key concepts of network defense, network security principles, and the implementation of effective security measures against cyberattacks.
  
- **Cybersecurity Awareness Certification** – issued by CertiProf  
   Provides essential knowledge in cybersecurity practices to raise awareness of risks and best practices to secure digital assets.
  
- **Docker Foundation Professional** – issued by Docker  
   Validates proficiency in containerization using Docker, including securing containerized applications in a cybersecurity context.
  
- **DevOps Certification** – issued by PagerDuty  
   Focuses on the integration of development and operations processes with security practices for continuous security testing and vulnerability management.
  
- **REST API (Advanced)** – issued by HackerRank  
   Covers the advanced principles of securing RESTful APIs and building secure, scalable systems.
  
- **SQL (Advanced)** – issued by HackerRank  
   Specializes in advanced SQL techniques, including securing databases and preventing SQL injection attacks, a critical skill in cybersecurity.
  
- **Career Essentials in Software Development** – issued by Microsoft & LinkedIn  
   Provides a foundation in secure software development practices and secure coding techniques to minimize vulnerabilities in software products.
  
- **Career Essentials in Generative AI** – issued by Microsoft & LinkedIn  
   Explores the cybersecurity considerations of generative AI technologies, including data protection and ethical concerns in AI usage.
  
- **Large Language Models** – issued by Google Cloud Skills Boost  
   Explains the intersection of AI and cybersecurity, focusing on how large language models can enhance threat detection and response strategies.
  
- **Advanced Website Conversion Rate Optimization** – issued by Simplilearn  
   Focuses on website optimization with security best practices to ensure a secure and optimized user experience.


### Education:
- **Bachelor of Information Technology**, Swiss German University (Aug 2022 – Aug 2026)
  - Member of:
    - Badminton Club (Secretary)
    - IT Student Association (Member)
    - Chess Club (Head of Events)
    - SGU Bible Fellowship (Creative Division Head)

### Key Projects:
1. **Observer KPU – Real-time Election Platform** (Feb 2024 – Jun 2024)
   - Built a React.js and Express.js web app to display real-time Indonesian election data.
   - Integrated SIREKAP API and implemented web scraping for live news.
   - Developed an AI chatbot using GROQ to deliver verified political information.

2. **STADPASS – Stadium Navigation App Using BLE** (Oct 2023 – Mar 2024)
   - Created a mobile navigation app using Bluetooth Low Energy for stadium visitors.
   - Enabled food ordering and real-time stall notifications.
   - Focused on improving the fan experience through BLE technology.

3. **Wazuh-Based IT Security Monitoring** (Sep 2023 – Dec 2023)
   - Monitored Windows and Linux systems with Wazuh and SIEM tools.
   - Conducted log analysis using Elasticsearch and Kibana to detect security threats.

### Company Profile – Commsult Indonesia:
Commsult Indonesia is a strategic partner of **Commsult AG**, a German IT company. It specializes in custom software development and IT consulting tailored for businesses. Known for its expertise in mobile solutions and business process optimization, the company delivers high-quality and innovative services.

### Skills:
- **Languages**: JavaScript (React.js, Node.js), Python, Java  
- **DevOps**: Ansible, Docker, Docker Swarm, CI/CD  
- **Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure  
- **Data Science**: EDA, Data Storytelling, XGBoost  
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API, Next.js  
- **Cloud & Infrastructure**: Docker  
- **Version Control**: Git  

### Hackathon Participation:
- **Indonesia AI Society – AI Hackathon**
  - Developed and fine-tuned Random Forest models.
  - Conducted comparative analysis and hyperparameter tuning for ML models.

- **PwC Capture the Flag (CTF)**
  - Solved real-world cybersecurity challenges in cryptography, binary exploitation, web security, and reverse engineering.
  - Applied ethical hacking skills in a competitive environment.

### Contact:
- Name: Matthews Wong  
- Email: matthewswong2610@gmail.com  
- LinkedIn: Matthews Wong  
- Open to collaborations and professional opportunities.
`

const CONTEXT_INDONESIAN = `
Matthews Wong adalah mahasiswa Teknologi Informasi di Swiss German University, dengan spesialisasi di bidang Technopreneurship. Ia memiliki semangat belajar yang tinggi dan aktif dalam berbagai komunitas teknologi internasional untuk mengikuti perkembangan terkini.

### Peran Saat Ini:
- **Magang DevOps Engineer di Commsult Indonesia** (Jan 2025 – Sekarang)
  - Mengelola infrastruktur menggunakan Ansible dan Docker Swarm.
  - Menerapkan otomasi proses deployment dan CI/CD untuk meningkatkan keandalan sistem.
  - Memastikan uptime website Jerman dan Indonesia melalui monitoring dan notifikasi.
  - Menggunakan Grafana untuk memantau kinerja sistem.

### Pengalaman Sebelumnya:
- **Magang Software Development Engineer in Test (SDET) di Commsult Indonesia** (Jul 2024 – Jan 2025)
  - Membangun pengujian UI otomatis menggunakan WebdriverIO, XPath, dan Mocha.
  - Mengembangkan pengujian API menggunakan Supertest dan Jest dengan pendekatan data-driven.
  - Mengintegrasikan Allure untuk pelaporan hasil tes yang mendetail.

- **Magang Virtual Berbasis Proyek – Data Scientist di id/x partners x Rakamin Academy** (Mei 2024 – Jun 2024)
  - Melakukan analisis data eksploratif (EDA) untuk menemukan pola dan tren penting.
  - Menyampaikan insight melalui storytelling data dan visualisasi yang efektif.
  - Membangun model machine learning dengan XGBoost, menghasilkan 46% pinjaman baik dan 0% pinjaman berisiko.

- **Magang Virtual Berbasis Proyek – Mobile App Developer di PT Bank Mandiri (Persero) Tbk** (Jan 2024 – Feb 2024)
  - Mengembangkan aplikasi berita real-time di Android menggunakan Kotlin dan Jetpack Compose.
  - Mengaplikasikan prinsip OOP dan menggunakan SQLite untuk penyimpanan lokal.
  - Melakukan pengujian unit menggunakan JUnit.

### Sertifikasi:

- **Ethical Hacking Essentials** – diterbitkan oleh EC-Council  
   Mempelajari dasar-dasar peretasan etis, uji penetrasi, dan strategi pertahanan jaringan untuk mengidentifikasi dan mengurangi ancaman keamanan siber.

- **Network Defense Essentials** – diterbitkan oleh EC-Council  
   Menyediakan konsep-konsep utama dalam pertahanan jaringan, prinsip keamanan jaringan, dan implementasi langkah-langkah keamanan yang efektif terhadap serangan siber.

- **Cybersecurity Awareness Certification** – diterbitkan oleh CertiProf  
   Memberikan pengetahuan dasar tentang praktik keamanan siber untuk meningkatkan kesadaran terhadap risiko dan praktik terbaik untuk mengamankan aset digital.

- **Docker Foundation Professional** – diterbitkan oleh Docker  
   Memvalidasi kemampuan dalam kontainerisasi menggunakan Docker, termasuk mengamankan aplikasi yang dikontainerkan dalam konteks keamanan siber.

- **DevOps Certification** – diterbitkan oleh PagerDuty  
   Fokus pada integrasi proses pengembangan dan operasi dengan praktik keamanan untuk pengujian keamanan berkelanjutan dan manajemen kerentanannya.

- **REST API (Advanced)** – diterbitkan oleh HackerRank  
   Mencakup prinsip-prinsip lanjutan dalam mengamankan RESTful API dan membangun sistem yang aman dan skalabel.

- **SQL (Advanced)** – diterbitkan oleh HackerRank  
   Khusus dalam teknik SQL lanjutan, termasuk mengamankan basis data dan mencegah serangan SQL injection, yang merupakan keterampilan penting dalam keamanan siber.

- **Career Essentials in Software Development** – diterbitkan oleh Microsoft & LinkedIn  
   Memberikan dasar dalam praktik pengembangan perangkat lunak yang aman dan teknik pengkodean yang aman untuk meminimalkan kerentanannya.

- **Career Essentials in Generative AI** – diterbitkan oleh Microsoft & LinkedIn  
   Menyelidiki pertimbangan keamanan siber dalam teknologi generative AI, termasuk perlindungan data dan masalah etis dalam penggunaan AI.

- **Large Language Models** – diterbitkan oleh Google Cloud Skills Boost  
   Menjelaskan persimpangan antara AI dan keamanan siber, dengan fokus pada bagaimana model bahasa besar dapat meningkatkan strategi deteksi dan respons terhadap ancaman.

- **Advanced Website Conversion Rate Optimization** – diterbitkan oleh Simplilearn  
   Fokus pada optimasi situs web dengan praktik keamanan terbaik untuk memastikan pengalaman pengguna yang aman dan optimal.


### Pendidikan:
- **Sarjana Teknologi Informasi**, Swiss German University (Agt 2022 – Agt 2026)
  - Aktif dalam:
    - Klub Bulu Tangkis (Sekretaris)
    - Himpunan Mahasiswa IT (Anggota)
    - Klub Catur (Kepala Divisi Acara)
    - SGU Bible Fellowship (Kepala Divisi Kreatif)

### Proyek Utama:
1. **Observer KPU – Platform Data Pemilu Real-time** (Feb 2024 – Jun 2024)
   - Membangun aplikasi web menggunakan React.js dan Express.js untuk menampilkan data pemilu Indonesia secara real-time.
   - Mengintegrasikan API SIREKAP dan web scraping untuk berita langsung.
   - Mengembangkan chatbot AI berbasis GROQ untuk menyampaikan informasi politik yang valid.

2. **STADPASS – Aplikasi Navigasi Stadion Berbasis BLE** (Okt 2023 – Mar 2024)
   - Menciptakan aplikasi navigasi stadion berbasis Bluetooth Low Energy.
   - Menyediakan fitur pemesanan makanan dan notifikasi gerai terdekat secara real-time.
   - Fokus pada peningkatan pengalaman pengunjung stadion.

3. **Pemantauan Keamanan IT dengan Wazuh** (Sep 2023 – Des 2023)
   - Memonitor sistem Windows dan Linux menggunakan Wazuh dan SIEM tools.
   - Melakukan analisis log dengan Elasticsearch dan Kibana untuk mendeteksi ancaman keamanan.

### Profil Perusahaan – Commsult Indonesia:
Commsult Indonesia adalah mitra strategis dari **Commsult AG**, perusahaan IT dari Jerman yang fokus pada pengembangan perangkat lunak kustom dan konsultasi IT untuk kebutuhan bisnis. Perusahaan ini dikenal atas keahliannya dalam pengembangan aplikasi mobile dan optimasi proses bisnis.

### Keahlian:
- **Bahasa Pemrograman**: JavaScript (React.js, Node.js), Python, Java  
- **DevOps**: Ansible, Docker, Docker Swarm, CI/CD  
- **Pengujian Software / Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure  
- **Data Science**: EDA, Data Storytelling, XGBoost  
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API, Next.js  
- **Cloud & Infrastruktur**: Docker  
- **Version Control**: Git  

### Pengalaman Hackathon:
- **AI Hackathon – Indonesia AI Society**
  - Membangun model klasifikasi Random Forest, analisis perbandingan model, dan tuning hyperparameter.

- **Capture the Flag (CTF) – PwC**
  - Mengatasi tantangan keamanan siber nyata seperti kriptografi, eksploitasi biner, dan reverse engineering.

### Kontak:
- Nama: Matthews Wong  
- Email: matthewswong2610@gmail.com  
- LinkedIn: Matthews Wong  
- Terbuka untuk kolaborasi dan peluang profesional.
`

const suggestedQuestionsEnglish = [
  "What is Matthews' current role?",
  "What are Matthews' main skills?",
  "What projects has Matthews worked on?",
  "What certifications does Matthews have?",
  "How can I contact Matthews?",
]

const suggestedQuestionsIndonesian = [
  "Apa pekerjaan Matthews saat ini?",
  "Apa keterampilan utama Matthews?",
  "Proyek apa yang telah dikerjakan Matthews?",
  "Sertifikasi apa yang dimiliki Matthews?",
  "Bagaimana cara menghubungi Matthews?",
]

// Quick responses for interactive buttons
const quickResponsesEnglish = [
  { text: "Tell me about your skills", icon: <Sparkles size={14} /> },
  { text: "How can I contact you?", icon: <MessageCircle size={14} /> },
  { text: "What's your education?", icon: <HelpCircle size={14} /> },
  { text: "Recent projects?", icon: <RefreshCw size={14} /> },
]

const quickResponsesIndonesian = [
  { text: "Ceritakan tentang keahlianmu", icon: <Sparkles size={14} /> },
  { text: "Bagaimana cara menghubungimu?", icon: <MessageCircle size={14} /> },
  { text: "Apa pendidikanmu?", icon: <HelpCircle size={14} /> },
  { text: "Proyek terbaru?", icon: <RefreshCw size={14} /> },
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
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const [showQuickResponses, setShowQuickResponses] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

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

  // Load user preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences")
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences)
        setUserPreferences(parsedPreferences)
        setShowWelcomeScreen(false)

        // Add initial greeting message if there are no messages yet
        if (messages.length === 0) {
          const greeting =
            parsedPreferences.language === "indonesian"
              ? `Halo **${parsedPreferences.name}**! Saya asisten AI Matthews. Apa yang ingin Anda ketahui tentang Matthews hari ini?`
              : `Hello **${parsedPreferences.name}**! I'm Matthews' AI assistant. What would you like to know about Matthews today?`

          setMessages([{ type: "bot", content: formatResponse(greeting) }])
        }
      } catch (error) {
        console.error("Error parsing saved preferences:", error)
      }
    }
  }, [])

  const formatResponse = (response: string) => {
    // Enhanced text formatting for better chat appearance with responsive fixes

    // Add section IDs to headings
    response = response.replace(/(?:^|\n)###\s+(.*?)(?=\n|$)/g, (match, title) => {
      const id = title
        .toLowerCase()
        .trim()
        .replace(/[^\w]+/g, "-")
      return `<h3 id="${id}" class="text-lg font-bold text-violet-300 mt-4 mb-1 scroll-mt-4 break-words">${title}</h3>`
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
      '<div class="flex items-start my-1 gap-1.5 max-w-full"><span class="text-violet-400 flex-shrink-0">•</span><span class="flex-1 break-words">$1</span></div>',
    )

    // Handle Numbered lists with responsive design
    response = response.replace(
      /(?:^|\n)(\d+)\.\s+(.*?)(?=\n|$)/g,
      '<div class="flex items-start my-1 gap-1.5 max-w-full"><span class="text-violet-400 font-medium flex-shrink-0">$1.</span><span class="flex-1 break-words">$2</span></div>',
    )

    // Handle Bold (**text**) with improved typography
    response = response.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-bold text-violet-300 break-words inline-block tracking-wide text-sm">$1</span>',
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

  // Improve the system prompt for better responses
  const systemPrompt =
    userPreferences?.language === "indonesian"
      ? `Anda adalah asisten AI untuk Matthews Wong. Gunakan konteks berikut untuk menjawab pertanyaan tentang Matthews:
${CONTEXT_INDONESIAN}

Berikan respons yang *singkat*, *informatif*, dan *ramah*. Gunakan **teks tebal** untuk penekanan penting, *miring* untuk sorotan halus, dan poin atau daftar bernomor untuk memperjelas informasi. Untuk pengguna mobile, jaga agar jawaban tetap pendek (maks. 3–4 paragraf) dan terstruktur rapi.

**Panduan penting:**
1. Mulailah respons pertama dengan menyapa pengguna menggunakan nama mereka (${userPreferences?.name}). Contoh: "Halo ${userPreferences?.name}, senang bertemu dengan Anda!" atau "Terima kasih atas pertanyaannya, ${userPreferences?.name}."
2. Sampaikan informasi paling relevan terlebih dahulu, kemudian baru detail pendukung.
3. Gunakan bahasa yang jelas, santai, dan mudah dimengerti.
4. Jika Anda tidak yakin tentang sesuatu, katakan dengan jujur dan berikan informasi yang Anda ketahui.
5. Hindari respons yang terlalu panjang. Buat padat, menarik, dan akhiri dengan satu pertanyaan untuk menjaga alur percakapan.
`
      : `You are an AI assistant for Matthews Wong. Use the following context to respond to questions about Matthews:
${CONTEXT_ENGLISH}

Provide responses that are *concise*, *informative*, and *friendly*. Use **bold** for key emphasis, *italics* for subtle highlights, and organize information using bullet points or numbered lists for clarity. For mobile users, responses should remain brief (max 3–4 paragraphs) and well-structured.

**Key Guidelines:**
1. Greet the user by name the first time (${userPreferences?.name}). For example: "Hello ${userPreferences?.name}, nice to meet you!" or "Thanks for your question, ${userPreferences?.name}."
2. Start with the most relevant information, followed by supporting details.
3. Use simple, clear, and conversational language.
4. If unsure about something, be transparent and share what you do know.
5. Keep responses short and engaging, and always end with an open-ended question to encourage further conversation.
`

  const handleSend = async (message: string) => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { type: "user", content: message }])
    setInputValue("")
    setIsLoading(true)
    setShowQuickResponses(false)

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

    // Show quick responses after bot responds
    setTimeout(() => {
      setShowQuickResponses(true)
    }, 500)
  }

  const handleNewChat = () => {
    setMessages([])
    setShowQuickResponses(true)
  }

  const handleSubmitPreferences = () => {
    if (nameInput.trim()) {
      const newPreferences = {
        name: nameInput,
        language: selectedLanguage,
      }

      // Save to state
      setUserPreferences(newPreferences)

      // Save to localStorage
      localStorage.setItem("userPreferences", JSON.stringify(newPreferences))

      setShowWelcomeScreen(false)

      // Add initial greeting message
      const greeting =
        selectedLanguage === "indonesian"
          ? `Halo **${nameInput}**! Saya asisten AI Matthews. Apa yang ingin Anda ketahui tentang Matthews hari ini?`
          : `Hello **${nameInput}**! I'm Matthews' AI assistant. What would you like to know about Matthews today?`

      setMessages([{ type: "bot", content: formatResponse(greeting) }])

      // Show quick responses after greeting
      setTimeout(() => {
        setShowQuickResponses(true)
      }, 500)
    }
  }

  const getWelcomeText = () => {
    return userPreferences?.language === "indonesian"
      ? `👋 Hai <span class="font-bold text-white text-sm bg-violet-500/30 px-1.5 py-0.5 rounded-md">${userPreferences.name}</span>! Silakan tanyakan apa saja tentang Matthews.`
      : `👋 Hi <span class="font-bold text-white text-sm bg-violet-500/30 px-1.5 py-0.5 rounded-md">${userPreferences.name}</span>! Feel free to ask me anything about Matthews.`
  }

  const getBubbleTitle = () => {
    return userPreferences?.language === "indonesian" ? "Asisten AI Matthews" : "Matthews' AI Assistant"
  }

  const getSuggestedQuestions = () => {
    return userPreferences?.language === "indonesian" ? suggestedQuestionsIndonesian : suggestedQuestionsEnglish
  }

  const getQuickResponses = () => {
    return userPreferences?.language === "indonesian" ? quickResponsesIndonesian : quickResponsesEnglish
  }

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === "english" ? "indonesian" : "english"
    setSelectedLanguage(newLanguage)

    if (userPreferences) {
      const updatedPreferences = {
        ...userPreferences,
        language: newLanguage,
      }
      setUserPreferences(updatedPreferences)
      localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences))

      // Add language change notification
      const notification =
        newLanguage === "indonesian"
          ? `<span class="break-words">Bahasa diubah ke Bahasa Indonesia.</span>`
          : `<span class="break-words">Language changed to English.</span>`

      setMessages((prev) => [...prev, { type: "bot", content: notification }])
    }
  }

  return (
    <>
      {/* Floating Bubble with improved animation */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 max-w-[calc(100vw-32px)]"
          >
            <div className="relative">
              <div
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border border-violet-400/30"
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
                {userPreferences ? (
                  <div
                    className="text-xs text-violet-50 break-words"
                    dangerouslySetInnerHTML={{ __html: getWelcomeText() }}
                  />
                ) : (
                  <p className="text-xs text-violet-50 break-words">👋 Hi there! Click to get started.</p>
                )}
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
        whileHover={{ scale: 1.1, animationPlayState: "paused" }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 z-50 w-full sm:w-auto max-h-[100vh] sm:max-h-[90vh] px-4 sm:px-0 flex items-end sm:items-start justify-center sm:justify-end"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <Card
              ref={chatWindowRef}
              className="w-full sm:w-[350px] md:w-[400px] shadow-2xl bg-slate-900/95 backdrop-blur-lg border-slate-700/50 rounded-2xl overflow-hidden mx-auto sm:mx-0 mb-4 sm:mb-0 max-h-[90vh] transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800 py-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-violet-600/20">
                      <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-violet-500/50 animate-ping absolute"></div>
                    </div>
                    <span className="truncate">
                      {userPreferences?.language === "indonesian"
                        ? "Matthews AI Chat"
                        : "Matthews AI Chat"}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {/* Language toggle button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleLanguage}
                      className="h-8 w-8 rounded-full hover:bg-slate-700/70 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label={selectedLanguage === "english" ? "Switch to Indonesian" : "Switch to English"}
                      title={selectedLanguage === "english" ? "Switch to Indonesian" : "Switch to English"}
                    >
                      <Languages size={16} />
                    </Button>

                    {/* New chat button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNewChat}
                      className="h-8 w-8 rounded-full hover:bg-slate-700/70 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label="New Chat"
                      title="New Chat"
                    >
                      <Trash2 size={16} />
                    </Button>

                    {/* Close button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-700/70 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label="Close Chat"
                      title="Close Chat"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {showWelcomeScreen ? (
                  <div className="p-4 space-y-6">
                    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md">
                      <h3 className="text-lg font-medium text-white mb-5 text-center">
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
                              onChange={(e) => setNameInput(e.target.value.slice(0, 8))}
                              placeholder={selectedLanguage === "indonesian" ? "Masukkan nama Anda" : "Enter your name"}
                              className="pl-9 bg-slate-800 text-white placeholder:text-slate-500 focus:ring-violet-500 focus:border-violet-500 border border-slate-700"
                            />
                          </div>
                          <div className="mt-1 text-xs text-slate-400 flex justify-between">
                            <span>{selectedLanguage === "indonesian" ? "Maks. 8 karakter" : "Max. 8 characters"}</span>
                            <span>{nameInput.length}/8</span>
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
                          <div className="mt-1 text-xs text-slate-400">
                            {selectedLanguage === "indonesian"
                              ? "Pilih bahasa untuk berinteraksi dengan asisten"
                              : "Choose your preferred language for interaction"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmitPreferences}
                      disabled={!nameInput.trim()}
                      className="w-full bg-violet-600 hover:bg-violet-500 transition-colors duration-200 text-white shadow-md"
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
                          <div className="bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-700">
                            <p className="text-sm text-slate-200 mb-2 font-medium">
                              {userPreferences?.language === "indonesian" ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `👋 Hai <span class="font-bold text-white text-sm bg-violet-500/30 px-1.5 py-0.5 rounded-md">${userPreferences.name}</span>! Saya asisten AI Matthews. Saya dapat membantu Anda mempelajari lebih lanjut tentang:`,
                                  }}
                                />
                              ) : (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `👋 Hi <span class="font-bold text-white text-sm bg-violet-500/30 px-1.5 py-0.5 rounded-md">${userPreferences.name}</span>! I'm Matthews' AI assistant. I can help you learn more about:`,
                                  }}
                                />
                              )}
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.1 }}
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
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 max-w-[85%] overflow-hidden ${
                                  message.type === "user"
                                    ? "bg-violet-600 text-white shadow-md"
                                    : "bg-slate-800 text-slate-200 border border-slate-700 shadow-md"
                                }`}
                              >
                                {message.type === "bot" ? (
                                  <div
                                    className="text-xs sm:text-sm leading-relaxed prose prose-invert prose-sm max-w-none break-words space-y-1 overflow-hidden"
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                  />
                                ) : (
                                  <p className="text-xs sm:text-sm break-words">{message.content}</p>
                                )}
                              </div>
                            </motion.div>
                          ))}

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

                    {/* Quick response buttons */}
                    {showQuickResponses && messages.length > 0 && (
                      <div className="px-3 py-2 border-t border-slate-700/50 bg-slate-800/50">
                        <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-hide no-scrollbar">
                          {getQuickResponses().map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.1 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSend(item.text)}
                                className="whitespace-nowrap flex items-center gap-1.5 bg-slate-800 border-slate-700 hover:bg-slate-700 text-xs flex-shrink-0"
                              >
                                {item.icon}
                                {item.text}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-700/50 bg-slate-800/30 px-3 py-2 flex justify-between">
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700"
                          onClick={handleNewChat}
                          title={userPreferences?.language === "indonesian" ? "Chat Baru" : "New Chat"}
                        >
                          <RefreshCw size={14} />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700 ${isSpeaking ? "text-violet-400" : ""}`}
                          onClick={() => {
                            if (isSpeaking) {
                              window.speechSynthesis.cancel()
                              setIsSpeaking(false)
                            } else {
                              // Text-to-speech functionality
                              const lastBotMessage = [...messages].reverse().find((m) => m.type === "bot")?.content
                              if (lastBotMessage) {
                                // Strip HTML tags for speech
                                const textOnly = lastBotMessage.replace(/<[^>]*>/g, "")
                                const speech = new SpeechSynthesisUtterance(textOnly)
                                speech.lang = userPreferences?.language === "indonesian" ? "id-ID" : "en-US"
                                speech.onend = () => setIsSpeaking(false)
                                window.speechSynthesis.speak(speech)
                                setIsSpeaking(true)
                              }
                            }
                          }}
                          title={
                            userPreferences?.language === "indonesian"
                              ? isSpeaking
                                ? "Hentikan Suara"
                                : "Baca Pesan"
                              : isSpeaking
                                ? "Stop Reading"
                                : "Read Message"
                          }
                        >
                          {isSpeaking ? <X size={14} /> : <Volume2 size={14} />}
                        </Button>
                      </div>
                    </div>

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
                          className="flex-1 bg-slate-800 text-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 border border-slate-700 placeholder:text-slate-500 shadow-inner transition-all duration-200"
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
                          className="rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors duration-200 flex-shrink-0 h-10 w-10 shadow-md"
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
