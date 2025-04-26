import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";

// Performance-optimized orb component with delayed loading
const Orb = ({ className, delay = 0 }) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return show ? (
    <motion.div 
      className={`absolute rounded-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  ) : null;
};

export default function Hero() {
  const [mainContentLoaded, setMainContentLoaded] = useState(false);

  // Mark main content as loaded after initial animations
  useEffect(() => {
    const timer = setTimeout(() => setMainContentLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-16 md:py-20 relative overflow-hidden">
      {/* Core background elements - always loaded */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 will-change-transform bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Delayed loading orbs - only on desktop and after main content renders */}
      {mainContentLoaded && (
        <AnimatePresence>
          <div className="hidden lg:block">
            {/* Left side orbs - far from profile picture */}
            <Orb className="w-96 h-96 -left-48 top-1/4 bg-blue-500/15 blur-3xl opacity-40" delay={200} />
            <Orb className="w-64 h-64 -left-24 top-2/3 bg-indigo-500/10 blur-2xl opacity-50" delay={400} />
            
            {/* Right side orbs - far from profile picture */}
            <Orb className="w-96 h-96 -right-48 top-1/4 bg-purple-500/15 blur-3xl opacity-40" delay={300} />
            <Orb className="w-64 h-64 -right-24 bottom-1/3 bg-blue-400/10 blur-2xl opacity-50" delay={500} />
          </div>
        </AnimatePresence>
      )}

      {/* Main content container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Profile image with enhanced effects */}
        <motion.div
          className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          onAnimationComplete={() => setTimeout(() => setMainContentLoaded(true), 200)}
        >
          {/* Performance-optimized glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl opacity-60" />
          
          {/* Enhanced border effect */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40" />
          
          <Image
            src="/images/profile-pic.avif"
            alt="Matthews Wong"
            layout="fill"
            objectFit="cover"
            className="rounded-full relative z-10"
            priority
            placeholder="blur"
            blurDataURL="/images/profile-pic-tiny.avif"
          />
          
          {/* Enhanced border effects - visible on all devices */}
          <div className="absolute -inset-1 rounded-full border-2 border-blue-400/20" />
          <div className="absolute -inset-3 rounded-full border border-purple-400/10" />
        </motion.div>

        {/* Enhanced name and title section for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative text-center"
        >
          {/* Mobile-optimized title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              Matthews Wong
            </span>
          </h1>
          
          {/* Mobile-optimized subtitle */}
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Software Engineer | IT Student
            </span>
          </h2>
          
          {/* Mobile-enhanced description with better spacing */}
          <div className="relative">
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-20 sm:mb-16 md:mb-0">
              Specializing in Technopreneurship at Swiss German University
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile-enhanced scroll indicator */}
      {mainContentLoaded && (
        <motion.div 
          className="absolute bottom-8 left-0 right-0 mx-auto text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 py-1.5 rounded-full bg-blue-500/10 inline-block mb-2">
            <span className="text-blue-300 text-sm tracking-wide font-medium">Scroll Down</span>
          </div>
          <FaChevronDown className="animate-bounce text-blue-300 mx-auto" />
        </motion.div>
      )}
    </section>
  );
}