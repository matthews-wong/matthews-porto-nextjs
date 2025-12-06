import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY,
})

const CONTEXT_ENGLISH = `
Matthews Wong is an Information Technology student at Swiss German University, specializing in Technopreneurship. He is passionate about continuous learning and actively participates in international tech communities to stay current with emerging trends and technologies.

### Current Role:
- **DevOps (Part-Time) at Commsult Indonesia** (September 2025 – Present)
  - Integrate SonarQube into CI/CD pipelines to enforce code quality and vulnerability checks
  - Handle day-to-day deployments across multiple environments.
  - Develop and maintain automation scripts to optimize operational workflows.
  - Migrate services from Public IP architecture to Load Balancers for improved scalability and security.

### Previous Experience:
- **DevOps Engineer Intern at Commsult Indonesia** (Jan 2025 – September 2025)
  - Manages infrastructure using tools such as Ansible and Docker Swarm.
  - Implements deployment automation and CI/CD pipelines to enhance reliability.
  - Maintains uptime for German and Indonesian websites, using monitoring and alerting tools.
  - Uses Grafana for system performance monitoring.

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

### Featured Projects:
A showcase of Matthews' technical projects and contributions.

**Web Applications:**
1. **AI Feeds** (Web App)
   - Anti doom-scrolling platform. Scroll through curated AI repositories to expand your knowledge.
   - Visit: aifeeds.matthewswong.com

2. **Observer KPU – Election Web App with LLM** (Web App)
   - An all-in-one election news resource with automated web scraping and an AI chatbot tuned with election and candidate data.
   - Built with React.js and Express.js to display real-time Indonesian election data.
   - Integrated SIREKAP API and implemented web scraping for live news.

**DevOps Tools:**
3. **Review CI** (DevOps Tool)
   - A pipeline reader that evaluates your CI/CD pipelines and gives actionable insights.
   - Visit: reviewci.matthewswong.com

**Commercial Websites:**
4. **Jakarta Intl Denso** (Commercial)
   - Car wash company website. Boosted SEO and increased online visibility for local customers.
   - Visit: jakartaintldenso.com

5. **Parcel Cirebon** (E-commerce)
   - E-commerce platform helping this store grow online visibility for Christmas parcels and more.
   - Visit: parcelcirebon.com

6. **TikTok Agency Incubator** (Campaign)
   - Web app from official TikTok campaign. Built in a fast-paced agency environment.
   - Visit: tiktokagencyincubator.com

7. **Shibui Matcha Bar** (Landing Page)
   - Landing page for matcha bar & cafe. Grew visitor traffic and boosted online visibility.
   - Visit: shibui.id

**Mobile Apps:**
8. **STADPASS - Stadium Navigation App** (Mobile App)
   - A mobile app designed to help users navigate stadiums using Bluetooth Low Energy (BLE) technology.
   - Enabled food ordering and real-time stall notifications.

**Data Science & Security:**
9. **Credit Risk Analysis with XGBoost** (Data Science)
   - Developed a comprehensive credit risk analysis using advanced XGBoost modeling techniques.
   - Resulted in 46% good loans and 0% risky loans prediction.

10. **Security Onion - Network Monitoring** (Security)
    - Developed and implemented a comprehensive network security monitoring solution using Security Onion.
    - Monitored Windows and Linux systems with Wazuh and SIEM tools.
    - Conducted log analysis using Elasticsearch and Kibana.

### Hackathons & Events:
Matthews actively participates in tech events, hackathons, and workshops.

1. **PwC Capture the Flag** (2023)
   - Hackaday Event organized by PwC
   - Cybersecurity challenge focusing on identifying vulnerabilities

2. **Blockchain Training** (2024)
   - Organized by Pelita Bangsa Academy
   - Training on blockchain technology fundamentals

3. **AI Hackathon** (2024)
   - Organized by AI Indonesia Society
   - Competition focused on AI/ML solutions

4. **PwC CTF 2024** (2024)
   - Annual Hackaday event by PwC
   - Advanced cybersecurity challenges

5. **Software Development Workshop** (2024)
   - Organized by Commsult Indonesia
   - Workshop on software development best practices

6. **Web3 Networking Event** (2024)
   - Organized by Pelita Bangsa Academy
   - Networking event focused on Web3 technologies

7. **Blockchain Bootcamp** (2024)
   - Organized by Pelita Bangsa Academy
   - Intensive bootcamp on blockchain development

8. **IT Symposium** (2024)
   - SGU Project Showcase
   - Presented Observer KPU project, won Most Favorite Project!

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
- **DevOps (Part-Time) di Commsult Indonesia** (Jan 2025 – Sekarang)
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

### Sertifikasi:
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

### Proyek Unggulan:
Showcase proyek teknis dan kontribusi Matthews.

**Aplikasi Web:**
1. **AI Feeds** (Aplikasi Web)
   - Platform anti doom-scrolling. Scroll melalui repositori AI terkurasi untuk memperluas pengetahuan Anda.
   - Kunjungi: aifeeds.matthewswong.com

2. **Observer KPU – Aplikasi Web Pemilu dengan LLM** (Aplikasi Web)
   - Sumber berita pemilu lengkap dengan web scraping otomatis dan AI chatbot yang disesuaikan dengan data pemilu dan kandidat.
   - Dibangun dengan React.js dan Express.js untuk menampilkan data pemilu Indonesia secara real-time.
   - Mengintegrasikan API SIREKAP dan menerapkan web scraping untuk berita langsung.

**Tools DevOps:**
3. **Review CI** (Tool DevOps)
   - Pembaca pipeline yang mengevaluasi pipeline CI/CD Anda dan memberikan insight yang dapat ditindaklanjuti.
   - Kunjungi: reviewci.matthewswong.com

**Website Komersial:**
4. **Jakarta Intl Denso** (Komersial)
   - Website perusahaan cuci mobil. Meningkatkan SEO dan visibilitas online untuk pelanggan lokal.
   - Kunjungi: jakartaintldenso.com

5. **Parcel Cirebon** (E-commerce)
   - Platform e-commerce membantu toko ini meningkatkan visibilitas online untuk parcel Natal dan lainnya.
   - Kunjungi: parcelcirebon.com

6. **TikTok Agency Incubator** (Kampanye)
   - Aplikasi web dari kampanye resmi TikTok. Dibangun di lingkungan agensi yang dinamis.
   - Kunjungi: tiktokagencyincubator.com

7. **Shibui Matcha Bar** (Landing Page)
   - Landing page untuk matcha bar & kafe. Meningkatkan traffic pengunjung dan visibilitas online.
   - Kunjungi: shibui.id

**Aplikasi Mobile:**
8. **STADPASS - Aplikasi Navigasi Stadion** (Aplikasi Mobile)
   - Aplikasi mobile yang dirancang untuk membantu pengguna menavigasi stadion menggunakan teknologi Bluetooth Low Energy (BLE).
   - Mengaktifkan pemesanan makanan dan notifikasi kios secara real-time.

**Data Science & Keamanan:**
9. **Credit Risk Analysis dengan XGBoost** (Data Science)
   - Mengembangkan analisis risiko kredit komprehensif menggunakan teknik pemodelan XGBoost tingkat lanjut.
   - Menghasilkan prediksi 46% pinjaman baik dan 0% pinjaman berisiko.

10. **Security Onion - Monitoring Jaringan** (Keamanan)
    - Mengembangkan dan mengimplementasikan solusi monitoring keamanan jaringan komprehensif menggunakan Security Onion.
    - Memantau sistem Windows dan Linux dengan Wazuh dan SIEM tools.
    - Melakukan analisis log menggunakan Elasticsearch dan Kibana.

### Pendidikan:
- **Sarjana Teknologi Informasi**, Swiss German University (Agt 2022 – Agt 2026)

### Hackathon & Acara:
Matthews aktif berpartisipasi dalam acara teknologi, hackathon, dan workshop.

1. **PwC Capture the Flag** (2023)
   - Acara Hackaday yang diselenggarakan oleh PwC
   - Tantangan keamanan siber fokus pada identifikasi kerentanan

2. **Blockchain Training** (2024)
   - Diselenggarakan oleh Pelita Bangsa Academy
   - Pelatihan tentang dasar-dasar teknologi blockchain

3. **AI Hackathon** (2024)
   - Diselenggarakan oleh AI Indonesia Society
   - Kompetisi fokus pada solusi AI/ML

4. **PwC CTF 2024** (2024)
   - Acara Hackaday tahunan oleh PwC
   - Tantangan keamanan siber tingkat lanjut

5. **Software Development Workshop** (2024)
   - Diselenggarakan oleh Commsult Indonesia
   - Workshop tentang praktik terbaik pengembangan perangkat lunak

6. **Web3 Networking Event** (2024)
   - Diselenggarakan oleh Pelita Bangsa Academy
   - Acara networking fokus pada teknologi Web3

7. **Blockchain Bootcamp** (2024)
   - Diselenggarakan oleh Pelita Bangsa Academy
   - Bootcamp intensif tentang pengembangan blockchain

8. **IT Symposium** (2024)
   - SGU Project Showcase
   - Mempresentasikan proyek Observer KPU, memenangkan Most Favorite Project!

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
