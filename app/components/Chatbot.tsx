"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
  Zap,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface UserPreferences {
  name: string
  language: "english" | "indonesian"
}

const SUGGESTED_QUESTIONS_EN = [
  "What is Matthews' current role?",
  "What are Matthews' main skills?",
  "What projects has Matthews worked on?",
  "What certifications does Matthews have?",
  "How can I contact Matthews?",
]

const SUGGESTED_QUESTIONS_ID = [
  "Apa pekerjaan Matthews saat ini?",
  "Apa keterampilan utama Matthews?",
  "Proyek apa yang telah dikerjakan Matthews?",
  "Sertifikasi apa yang dimiliki Matthews?",
  "Bagaimana cara menghubungi Matthews?",
]

const FOLLOW_UP_QUESTIONS_EN = [
  "Tell me about Matthews' education",
  "What experience does Matthews have in DevOps?",
  "What hackathons has Matthews participated in?",
  "What is the Observer KPU project?",
  "What tools does Matthews use for DevOps?",
]

const FOLLOW_UP_QUESTIONS_ID = [
  "Ceritakan tentang pendidikan Matthews",
  "Pengalaman apa yang dimiliki Matthews di DevOps?",
  "Hackathon apa yang pernah diikuti Matthews?",
  "Apa itu proyek Observer KPU?",
  "Alat apa yang digunakan Matthews untuk DevOps?",
]

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
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9)

  // Show bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatbot_preferences")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUserPreferences(parsed)
        setSelectedLanguage(parsed.language)
        setShowWelcomeScreen(false)
      } catch (e) {
        console.error("Error loading preferences:", e)
      }
    }
  }, [])

  // Load conversation history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot_messages")
    if (savedMessages && userPreferences) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })))
      } catch (e) {
        console.error("Error loading messages:", e)
      }
    }
  }, [userPreferences])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages.slice(-20))) // Keep last 20 messages
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !showWelcomeScreen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, showWelcomeScreen])

  const formatResponse = (text: string): string => {
    // Bold text
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // Italic text
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Bullet points
    formatted = formatted.replace(/^[-•]\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>')
    // Numbered lists
    formatted = formatted.replace(/^\d+\.\s+(.*)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Line breaks
    formatted = formatted.replace(/\n\n/g, '</p><p class="mt-2">')
    formatted = formatted.replace(/\n/g, '<br/>')
    return `<p>${formatted}</p>`
  }

  const handleSend = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      type: "user",
      content: message.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          language: userPreferences?.language || "english",
          userName: userPreferences?.name || "User",
          conversationHistory: messages.slice(-6).map(m => ({
            type: m.type,
            content: m.type === "bot" ? m.content.replace(/<[^>]*>/g, '') : m.content
          })),
        }),
      })

      const data = await response.json()

      if (data.success && data.content) {
        const botMessage: Message = {
          id: generateId(),
          type: "bot",
          content: formatResponse(data.content),
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMsg = userPreferences?.language === "indonesian"
        ? "Maaf, terjadi kesalahan. Silakan coba lagi."
        : "Sorry, something went wrong. Please try again."
      
      setMessages(prev => [...prev, {
        id: generateId(),
        type: "bot",
        content: errorMsg,
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages, userPreferences])

  const handleSubmitPreferences = () => {
    if (!nameInput.trim()) return

    const prefs: UserPreferences = {
      name: nameInput.trim().slice(0, 12),
      language: selectedLanguage,
    }

    setUserPreferences(prefs)
    localStorage.setItem("chatbot_preferences", JSON.stringify(prefs))
    setShowWelcomeScreen(false)

    // Add greeting message
    const greeting = selectedLanguage === "indonesian"
      ? `Halo <strong>${prefs.name}</strong>! 👋 Saya asisten AI Matthews. Apa yang ingin Anda ketahui?`
      : `Hello <strong>${prefs.name}</strong>! 👋 I'm Matthews' AI assistant. What would you like to know?`

    setMessages([{
      id: generateId(),
      type: "bot",
      content: greeting,
      timestamp: new Date(),
    }])
  }

  const handleNewChat = () => {
    setMessages([])
    localStorage.removeItem("chatbot_messages")
  }

  const toggleLanguage = () => {
    const newLang: "english" | "indonesian" = selectedLanguage === "english" ? "indonesian" : "english"
    setSelectedLanguage(newLang)
    
    if (userPreferences) {
      const updated: UserPreferences = { ...userPreferences, language: newLang }
      setUserPreferences(updated)
      localStorage.setItem("chatbot_preferences", JSON.stringify(updated))
    }
  }

  const getSuggestedQuestions = () => {
    return selectedLanguage === "indonesian" ? SUGGESTED_QUESTIONS_ID : SUGGESTED_QUESTIONS_EN
  }

  const getRandomFollowUp = () => {
    const questions = selectedLanguage === "indonesian" ? FOLLOW_UP_QUESTIONS_ID : FOLLOW_UP_QUESTIONS_EN
    return questions[Math.floor(Math.random() * questions.length)]
  }

  return (
    <>
      {/* Floating Bubble - Neo Brutalism */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-50 max-w-[280px]"
          >
            <div className="relative">
              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer p-4 border-4 border-black shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]"
                style={{ backgroundColor: 'var(--accent-yellow)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">AI ASSISTANT</span>
                </div>
                <p className="text-xs font-bold text-black/80">
                  {userPreferences 
                    ? (selectedLanguage === "indonesian" ? `Hai ${userPreferences.name}! Klik untuk chat.` : `Hi ${userPreferences.name}! Click to chat.`)
                    : "👋 Click to get started!"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowBubble(false)
                }}
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-500 border-2 border-black text-white font-bold text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button - Neo Brutalism */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 z-50 border-4 border-black shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_#000]"
        style={{ backgroundColor: 'var(--accent-pink)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </motion.button>

      {/* Chat Window - Neo Brutalism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:bottom-24 sm:right-4 z-50 sm:w-[380px] sm:h-[550px] flex flex-col border-4 border-black shadow-[8px_8px_0px_0px_#000]"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 border-b-4 border-black"
              style={{ backgroundColor: 'var(--accent-cyan)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                <span className="font-black text-base uppercase text-black">
                  {selectedLanguage === "indonesian" ? "MATTHEWS AI" : "MATTHEWS AI"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors"
                  title={selectedLanguage === "english" ? "Switch to Indonesian" : "Ganti ke English"}
                >
                  <Globe className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={handleNewChat}
                  className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors"
                  title={selectedLanguage === "indonesian" ? "Chat Baru" : "New Chat"}
                >
                  <Trash2 className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 border-2 border-black bg-red-400 hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Content */}
            {showWelcomeScreen ? (
              /* Welcome Screen */
              <div className="flex-1 p-4 overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="space-y-4">
                  <div 
                    className="p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]"
                    style={{ backgroundColor: 'var(--accent-yellow)' }}
                  >
                    <h3 className="font-black text-lg uppercase text-black mb-2 text-center">
                      {selectedLanguage === "indonesian" ? "SELAMAT DATANG!" : "WELCOME!"}
                    </h3>
                    <p className="text-sm text-black/80 text-center font-bold">
                      {selectedLanguage === "indonesian" 
                        ? "Saya asisten AI Matthews. Mari berkenalan!"
                        : "I'm Matthews' AI assistant. Let's get to know each other!"}
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="font-bold text-sm uppercase text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedLanguage === "indonesian" ? "NAMA ANDA" : "YOUR NAME"}
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value.slice(0, 12))}
                      placeholder={selectedLanguage === "indonesian" ? "Masukkan nama..." : "Enter name..."}
                      className="w-full px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-black placeholder:text-gray-500 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0px_0px_#000] transition-all"
                      style={{ backgroundColor: 'white' }}
                      maxLength={12}
                    />
                    <p className="text-xs text-gray-400 text-right">{nameInput.length}/12</p>
                  </div>

                  {/* Language Selection */}
                  <div className="space-y-2">
                    <label className="font-bold text-sm uppercase text-white flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {selectedLanguage === "indonesian" ? "BAHASA" : "LANGUAGE"}
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedLanguage("english")}
                        className={`flex-1 py-3 px-4 border-4 border-black font-black uppercase text-sm transition-all ${
                          selectedLanguage === "english"
                            ? "shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                            : "shadow-none translate-x-0 translate-y-0 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000]"
                        }`}
                        style={{ 
                          backgroundColor: selectedLanguage === "english" ? 'var(--accent-lime)' : 'var(--bg-card)',
                          color: selectedLanguage === "english" ? 'black' : 'white'
                        }}
                      >
                        🇺🇸 English
                      </button>
                      <button
                        onClick={() => setSelectedLanguage("indonesian")}
                        className={`flex-1 py-3 px-4 border-4 border-black font-black uppercase text-sm transition-all ${
                          selectedLanguage === "indonesian"
                            ? "shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                            : "shadow-none translate-x-0 translate-y-0 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000]"
                        }`}
                        style={{ 
                          backgroundColor: selectedLanguage === "indonesian" ? 'var(--accent-lime)' : 'var(--bg-card)',
                          color: selectedLanguage === "indonesian" ? 'black' : 'white'
                        }}
                      >
                        🇮🇩 Indonesia
                      </button>
                    </div>
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={handleSubmitPreferences}
                    disabled={!nameInput.trim()}
                    className="w-full py-4 border-4 border-black font-black uppercase text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:shadow-[6px_6px_0px_0px_#000] enabled:hover:-translate-x-1 enabled:hover:-translate-y-1 enabled:hover:shadow-[8px_8px_0px_0px_#000] enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-[2px_2px_0px_0px_#000]"
                    style={{ backgroundColor: 'var(--accent-pink)', color: 'black' }}
                  >
                    <Zap className="inline w-5 h-5 mr-2" />
                    {selectedLanguage === "indonesian" ? "MULAI CHAT" : "START CHAT"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div 
                  ref={scrollAreaRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  {messages.length === 0 ? (
                    /* Empty State with Suggestions */
                    <div className="space-y-4">
                      <div 
                        className="p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]"
                        style={{ backgroundColor: 'var(--bg-card)' }}
                      >
                        <p className="text-sm text-white mb-3 font-bold">
                          {selectedLanguage === "indonesian"
                            ? `👋 Hai ${userPreferences?.name}! Saya bisa membantu Anda tentang:`
                            : `👋 Hi ${userPreferences?.name}! I can help you with:`}
                        </p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          <li>• {selectedLanguage === "indonesian" ? "Pengalaman kerja Matthews" : "Matthews' work experience"}</li>
                          <li>• {selectedLanguage === "indonesian" ? "Proyek dan keterampilan" : "Projects and skills"}</li>
                          <li>• {selectedLanguage === "indonesian" ? "Pendidikan dan sertifikasi" : "Education and certifications"}</li>
                          <li>• {selectedLanguage === "indonesian" ? "Informasi kontak" : "Contact information"}</li>
                        </ul>
                      </div>

                      <p className="text-xs text-gray-400 font-bold uppercase">
                        {selectedLanguage === "indonesian" ? "PERTANYAAN POPULER:" : "POPULAR QUESTIONS:"}
                      </p>

                      <div className="space-y-2">
                        {getSuggestedQuestions().map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(q)}
                            className="w-full text-left px-4 py-3 border-3 border-black text-sm font-bold transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000]"
                            style={{ backgroundColor: 'var(--bg-card)', color: 'white' }}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Messages */
                    <>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] px-4 py-3 border-3 border-black ${
                              msg.type === "user"
                                ? "shadow-[3px_3px_0px_0px_#000]"
                                : "shadow-[3px_3px_0px_0px_#000]"
                            }`}
                            style={{
                              backgroundColor: msg.type === "user" ? 'var(--accent-purple)' : 'var(--bg-card)',
                              color: msg.type === "user" ? 'black' : 'white',
                            }}
                          >
                            <div
                              className="text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                          </div>
                        </motion.div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start">
                          <div 
                            className="px-4 py-3 border-3 border-black shadow-[3px_3px_0px_0px_#000]"
                            style={{ backgroundColor: 'var(--bg-card)' }}
                          >
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span className="text-sm text-white font-bold">
                                {selectedLanguage === "indonesian" ? "Berpikir..." : "Thinking..."}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Follow-up suggestion */}
                      {messages.length > 0 && !isLoading && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          onClick={() => handleSend(getRandomFollowUp())}
                          className="w-full text-left px-4 py-3 border-3 border-black text-sm font-bold transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] flex items-center gap-2"
                          style={{ backgroundColor: 'var(--accent-yellow)', color: 'black' }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {selectedLanguage === "indonesian" ? "Tanya pertanyaan lain" : "Ask another question"}
                        </motion.button>
                      )}
                    </>
                  )}
                </div>

                {/* Input Area */}
                <div 
                  className="p-3 border-t-4 border-black"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend(inputValue)
                    }}
                    className="flex gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={selectedLanguage === "indonesian" ? "Ketik pesan..." : "Type a message..."}
                      className="flex-1 px-4 py-3 border-4 border-black font-bold text-sm text-black placeholder:text-gray-500 focus:outline-none transition-all"
                      style={{ backgroundColor: 'white' }}
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="px-4 border-4 border-black font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:shadow-[4px_4px_0px_0px_#000] enabled:hover:-translate-x-0.5 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[6px_6px_0px_0px_#000] enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-none"
                      style={{ backgroundColor: 'var(--accent-lime)', color: 'black' }}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
