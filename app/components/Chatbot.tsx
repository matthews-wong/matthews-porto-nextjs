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
Matthews Wong is an Information Technology student at Swiss German University, specializing in Technopreneurship. He is passionate about continuous learning and is involved in various international tech communities to stay up-to-date with the latest advancements.

### Current Role:
- **DevOps Engineer at Commsult Indonesia** (Jan 2025 - Present)
  - Responsible for managing infrastructure using tools such as Ansible and Docker Swarm.
  - Works with deployment and CI/CD processes, focusing on automating tasks and improving system reliability.

### Previous Experience:
- **Software Development Engineer in Test (SDET) at Commsult Indonesia** (Jul 2024 - Jan 2025)
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
- **Ethical Hacking Essentials & Network Defense Certification** – EC-Council
- **DevOps Certified** – PagerDuty
- **Cybersecurity Awareness Certified** – Certiprof
- **SQL (Advanced) & Rest API** – HackerRank
- **Docker Foundation Professional Certificate** - Docker
- **Advanced Website Conversion rate Optimization** - Simplilearn
- **Large Language Models** by Google Cloud Skills Boost 
- **Career Essential in Generative AI** by Microsoft and Linkedin
- **Career Essential Software Development** by Microsoft and Linkedin 

### Education:
- **Bachelor's degree in Information Technology**, Swiss German University (Aug 2022 - Aug 2026)
  - Active member of several clubs:
    - Badminton Club (Secretary)
    - IT Student Association (Member)
    - Chess Club (Event Division)
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

   ### Skills:
- **Programming Languages**: JavaScript (React.js, Node.js), Python, Java
- **DevOps Tools**: Ansible, Docker, Docker Swarm, CI/CD pipelines
- **Testing**: WebdriverIO, Mocha, Jest, Supertest, JUnit, Allure Reporting
- **Data Science & Machine Learning**: XGBoost, Data Storytelling, Exploratory Data Analysis (EDA)
- **Web Development**: HTML, CSS, JavaScript, React.js, Express.js, REST API development , Next.js 
- **Cloud & Infrastructure**: Docker
- **Version Control & Collaboration**: Git

### Contact:
- **Email**: matthewswong2610@gmail.com
- Open to collaborations, discussions, and knowledge-sharing opportunities.
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
    const [showBubble, setShowBubble] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 4000); // 4 seconds delay
  
      return () => clearTimeout(timer);
    }, []);
  
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
          max_completion_tokens: 1024,
          temperature: 0.1,
          stream: true, // Enable streaming
        });
    
        let responseContent = "";
        setMessages((prev) => [...prev, { type: "bot", content: "" }]); // Add an empty bot message to start streaming
    
        for await (const chunk of chatCompletion) {
          const chunkContent = chunk.choices[0]?.delta?.content || "";
          responseContent += chunkContent;
    
          // Update the last message with the new chunk
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.type === "bot") {
              return [
                ...prev.slice(0, -1),
                { type: "bot", content: formatResponse(responseContent) },
              ];
            }
            return prev;
          });
        }
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
        <AnimatePresence>
          {!isOpen && showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-20 right-4 z-50"
            >
              <div className="relative">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsOpen(true)}
                >
                  <p className="text-xs sm:text-sm">I am Matthews' AI, Feel free to ask...</p>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setShowBubble(false)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                  aria-label="Close Bubble"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
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