"use client"
import { useState, useEffect, useCallback, memo } from "react"
import { SpeedInsights } from '@vercel/speed-insights/next'
import dynamic from 'next/dynamic'
import Header from "./components/Header"
import Hero from "./components/Hero"
import { Analytics } from '@vercel/analytics/next'

// Import components without skeleton loading to prevent DOM bloat
// We'll use intersection observer to control when these get loaded
const About = dynamic(() => import("./components/About"), {
  ssr: false,
  loading: () => null
});

const Education = dynamic(() => import("./components/Education"), {
  ssr: false,
  loading: () => null
});

const Experience = dynamic(() => import("./components/Experience"), {
  ssr: false,
  loading: () => null
});

const Certifications = dynamic(() => import("./components/Certifications"), {
  ssr: false,
  loading: () => null
});

const Hackathon = dynamic(() => import("./components/Hackathon"), {
  ssr: false,
  loading: () => null
});

const Projects = dynamic(() => import("./components/Projects"), {
  ssr: false,
  loading: () => null
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
  loading: () => null
});

// Chatbot is dynamically imported only when needed
const Chatbot = dynamic(() => import("./components/Chatbot"), {
  ssr: false,
  loading: () => null
});

// Define cookie consent structure with proper types
interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  chatbot: boolean;
  timestamp?: string;
}

const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  chatbot: false
};

// Cookie Consent Modal Component with proper types
interface CookieConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: () => void;
}

const CookieConsentModal = memo(({ isOpen, onAccept, onDecline, onCustomize }: CookieConsentModalProps) => {
  // Early return for better performance - don't render anything when not open
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <div className="bg-slate-800 rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-700">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Your Privacy Choices
            </h3>
            <button 
              onClick={onDecline}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6 text-gray-300 space-y-3">
            <p className="text-white font-medium">
              We respect your privacy
            </p>
            <p>
              We use cookies to enhance your browsing experience, personalize content, and analyze site traffic.
            </p>
            <p>
              Our chatbot requires cookies to remember your conversations and provide helpful responses tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={onDecline}
              className="px-5 py-3 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-full transition-colors sm:order-1 border border-slate-600 hover:border-slate-500"
            >
              Essential Only
            </button>
            <button
              onClick={onCustomize}
              className="px-5 py-3 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-full transition-colors sm:order-2 border border-slate-600 hover:border-indigo-400"
            >
              Customize
            </button>
            <button
              onClick={onAccept}
              className="px-5 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors sm:order-3 shadow-lg shadow-indigo-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CookieConsentModal.displayName = "CookieConsentModal";

// Custom Cookie Preferences Modal with proper types
interface CustomCookieModalProps {
  isOpen: boolean;
  onSave: (preferences: CookieConsent) => void;
  onCancel: () => void;
  initialPreferences: CookieConsent;
}

const CustomCookieModal = memo(({ isOpen, onSave, onCancel, initialPreferences }: CustomCookieModalProps) => {
  // Early return pattern for better performance
  if (!isOpen) return null;
  
  const [preferences, setPreferences] = useState<CookieConsent>({...initialPreferences});

  // Reset preferences when modal opens with current values
  useEffect(() => {
    setPreferences({...initialPreferences});
  }, [initialPreferences]);

  const handleToggle = (key: keyof Omit<CookieConsent, 'timestamp'>) => {
    if (key !== 'essential') { // Cannot toggle essential cookies
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <div className="bg-slate-800 rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-700">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Customize Privacy Settings
            </h3>
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-300 mb-5">Select which cookies you want to accept. You can change these settings anytime.</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-slate-700/60 rounded-xl border border-slate-600">
              <div>
                <h4 className="font-medium text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Essential Cookies
                </h4>
                <p className="text-sm text-gray-300">Required for the website to function properly</p>
              </div>
              <div className="relative">
                <div className="block bg-green-600 w-12 h-6 rounded-full"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition translate-x-6"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/60 rounded-xl border border-slate-600 hover:border-indigo-400 transition-colors duration-200">
              <div>
                <h4 className="font-medium text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics Cookies
                </h4>
                <p className="text-sm text-gray-300">Help us understand how visitors interact with our site</p>
              </div>
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleToggle('analytics')}
                role="checkbox"
                aria-checked={preferences.analytics}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleToggle('analytics');
                  }
                }}
              >
                <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${preferences.analytics ? 'bg-indigo-600' : 'bg-gray-600'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${preferences.analytics ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/60 rounded-xl border border-slate-600 hover:border-indigo-400 transition-colors duration-200">
              <div>
                <h4 className="font-medium text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Chatbot Cookies
                </h4>
                <p className="text-sm text-gray-300">Allow our chatbot to remember your conversations</p>
              </div>
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleToggle('chatbot')}
                role="checkbox"
                aria-checked={preferences.chatbot}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleToggle('chatbot');
                  }
                }}
              >
                <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${preferences.chatbot ? 'bg-indigo-600' : 'bg-gray-600'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${preferences.chatbot ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-3 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-full transition-colors sm:order-1 border border-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(preferences)}
              className="px-5 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors sm:order-2 shadow-lg shadow-indigo-500/20"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CustomCookieModal.displayName = "CustomCookieModal";

// Highly optimized intersection observer hook that handles both visibility tracking and analytics
const useIntersectionObserver = (callback: () => void) => {
  return useCallback((node: Element | null) => {
    if (node === null) return;
    
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Execute callback (could be importing a component or tracking analytics)
        if (typeof callback === 'function') {
          callback();
        }
        
        // Track section view if analytics consent is given
        try {
          const consentString = localStorage.getItem('cookieConsent');
          if (consentString) {
            const consent = JSON.parse(consentString);
            if (consent?.analytics) {
              const sectionId = node.id;
              if (sectionId) {
                console.log(`Section viewed: ${sectionId}`);
              }
            }
          }
        } catch {
          // Silently handle storage errors
        }
        
        // Unobserve after first intersection
        observer.unobserve(node);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px 0px',
    });
    
    observer.observe(node);
    
    // Return cleanup function
    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [callback]);
};

