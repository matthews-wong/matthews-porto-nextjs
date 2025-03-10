"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Linkedin, Mail, Github } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navItems: string[] = [
    "About",
    "Education",
    "Experience",
    "Certifications",
    "Hackathon",
    "Projects",
    "Contact",
  ];

  // Detect scroll position to change navbar style and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress for progress indicator
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => 
        document.getElementById(item.toLowerCase())
      ).filter(Boolean);
      
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll with offset to accommodate fixed navbar
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setIsOpen(false);
      setActiveSection(id);
    },
    []
  );

  // Scroll back to top when clicking logo
  const handleBackToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 ${
          scrolled 
            ? "bg-slate-900/90 backdrop-blur-md py-3" 
            : "bg-transparent py-5"
        } transition-all duration-300`}
      >
        {/* Scroll progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
        
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-purple-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/90 to-slate-900" />
        
        {/* More dynamic grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Glass effect border */}
        {scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
        )}
        
        <nav className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="z-10"
            >
              <Link 
                href="/" 
                className="group relative" 
                onClick={handleBackToTop}
              >
                <div className="relative overflow-hidden">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-100 bg-clip-text text-transparent relative z-10">
                    Matthews Wong
                  </span>
                  
                  {/* Logo hover effect */}
                  <motion.span 
                    className="absolute -inset-x-2 -inset-y-1 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Animated underline with gradient */}
                  <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out rounded-full"></span>
                </div>
              </Link>
            </motion.div>

            <div className="md:hidden z-10">
              <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-xl ${
                  scrolled 
                    ? "bg-white/10 hover:bg-white/15" 
                    : "bg-slate-800/40 hover:bg-slate-800/60"
                } border border-white/10 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <Menu size={24} className="text-white" />
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block z-10"
            >
              {/* Enhanced desktop navigation with improved hover effects */}
              <ul className="flex space-x-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.toLowerCase();
                  const isHovered = hoveredItem === item;
                  
                  return (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => handleScroll(e, item.toLowerCase())}
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl flex items-center overflow-hidden ${
                          isActive 
                            ? "text-white" 
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {/* Animated background for hovered/active items */}
                        {(isActive || isHovered) && (
                          <motion.span
                            layoutId="navBackground"
                            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-xl border border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        
                        {/* Enhanced glow effect for active/hovered items */}
                        {(isActive || isHovered) && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10"
                            style={{ 
                              boxShadow: isActive 
                                ? "0 0 25px 0 rgba(59, 130, 246, 0.3)" 
                                : "0 0 15px 0 rgba(59, 130, 246, 0.15)" 
                            }}
                          />
                        )}
                        
                        <span className="relative z-10">{item}</span>
                        
                        {/* Gradient indicator for active item */}
                        {isActive && (
                          <motion.span
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Enhanced mobile menu with better animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg md:hidden overflow-y-auto"
          >
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-600/10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
            
            {/* More dynamic grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
            
            <div className="relative min-h-full flex flex-col">
              <div className="flex justify-between items-center px-6 py-6">
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X size={24} className="text-white" />
                </motion.button>
              </div>
              
              <motion.div 
                className="flex-1 flex flex-col justify-between px-6 py-8"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                <ul className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item}
                      variants={{
                        open: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
                        },
                        closed: { 
                          opacity: 0, 
                          y: 20,
                          transition: { duration: 0.3 }
                        }
                      }}
                      custom={index}
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => handleScroll(e, item.toLowerCase())}
                        className="group flex items-center justify-between py-4 text-2xl font-medium text-slate-200 border-b border-white/5 transition-all duration-500"
                      >
                        <div className="flex items-center">
                          {/* Enhanced section numbers */}
                          <span className="mr-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-light text-sm">0{index + 1}</span>
                          <span className="group-hover:text-white transition-colors duration-300 relative">
                            {item}
                            
                            {/* Hover indicator */}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out"></span>
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight size={20} className="text-white/40 group-hover:text-white transition-all duration-300" />
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Enhanced social links section */}
                <motion.div 
                  className="pb-8 relative z-20"
                  variants={{
                    open: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5, delay: 0.4 }
                    },
                    closed: { 
                      opacity: 0, 
                      y: 20
                    }
                  }}
                >
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-6 font-medium">Connect with me</p>
                  <div className="space-y-4">
                    <motion.a 
                      href="https://www.linkedin.com/in/matthewswong" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center group bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:bg-slate-800/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center transition-all duration-300 border border-blue-500/30 mr-4 group-hover:border-blue-500/50 group-hover:bg-blue-500/40">
                        <Linkedin size={18} className="text-white group-hover:text-blue-200 transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="block text-white font-medium">LinkedIn</span>
                        <span className="block text-white/70 text-sm">Connect with me</span>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      href="mailto:matthewswong2610@gmail.com" 
                      className="flex items-center group bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:bg-slate-800/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center transition-all duration-300 border border-purple-500/30 mr-4 group-hover:border-purple-500/50 group-hover:bg-purple-500/40">
                        <Mail size={18} className="text-white group-hover:text-purple-200 transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="block text-white font-medium">Email</span>
                        <span className="block text-white/70 text-sm">matthewswong2610@gmail.com</span>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="https://github.com/MatthewsWongOfficial" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center group bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:bg-slate-800/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500/30 flex items-center justify-center transition-all duration-300 border border-green-500/30 mr-4 group-hover:border-green-500/50 group-hover:bg-green-500/40">
                        <Github size={18} className="text-white group-hover:text-green-200 transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="block text-white font-medium">GitHub</span>
                        <span className="block text-white/70 text-sm">View my projects</span>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}