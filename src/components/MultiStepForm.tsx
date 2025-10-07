'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { trackFormSubmission, trackInteraction } from '@/lib/monitoring'

interface FormData {
  // Section 1: Personal Information
  fullName: string
  email: string
  mobileNumber: string
  nationality: string
  
  // Section 2: Professional Information
  organizationName: string
  organizationType: string
  organizationTypeOther: string
  positionTitle: string
  
  // Section 3: Data Room Interests & Needs
  interestedSectors: string
  interestedDatasets: string[]
  interestedDatasetsOther: string
  dataUsage: string[]
  dataUsageOther: string
}


const DATASETS = [
  'Startup & funding data',
  'Investor activity & pipeline',
  'Sectoral insights / KPIs',
  'Macroeconomic indicators (inflation, exchange rates, GDP, labor market)',
  'Government services & regulations',
  'Consumer price data (e.g., electronics, automotive, appliances)',
  'Other'
]

const USAGE_TYPES = [
  'Research & analysis',
  'Investment decision-making',
  'Policy development / public strategy',
  'Academic work / teaching',
  'Entrepreneurship / market insights',
  'Other'
]

const ORGANIZATION_TYPES = [
  'Government / Public Sector',
  'Private Sector / Corporate',
  'Startup / Entrepreneur',
  'Academic / University',
  'NGO / Development Agency',
  'Other'
]

interface MultiStepFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
}

