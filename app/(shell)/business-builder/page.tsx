'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Check, ChevronLeft, ChevronRight, Save, Share2, Download } from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { BusinessSelector } from '@/components/business-builder/BusinessSelector'
import { ReviewDashboard } from '@/components/business-builder/ReviewDashboard'
import { CustomizePanel } from '@/components/business-builder/CustomizePanel'
import { useGeographic } from '@/lib/contexts/GeographicContext'
import type { BusinessArchetype } from '@/lib/data/businessArchetypes'
import type { BusinessTemplate } from '@/lib/data/businessTemplates'

type WizardStep = 'select' | 'review' | 'customize'

export default function BusinessBuilderPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<WizardStep>('select')
  const [selectedArchetype, setSelectedArchetype] = useState<BusinessArchetype | null>(null)
  const [loadedTemplate, setLoadedTemplate] = useState<BusinessTemplate | null>(null)
  const [customAssumptions, setCustomAssumptions] = useState<any>(null)

  const { country, governorate } = useGeographic()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleBusinessSelect = (archetype: BusinessArchetype, template: BusinessTemplate) => {
    setSelectedArchetype(archetype)
    setLoadedTemplate(template)
    setCustomAssumptions(template.assumptions)
    setCurrentStep('review')
  }

  const handleBack = () => {
    if (currentStep === 'review') setCurrentStep('select')
    if (currentStep === 'customize') setCurrentStep('review')
  }

  const handleNext = () => {
    if (currentStep === 'select') setCurrentStep('review')
    if (currentStep === 'review') setCurrentStep('customize')
  }

  const handleSavePlan = () => {
    console.log('Save plan:', {
      archetype: selectedArchetype,
      template: loadedTemplate,
      assumptions: customAssumptions
    })
    // TODO: API call to save plan
  }

  if (isLoading) return <PageSkeleton />

  const steps = [
    { key: 'select', label: 'Select Business', completed: currentStep !== 'select' },
    { key: 'review', label: 'Review Plan', completed: currentStep === 'customize' },
    { key: 'customize', label: 'Customize', completed: false }
  ]

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Wizard Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Business Builder</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Create a data-driven business plan in minutes
              </p>
            </div>

            {selectedArchetype && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSavePlan}>
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                  Save Plan
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export PDF
                </Button>
              </div>
            )}
          </div>

          {/* Wizard Steps */}
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                      currentStep === step.key
                        ? 'bg-blue-600 text-white'
                        : step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      currentStep === step.key ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>

          {/* Selected Business Info */}
          {selectedArchetype && (
            <div className="mt-3 flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">{selectedArchetype.name}</span>
                  <span className="text-xs text-gray-500">/</span>
                  <span className="text-xs text-gray-600">{selectedArchetype.nameAr}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge className="h-4 text-[9px] bg-blue-100 text-blue-700 border-0">
                    {selectedArchetype.sector}
                  </Badge>
                  <Badge className="h-4 text-[9px] bg-gray-100 text-gray-700 border-0">
                    ISIC {selectedArchetype.isic_code}
                  </Badge>
                  {loadedTemplate && (
                    <Badge className="h-4 text-[9px] bg-green-100 text-green-700 border-0">
                      Verified {loadedTemplate.last_verified}
                    </Badge>
                  )}
                </div>
              </div>
              {country && (
                <span className="text-xs text-gray-600">
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                  {governorate && ` / ${governorate.charAt(0).toUpperCase() + governorate.slice(1)}`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-auto p-6">
          {currentStep === 'select' && (
            <BusinessSelector onSelect={handleBusinessSelect} />
          )}

          {currentStep === 'review' && loadedTemplate && (
            <ReviewDashboard
              archetype={selectedArchetype!}
              template={loadedTemplate}
            />
          )}

          {currentStep === 'customize' && loadedTemplate && (
            <CustomizePanel
              template={loadedTemplate}
              assumptions={customAssumptions}
              onUpdate={setCustomAssumptions}
            />
          )}
        </div>

        {/* Footer Navigation */}
        {selectedArchetype && (
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 'select'}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="text-sm text-gray-600">
              Step {steps.findIndex(s => s.key === currentStep) + 1} of {steps.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === 'customize'}
            >
              {currentStep === 'review' ? 'Customize Plan' : 'Continue'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
