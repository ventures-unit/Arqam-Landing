/**
 * Performance utilities for the Arqam landing page
 * Handles performance monitoring, optimization, and analytics
 */

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Simple performance tracking without external dependencies
  // This can be enhanced later with web-vitals when needed
  console.log('Performance tracking initialized - Vercel deployment fix');
}

/**
 * Send performance metrics to analytics
 */
function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as Window & { gtag: (command: string, action: string, params: Record<string, unknown>) => void }).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(console.error);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap'
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with intersection observer
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined') return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Optimize scroll performance
 */
export function optimizeScrollPerformance() {
  if (typeof window === 'undefined') return;

  let ticking = false;

  function updateScrollPosition() {
    // Your scroll handling code here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Prefetch critical pages
 */
export function prefetchCriticalPages() {
  if (typeof window === 'undefined') return;

  // Prefetch likely next pages
  const criticalPages = [
    '/about',
    '/features',
    '/contact'
  ];

  criticalPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
}

/**
 * Monitor Core Web Vitals
 */
export function monitorCoreWebVitals() {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    sendToAnalytics({
      name: 'LCP',
      value: lastEntry.startTime,
      id: 'lcp-' + Date.now()
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Track INP (Interaction to Next Paint) - replaces FID
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      sendToAnalytics({
        name: 'INP',
        value: entry.duration,
        id: 'inp-' + Date.now()
      });
    });
  }).observe({ entryTypes: ['event'] });

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (!(entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }).hadRecentInput) {
        clsValue += (entry as PerformanceEntry & { value: number }).value;
      }
    });
    sendToAnalytics({
      name: 'CLS',
      value: clsValue,
      id: 'cls-' + Date.now()
    });
  }).observe({ entryTypes: ['layout-shift'] });
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Track web vitals
  trackWebVitals();

  // Preload critical resources
  preloadCriticalResources();

  // Setup lazy loading
  setupLazyLoading();

  // Optimize scroll performance
  optimizeScrollPerformance();

  // Prefetch critical pages
  prefetchCriticalPages();

  // Monitor core web vitals
  monitorCoreWebVitals();
}

/**
 * Performance budget checker
 */
export function checkPerformanceBudget() {
  if (typeof window === 'undefined') return;

  const budget = {
    maxBundleSize: 250 * 1024, // 250KB
    maxImageSize: 100 * 1024, // 100KB
    maxFontSize: 50 * 1024, // 50KB
    maxTotalSize: 500 * 1024 // 500KB
  };

  // Check bundle size
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const totalScriptSize = scripts.reduce((total) => {
    // This is a simplified check - in reality you'd need to fetch and measure
    return total;
  }, 0);

  if (totalScriptSize > budget.maxBundleSize) {
    console.warn('Bundle size exceeds budget:', totalScriptSize, 'bytes');
  }

  // Check image sizes
  const images = Array.from(document.querySelectorAll('img'));
  images.forEach(img => {
    if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
      console.warn('Large image detected:', img.src, img.naturalWidth, 'x', img.naturalHeight);
    }
  });
}
