"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Trash2, Bot } from "lucide-react";
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
- **DevOps Engineer Intern at Commsult Indonesia** (Jan 2025 - Present)
  - Responsible for managing infrastructure using tools such as Ansible and Docker Swarm.
  - Works with deployment and CI/CD processes, focusing on automating tasks and improving system reliability.

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

   ### Company Information  
  Commsult Indonesia is a strategic partner of **Commsult AG** [1], a Germany-based company specializing in innovative IT solutions to optimize business processes. In Indonesia, the company focuses on delivering **customized software development services** and **IT consulting**, tailored to meet the specific needs of businesses. Commsult Indonesia is known for its expertise in developing **mobile software applications** and streamlining operations to improve efficiency. With a team of experienced professionals, the company works closely with clients to deliver high-quality, innovative solutions.  

### Colleagues at Commsult  
  - **Aditya Fidiantyo (Adit)**: Adit is Matthew's colleague and supervisor at Commsult Indonesia. He is an **Infrastructure Engineer** with expertise in **Ansible** and **Docker**, specializing in automating and managing IT infrastructure.  

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
      // Enhanced text formatting for better chat appearance with responsive fixes
      
      // Handle code blocks ```code``` with responsive overflow
      response = response.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 p-3 rounded-lg my-2 overflow-x-auto text-xs text-green-400 max-w-full whitespace-pre-wrap break-words">$1</pre>');
      
      // Handle inline code `code` with word-break
      response = response.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-xs text-green-400 break-words">$1</code>');
      
      // Handle Bullet points with responsive design
      response = response.replace(/(?:^|\n)[-+]\s+(.*?)(?=\n|$)/g, '<div class="flex items-start my-1 gap-2"><span class="text-blue-400 flex-shrink-0">•</span><span class="flex-1 break-words">$1</span></div>');
  
      // Handle Numbered lists with responsive design
      response = response.replace(/(?:^|\n)(\d+)\.\s+(.*?)(?=\n|$)/g, '<div class="flex items-start my-1 gap-2"><span class="text-blue-400 font-medium flex-shrink-0">$1.</span><span class="flex-1 break-words">$2</span></div>');
  
      // Handle Bold (**text**) with responsive text
      response = response.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-300 break-words">$1</strong>');
  
      // Handle Italic (*text* or _text_) with responsive text
      response = response.replace(/\*(.*?)\*/g, '<em class="italic text-slate-300 break-words">$1</em>');
      response = response.replace(/_(.*?)_/g, '<em class="italic text-slate-300 break-words">$1</em>');
  
      // Fix cases where both Bold and Italic are mixed
      response = response.replace(/<strong[^>]*>\s*<em[^>]*>(.*?)<\/em>\s*<\/strong>/g, '<strong class="font-bold italic text-blue-300 break-words">$1</strong>');
  
      // Convert newline characters to <br /> with better spacing
      response = response.replace(/\n\n/g, '<div class="h-4"></div>');
      response = response.replace(/\n/g, '<br />');
  
      // Handle horizontal rules
      response = response.replace(/(?:^|\n)---(?:\n|$)/g, '<hr class="my-3 border-slate-700" />');
  
      // Handle blockquotes with word-break
      response = response.replace(/(?:^|\n)>\s+(.*?)(?=\n|$)/g, '<blockquote class="border-l-4 border-blue-500 pl-3 italic text-slate-400 my-2 break-words">$1</blockquote>');
      
      // Ensure URLs are properly handled and don't overflow 
      response = response.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-blue-400 hover:underline break-all" target="_blank" rel="noopener noreferrer">$1</a>');
      
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
              Provide concise and friendly responses. Format the response with **bold** for emphasis, *italic* for subtle highlights, and use bullet points or numbered lists for clarity. For mobile users, keep your responses relatively brief and well-formatted.`,
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
        {/* Improved Floating Bubble - Mobile Responsive */}
        <AnimatePresence>
          {!isOpen && showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-20 right-4 z-50 max-w-[calc(100vw-32px)]"
            >
              <div className="relative">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border border-blue-400/30 backdrop-blur-sm"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Bot size={18} className="text-blue-200 animate-pulse flex-shrink-0" />
                    <p className="text-sm font-medium text-blue-100 truncate">Matthews' AI Assistant</p>
                  </div>
                  <p className="text-xs text-blue-50 break-words">👋 Hi there! Feel free to ask me anything about Matthews.</p>
                </div>
                {/* Improved Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBubble(false);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300 border border-red-400/30 shadow-md"
                  aria-label="Close Bubble"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Enhanced Chat Toggle Button - Mobile Friendly */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 border border-blue-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
        </motion.button>
  
        {/* Enhanced Chat Window with Mobile-First Responsiveness */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-4 sm:bottom-20 right-0 sm:right-4 z-50 w-full sm:w-auto max-h-[90vh] px-4 sm:px-0"
            >
              <Card className="w-full sm:w-[320px] md:w-[380px] shadow-xl bg-slate-900/95 backdrop-blur-lg border-slate-700 rounded-xl overflow-hidden mx-auto sm:mx-0">
                <CardHeader className="border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500/50 animate-ping absolute top-0 left-0"></div>
                      </div>
                      <span className="truncate">Chat with Matthews&apos; AI</span>
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
                  <ScrollArea className="h-[60vh] sm:h-[400px] p-3 sm:p-4" ref={scrollAreaRef}>
                    {messages.length === 0 ? (
                      <div className="space-y-4">
                        <div className="bg-slate-800/60 rounded-xl p-3 sm:p-4 border border-slate-700/50">
                          <p className="text-sm text-slate-300 mb-2">
                            👋 Hi! I&apos;m Matthews&apos; AI assistant. I can help you learn more about:
                          </p>
                          <ul className="space-y-1 ml-4 text-xs text-slate-400">
                            <li className="flex items-start gap-1">
                              <span className="text-blue-400 flex-shrink-0">•</span> 
                              <span className="break-words">His work experience and projects</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="text-blue-400 flex-shrink-0">•</span> 
                              <span className="break-words">Skills and certifications</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="text-blue-400 flex-shrink-0">•</span> 
                              <span className="break-words">Education and interests</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="text-blue-400 flex-shrink-0">•</span> 
                              <span className="break-words">Contact information</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-xs text-slate-400 px-1">You can ask me anything, or choose from these questions:</p>
                        <div className="space-y-2">
                          {suggestedQuestions.map((question) => (
                            <Button
                              key={question}
                              variant="secondary"
                              className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/50 shadow-sm transition-all duration-200 hover:translate-x-1 text-xs sm:text-sm"
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
                              className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] ${
                                message.type === "user" 
                                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md" 
                                  : "bg-slate-800 text-slate-200 border border-slate-700/50 shadow-md"
                              }`}
                            >
                              {message.type === "bot" ? (
                                <div 
                                  className="text-xs sm:text-sm leading-relaxed prose prose-invert prose-sm max-w-none break-words"
                                  dangerouslySetInnerHTML={{ __html: message.content }} 
                                />
                              ) : (
                                <p className="text-xs sm:text-sm break-words">{message.content}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="rounded-xl px-3 py-2 bg-slate-800 border border-slate-700/50">
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                                <span className="text-xs text-slate-400">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="border-t border-slate-700 p-3 sm:p-4 bg-slate-900/95">
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
                        className="flex-1 bg-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700 placeholder-slate-500"
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        className="rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors flex-shrink-0" 
                        disabled={isLoading || !inputValue.trim()}
                      >
                        {isLoading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
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