import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { MdCode, MdSchool, MdEmail, MdWork, MdDevices, MdOutlinePeopleAlt } from "react-icons/md";

// Type for FloatingOrb component props to ensure className is a string
type FloatingOrbProps = {
  className?: string;
};

// Performance optimized FloatingOrb with will-change for hardware acceleration
const FloatingOrb = ({ className }: FloatingOrbProps) => (
  <div className={`absolute w-64 h-64 rounded-full will-change-transform ${className}`} />
);

// Performance optimized Feature card with reduced paint complexity
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden shadow-lg will-change-transform"
    whileHover={{ scale: 1.03, y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    {/* Optimized gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" style={{ willChange: 'opacity, transform' }} />
    
    <div className="text-blue-400 mb-3 text-3xl group-hover:text-blue-300 transition-colors relative z-10">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors relative z-10">{title}</h3>
    <p className="text-sm text-slate-300 group-hover:text-white transition-colors relative z-10">{description}</p>
    
    {/* Performance optimized hover ring */}
    <div className="absolute -inset-1 border border-white/0 rounded-2xl group-hover:border-blue-500/30 group-hover:scale-105 transition-all duration-700 opacity-0 group-hover:opacity-100" style={{ willChange: 'opacity, transform' }} />
  </motion.div>
);

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
      {/* Performance optimized background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      
      {/* Performance optimized grid background with will-change */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" style={{ willChange: 'opacity' }} />
      
      {/* Maintaining original side effects for all devices with performance optimizations */}
      <div className="absolute -left-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-blue-500/10 blur-3xl animate-float" />
        <FloatingOrb className="bg-purple-500/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 left-12 w-1 h-32 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse" />
        <div className="absolute top-2/3 left-24 w-1 h-24 bg-gradient-to-b from-purple-500/50 to-transparent animate-pulse delay-700" />
      </div>
      
      <div className="absolute -right-24 top-1/4 w-96 h-screen">
        <FloatingOrb className="bg-indigo-500/10 blur-3xl animate-float-delayed" />
        <FloatingOrb className="bg-blue-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/4 right-12 w-1 h-32 bg-gradient-to-b from-indigo-500/50 to-transparent animate-pulse delay-300" />
        <div className="absolute top-1/2 right-24 w-1 h-24 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse delay-1000" />
      </div>

      {/* Original particle effects - maintained for all devices with reduced opacity for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute right-1/4 top-2/3 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-300" />
        <div className="absolute left-1/3 bottom-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-ping delay-700" />
      </div>
      
      {/* Desktop-only advanced effects with performance optimizations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Performance optimized light rays - desktop only */}
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-1/2 h-96 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rotate-45 blur-3xl transform-gpu" style={{ willChange: 'transform, opacity' }} />
        <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-1/2 h-96 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 -rotate-45 blur-3xl transform-gpu" style={{ willChange: 'transform, opacity' }} />
      </div>

      {/* Main content container with rounded edges for desktop */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side content - desktop only with rounded container */}
        <motion.div 
          className="w-full lg:w-1/4 hidden lg:flex flex-col gap-8 lg:rounded-3xl lg:p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <FeatureCard 
            icon={<MdCode />}
            title="Full Stack Development"
            description="Expertise in React, Next.js, and modern web technologies"
          />
          <FeatureCard 
            icon={<MdSchool />}
            title="Life Long Learner"
            description="Always exploring new technologies and improving skills"
          />
          <FeatureCard 
            icon={<MdEmail />}
            title="Available for Work"
            description="Looking for exciting projects and collaborations"
          />
        </motion.div>
        
        {/* Center content - maintaining the original spacing and layout for all devices */}
        <div className="w-full lg:w-2/4 flex flex-col items-center gap-12 text-center">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 mb-8 group"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'transform' }}
          >
            {/* Profile image effects - maintained with original spacing */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300 opacity-75 group-hover:opacity-100" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 animate-spin-slow blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent rounded-full" />
            
            <Image
              src="/images/profile-pic.avif"
              alt="Matthews Wong"
              layout="fill"
              objectFit="cover"
              className="rounded-full shadow-2xl relative z-10"
              priority
              placeholder="blur"
              blurDataURL="/images/profile-pic-tiny.avif"
            />
            
            {/* Rotating effects - maintained with original spacing */}
            <div className="absolute -inset-1 rounded-full border-2 border-white/20 blur-sm animate-reverse-spin" />
            <div className="absolute -inset-2 rounded-full border border-white/10 blur-sm animate-spin-slower" />
            
            {/* Desktop-only additional effects with performance optimizations */}
            <div className="hidden lg:block absolute -inset-3 rounded-full border border-blue-500/10 blur-md animate-spin-slow" style={{ willChange: 'transform' }} />
            <div className="hidden lg:block absolute -inset-4 rounded-full border border-purple-500/5 blur-lg animate-reverse-spin-slow" style={{ willChange: 'transform' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Enhanced text effects - maintained with original spacing */}
            <div className="absolute -inset-x-6 -inset-y-4 bg-white/5 rounded-lg blur-xl" />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white relative z-10">
                Matthews Wong
              </span>
              <div className="absolute inset-0 bg-white/5 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 blur-xl group-hover:via-blue-500/20 transition-all duration-500" />
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-6 relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 relative z-10">
                Software Engineer | IT Student
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-blue-500/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </h2>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 blur-lg group-hover:via-white/10 transition-all duration-500" />
              <p className="text-xl text-slate-300 max-w-2xl mx-auto relative z-10">
                Specializing in Technopreneurship at Swiss German University
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right side content - desktop only with rounded container */}
        <motion.div 
          className="w-full lg:w-1/4 hidden lg:flex flex-col gap-8 lg:rounded-3xl lg:p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <FeatureCard 
            icon={<MdDevices />}
            title="Growing Network"
            description="Connected with industry professionals and tech enthusiasts"
          />
          <FeatureCard 
            icon={<MdOutlinePeopleAlt />}
            title="Sharing Posts Regularly"
            description="Posting on LinkedIn about the newest technologies"
          />
          <FeatureCard 
            icon={<MdWork />}
            title="Open for Opportunities"
            description="Open for any opportunities and collaborations"
          />
        </motion.div>
      </div>

      {/* Scroll indicator - maintained with original spacing */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto text-slate-300 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="relative group mb-2">
          <div className="absolute inset-0 bg-white/5 rounded-lg blur-md group-hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100" />
          <span className="relative z-10">Scroll Down</span>
        </div>
        <FaChevronDown className="animate-bounce" />
      </motion.div>
    </section>
  );
}