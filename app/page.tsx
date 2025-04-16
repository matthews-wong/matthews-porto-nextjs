"use client"
import { Suspense, lazy, useState, useEffect } from "react"
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Chatbot from "./components/Chatbot"
import { Analytics } from '@vercel/analytics/next'

// Lazy load components that are not immediately visible
const About = lazy(() => import("./components/About"))
const Education = lazy(() => import("./components/Education"))
const Experience = lazy(() => import("./components/Experience"))
const Certifications = lazy(() => import("./components/Certifications"))
const Hackathon = lazy(() => import("./components/Hackathon"))
const Projects = lazy(() => import("./components/Projects"))
const Footer = lazy(() => import("./components/Footer"))
//const SplashCursor = lazy(() => import("./components/SplashCursor"))

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
}

// Loading component with skeleton
const LoadingComponent = () => (
  <div className="animate-pulse space-y-8 p-4">
    <div className="h-64 bg-slate-700 rounded-xl"></div>
    <div className="h-96 bg-slate-700 rounded-xl"></div>
    <div className="h-72 bg-slate-700 rounded-xl"></div>
  </div>
)

// Cookie Consent Modal Component with proper types
interface CookieConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: () => void;
}

const CookieConsentModal = ({ isOpen, onAccept, onDecline, onCustomize }: CookieConsentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <div className="bg-slate-800 rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up border border-slate-700">
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
};

// Custom Cookie Preferences Modal with proper types
interface CustomCookieModalProps {
  isOpen: boolean;
  onSave: (preferences: CookieConsent) => void;
  onCancel: () => void;
}

const CustomCookieModal = ({ isOpen, onSave, onCancel }: CustomCookieModalProps) => {
  const [preferences, setPreferences] = useState<CookieConsent>({...defaultConsent});

  useEffect(() => {
    // Reset preferences when modal opens
    if (isOpen) {
      const consentString = localStorage.getItem('cookieConsent');
      if (consentString) {
        try {
          const savedPreferences = JSON.parse(consentString) as CookieConsent;
          setPreferences({
            essential: true, // Always required
            analytics: Boolean(savedPreferences.analytics),
            chatbot: Boolean(savedPreferences.chatbot)
          });
        } catch {
          // If parsing fails, use default
          setPreferences({...defaultConsent});
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      <div className="bg-slate-800 rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up border border-slate-700">
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
};

// Track section views only if analytics consent is given
const trackSectionView = (sectionId: string): void => {
  const consentString = localStorage.getItem('cookieConsent');
  if (!consentString) return;
  
  try {
    const consent = JSON.parse(consentString) as CookieConsent;
    // Only track if analytics consent is given
    if (consent && consent.analytics) {
      // This would typically call your analytics service
      console.log(`Section viewed: ${sectionId}`);
    }
  } catch {
    // If parsing fails, don't track
  }
};

// Section visibility observer component with proper types
interface SectionObserverProps {
  sectionId: string;
  children: React.ReactNode;
}

const SectionObserver = ({ sectionId, children }: SectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackSectionView(sectionId);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );
    
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId]);

  return (
    <div id={sectionId}>
      {children}
    </div>
  );
};

export default function Home() {
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);
  const [customModalOpen, setCustomModalOpen] = useState<boolean>(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user has already set cookie preferences
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent) {
      setConsentGiven(true);
    } else {
      // Show cookie modal after a short delay for better UX
      const timer = setTimeout(() => {
        setCookieModalOpen(true);
      }, 2000); // Increased delay slightly for better user experience
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    // Save full consent to localStorage
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
      chatbot: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookieModalOpen(false);
    setConsentGiven(true);
  };

  const handleDecline = () => {
    // Save minimal consent (essential only) to localStorage
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
      chatbot: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookieModalOpen(false);
    setConsentGiven(true);
  };

  const handleCustomize = () => {
    setCookieModalOpen(false);
    setCustomModalOpen(true);
  };

  const handleSavePreferences = (preferences: CookieConsent) => {
    // Save custom preferences to localStorage
    const consent: CookieConsent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCustomModalOpen(false);
    setConsentGiven(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-900 overflow-x-hidden">
      {/* Header and Hero are loaded immediately */}
      <Header />
      <SectionObserver sectionId="hero-section">
        <Hero />
      </SectionObserver>

      {/* Wrap other components in Suspense with skeleton loading */}
      <SectionObserver sectionId="about-section">
        <Suspense fallback={<LoadingComponent />}>
          <About />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="education-section">
        <Suspense fallback={<LoadingComponent />}>
          <Education />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="experience-section">
        <Suspense fallback={<LoadingComponent />}>
          <Experience />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="certifications-section">
        <Suspense fallback={<LoadingComponent />}>
          <Certifications />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="hackathon-section">
        <Suspense fallback={<LoadingComponent />}>
          <Hackathon />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="projects-section">
        <Suspense fallback={<LoadingComponent />}>
          <Projects />
        </Suspense>
      </SectionObserver>

      <SectionObserver sectionId="footer-section">
        <Suspense fallback={<LoadingComponent />}>
          <Footer />
        </Suspense>
      </SectionObserver>

      {/* Chatbot component - only show if consent is given */}
      {consentGiven && <Chatbot />}

      {/* Fix: Wrap SplashCursor in Suspense */}
      {/* <Suspense fallback={null}>
        <SplashCursor />
      </Suspense> */}

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
        onCancel={() => setCustomModalOpen(false)}
      />

      {/* Speed Insights for performance monitoring */}
      <SpeedInsights />
      <Analytics />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}