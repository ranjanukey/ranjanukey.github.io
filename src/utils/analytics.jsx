import React, { useEffect, useRef, useState } from 'react';

class AnalyticsEngine {
  constructor() {
    this.events = [];
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      referrer: document.referrer,
      performance: {},
    };
    
    // Initialize performance monitoring
    this.initPerformanceTracking();
    
    // Set up auto-flush
    this.setupAutoFlush();
    
    // Track page visibility
    this.setupVisibilityTracking();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  initPerformanceTracking() {
    // Track Core Web Vitals
    this.trackWebVitals();
    
    // Track resource loading
    this.trackResourceTiming();
    
    // Track navigation timing
    this.trackNavigationTiming();
  }

  trackWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.trackEvent('core_web_vital', {
          metric: 'LCP',
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName,
          timestamp: Date.now(),
        });
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          this.trackEvent('core_web_vital', {
            metric: 'FID',
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now(),
          });
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.trackEvent('core_web_vital', {
          metric: 'CLS',
          value: clsValue,
          timestamp: Date.now(),
        });
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  trackResourceTiming() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (entry.duration > 1000) { // Only track slow resources
            this.trackEvent('resource_timing', {
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize,
              type: entry.initiatorType,
              timestamp: Date.now(),
            });
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }

  trackNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.sessionData.performance = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
      };
      
      this.trackEvent('page_load', this.sessionData.performance);
    });
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fpEntry = paintEntries.find(entry => entry.name === 'first-paint');
    return fpEntry ? fpEntry.startTime : null;
  }

  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : null;
  }

  setupVisibilityTracking() {
    let visibilityStart = Date.now();
    let totalVisibleTime = 0;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page became hidden
        totalVisibleTime += Date.now() - visibilityStart;
        this.trackEvent('page_visibility', {
          action: 'hidden',
          totalVisibleTime,
          timestamp: Date.now(),
        });
      } else {
        // Page became visible
        visibilityStart = Date.now();
        this.trackEvent('page_visibility', {
          action: 'visible',
          timestamp: Date.now(),
        });
      }
    });

    // Track when user leaves the page
    window.addEventListener('beforeunload', () => {
      if (!document.hidden) {
        totalVisibleTime += Date.now() - visibilityStart;
      }
      
      this.trackEvent('session_end', {
        totalVisibleTime,
        sessionDuration: Date.now() - this.sessionData.startTime,
        timestamp: Date.now(),
      });
      
      // Flush any remaining events
      this.flush(true);
    });
  }

  setupAutoFlush() {
    // Flush events every 30 seconds
    setInterval(() => {
      this.flush();
    }, 30000);
  }

  trackEvent(eventName, data = {}) {
    const event = {
      id: this.generateEventId(),
      sessionId: this.sessionData.sessionId,
      eventName,
      data,
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.events.push(event);

    // Auto-flush if we have too many events
    if (this.events.length >= 50) {
      this.flush();
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, data);
    }
  }

  generateEventId() {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  flush(isUnloading = false) {
    if (this.events.length === 0) return;

    const payload = {
      sessionData: this.sessionData,
      events: [...this.events],
      flushedAt: Date.now(),
    };

    // Clear events immediately
    this.events = [];

    // Send data
    if (isUnloading && navigator.sendBeacon) {
      // Use sendBeacon for unload events
      navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
    } else {
      // Regular fetch for normal flushes
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(error => {
        console.warn('Analytics flush failed:', error);
        // Re-add events if send failed (unless it's unloading)
        if (!isUnloading) {
          this.events.unshift(...payload.events);
        }
      });
    }
  }

  // Public methods for tracking specific portfolio interactions
  trackSectionView(sectionName, timeSpent = null) {
    this.trackEvent('section_view', {
      section: sectionName,
      timeSpent,
    });
  }

  trackProjectView(projectName, action = 'view') {
    this.trackEvent('project_interaction', {
      project: projectName,
      action,
    });
  }

  trackDownload(fileName, fileType) {
    this.trackEvent('file_download', {
      fileName,
      fileType,
    });
  }

  trackContactAttempt(method, success = false) {
    this.trackEvent('contact_attempt', {
      method,
      success,
    });
  }

  trackSkillHover(skillName) {
    this.trackEvent('skill_interaction', {
      skill: skillName,
      action: 'hover',
    });
  }

  trackError(error, context = {}) {
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  trackPerformanceMetric(metricName, value, context = {}) {
    this.trackEvent('performance_metric', {
      metric: metricName,
      value,
      context,
    });
  }

  // Method to get current session analytics
  getSessionAnalytics() {
    return {
      sessionId: this.sessionData.sessionId,
      duration: Date.now() - this.sessionData.startTime,
      eventsCount: this.events.length,
      performance: this.sessionData.performance,
    };
  }
}

// Create global analytics instance
const analytics = new AnalyticsEngine();

// React hook for using analytics
export function useAnalytics() {
  const [sessionAnalytics, setSessionAnalytics] = useState(null);
  const sectionObserverRef = useRef(null);

  useEffect(() => {
    // Update session analytics periodically
    const interval = setInterval(() => {
      setSessionAnalytics(analytics.getSessionAnalytics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Hook for tracking section views
  const trackSectionView = (sectionRef, sectionName) => {
    useEffect(() => {
      if (!sectionRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              analytics.trackSectionView(sectionName);
            }
          });
        },
        { threshold: 0.5, rootMargin: '-50px' }
      );

      observer.observe(sectionRef.current);
      sectionObserverRef.current = observer;

      return () => {
        if (sectionObserverRef.current) {
          sectionObserverRef.current.disconnect();
        }
      };
    }, [sectionRef, sectionName]);
  };

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackSectionView: analytics.trackSectionView.bind(analytics),
    trackProjectView: analytics.trackProjectView.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackContactAttempt: analytics.trackContactAttempt.bind(analytics),
    trackSkillHover: analytics.trackSkillHover.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformanceMetric: analytics.trackPerformanceMetric.bind(analytics),
    trackSectionViewHook: trackSectionView,
    sessionAnalytics,
  };
}

// HOC for automatic section tracking
export function withAnalytics(WrappedComponent, sectionName) {
  return function AnalyticsWrappedComponent(props) {
    const { trackSectionViewHook } = useAnalytics();
    const sectionRef = useRef(null);

    trackSectionViewHook(sectionRef, sectionName);

    return React.createElement(
      'div',
      { ref: sectionRef },
      React.createElement(WrappedComponent, props)
    );
  };
}

export default analytics;
