"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Groq from "groq-sdk";

interface Message {
  type: "user" | "bot";
  content: string;
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
`;

const suggestedQuestions = [
  "What is Matthews' current role?",
  "What are Matthews' main skills?",
  "What projects has Matthews worked on?",
  "What certifications does Matthews have?",
  "How can I contact Matthews?",
];

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, // API key moved to environment variable
  dangerouslyAllowBrowser: true,
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  const formatResponse = (response: string) => {
    // Handle Bullet points (starting with - or +) properly
    response = response.replace(/(?:^|\n)[-+]\s+(.*?)(?=\n|$)/g, "<br />• $1");

    // Handle Numbered lists (1. 2. 3.)
    response = response.replace(/(\d+\.\s+)/g, "<br />$1");

    // Handle Bold (**text**) properly
    response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Handle Italic (*text* or _text_) properly
    response = response.replace(/\*(.*?)\*/g, "<em>$1</em>");
    response = response.replace(/_(.*?)_/g, "<em>$1</em>");

    // Fix cases where both Bold and Italic are mixed, e.g., **_bold italic_**
    response = response.replace(/<strong>\s*<em>(.*?)<\/em>\s*<\/strong>/g, "<strong><em>$1</em></strong>");

    // Convert newline characters to <br /> for spacing
    response = response.replace(/\n/g, "<br />");

    // Ensure there are no empty bullet points or strange formatting issues.
    response = response.replace(/<br \/>\s*•/g, "");

    return response;
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Matthews Wong. Use the following context to answer questions about Matthews:
            ${CONTEXT}
            Provide concise and friendly responses. Format the response with **bold** for emphasis, *italic* for subtle highlights, and use bullet points or numbered lists for clarity.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 250, // Increased to allow longer responses
        temperature: 0.7,
      });

      let response = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

      // Check if the response is cut off and append an ellipsis
      if (response.length >= 250 && !/[.!?]$/.test(response)) {
        response += "...";
      }

      const formattedResponse = formatResponse(response); // Format the response

      setMessages((prev) => [...prev, { type: "bot", content: formattedResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later or reach out to Matthews directly at matthewswong2610@gmail.com.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Bubble When Chat is Closed */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 z-50"
        >
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <p className="text-xs sm:text-sm">I am Matthews' AI, Feel free to ask...</p>
          </div>
        </motion.div>
      )}

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Card className="w-[320px] sm:w-[380px] shadow-xl bg-slate-900/90 backdrop-blur-lg border-slate-800 rounded-xl">
              <CardHeader className="border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Chat with Matthews&apos; AI</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNewChat}
                      className="h-8 w-8 rounded-full hover:bg-slate-800/50 transition-colors" // Adjusted hover style
                      aria-label="New Chat"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-800/50 transition-colors" // Adjusted hover style
                      aria-label="Close Chat"
                    >
                      <X size={18} />
                    </Button>
                  </div>
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
                            className="w-full justify-start text-left h-auto whitespace-normal rounded-lg"
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
                            className={`rounded-xl px-4 py-2 max-w-[85%] ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"
                            }`}
                          >
                            {message.type === "bot" ? (
                              <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.content }} />
                            ) : (
                              <p className="text-sm">{message.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="rounded-xl px-4 py-2 bg-slate-800">
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
                      e.preventDefault();
                      handleSend(inputValue);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-slate-800 text-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" className="rounded-xl" disabled={isLoading || !inputValue.trim()}>
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
  );
}