// Optimized for performance with memoization and reduced state updates
export default function Home() {
  // Initialize states at top level to satisfy React Hooks order rule
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState(defaultConsent);

  // Consolidated preferences load function to avoid code duplication
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const loadPreferences = () => {
      try {
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (cookieConsent) {
          const savedPreferences = JSON.parse(cookieConsent);
          setCookiePreferences(savedPreferences);
          setConsentGiven(true);
        } else {
          // Show cookie modal after a short delay for better UX
          timer = setTimeout(() => setCookieModalOpen(true), 2000);
        }
      } catch {
        // Fallback to showing the modal if localStorage fails
        timer = setTimeout(() => setCookieModalOpen(true), 2000);
      }
    };
    
    // Load preferences when component mounts
    loadPreferences();
    
    // Clean up timer on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Memoized handlers to prevent recreating functions on each render
  const handleAcceptAll = useCallback(() => {
    const consent = {
      essential: true,
      analytics: true,
      chatbot: true,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
    } catch {
      console.error('Failed to save cookie preferences');
    }
    
    setCookiePreferences(consent);
    setCookieModalOpen(false);
    setConsentGiven(true);
  }, []);

  const handleDecline = useCallback(() => {
    const consent = {
      essential: true,
      analytics: false,
      chatbot: false,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
    } catch {
      console.error('Failed to save cookie preferences');
    }
    
    setCookiePreferences(consent);
    setCookieModalOpen(false);
    setConsentGiven(true);
  }, []);

  const handleCustomize = useCallback(() => {
    setCookieModalOpen(false);
    setCustomModalOpen(true);
  }, []);

  const handleSavePreferences = useCallback((preferences: CookieConsent) => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
    } catch {
      console.error('Failed to save cookie preferences');
    }
    
    setCookiePreferences(consent);
    setCustomModalOpen(false);
    setConsentGiven(true);
  }, []);

  const handleCancelCustomize = useCallback(() => {
    setCustomModalOpen(false);
    // Show the main cookie modal again if no consent was given yet
    if (!consentGiven) {
      setCookieModalOpen(true);
    }
  }, [consentGiven]);
  
  // To avoid ESLint "missing key" warnings with LazySection
  const sectionIds = {
    about: "about-section",
    education: "education-section",
    experience: "experience-section",
    certifications: "certifications-section",
    hackathon: "hackathon-section",
    projects: "projects-section",
    footer: "footer-section"
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-900 overflow-x-hidden">
      {/* Header is always loaded immediately */}
      <Header />
      
      {/* Hero section is important and should be loaded early */}
      <section id="hero-section" className="section-container">
        <Hero />
      </section>
      
      {/* Add global styles for sections */}
      <style jsx global>{`
        .section-container {
          scroll-margin-top: 80px;
        }
      `}</style>

      {/* Ultra-optimized section loading with native intersection observer */}
      <section 
        id={sectionIds.about} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <About />
      </section>

      <section 
        id={sectionIds.education} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Education />
      </section>

      <section 
        id={sectionIds.experience} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Experience />
      </section>

      <section 
        id={sectionIds.certifications} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Certifications />
      </section>

      <section 
        id={sectionIds.hackathon} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Hackathon />
      </section>

      <section 
        id={sectionIds.projects} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Projects />
      </section>

      <section 
        id={sectionIds.footer} 
        ref={useIntersectionObserver(() => {})}
        className="section-container"
      >
        <Footer />
      </section>

      {/* Always render Chatbot component - the component itself will handle visibility */}
      <Chatbot />

      {/* Cookie Consent Modals */}
      <CookieConsentModal 
        isOpen={cookieModalOpen}
        onAccept={handleAcceptAll}
        onDecline={handleDecline}
        onCustomize={handleCustomize}
      />

      <CustomCookieModal
        isOpen={customModalOpen}
        onSave={handleSavePreferences}
        onCancel={handleCancelCustomize}
        initialPreferences={cookiePreferences}
      />

      {/* Only add analytics if consent is given */}
      {consentGiven && cookiePreferences.analytics && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
    </div>
  );
}