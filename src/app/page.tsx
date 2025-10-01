
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Map, 
  Globe, 
  Wrench, 
  Rocket,
  User,
  BarChart3,
  Brain,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Founder',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.email || !formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!formData.name || formData.name.trim().length < 2) {
      alert('Please enter your full name.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', role: 'Founder', notes: '' });
      
    } catch (error: unknown) {
      console.error('Signup error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      {/* Navigation */}
      <nav className=&quot;sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200&quot;>
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;flex items-center justify-between h-16 relative&quot;>
            {/* Logo */}
            <div className=&quot;flex items-center space-x-2&quot;>
              <div className=&quot;w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center&quot;>
                <span className=&quot;text-white font-bold text-sm&quot;>q</span>
              </div>
              <span className=&quot;text-xl md:text-2xl font-bold text-blue-900&quot;>arqam</span>
            </div>

            {/* Desktop Navigation - Absolutely Centered */}
            <div className=&quot;hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2&quot;>
              <div className=&quot;flex items-center space-x-8&quot;>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className=&quot;text-gray-600 hover:text-gray-900 font-medium transition-colors&quot;
                >
                  Features
                </button>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className=&quot;text-gray-600 hover:text-gray-900 font-medium transition-colors&quot;
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className=&quot;text-gray-600 hover:text-gray-900 font-medium transition-colors&quot;
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Desktop CTA Button */}
            <div className=&quot;hidden md:block&quot;>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className=&quot;bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base&quot;
              >
                Register for Early Access
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className=&quot;md:hidden flex items-center space-x-3&quot;>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className=&quot;bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm&quot;
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className=&quot;p-2 rounded-lg hover:bg-gray-100 transition-colors&quot;
              >
                {isMobileMenuOpen ? <X className=&quot;w-6 h-6&quot; /> : <Menu className=&quot;w-6 h-6&quot; />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className=&quot;md:hidden border-t border-gray-200 bg-white&quot;
            >
              <div className=&quot;px-2 pt-2 pb-3 space-y-1&quot;>
                <button 
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className=&quot;block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors&quot;
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className=&quot;block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors&quot;
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className=&quot;block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors&quot;
                >
                  Contact
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className=&quot;block w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors mt-2&quot;
                >
                  Register for Early Access
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className=&quot;pt-16 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden&quot;>
        {/* Background Elements - Hidden on mobile */}
        <div className=&quot;absolute inset-0 overflow-hidden hidden md:block&quot;>
          <div className=&quot;absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20&quot;></div>
          <div className=&quot;absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20&quot;></div>
          <div className=&quot;absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-10&quot;></div>
        </div>

        <div className=&quot;max-w-6xl mx-auto text-center relative z-10&quot;>
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=&quot;inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-lg&quot;
          >
            <Sparkles className=&quot;w-4 h-4 md:w-5 md:h-5&quot; />
            <span className=&quot;font-semibold text-sm md:text-base&quot;>Coming Q4 2025 • Limited Early Access</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=&quot;text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-4 md:mb-6 leading-tight&quot;
          >
            Egypt&apos;s Market Intelligence
            <span className=&quot;block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1 md:mt-2&quot;>
              Platform
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className=&quot;text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4&quot;
          >
            The first <span className=&quot;font-bold text-blue-600&quot;>centralized data room</span> for Egypt&apos;s private sector. 
            <br className=&quot;hidden sm:block&quot; />Real-time insights, AI-powered analysis, and comprehensive market intelligence.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className=&quot;grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto&quot;
          >
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2&quot;>5M+</div>
              <div className=&quot;text-gray-600 font-medium text-sm md:text-base&quot;>Data Points</div>
            </div>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2&quot;>8</div>
              <div className=&quot;text-gray-600 font-medium text-sm md:text-base&quot;>Sectors</div>
            </div>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2&quot;>500+</div>
              <div className=&quot;text-gray-600 font-medium text-sm md:text-base&quot;>Early Users</div>
            </div>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2&quot;>24/7</div>
              <div className=&quot;text-gray-600 font-medium text-sm md:text-base&quot;>Updates</div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className=&quot;space-y-4 md:space-y-6&quot;
          >
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className=&quot;bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 md:px-16 py-4 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 w-full sm:w-auto&quot;
            >
              Get Early Access Now
            </button>
            <p className=&quot;text-gray-500 text-sm md:text-lg px-4&quot;>Join 500+ founders, investors, and policymakers already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id=&quot;features&quot; className=&quot;py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white&quot;>
        <div className=&quot;max-w-6xl mx-auto&quot;>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=&quot;text-center mb-12 md:mb-16&quot;
          >
            <h2 className=&quot;text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6&quot;>Powerful Features</h2>
            <p className=&quot;text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4&quot;>
              Everything you need to make data-driven decisions for Egypt&apos;s market
            </p>
          </motion.div>

          <div className=&quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8&quot;>
            {[
              {
                icon: BarChart3,
                title: &quot;Live Dashboards&quot;,
                description: &quot;Real-time data across 8 sectors with interactive visualizations&quot;,
                color: &quot;from-blue-500 to-blue-600&quot;
              },
              {
                icon: Brain,
                title: &quot;AI Assistant&quot;,
                description: &quot;Ask questions in natural language and get instant insights&quot;,
                color: &quot;from-purple-500 to-purple-600&quot;
              },
              {
                icon: Map,
                title: &quot;Economic Maps&quot;,
                description: &quot;Interactive GIS maps showing economic activity across Egypt&quot;,
                color: &quot;from-green-500 to-green-600&quot;
              },
              {
                icon: Globe,
                title: &quot;Trade Flows&quot;,
                description: &quot;Live trade data and import/export analytics&quot;,
                color: &quot;from-orange-500 to-orange-600&quot;
              },
              {
                icon: TrendingUp,
                title: &quot;Benchmarking&quot;,
                description: &quot;Compare performance against industry standards&quot;,
                color: &quot;from-red-500 to-red-600&quot;
              },
              {
                icon: Shield,
                title: &quot;Secure Access&quot;,
                description: &quot;Enterprise-grade security with role-based permissions&quot;,
                color: &quot;from-indigo-500 to-indigo-600&quot;
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className=&quot;bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group&quot;
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className=&quot;w-8 h-8 text-white&quot; />
                </div>
                <h3 className=&quot;text-xl font-bold text-gray-900 mb-4&quot;>{feature.title}</h3>
                <p className=&quot;text-gray-600 leading-relaxed&quot;>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className=&quot;py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50&quot;>
        <div className=&quot;max-w-4xl mx-auto text-center&quot;>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className=&quot;text-4xl font-bold text-gray-900 mb-6&quot;>The Problem We&apos;re Solving</h2>
            <p className=&quot;text-xl text-gray-600 mb-12 max-w-3xl mx-auto&quot;>
              Egypt&apos;s market data is scattered across 30+ agencies, outdated, and inaccessible to the private sector.
            </p>
            
            <div className=&quot;grid md:grid-cols-3 gap-8 mb-12&quot;>
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <div className=&quot;w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <BarChart3 className=&quot;w-6 h-6 text-red-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>Fragmented Data</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>Scattered across 30+ agencies</p>
              </div>
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <div className=&quot;w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <Wrench className=&quot;w-6 h-6 text-red-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>Outdated Information</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>Only PDFs and static tables</p>
              </div>
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <div className=&quot;w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <Users className=&quot;w-6 h-6 text-red-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>No Unified Source</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>Everyone operates in silos</p>
              </div>
            </div>

            <div className=&quot;bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-500&quot;>
              <p className=&quot;text-gray-700 text-xl font-medium mb-4&quot;>
                &quot;We need a single source of truth for Egypt&apos;s market intelligence.&quot;
              </p>
              <p className=&quot;text-gray-500&quot;>— Founders, VCs, and Policymakers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id=&quot;about&quot; className=&quot;py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50&quot;>
        <div className=&quot;max-w-6xl mx-auto&quot;>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=&quot;text-center mb-16&quot;
          >
            <h2 className=&quot;text-5xl font-bold text-gray-900 mb-6&quot;>About Arqam</h2>
            <p className=&quot;text-xl text-gray-600 max-w-3xl mx-auto&quot;>
              Built by Egypt&apos;s leading data company, Entlaq
            </p>
          </motion.div>

          <div className=&quot;grid lg:grid-cols-2 gap-12 items-center&quot;>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className=&quot;bg-white rounded-3xl p-8 shadow-xl&quot;>
                <div className=&quot;flex items-center space-x-4 mb-6&quot;>
                  <div className=&quot;w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center&quot;>
                    <span className=&quot;text-white font-bold text-2xl&quot;>q</span>
                  </div>
                  <div>
                    <h3 className=&quot;text-2xl font-bold text-gray-900&quot;>Entlaq</h3>
                    <p className=&quot;text-gray-600&quot;>Egypt&apos;s Leading Data Company</p>
                  </div>
                </div>
                <p className=&quot;text-gray-700 text-lg leading-relaxed mb-6&quot;>
                  With years of experience in data collection, analysis, and visualization, 
                  Entlaq is uniquely positioned to create Egypt&apos;s first centralized market intelligence platform.
                </p>
                <div className=&quot;grid grid-cols-2 gap-4&quot;>
                  <div className=&quot;text-center&quot;>
                    <div className=&quot;text-3xl font-bold text-blue-600 mb-1&quot;>5+</div>
                    <div className=&quot;text-gray-600 text-sm&quot;>Years Experience</div>
                  </div>
                  <div className=&quot;text-center&quot;>
                    <div className=&quot;text-3xl font-bold text-blue-600 mb-1&quot;>100+</div>
                    <div className=&quot;text-gray-600 text-sm&quot;>Data Sources</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className=&quot;space-y-6&quot;
            >
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <h4 className=&quot;font-bold text-gray-900 mb-3 flex items-center&quot;>
                  <CheckCircle className=&quot;w-5 h-5 text-green-500 mr-2&quot; />
                  Our Mission
                </h4>
                <p className=&quot;text-gray-600&quot;>
                  Democratize access to Egypt&apos;s market data and empower decision-makers with real-time insights.
                </p>
              </div>
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <h4 className=&quot;font-bold text-gray-900 mb-3 flex items-center&quot;>
                  <CheckCircle className=&quot;w-5 h-5 text-green-500 mr-2&quot; />
                  Our Vision
                </h4>
                <p className=&quot;text-gray-600&quot;>
                  Become the single source of truth for Egypt&apos;s market intelligence and economic data.
                </p>
              </div>
              <div className=&quot;bg-white rounded-2xl p-6 shadow-lg&quot;>
                <h4 className=&quot;font-bold text-gray-900 mb-3 flex items-center&quot;>
                  <CheckCircle className=&quot;w-5 h-5 text-green-500 mr-2&quot; />
                  Our Values
                </h4>
                <p className=&quot;text-gray-600&quot;>
                  Transparency, accuracy, and accessibility in everything we do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id=&quot;contact&quot; className=&quot;py-20 px-4 sm:px-6 lg:px-8 bg-white&quot;>
        <div className=&quot;max-w-4xl mx-auto text-center&quot;>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className=&quot;text-5xl font-bold text-gray-900 mb-6&quot;>Get in Touch</h2>
            <p className=&quot;text-xl text-gray-600 mb-12 max-w-2xl mx-auto&quot;>
              Have questions about Arqam? We'd love to hear from you.
            </p>

            <div className=&quot;grid md:grid-cols-3 gap-8&quot;>
              <div className=&quot;bg-gray-50 rounded-2xl p-8&quot;>
                <div className=&quot;w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <User className=&quot;w-6 h-6 text-blue-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>General Inquiries</h3>
                <p className=&quot;text-gray-600 text-sm mb-4&quot;>Questions about features or pricing</p>
                <a href=&quot;mailto:hello@arqam.ai&quot; className=&quot;text-blue-600 font-medium hover:text-blue-700&quot;>
                  hello@arqam.ai
                </a>
              </div>

              <div className=&quot;bg-gray-50 rounded-2xl p-8&quot;>
                <div className=&quot;w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <Rocket className=&quot;w-6 h-6 text-green-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>Early Access</h3>
                <p className=&quot;text-gray-600 text-sm mb-4&quot;>Priority access and updates</p>
                <a href=&quot;mailto:early@arqam.ai&quot; className=&quot;text-green-600 font-medium hover:text-green-700&quot;>
                  early@arqam.ai
                </a>
              </div>

              <div className=&quot;bg-gray-50 rounded-2xl p-8&quot;>
                <div className=&quot;w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4&quot;>
                  <Users className=&quot;w-6 h-6 text-purple-600&quot; />
                </div>
                <h3 className=&quot;font-bold text-gray-900 mb-2&quot;>Partnerships</h3>
                <p className=&quot;text-gray-600 text-sm mb-4&quot;>Data partnerships and integrations</p>
                <a href=&quot;mailto:partners@arqam.ai&quot; className=&quot;text-purple-600 font-medium hover:text-purple-700&quot;>
                  partners@arqam.ai
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signup Section - Enhanced */}
      <section id=&quot;signup&quot; className=&quot;py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100&quot;>
        <div className=&quot;max-w-2xl mx-auto text-center&quot;>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className=&quot;bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12&quot;>
              <h2 className=&quot;text-3xl md:text-4xl font-bold text-gray-900 mb-4&quot;>Get Early Access</h2>
              <p className=&quot;text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4&quot;>
                Join 500+ founders, investors, and policymakers already on the waitlist
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className=&quot;bg-green-50 border border-green-200 rounded-2xl p-8&quot;
                >
                  <CheckCircle className=&quot;w-16 h-16 text-green-500 mx-auto mb-4&quot; />
                  <h3 className=&quot;text-2xl font-bold text-green-900 mb-2&quot;>You're in!</h3>
                  <p className=&quot;text-green-700&quot;>We'll notify you when early access opens.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className=&quot;space-y-4 md:space-y-6&quot;>
                  <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-4&quot;>
                    <input
                      type=&quot;text&quot;
                      name=&quot;name&quot;
                      placeholder=&quot;Full Name&quot;
                      value={formData.name}
                      onChange={handleInputChange}
                      className=&quot;w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white&quot;
                    />
                    <input
                      type=&quot;email&quot;
                      name=&quot;email&quot;
                      placeholder=&quot;Email Address&quot;
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className=&quot;w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white&quot;
                    />
                  </div>
                  
                  <select
                    name=&quot;role&quot;
                    value={formData.role}
                    onChange={handleInputChange}
                    className=&quot;w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 bg-white&quot;
                  >
                    <option value=&quot;Founder&quot;>Founder</option>
                    <option value=&quot;Government&quot;>Government Official</option>
                    <option value=&quot;Researcher&quot;>Researcher</option>
                    <option value=&quot;Investor&quot;>Investor</option>
                    <option value=&quot;Other&quot;>Other</option>
                  </select>
                  
                  <textarea
                    name=&quot;notes&quot;
                    placeholder=&quot;What are you most excited about? (optional)&quot;
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className=&quot;w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white&quot;
                  />
                  
                  <button
                    type=&quot;submit&quot;
                    className=&quot;w-full bg-blue-600 text-white px-6 md:px-8 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1&quot;
                  >
                    Join the Waitlist
                  </button>
                  
                  <p className=&quot;text-xs md:text-sm text-gray-500 px-4&quot;>
                    Free early access • No spam • Unsubscribe anytime
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className=&quot;bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;max-w-6xl mx-auto&quot;>
          <div className=&quot;flex flex-col md:flex-row justify-between items-center&quot;>
            <div className=&quot;flex items-center space-x-2 mb-4 md:mb-0&quot;>
              <div className=&quot;w-8 h-8 bg-white rounded-lg flex items-center justify-center&quot;>
                <span className=&quot;text-blue-900 font-bold text-sm&quot;>q</span>
              </div>
              <span className=&quot;text-xl font-bold&quot;>Arqam by Entlaq</span>
            </div>
            <div className=&quot;text-center md:text-right&quot;>
              <p className=&quot;text-blue-200 mb-2&quot;>© 2025 Arqam by Entlaq. All rights reserved.</p>
              <div className=&quot;flex justify-center md:justify-end space-x-6 text-sm&quot;>
                <a href=&quot;#&quot; className=&quot;text-blue-200 hover:text-white transition-colors&quot;>Privacy Policy</a>
                <a href=&quot;#&quot; className=&quot;text-blue-200 hover:text-white transition-colors&quot;>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Help Button */}
      <button className=&quot;fixed bottom-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors duration-200&quot;>
        <span className=&quot;text-lg&quot;>?</span>
      </button>
    </div>
  );
}