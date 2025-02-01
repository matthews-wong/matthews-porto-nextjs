"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: string[] = [
    "About",
    "Education",
    "Experience",
    "Certifications",
    "Hackathon",
    "Projects",
    "Contact",
  ];

  // Scroll with offset to accommodate fixed navbar
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = window.innerWidth < 768 ? 100 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setIsOpen(false);
    },
    []
  );

  // Scroll back to top when clicking logo
  const handleBackToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed w-full z-50 bg-slate-900/30 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <nav className="container mx-auto px-4 lg:px-6 py-4 relative">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="text-2xl md:text-3xl font-bold group" onClick={handleBackToTop}>
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent text-2xl">
                Matthews Wong
              </span>
            </Link>
          </motion.div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:bg-white/10"
            >
              {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>
          </div>

          <motion.ul className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <motion.li key={item} onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(null)}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScroll(e, item.toLowerCase())}
                  className={`relative px-3 py-2 text-base text-slate-200 transition-all duration-300 hover:text-white rounded-xl ${
                    hoveredItem === item ? "bg-white/10" : ""
                  }`}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-2 right-2 mt-2 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl"
            >
              <motion.ul className="p-2">
                {navItems.map((item) => (
                  <motion.li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => handleScroll(e, item.toLowerCase())}
                      className="block px-3 py-2 text-base text-slate-200 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}