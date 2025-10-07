/**
 * Security utilities for the Arqam landing page
 * Handles input validation, sanitization, and security checks
 */

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: Record<string, unknown>;
}

/**
 * Enhanced input validation with comprehensive checks
 */
export function validateInput(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const sanitizedData: Record<string, unknown> = {};

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    } else if (data.email.length > 254) {
      errors.push('Email address is too long');
    } else {
      sanitizedData.email = data.email.trim().toLowerCase();
    }
  }

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else {
    const name = data.name.trim();
    if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (name.length > 100) {
      errors.push('Name must be less than 100 characters');
    } else if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) {
      errors.push('Name contains invalid characters');
    } else {
      sanitizedData.name = name;
    }
  }

  // Role validation
  const validRoles = ['Founder', 'Government', 'Researcher', 'Investor', 'Other'];
  if (!data.role || typeof data.role !== 'string' || !validRoles.includes(data.role)) {
    errors.push('Please select a valid role');
  } else {
    sanitizedData.role = data.role;
  }

  // Notes validation (optional)
  if (data.notes && typeof data.notes === 'string') {
    const notes = data.notes.trim();
    if (notes.length > 1000) {
      errors.push('Notes must be less than 1000 characters');
    } else {
      sanitizedData.notes = sanitizeString(notes);
    }
  } else {
    sanitizedData.notes = null;
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData : undefined
  };
}

/**
 * Sanitize string to prevent XSS attacks
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Enhanced rate limiting with sliding window
 */
export function checkRateLimit(
  ip: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const key = ip;
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    console.log(`Rate limit exceeded for IP ${ip}: ${record.count}/${maxRequests} requests`);
    return false;
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  return true;
}

/**
 * Clean up expired rate limit records
 */
export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

/**
 * Check if email is from a disposable email service
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain || '');
}

/**
 * Check for suspicious patterns in input
 */
export function detectSuspiciousActivity(data: Record<string, unknown>): boolean {
  const suspiciousPatterns = [
    /script/i,
    /javascript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /onload/i,
    /onerror/i,
    /onclick/i
  ];

  const textToCheck = JSON.stringify(data).toLowerCase();
  return suspiciousPatterns.some(pattern => pattern.test(textToCheck));
}

// Clean up rate limit store every 5 minutes
setInterval(cleanupRateLimit, 5 * 60 * 1000);
