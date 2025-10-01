
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Sparkles, 
  Map, 
  Globe, 
  Wrench, 
  BarChart3,
  Brain,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import DynamicCounter from '@/components/DynamicCounter';
import MultiStepForm from '@/components/MultiStepForm';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (data: unknown) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Success
      setIsSubmitted(true);
      
    } catch (error: unknown) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image 
          src="/images/arqam-blue.png" 
          alt="Arqam Logo" 
          width={450}
          height={112}
          className="h-24 sm:h-32 md:h-36 lg:h-48 w-auto"
        />
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-lg"
            style={{ willChange: 'opacity, transform' }}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-sm md:text-base">Coming Q4 2025 • Limited Early Access</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 leading-tight px-2"
            style={{ willChange: 'opacity, transform' }}
          >
            Egypt&apos;s Market Intelligence
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1 md:mt-2">
              Platform
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed font-light px-4"
            style={{ willChange: 'opacity, transform' }}
          >
            The first <span className="font-bold text-blue-600">centralized data room</span> for Egypt&apos;s private sector. 
            <br className="hidden sm:block" />Real-time insights, AI-powered analysis, and comprehensive market intelligence.
          </motion.p>

          {/* Early Access Limit Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
            className="mb-8 md:mb-12"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-amber-800 font-semibold text-xs sm:text-sm md:text-base">
                    Early Access Limited to 750 People
                  </span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  <span className="text-amber-700 text-xs sm:text-sm md:text-base">
                    Closing Soon
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mb-8 md:mb-16 max-w-4xl mx-auto px-4"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">5M+</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Data Points</div>
            </div>
            <DynamicCounter />
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">24/7</div>
              <div className="text-gray-600 font-medium text-sm md:text-base">Updates</div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.25, ease: "easeOut" }}
            className="space-y-4 md:space-y-6"
            style={{ willChange: 'opacity, transform' }}
          >
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 md:px-16 py-3 md:py-6 rounded-2xl font-bold text-base md:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 w-full sm:w-auto"
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
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Powerful Features</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Everything you need to make data-driven decisions for Egypt&apos;s market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: BarChart3,
                title: "Live Dashboards",
                description: "Real-time data with interactive visualizations",
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                style={{ willChange: 'opacity, transform' }}
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
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problem We&apos;re Solving</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Egypt&apos;s market data is scattered across 30+ agencies, outdated, and inaccessible to the private sector.
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
                &quot;We need a single source of truth for Egypt&apos;s market intelligence.&quot;
              </p>
              <p className="text-gray-500">— Founders, VCs, and Policymakers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Foundations Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8 px-8 py-4">
              Strategic Foundations
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-8 py-2">
              The core principles that drive our mission to transform Egypt&apos;s data landscape
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission & Vision */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Our mission is to bridge Egypt&apos;s data gaps by building a high-integrity platform that delivers timely datasets. We empower policymakers, researchers, entrepreneurs, and development partners with the information they need to drive inclusive growth, innovation, and evidence-based decision-making.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To establish a trusted, AI-powered data room that curates, structures, and delivers actionable insights across entrepreneurship, investment, and economic development in Egypt by centralizing access to verified, cross-referenced knowledge.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Goal & Objective */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Goal</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Create a centralized, AI-powered platform that transforms Egypt&apos;s fragmented data landscape into a unified, accessible, and actionable intelligence system for all stakeholders in the economic ecosystem.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">O</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Objective</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Deliver real-time, verified market intelligence that enables data-driven decisions, fosters collaboration across sectors, and accelerates Egypt&apos;s economic development through comprehensive data accessibility and AI-powered insights.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Signup Section - Multi-Step Form */}
      <section id="signup" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get Early Access</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the waitlist and be among the first to access Egypt&apos;s most comprehensive market intelligence platform
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-green-900 mb-4">Application Submitted!</h3>
              <p className="text-xl text-green-700 mb-6">
                Thank you for your interest in Arqam. We&apos;ll review your application and notify you when early access opens.
              </p>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 text-center">{error}</p>
                </div>
              )}
              <MultiStepForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image 
                src="/images/arqam-white.png" 
                alt="Arqam Logo" 
                width={320}
                height={80}
                className="h-80 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 mb-2">© 2025 Arqam. All rights reserved.</p>
              <div className="flex justify-center md:justify-end space-x-6 text-sm">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}