export default function MultiStepForm({ onSubmit, isSubmitting }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    nationality: '',
    organizationName: '',
    organizationType: '',
    organizationTypeOther: '',
    positionTitle: '',
    interestedSectors: '',
    interestedDatasets: [],
    interestedDatasetsOther: '',
    dataUsage: [],
    dataUsageOther: ''
  })

  const totalSteps = 3

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: 'interestedDatasets' | 'dataUsage', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep < totalSteps && !isStepValid(currentStep)) {
      // Show user feedback for invalid step
      alert('Please fill in all required fields before proceeding to the next step.')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName.trim() && 
               formData.email.trim() && 
               formData.mobileNumber.trim() && 
               formData.nationality.trim() &&
               formData.email.includes('@') // Basic email validation
      case 2:
        return formData.organizationName.trim() && 
               formData.organizationType && 
               formData.positionTitle.trim() &&
               (formData.organizationType !== 'Other' || formData.organizationTypeOther.trim())
      case 3:
        return formData.interestedSectors.trim() && 
               formData.interestedDatasets.length > 0 && 
               formData.dataUsage.length > 0 &&
               (!formData.interestedDatasets.includes('Other') || formData.interestedDatasetsOther.trim()) &&
               (!formData.dataUsage.includes('Other') || formData.dataUsageOther.trim())
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    console.log('Submit button clicked')
    console.log('Form data:', formData)
    console.log('Step 3 valid:', isStepValid(3))
    
    // Track form submission attempt
    trackInteraction('form_submit_attempt', 'multi_step_form', {
      step: currentStep,
      form_data_keys: Object.keys(formData).join(',')
    })
    
    if (isStepValid(3)) {
      console.log('Submitting form...')
      try {
        await onSubmit(formData)
        // Track successful form submission
        trackFormSubmission('early_access_signup', true)
        trackInteraction('form_submit_success', 'multi_step_form', {
          step: currentStep
        })
      } catch (error) {
        // Track failed form submission
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
        trackFormSubmission('early_access_signup', false, errorMessage)
        trackInteraction('form_submit_error', 'multi_step_form', {
          step: currentStep,
          error: errorMessage
        })
        throw error // Re-throw to let parent handle
      }
    } else {
      console.log('Form validation failed')
      trackInteraction('form_validation_failed', 'multi_step_form', {
        step: currentStep
      })
      alert('Please fill in all required fields before submitting.')
    }
  }

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg form-input-focus text-gray-900 placeholder-gray-500 bg-white"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg form-input-focus text-gray-900 placeholder-gray-500 bg-white"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Mobile Number *</label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg form-input-focus text-gray-900 placeholder-gray-500 bg-white"
            placeholder="+20 123 456 7890"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Nationality *</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg form-input-focus text-gray-900 placeholder-gray-500 bg-white"
            placeholder="Enter your nationality"
            required
          />
        </div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Entity / Organization Name *</label>
          <input
            type="text"
            value={formData.organizationName}
            onChange={(e) => handleInputChange('organizationName', e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl form-input-focus text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            placeholder="Enter your organization name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Type of Organization *</label>
          <select
            value={formData.organizationType}
            onChange={(e) => handleInputChange('organizationType', e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl form-input-focus text-gray-900 bg-white shadow-sm"
            required
          >
            <option value="">Select organization type</option>
            {ORGANIZATION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {formData.organizationType === 'Other' && (
            <input
              type="text"
              value={formData.organizationTypeOther}
              onChange={(e) => handleInputChange('organizationTypeOther', e.target.value)}
              className="w-full mt-3 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-gray-400 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Position / Job Title *</label>
          <input
            type="text"
            value={formData.positionTitle}
            onChange={(e) => handleInputChange('positionTitle', e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl form-input-focus text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            placeholder="e.g., Data Analyst, Business Analyst, Research Fellow, Policy Advisor, Investor, Founder/Co-founder, Program Manager, Senior Associate"
            required
          />
        </div>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">What types of data or areas are you most interested in exploring? *</label>
          <p className="text-sm text-gray-600 mb-4">(For example: macroeconomic data, market data, FDI trends, startup and investment insights, FinTech & digital finance, Cleantech, labor market, trade, or regulatory data.)</p>
          <textarea
            value={formData.interestedSectors}
            onChange={(e) => handleInputChange('interestedSectors', e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-gray-400 text-gray-900 placeholder-gray-500 bg-white shadow-sm resize-none"
            placeholder="Please describe the types of data or areas you're most interested in exploring..."
            rows={4}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-4">Which types of data sets are you most interested in? *</label>
          <div className="grid grid-cols-1 gap-3">
            {DATASETS.map(dataset => (
              <label key={dataset} className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 cursor-pointer transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1f3872'
                e.currentTarget.style.backgroundColor = '#f8fafc'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              >
                <input
                  type="checkbox"
                  checked={formData.interestedDatasets.includes(dataset)}
                  onChange={() => handleMultiSelect('interestedDatasets', dataset)}
                  className="w-5 h-5 border-gray-300 rounded focus:ring-2 mt-1"
                  style={{ 
                    accentColor: '#1f3872',
                    '--tw-ring-color': '#1f3872'
                  } as React.CSSProperties}
                />
                <span className="text-sm font-medium text-gray-800">{dataset}</span>
              </label>
            ))}
          </div>
          {formData.interestedDatasets.includes('Other') && (
            <input
              type="text"
              value={formData.interestedDatasetsOther}
              onChange={(e) => handleInputChange('interestedDatasetsOther', e.target.value)}
              className="w-full mt-4 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-gray-400 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify other datasets"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-4">How do you plan to use the data? *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USAGE_TYPES.map(usage => (
              <label key={usage} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 cursor-pointer transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1f3872'
                e.currentTarget.style.backgroundColor = '#f8fafc'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              >
                <input
                  type="checkbox"
                  checked={formData.dataUsage.includes(usage)}
                  onChange={() => handleMultiSelect('dataUsage', usage)}
                  className="w-5 h-5 border-gray-300 rounded focus:ring-2"
                  style={{ 
                    accentColor: '#1f3872',
                    '--tw-ring-color': '#1f3872'
                  } as React.CSSProperties}
                />
                <span className="text-sm font-medium text-gray-800">{usage}</span>
              </label>
            ))}
          </div>
          {formData.dataUsage.includes('Other') && (
            <input
              type="text"
              value={formData.dataUsageOther}
              onChange={(e) => handleInputChange('dataUsageOther', e.target.value)}
              className="w-full mt-4 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-gray-400 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify other usage"
            />
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      {/* Progress Sections */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
              style={step <= currentStep ? { backgroundColor: '#1f3872' } : {}}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? '' : 'bg-gray-200'
                }`}
                style={step < currentStep ? { backgroundColor: '#1f3872' } : {}}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-lg font-semibold text-gray-800">
            {currentStep === 1 && 'Personal Information'}
            {currentStep === 2 && 'Professional Information'}
            {currentStep === 3 && 'Data Room Interests'}
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[350px] py-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-2 sm:gap-4 mt-12">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-8 py-3 sm:py-4 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm sm:text-base flex-1 sm:flex-none"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-8 py-3 sm:py-4 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base flex-1 sm:flex-none"
            style={{ backgroundColor: '#1f3872' }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1a2f5f'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1f3872'}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isStepValid(3) || isSubmitting}
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-10 py-3 sm:py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base flex-1 sm:flex-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Submit</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
