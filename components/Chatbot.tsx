"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Groq from "groq-sdk"

interface Message {
  type: "user" | "bot"
  content: string
}

const CONTEXT = `
Matthews Wong is an Information Technology student at Swiss German University, specializing in Technopreneurship.
He is currently working as a DevOps Engineer at Commsult Indonesia, where he previously gained experience as an SDET (Software Development Engineer in Test).
Matthews has completed project-based internships at PT Bank Mandiri (Persero) Tbk, developing an Android application for a real-time news platform, and at id/x partner, building a machine learning model for predicting loan risks.
He is passionate about continuous learning and actively engages in international tech communities, including Microsoft Learning and Red Hat Learning.
Matthews holds several industry-recognized certifications:
- Ethical Hacking Essentials & Network Defense Certification – EC-Council
- DevOps Certified – PagerDuty
- Cybersecurity Awareness Certified – Certiprof
- SQL (Advanced) & Rest API - HackerRank
He has contributed to a funded research project on a BLE (Bluetooth Low Energy) app, designed as a smart stadium solution.
Matthews is familiar with Web Development and Software Engineering.
He can be contacted via email at matthewswong2610@gmail.com.
`

const suggestedQuestions = [
  "What is Matthews' current role?",
  "What are Matthews' main skills?",
  "What projects has Matthews worked on?",
  "What certifications does Matthews have?",
  "How can I contact Matthews?",
]

const groq = new Groq({
  apiKey: "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",
})

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  const handleSend = async (message: string) => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { type: "user", content: message }])
    setInputValue("")
    setIsLoading(true)

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Matthews Wong. Use the following context to answer questions about Matthews:
            ${CONTEXT}
            Provide concise and friendly responses. If you're not sure about something specific, be honest about it.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 150,
        temperature: 0.7,
      })

      const response = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
      setMessages((prev) => [...prev, { type: "bot", content: response }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later or reach out to Matthews directly at matthewswong2610@gmail.com.",
        },
      ])
    }

    setIsLoading(false)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 z-50"
          >
            <Card className="w-[320px] sm:w-[380px] shadow-xl bg-slate-900/90 backdrop-blur-lg border-slate-800">
              <CardHeader className="border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Chat with Matthews&apos; AI</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                    <X size={18} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-400">
                        Hello! I&apos;m Matthews&apos; AI assistant. Feel free to ask me anything about him, or choose
                        from these suggested questions:
                      </p>
                      <div className="space-y-2">
                        {suggestedQuestions.map((question) => (
                          <Button
                            key={question}
                            variant="secondary"
                            className="w-full justify-start text-left h-auto whitespace-normal"
                            onClick={() => handleSend(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[85%] ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="rounded-lg px-4 py-2 bg-slate-800">
                            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
                <div className="border-t border-slate-800 p-4">
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
                      placeholder="Type your message..."
                      className="flex-1 bg-slate-800 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

