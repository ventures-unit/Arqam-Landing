'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  Database, 
  Map, 
  Globe, 
  Wrench, 
  ChevronDown,
  Rocket,
  User,
  BarChart3,
  Brain,
  Users,
  TrendingUp,
  Shield,
  Zap,
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
    
    // Basic validation
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
      
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">q</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-blue-900">arqam</span>
            </div>

            {/* Desktop Navigation - Absolutely Centered */}
            <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
              >
                Register for Early Access
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Contact
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors mt-2"
                >
                  Register for Early Access
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Elements - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-10"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-sm md:text-base">Coming Q4 2025 • Limited Early Access</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-4 md:mb-6 leading-tight"
          >
            Egypt's Market Intelligence
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1 md:mt-2">
              Platform
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
          >
            The first <span className="font-bold text-blue-600">centralized data room</span> for Egypt's private sector. 
            <br className="hidden sm:block" />Real-time insights, AI-powered analysis, and comprehensive market intelligence.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">5M+</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">8</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">500+</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Early Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">24/7</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Updates</div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 md:px-16 py-4 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 w-full sm:w-auto"
            >
              Get Early Access Now
            </button>
            <p className="text-gray-500 text-sm md:text-lg px-4">Join 500+ founders, investors, and policymakers already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Powerful Features</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Everything you need to make data-driven decisions for Egypt's market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: BarChart3,
                title: "Live Dashboards",
                description: "Real-time data across 8 sectors with interactive visualizations",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Brain,
                title: "AI Assistant",
                description: "Ask questions in natural language and get instant insights",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Map,
                title: "Economic Maps",
                description: "Interactive GIS maps showing economic activity across Egypt",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Globe,
                title: "Trade Flows",
                description: "Live trade data and import/export analytics",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: TrendingUp,
                title: "Benchmarking",
                description: "Compare performance against industry standards",
                color: "from-red-500 to-red-600"
              },
              {
                icon: Shield,
                title: "Secure Access",
                description: "Enterprise-grade security with role-based permissions",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problem We're Solving</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Egypt's market data is scattered across 30+ agencies, outdated, and inaccessible to the private sector.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fragmented Data</h3>
                <p className="text-gray-600 text-sm">Scattered across 30+ agencies</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Outdated Information</h3>
                <p className="text-gray-600 text-sm">Only PDFs and static tables</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No Unified Source</h3>
                <p className="text-gray-600 text-sm">Everyone operates in silos</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-500">
              <p className="text-gray-700 text-xl font-medium mb-4">
                "We need a single source of truth for Egypt's market intelligence."
              </p>
              <p className="text-gray-500">— Founders, VCs, and Policymakers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">About Arqam</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by Egypt's leading data company, Entlaq
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">q</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Entlaq</h3>
                    <p className="text-gray-600">Egypt's Leading Data Company</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  With years of experience in data collection, analysis, and visualization, 
                  Entlaq is uniquely positioned to create Egypt's first centralized market intelligence platform.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">5+</div>
                    <div className="text-gray-600 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                    <div className="text-gray-600 text-sm">Data Sources</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Our Mission
                </h4>
                <p className="text-gray-600">
                  Democratize access to Egypt's market data and empower decision-makers with real-time insights.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Our Vision
                </h4>
                <p className="text-gray-600">
                  Become the single source of truth for Egypt's market intelligence and economic data.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Our Values
                </h4>
                <p className="text-gray-600">
                  Transparency, accuracy, and accessibility in everything we do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Have questions about Arqam? We'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-gray-600 text-sm mb-4">Questions about features or pricing</p>
                <a href="mailto:hello@arqam.ai" className="text-blue-600 font-medium hover:text-blue-700">
                  hello@arqam.ai
                </a>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Early Access</h3>
                <p className="text-gray-600 text-sm mb-4">Priority access and updates</p>
                <a href="mailto:early@arqam.ai" className="text-green-600 font-medium hover:text-green-700">
                  early@arqam.ai
                </a>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Partnerships</h3>
                <p className="text-gray-600 text-sm mb-4">Data partnerships and integrations</p>
                <a href="mailto:partners@arqam.ai" className="text-purple-600 font-medium hover:text-purple-700">
                  partners@arqam.ai
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signup Section - Enhanced */}
      <section id="signup" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Early Access</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
                Join 500+ founders, investors, and policymakers already on the waitlist
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">You're in!</h3>
                  <p className="text-green-700">We'll notify you when early access opens.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white"
                    />
                  </div>
                  
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg text-gray-900 bg-white"
                  >
                    <option value="Founder">Founder</option>
                    <option value="Government">Government Official</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Investor">Investor</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <textarea
                    name="notes"
                    placeholder="What are you most excited about? (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base md:text-lg text-gray-900 placeholder-gray-500 bg-white"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 md:px-8 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Join the Waitlist
                  </button>
                  
                  <p className="text-xs md:text-sm text-gray-500 px-4">
                    Free early access • No spam • Unsubscribe anytime
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">q</span>
              </div>
              <span className="text-xl font-bold">Arqam by Entlaq</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 mb-2">© 2025 Arqam by Entlaq. All rights reserved.</p>
              <div className="flex justify-center md:justify-end space-x-6 text-sm">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors duration-200">
        <span className="text-lg">?</span>
      </button>
    </div>
  );
}