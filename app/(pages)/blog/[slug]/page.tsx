"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react"

const blogPosts: Record<string, {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  content: React.ReactNode
}> = {
  "building-saas-ai-gymbro": {
    title: "Building My First SaaS: AI Gym Bro",
    excerpt: "The journey of building an AI-powered fitness companion from scratch.",
    image: "/my-product.png",
    date: "November 2024",
    readTime: "5 min read",
    category: "Product",
    content: (
      <>
        <p>
          Building AI Gym Bro has been one of the most rewarding experiences of my developer journey. What started as a simple idea—an AI that could help people with their fitness goals—turned into a full-fledged SaaS product that I'm incredibly proud of.
        </p>

        <h2>The Spark of an Idea</h2>
        <p>
          It all began when I noticed how many people struggle to stay consistent with their workouts. They either don't know where to start, get bored with their routines, or simply lack the motivation to keep going. I thought, "What if there was an AI that could be your personal gym buddy—always available, always encouraging, and always adapting to your needs?"
        </p>

        <h2>The Tech Stack</h2>
        <p>
          For AI Gym Bro, I chose a modern stack that would allow for rapid development while maintaining high performance:
        </p>
        <ul>
          <li><strong>Next.js</strong> for the frontend and API routes</li>
          <li><strong>TypeScript</strong> for type safety across the codebase</li>
          <li><strong>Tailwind CSS</strong> for rapid UI development</li>
          <li><strong>OpenAI API</strong> for the conversational AI capabilities</li>
          <li><strong>Vercel</strong> for seamless deployment and hosting</li>
        </ul>

        <h2>Challenges Along the Way</h2>
        <p>
          Building a SaaS isn't just about coding—it's about solving real problems for real people. Some of the biggest challenges I faced included:
        </p>
        <ul>
          <li><strong>Prompt Engineering:</strong> Getting the AI to give consistent, helpful, and safe fitness advice took countless iterations</li>
          <li><strong>User Experience:</strong> Making the interface intuitive enough that users could get value within seconds of landing on the site</li>
          <li><strong>Performance:</strong> Ensuring fast response times even with AI-generated content</li>
        </ul>

        <h2>Lessons Learned</h2>
        <p>
          This project taught me invaluable lessons about product development:
        </p>
        <ul>
          <li><strong>Start small, iterate fast:</strong> My first version was extremely basic, but it helped me validate the idea quickly</li>
          <li><strong>Listen to users:</strong> Every piece of feedback is gold. Users showed me features I never would have thought of</li>
          <li><strong>Ship imperfect:</strong> Waiting for perfection is the enemy of progress. Launch, learn, improve</li>
        </ul>

        <h2>What's Next?</h2>
        <p>
          AI Gym Bro is just getting started. I'm working on features like personalized workout plans, progress tracking, and integration with fitness wearables. The goal is to make it the ultimate AI fitness companion that helps everyone achieve their health goals.
        </p>

        <p>
          If you haven't tried it yet, check it out at <a href="https://www.aigymbro.web.id" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">aigymbro.web.id</a>. I'd love to hear your feedback!
        </p>
      </>
    ),
  },
  "life-at-swiss-german-university": {
    title: "My Experience at Swiss German University",
    excerpt: "A reflection on studying Information Technology at SGU.",
    image: "/images/sgu-location.webp",
    date: "October 2024",
    readTime: "4 min read",
    category: "University",
    content: (
      <>
        <p>
          Choosing Swiss German University (SGU) for my Information Technology degree was one of the best decisions I've ever made. Located in the iconic Prominence Tower in Alam Sutera, SGU offers a unique blend of Indonesian warmth and European academic rigor.
        </p>

        <h2>The Campus Life</h2>
        <p>
          Studying at Prominence Tower gives you a different perspective. The modern high-rise setting in the heart of Alam Sutera creates a professional atmosphere that prepares you for the corporate world. From the state-of-the-art computer labs to the stunning city views, every corner of the campus inspires you to aim higher.
        </p>
        <p>
          What makes SGU special is its intimate class sizes. Unlike massive lecture halls at other universities, our classes are small enough that professors know your name. This creates an environment where asking questions and engaging in discussions feels natural.
        </p>

        <h2>Jack of All Trades? Think Again.</h2>
        <p>
          When I first started at SGU, I had this nagging worry: "Am I just scratching the surface of everything? Am I becoming a jack of all trades, master of none?" The IT curriculum covers so much—web development, databases, networking, security, AI, mobile development, and more. It felt overwhelming at times.
        </p>
        <p>
          But as I progressed through my studies, I had a revelation. Learning the breadth of technology isn't a weakness—it's a superpower. By understanding a little bit of everything, I gained something invaluable: <strong>perspective</strong>.
        </p>
        <p>
          Now I can see how different pieces of technology connect. I understand why a backend developer needs to think about security, why a frontend developer should understand databases, and why everyone should know the basics of DevOps. This bird's-eye view helped me discover what truly excites me and where I want to go deeper.
        </p>

        <h2>Finding My Depth</h2>
        <p>
          The broad foundation SGU gave me allowed me to explore and eventually find my passions. For me, it turned out to be:
        </p>
        <ul>
          <li><strong>Full-stack Web Development:</strong> Building complete applications from frontend to backend</li>
          <li><strong>DevOps & Automation:</strong> Making deployment and operations seamless</li>
          <li><strong>AI & Machine Learning:</strong> Creating intelligent applications</li>
        </ul>
        <p>
          I wouldn't have discovered these interests if I hadn't been exposed to everything first. The "jack of all trades" approach wasn't spreading me thin—it was helping me find my direction.
        </p>

        <h2>The Academic Journey</h2>
        <p>
          The IT curriculum at SGU is rigorous but rewarding. We don't just learn theory—we build things. From our first semester, we're writing code, building applications, and working on real-world projects. The professors, many of whom have industry experience, bring practical insights that textbooks simply can't provide.
        </p>
        <p>
          Some of my favorite courses include:
        </p>
        <ul>
          <li><strong>Software Engineering:</strong> Where I learned the discipline of building maintainable, scalable software</li>
          <li><strong>Database Systems:</strong> Understanding how data flows and is stored in modern applications</li>
          <li><strong>Web Development:</strong> Building full-stack applications from scratch</li>
          <li><strong>AI & Machine Learning:</strong> Exploring the cutting-edge of technology</li>
        </ul>

        <h2>Beyond the Classroom</h2>
        <p>
          University life at SGU extends far beyond lectures and assignments. I've had the opportunity to participate in hackathons, tech workshops, and networking events. The IT Symposium, where I showcased the Observer KPU project, was a highlight—our team won Most Favorite Project!
        </p>
        <p>
          The connections I've made here—with classmates, professors, and industry professionals—have opened doors I never knew existed. From internship opportunities to collaborative projects, the SGU network is invaluable.
        </p>

        <h2>The Lesson</h2>
        <p>
          If you're a student feeling overwhelmed by the breadth of what you're learning, here's my advice: embrace it. Don't worry about being a generalist at first. Use this time to explore, experiment, and discover what truly excites you. The depth will come naturally once you find your passion.
        </p>
        <p>
          SGU taught me that understanding the landscape of technology is just as important as mastering one specific area. Now, with that foundation, I know exactly where I want to dig deeper—and I have the context to understand how it all fits together.
        </p>
      </>
    ),
  },
  "pwc-capture-the-flag": {
    title: "Competing in PwC Capture The Flag",
    excerpt: "Diving into cybersecurity challenges at PwC's annual CTF competition.",
    image: "/images/hackathon/PWC-Hackathon.jpg",
    date: "September 2024",
    readTime: "4 min read",
    category: "Hackathon",
    content: (
      <>
        <p>
          The adrenaline rush of a Capture The Flag (CTF) competition is something every tech enthusiast should experience at least once. When PwC Indonesia announced their annual Hackaday CTF event, I knew I had to participate. Little did I know, it would become one of my most memorable experiences in cybersecurity.
        </p>

        <h2>What is Capture The Flag?</h2>
        <p>
          For those unfamiliar, CTF is a cybersecurity competition where participants solve challenges to find hidden "flags"—usually strings of text that prove you've successfully exploited a vulnerability or solved a puzzle. It's like a digital treasure hunt, but with hacking.
        </p>
        <p>
          Categories typically include:
        </p>
        <ul>
          <li><strong>Web Exploitation:</strong> Finding vulnerabilities in web applications</li>
          <li><strong>Cryptography:</strong> Breaking encryption and decoding messages</li>
          <li><strong>Reverse Engineering:</strong> Analyzing binaries to understand their behavior</li>
          <li><strong>Forensics:</strong> Investigating digital artifacts and recovering data</li>
          <li><strong>OSINT:</strong> Open-source intelligence gathering</li>
        </ul>

        <h2>The PwC Experience</h2>
        <p>
          What made the PwC CTF special was its professional setting. This wasn't just a student competition—it was organized by one of the Big Four consulting firms, with challenges designed by real cybersecurity professionals. The stakes felt higher, and the learning opportunities were immense.
        </p>
        <p>
          Walking into the event, I was struck by the diversity of participants. From university students to working professionals, everyone shared a common passion for cybersecurity. The energy was electric.
        </p>

        <h2>Challenges That Tested My Limits</h2>
        <p>
          Some challenges had me scratching my head for hours. I remember one web exploitation challenge where I had to chain multiple vulnerabilities together—SQL injection leading to file upload, then using that to achieve remote code execution. It required patience, persistence, and plenty of coffee.
        </p>
        <p>
          The cryptography challenges were particularly fun. There's something deeply satisfying about cracking an encrypted message and watching the plaintext emerge. Each solved challenge felt like unlocking a secret.
        </p>

        <h2>Key Takeaways</h2>
        <p>
          Beyond the technical skills, the CTF taught me valuable lessons:
        </p>
        <ul>
          <li><strong>Think like an attacker:</strong> To defend systems, you need to understand how they can be exploited</li>
          <li><strong>Documentation is key:</strong> Keeping notes on your approach helps when you hit dead ends</li>
          <li><strong>Teamwork matters:</strong> Different perspectives can crack problems that seem impossible alone</li>
          <li><strong>Stay humble:</strong> There's always more to learn in cybersecurity</li>
        </ul>

        <h2>The Cybersecurity Path</h2>
        <p>
          Participating in the PwC CTF solidified my interest in cybersecurity. It's not just about hacking—it's about understanding systems at a fundamental level. Every application, every network, every piece of software has potential vulnerabilities, and the work of security professionals is to find and fix them before the bad guys do.
        </p>
        <p>
          Since then, I've continued practicing on platforms like HackTheBox and TryHackMe. The CTF was just the beginning of a journey that I'm excited to continue.
        </p>

        <h2>Advice for Aspiring CTF Players</h2>
        <p>
          If you're interested in CTF competitions, here's my advice:
        </p>
        <ul>
          <li>Start with beginner-friendly platforms like PicoCTF or OverTheWire</li>
          <li>Learn the fundamentals of networking, programming, and operating systems</li>
          <li>Join a team or community—learning with others accelerates growth</li>
          <li>Don't be afraid to fail—every failed attempt teaches you something</li>
          <li>Have fun! CTF is meant to be challenging but enjoyable</li>
        </ul>
        <p>
          See you at the next CTF! 🚩
        </p>
      </>
    ),
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Post not found
          </h1>
          <Link href="/blog" className="text-[var(--accent-primary)] hover:underline">
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/blog"
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Category */}
          <div className="mb-4">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-dark)' }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none"
            style={{ 
              '--tw-prose-body': 'var(--text-secondary)',
              '--tw-prose-headings': 'var(--text-primary)',
              '--tw-prose-links': 'var(--accent-primary)',
              '--tw-prose-bold': 'var(--text-primary)',
              '--tw-prose-bullets': 'var(--text-secondary)',
            } as React.CSSProperties}
          >
            <style jsx global>{`
              .prose h2 {
                color: var(--text-primary);
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose p {
                color: var(--text-secondary);
                line-height: 1.8;
                margin-bottom: 1.25rem;
              }
              .prose ul {
                color: var(--text-secondary);
                margin-bottom: 1.25rem;
              }
              .prose li {
                margin-bottom: 0.5rem;
              }
              .prose strong {
                color: var(--text-primary);
              }
              .prose a {
                color: var(--accent-primary);
                text-decoration: none;
              }
              .prose a:hover {
                text-decoration: underline;
              }
            `}</style>
            {post.content}
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
              style={{ color: 'var(--accent-primary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </motion.article>
      </div>
    </main>
  )
}
