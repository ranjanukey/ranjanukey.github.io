import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { useAnalytics } from "./utils/analytics.jsx";

// Immediate loading (critical above-the-fold)
import { Navbar, Hero } from "./components";
import Loader from "./components/Loader";

// Lazy load non-critical components
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => 
  import("./components/canvas").then(module => ({ default: module.StarsCanvas }))
);
const DataVisualization = lazy(() => 
  import("./components/DataVisualization").then(module => ({ 
    default: module.EnhancedSkills 
  }))
);

// PWA Installation Component
const PWAInstallPrompt = lazy(() => import("./components/PWAInstallPrompt"));

const App = () => {
  const { trackEvent, trackError, trackPerformanceMetric } = useAnalytics();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Track app initialization
    trackEvent('app_init', {
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connectionType: navigator.connection?.effectiveType || 'unknown'
    });

    // PWA install event handling
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      trackEvent('pwa_install_prompt_shown');
    };

    // Network status monitoring
    const handleOnline = () => {
      setIsOnline(true);
      trackEvent('network_status', { status: 'online' });
    };

    const handleOffline = () => {
      setIsOnline(false);
      trackEvent('network_status', { status: 'offline' });
    };

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
          trackEvent('sw_registered', { scope: registration.scope });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
          trackError(error, { context: 'sw_registration' });
        });

      // Listen for SW updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        trackEvent('sw_updated');
        // Optionally show update notification
      });
    }

    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          trackPerformanceMetric(entry.name, entry.duration);
        }
      });
    });

    if ('PerformanceObserver' in window) {
      performanceObserver.observe({ entryTypes: ['measure'] });
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      performanceObserver.disconnect();
    };
  }, [trackEvent, trackError, trackPerformanceMetric]);

  // Loading component with better UX
  const SectionLoader = ({ message = "Loading..." }) => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader />
        <p className="text-secondary mt-4 text-sm">{message}</p>
        {!isOnline && (
          <p className="text-red-400 mt-2 text-xs">
            ⚠️ You're offline. Some features may be limited.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className='relative z-0 bg-primary'>
          {/* Critical above-the-fold content */}
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          
          {/* Lazy loaded sections with individual error boundaries */}
          <Suspense fallback={<SectionLoader message="Loading About section..." />}>
            <ErrorBoundary fallbackComponent="AboutSection">
              <About />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader message="Loading Skills visualization..." />}>
            <ErrorBoundary fallbackComponent="SkillsSection">
              <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center mb-20">
                    Skills & Expertise
                  </h2>
                  <DataVisualization />
                </div>
              </section>
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader message="Loading Experience..." />}>
            <ErrorBoundary fallbackComponent="ExperienceSection">
              <Experience />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader message="Loading Technologies..." />}>
            <ErrorBoundary fallbackComponent="TechSection">
              <Tech />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader message="Loading Projects..." />}>
            <ErrorBoundary fallbackComponent="ProjectsSection">
              <Works />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader message="Loading Testimonials..." />}>
            <ErrorBoundary fallbackComponent="TestimonialsSection">
              <Feedbacks />
            </ErrorBoundary>
          </Suspense>

          <div className='relative z-0'>
            <Suspense fallback={<SectionLoader message="Loading Contact form..." />}>
              <ErrorBoundary fallbackComponent="ContactSection">
                <Contact />
              </ErrorBoundary>
            </Suspense>
            
            <Suspense fallback={<div className="h-20"></div>}>
              <ErrorBoundary fallbackComponent="StarsCanvas">
                <StarsCanvas />
              </ErrorBoundary>
            </Suspense>
          </div>

          {/* PWA Install Prompt */}
          {installPrompt && (
            <Suspense fallback={null}>
              <PWAInstallPrompt 
                installPrompt={installPrompt}
                onClose={() => setInstallPrompt(null)}
              />
            </Suspense>
          )}

          {/* Performance Monitor (development only) */}
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
          
          {/* Network status indicator */}
          {!isOnline && (
            <div className="fixed bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse z-50">
              📡 Offline Mode
            </div>
          )}
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
