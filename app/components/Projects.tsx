import React, { useState, useCallback } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TypeScript interfaces remain the same
interface Project {
  id: number;
  title: string;
  image?: string;
  images?: string[];
  description: string;
  features: string[];
  totalUsers?: number;
}

interface ModalProps {
  image: string;
  title: string;
  onClose: () => void;
}

interface ImageSliderProps {
  images: string[];
  title: string;
}

// Optimized Image Slider Component
const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Only load first image initially

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    // Preload next image
    setLoadedImages(prev => new Set([...prev, nextIndex, (nextIndex + 1) % images.length]));
  }, [currentIndex, images.length]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    // Preload previous image
    setLoadedImages(prev => new Set([...prev, prevIndex, (prevIndex - 1 + images.length) % images.length]));
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full aspect-video bg-slate-800/50 rounded-lg overflow-hidden group">
      <div className="relative w-full h-full">
        {/* Only render images that have been viewed or are adjacent */}
        {images.map((src, index) => (
          loadedImages.has(index) && (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`${title} - Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
                priority={index === 0} // Only prioritize first image
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          )
        ))}
      </div>
      
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white transition-all transform hover:bg-black/70 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white transition-all transform hover:bg-black/70 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Modal Component with lazy loading
const Modal: React.FC<ModalProps> = ({ image, title, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full mx-auto ${isMobile ? 'max-w-full' : 'max-w-4xl'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shadow-2xl rounded-lg overflow-hidden bg-black/5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div 
            className="relative rounded-lg"
            style={{
              paddingBottom: isMobile ? '150%' : '60%'
            }}
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="contain"
              loading="lazy"
              onLoadingComplete={() => setIsImageLoaded(true)}
              className={`transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ProjectCard Component with lazy loading
const ProjectCard: React.FC<{
  project: Project;
  isFeature: boolean;
  onImageClick?: (project: Project) => void;
}> = ({ project, isFeature, onImageClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-full md:w-4/5 mx-auto group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 h-full flex flex-col">
        {isFeature && project.image ? (
          <div 
            className="relative aspect-[2/3] cursor-pointer"
            onClick={() => onImageClick?.(project)}
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              onLoadingComplete={() => setIsImageLoaded(true)}
              className={`transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ) : project.images && (
          <div className="p-4 pb-0">
            <ImageSlider
              images={project.images}
              title={project.title}
            />
          </div>
        )}
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {project.title}
          </h3>
          <p className="text-slate-300 mb-4 text-base leading-relaxed flex-grow">
            {project.description}
          </p>
          <div className="mt-auto">
            <h4 className="text-lg font-semibold mb-2 text-indigo-400">
              {isFeature ? 'Main Features:' : 'Key Highlights:'}
            </h4>
            <ul className="list-none text-slate-200 text-base space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start hover:text-blue-300 transition-colors duration-300">
                  <span className="text-indigo-400 mr-2">•</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "STADPASS - Stadium Navigation App",
    image: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/STADPASS.jpeg?raw=true",
    description: "A mobile app designed to help users navigate stadiums using Bluetooth Low Energy (BLE) technology.",
    features: [
      "Real-time indoor navigation using BLE beacons.",
      "Interactive stadium maps with points of interest.",
      "Seamless integration with ticketing systems.",
      "User-friendly interface for quick wayfinding.",
      "In-app food purchase with real-time booth owner notifications"
    ],
  },
  {
    id: 2,
    title: "Observer KPU - Election Web App with LLM",
    image: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Observer%20KPU.jpeg?raw=true",
    description: "An all-in-one election news resource with automated web scraping and an AI chatbot tuned with election and candidate data.",
    features: [
      "Automated web scraping for real-time election news.",
      "AI chatbot powered by a fine-tuned Large Language Model (LLM).",
      "Comprehensive candidate and election data analysis.",
      "User-friendly dashboard for election insights.",
    ],
  },
];

const otherProjects: Project[] = [
  {
    id: 3,
    title: "Credit Risk Analysis and Prediction Modeling with XGBoost",
    images: [
  "/images/rakamin/rakamin-01.png",
  "/images/rakamin/rakamin-04.png",
  "/images/rakamin/rakamin-05.png",
  "/images/rakamin/rakamin-06.png",
  "/images/rakamin/rakamin-07.png",
  "/images/rakamin/rakamin-08.png",
  "/images/rakamin/rakamin-09.png",
  "/images/rakamin/rakamin-10.png",
  "/images/rakamin/rakamin-11.png",
  "/images/rakamin/rakamin-12.png",
  "/images/rakamin/rakamin-13.png",
  "/images/rakamin/rakamin-14.png",
  "/images/rakamin/rakamin-15.png",
  "/images/rakamin/rakamin-16.png",
  "/images/rakamin/rakamin-17.png",
  "/images/rakamin/rakamin-18.png",
  "/images/rakamin/rakamin-19.png",
  "/images/rakamin/rakamin-20.png",
  "/images/rakamin/rakamin-21.png",
  "/images/rakamin/rakamin-22.png"

    ],
    description: "Developed a comprehensive credit risk analysis using advanced XGBoost modeling techniques.",
    features: [
      "Built predictive models for risk assessment and mitigation.",
      "Delivered actionable insights through data visualization.",
      "Enhanced financial performance through strategic risk management.",
      "Conducted exploratory data analysis (EDA) to uncover key patterns and trends",
      "Skills: Exploratory Data Analysis, Data Modeling, XGBoost, Python.",
    ],
  },
  {
    id: 4,
    title: "Security Onion - Network Monitoring with Zeek",
    images: [
      "/images/1.png",
      "/images/5.png",
      "/images/6.png",
      "/images/7.png",
      "/images/8.png",
      "/images/9.png",
      "/images/10.png",
      "/images/17.png",
      "/images/18.png",
      "/images/19.png",
      "/images/20.png",
      "/images/21.png",
      "/images/22.png",
      "/images/23.png",
      "/images/24.png",
      "/images/25.png",
      "/images/26.png",
      "/images/27.png",
      "/images/28.png"
    ],
    description: "Developed and implemented a comprehensive network security monitoring solution using Security Onion.",
    features: [
      "Deployed Security Onion on a cloud server for network monitoring.",
      "Simulated network attacks (HTTP load tests, SSH brute force, DoS).",
      "Analyzed logs and alerts to identify attack patterns.",
      "Provided actionable insights to strengthen network defenses.",
      "Automated log parsing and Webhook Alert to Discord",
      "Skills: Security Onion, SIEM, Network Traffic Analysis, Log Analysis.",
    ],
  },
];

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-4 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFeature={true}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>

        <motion.h3
          className="text-3xl md:text-4xl font-extrabold mb-6 text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Other Projects
          </span>
        </motion.h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFeature={false}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && selectedImage.image && (
          <Modal
            image={selectedImage.image}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;