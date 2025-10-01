'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

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
  interestedSectors: string[]
  interestedSectorsOther: string
  interestedDatasets: string[]
  interestedDatasetsOther: string
  dataUsage: string[]
  dataUsageOther: string
}

const SECTORS = [
  'FinTech',
  'AgriTech', 
  'HealthTech',
  'EdTech',
  'Tourism',
  'Cleantech / Renewable Energy',
  'AI / DeepTech',
  'Other'
]

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
    interestedSectors: [],
    interestedSectorsOther: '',
    interestedDatasets: [],
    interestedDatasetsOther: '',
    dataUsage: [],
    dataUsageOther: ''
  })

  const totalSteps = 3

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: 'interestedSectors' | 'interestedDatasets' | 'dataUsage', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
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
        return formData.fullName && formData.email && formData.mobileNumber && formData.nationality
      case 2:
        return formData.organizationName && formData.organizationType && formData.positionTitle &&
               (formData.organizationType !== 'Other' || formData.organizationTypeOther)
      case 3:
        return formData.interestedSectors.length > 0 && formData.interestedDatasets.length > 0 && formData.dataUsage.length > 0 &&
               (!formData.interestedSectors.includes('Other') || formData.interestedSectorsOther) &&
               (!formData.interestedDatasets.includes('Other') || formData.interestedDatasetsOther) &&
               (!formData.dataUsage.includes('Other') || formData.dataUsageOther)
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    console.log('Submit button clicked')
    console.log('Form data:', formData)
    console.log('Step 3 valid:', isStepValid(3))
    
    if (isStepValid(3)) {
      console.log('Submitting form...')
      await onSubmit(formData)
    } else {
      console.log('Form validation failed')
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
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
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
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
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
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
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
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
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
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            placeholder="Enter your organization name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Type of Organization *</label>
          <select
            value={formData.organizationType}
            onChange={(e) => handleInputChange('organizationType', e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm"
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
              className="w-full mt-3 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
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
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
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
          <label className="block text-sm font-semibold text-gray-800 mb-4">Which sectors are you most interested in? *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SECTORS.map(sector => (
              <label key={sector} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.interestedSectors.includes(sector)}
                  onChange={() => handleMultiSelect('interestedSectors', sector)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-800">{sector}</span>
              </label>
            ))}
          </div>
          {formData.interestedSectors.includes('Other') && (
            <input
              type="text"
              value={formData.interestedSectorsOther}
              onChange={(e) => handleInputChange('interestedSectorsOther', e.target.value)}
              className="w-full mt-4 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify other sectors"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-4">Which types of data sets are you most interested in? *</label>
          <div className="grid grid-cols-1 gap-3">
            {DATASETS.map(dataset => (
              <label key={dataset} className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.interestedDatasets.includes(dataset)}
                  onChange={() => handleMultiSelect('interestedDatasets', dataset)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
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
              className="w-full mt-4 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify other datasets"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-4">How do you plan to use the data? *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USAGE_TYPES.map(usage => (
              <label key={usage} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.dataUsage.includes(usage)}
                  onChange={() => handleMultiSelect('dataUsage', usage)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
              className="w-full mt-4 px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              placeholder="Please specify other usage"
            />
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Sections */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
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
      <div className="flex justify-between mt-12">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-8 py-4 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isStepValid(3) || isSubmitting}
            className="flex items-center space-x-2 px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
