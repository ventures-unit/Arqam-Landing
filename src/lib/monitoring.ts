// Monitoring and analytics utilities for production

interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number | boolean>
  timestamp?: number
}

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp?: number
}

class MonitoringService {
  private isProduction = process.env.NODE_ENV === 'production'
  private isClient = typeof window !== 'undefined'

  // Track custom events
  trackEvent(event: AnalyticsEvent) {
    if (!this.isClient) return

    const eventData = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    // Log to console in development
    if (!this.isProduction) {
      console.log('Analytics Event:', eventData)
      return
    }

    // Send to analytics service (Vercel Analytics, Google Analytics, etc.)
    try {
      // Vercel Analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', event.name, event.properties)
      }

      // Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.name, {
          event_category: 'engagement',
          event_label: event.properties?.label || '',
          value: event.properties?.value || 0,
          ...event.properties
        })
      }

      // Custom analytics endpoint
      this.sendToCustomAnalytics(eventData)
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  // Track performance metrics
  trackPerformance(metric: PerformanceMetric) {
    if (!this.isClient) return

    const metricData = {
      ...metric,
      timestamp: metric.timestamp || Date.now(),
      url: window.location.href
    }

    // Log to console in development
    if (!this.isProduction) {
      console.log('Performance Metric:', metricData)
      return
    }

    // Send to monitoring service
    try {
      // Web Vitals
      if (typeof window !== 'undefined' && (window as any).webVitals) {
        (window as any).webVitals(metric.name, metric.value)
      }

      // Custom performance endpoint
      this.sendToCustomAnalytics(metricData)
    } catch (error) {
      console.error('Error tracking performance:', error)
    }
  }

  // Track errors
  trackError(error: Error, context?: Record<string, string | number | boolean>) {
    const errorData = {
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        context,
        url: this.isClient ? window.location.href : 'server',
        timestamp: Date.now()
      }
    }

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error tracked:', errorData)
      return
    }

    // Send to error tracking service (Sentry, etc.)
    try {
      // Sentry
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, { extra: context })
      }

      // Custom error endpoint
      this.sendToCustomAnalytics(errorData)
    } catch (err) {
      console.error('Error tracking error:', err)
    }
  }

  // Track page views
  trackPageView(page: string) {
    this.trackEvent({
      name: 'page_view',
      properties: {
        page,
        referrer: this.isClient ? document.referrer : undefined
      }
    })
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean, error?: string) {
    this.trackEvent({
      name: 'form_submission',
      properties: {
        form_name: formName,
        success,
        error: error || null
      }
    })
  }

  // Track user interactions
  trackInteraction(action: string, element: string, properties?: Record<string, string | number | boolean>) {
    this.trackEvent({
      name: 'user_interaction',
      properties: {
        action,
        element,
        ...properties
      }
    })
  }

  // Private method to send data to custom analytics
  private async sendToCustomAnalytics(data: any) {
    try {
      // Replace with your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Failed to send analytics data:', error)
    }
  }
}

// Create singleton instance
export const monitoring = new MonitoringService()

// Convenience functions
export const trackEvent = (event: AnalyticsEvent) => monitoring.trackEvent(event)
export const trackPerformance = (metric: PerformanceMetric) => monitoring.trackPerformance(metric)
export const trackError = (error: Error, context?: Record<string, string | number | boolean>) => monitoring.trackError(error, context)
export const trackPageView = (page: string) => monitoring.trackPageView(page)
export const trackFormSubmission = (formName: string, success: boolean, error?: string) => 
  monitoring.trackFormSubmission(formName, success, error)
export const trackInteraction = (action: string, element: string, properties?: Record<string, string | number | boolean>) => 
  monitoring.trackInteraction(action, element, properties)

// Performance monitoring helpers
export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
  const start = performance.now()
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = performance.now() - start
      trackPerformance({
        name: `function_${name}`,
        value: duration,
        unit: 'ms'
      })
    })
  } else {
    const duration = performance.now() - start
    trackPerformance({
      name: `function_${name}`,
      value: duration,
      unit: 'ms'
    })
    return result
  }
}

// Web Vitals tracking (simplified without web-vitals dependency)
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return

  // Track basic performance metrics using native APIs
  const trackBasicPerformance = () => {
    // Track page load time
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart
      
      trackPerformance({
        name: 'page_load_time',
        value: loadTime,
        unit: 'ms'
      })
    }

    // Track DOM content loaded
    if (document.readyState === 'complete') {
      trackPerformance({
        name: 'dom_content_loaded',
        value: performance.now(),
        unit: 'ms'
      })
    }
  }

  // Track when page is fully loaded
  if (document.readyState === 'complete') {
    trackBasicPerformance()
  } else {
    window.addEventListener('load', trackBasicPerformance)
  }

  // Track navigation timing if available
  if (window.performance && window.performance.getEntriesByType) {
    const navigationEntries = window.performance.getEntriesByType('navigation')
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0] as PerformanceNavigationTiming
      
      trackPerformance({
        name: 'ttfb',
        value: nav.responseStart - nav.requestStart,
        unit: 'ms'
      })
    }
  }
}
