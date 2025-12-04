import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
})

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
- Ethical Hacking Essentials – EC-Council
- Network Defense Essentials – EC-Council
- Cybersecurity Awareness Certification – CertiProf
- Docker Foundation Professional – Docker
- DevOps Certification – PagerDuty
- REST API (Advanced) – HackerRank
- SQL (Advanced) – HackerRank
- Career Essentials in Software Development – Microsoft & LinkedIn
- Career Essentials in Generative AI – Microsoft & LinkedIn
- Large Language Models – Google Cloud Skills Boost
- Advanced Website Conversion Rate Optimization – Simplilearn

### Education:
- **Bachelor of Information Technology**, Swiss German University (Aug 2022 – Aug 2026)
  - Member of: Badminton Club (Secretary), IT Student Association, Chess Club (Head of Events), SGU Bible Fellowship (Creative Division Head)

### Key Projects:
1. **Observer KPU – Real-time Election Platform** (Feb 2024 – Jun 2024)
   - Built a React.js and Express.js web app to display real-time Indonesian election data.
   - Integrated SIREKAP API and implemented web scraping for live news.
   - Developed an AI chatbot using GROQ to deliver verified political information.

2. **STADPASS – Stadium Navigation App Using BLE** (Oct 2023 – Mar 2024)
   - Created a mobile navigation app using Bluetooth Low Energy for stadium visitors.
   - Enabled food ordering and real-time stall notifications.

3. **Wazuh-Based IT Security Monitoring** (Sep 2023 – Dec 2023)
   - Monitored Windows and Linux systems with Wazuh and SIEM tools.
   - Conducted log analysis using Elasticsearch and Kibana.

### Skills:
- **Languages**: JavaScript (React.js, Node.js), Python, Java
- **DevOps**: Ansible, Docker, Docker Swarm, CI/CD
- **Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure
- **Data Science**: EDA, Data Storytelling, XGBoost
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API, Next.js

### Contact:
- Email: matthewswong2610@gmail.com
- LinkedIn: Matthews Wong
- Open to collaborations and professional opportunities.
`

const CONTEXT_INDONESIAN = `
Matthews Wong adalah mahasiswa Teknologi Informasi di Swiss German University, dengan spesialisasi di bidang Technopreneurship. Ia memiliki semangat belajar yang tinggi dan aktif dalam berbagai komunitas teknologi internasional.

### Peran Saat Ini:
- **Magang DevOps Engineer di Commsult Indonesia** (Jan 2025 – Sekarang)
  - Mengelola infrastruktur menggunakan Ansible dan Docker Swarm.
  - Menerapkan otomasi proses deployment dan CI/CD.
  - Menggunakan Grafana untuk memantau kinerja sistem.

### Pengalaman Sebelumnya:
- **Magang SDET di Commsult Indonesia** (Jul 2024 – Jan 2025)
  - Membangun pengujian UI otomatis menggunakan WebdriverIO, XPath, dan Mocha.
  - Mengembangkan pengujian API menggunakan Supertest dan Jest.

- **Magang Data Scientist di id/x partners x Rakamin Academy** (Mei 2024 – Jun 2024)
  - Melakukan analisis data eksploratif (EDA).
  - Membangun model machine learning dengan XGBoost.

- **Magang Mobile App Developer di PT Bank Mandiri** (Jan 2024 – Feb 2024)
  - Mengembangkan aplikasi berita real-time di Android menggunakan Kotlin dan Jetpack Compose.

### Pendidikan:
- **Sarjana Teknologi Informasi**, Swiss German University (Agt 2022 – Agt 2026)

### Keahlian:
- **Bahasa Pemrograman**: JavaScript (React.js, Node.js), Python, Java
- **DevOps**: Ansible, Docker, Docker Swarm, CI/CD
- **Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure
- **Data Science**: EDA, Data Storytelling, XGBoost
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API, Next.js

### Kontak:
- Email: matthewswong2610@gmail.com
- LinkedIn: Matthews Wong
- Terbuka untuk kolaborasi dan peluang profesional.
`

export async function POST(request: NextRequest) {
  try {
    const { message, language, userName, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const context = language === "indonesian" ? CONTEXT_INDONESIAN : CONTEXT_ENGLISH

    const systemPrompt = language === "indonesian"
      ? `Anda adalah asisten AI untuk Matthews Wong. Gunakan konteks berikut untuk menjawab pertanyaan tentang Matthews:
${context}

Berikan respons yang *singkat*, *informatif*, dan *ramah*. Gunakan **teks tebal** untuk penekanan penting. Untuk pengguna mobile, jaga agar jawaban tetap pendek (maks. 3–4 paragraf).

**Panduan:**
1. Sapa pengguna dengan nama mereka (${userName}) jika ini percakapan pertama.
2. Sampaikan informasi paling relevan terlebih dahulu.
3. Gunakan bahasa yang jelas dan mudah dimengerti.
4. Jika tidak yakin, katakan dengan jujur.
5. Hindari respons yang terlalu panjang.`
      : `You are an AI assistant for Matthews Wong. Use the following context to respond to questions about Matthews:
${context}

Provide responses that are *concise*, *informative*, and *friendly*. Use **bold** for key emphasis. For mobile users, responses should remain brief (max 3–4 paragraphs).

**Guidelines:**
1. Greet the user by name (${userName}) if this is the first interaction.
2. Start with the most relevant information.
3. Use simple, clear, and conversational language.
4. If unsure, be transparent.
5. Keep responses short and engaging.`

    // Build messages array with conversation history
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt }
    ]

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-6)) { // Keep last 6 messages for context
        messages.push({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content
        })
      }
    }

    // Add the new message
    messages.push({ role: "user", content: message })

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      max_completion_tokens: 1024,
      temperature: 0.7,
      stream: false,
    })

    const responseContent = chatCompletion.choices[0]?.message?.content || ""

    return NextResponse.json({ 
      content: responseContent,
      success: true 
    })

  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response", success: false },
      { status: 500 }
    )
  }
}
