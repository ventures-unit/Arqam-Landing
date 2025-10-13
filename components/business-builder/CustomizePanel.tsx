'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { RotateCcw, Save, AlertCircle } from 'lucide-react'
import type { BusinessTemplate } from '@/lib/data/businessTemplates'

interface CustomizePanelProps {
  template: BusinessTemplate
  assumptions: any
  onUpdate: (assumptions: any) => void
}

export function CustomizePanel({ template, assumptions, onUpdate }: CustomizePanelProps) {
  const [localAssumptions, setLocalAssumptions] = useState(assumptions)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (key: string, value: any) => {
    setLocalAssumptions((prev: any) => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    onUpdate(localAssumptions)
    setHasChanges(false)
  }

  const handleReset = () => {
    setLocalAssumptions(template.assumptions)
    setHasChanges(false)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Customize Your Plan</h2>
            <p className="text-sm text-gray-600 mt-1">
              Adjust assumptions to match your specific business scenario
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge className="h-6 bg-orange-100 text-orange-700 border-0">
                Unsaved changes
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={handleReset} disabled={!hasChanges}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset to Default
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Pricing Strategy</h3>
          <div className="space-y-4">
            {Object.entries(localAssumptions.pricing).map(([key, value]: [string, any]) => {
              const [min, max] = Array.isArray(value) ? value : [value, value]
              return (
                <div key={key}>
                  <Label className="text-xs text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')} (EGP)
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <Input
                      type="number"
                      value={min}
                      onChange={(e) => {
                        const newValue = Array.isArray(value)
                          ? [Number(e.target.value), max]
                          : Number(e.target.value)
                        handleChange('pricing', {
                          ...localAssumptions.pricing,
                          [key]: newValue
                        })
                      }}
                      className="h-8 text-sm"
                      placeholder="Min"
                    />
                    <Input
                      type="number"
                      value={max}
                      onChange={(e) => {
                        const newValue = Array.isArray(value)
                          ? [min, Number(e.target.value)]
                          : Number(e.target.value)
                        handleChange('pricing', {
                          ...localAssumptions.pricing,
                          [key]: newValue
                        })
                      }}
                      className="h-8 text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Operating Costs */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Operating Costs</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-gray-700">Labor Cost (EGP/month)</Label>
              <Input
                type="number"
                value={localAssumptions.labor_month}
                onChange={(e) => handleChange('labor_month', Number(e.target.value))}
                className="h-8 text-sm mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-700">Energy Cost (EGP/month)</Label>
              <Input
                type="number"
                value={localAssumptions.energy_month}
                onChange={(e) => handleChange('energy_month', Number(e.target.value))}
                className="h-8 text-sm mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-700">Rent - Prime (EGP/m²)</Label>
              <Input
                type="number"
                value={localAssumptions.rent_m2.prime}
                onChange={(e) => handleChange('rent_m2', {
                  ...localAssumptions.rent_m2,
                  prime: Number(e.target.value)
                })}
                className="h-8 text-sm mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-700">Rent - Secondary (EGP/m²)</Label>
              <Input
                type="number"
                value={localAssumptions.rent_m2.secondary}
                onChange={(e) => handleChange('rent_m2', {
                  ...localAssumptions.rent_m2,
                  secondary: Number(e.target.value)
                })}
                className="h-8 text-sm mt-1.5"
              />
            </div>

            {localAssumptions.cogs_percentage && (
              <div>
                <Label className="text-xs text-gray-700">COGS Percentage</Label>
                <div className="flex items-center gap-3 mt-1.5">
                  <Slider
                    value={[localAssumptions.cogs_percentage * 100]}
                    onValueChange={(value) => handleChange('cogs_percentage', value[0] / 100)}
                    max={80}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold text-gray-900 w-12">
                    {(localAssumptions.cogs_percentage * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Space & Investment */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Space & Investment</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-gray-700">Space Required (m²)</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <Input
                  type="number"
                  value={localAssumptions.space_m2_required[0]}
                  onChange={(e) => handleChange('space_m2_required', [
                    Number(e.target.value),
                    localAssumptions.space_m2_required[1]
                  ])}
                  className="h-8 text-sm"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={localAssumptions.space_m2_required[1]}
                  onChange={(e) => handleChange('space_m2_required', [
                    localAssumptions.space_m2_required[0],
                    Number(e.target.value)
                  ])}
                  className="h-8 text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-700">Initial Investment (EGP)</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <Input
                  type="number"
                  value={localAssumptions.initial_investment[0]}
                  onChange={(e) => handleChange('initial_investment', [
                    Number(e.target.value),
                    localAssumptions.initial_investment[1]
                  ])}
                  className="h-8 text-sm"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={localAssumptions.initial_investment[1]}
                  onChange={(e) => handleChange('initial_investment', [
                    localAssumptions.initial_investment[0],
                    Number(e.target.value)
                  ])}
                  className="h-8 text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-700">Equipment Cost (EGP)</Label>
              <Input
                type="number"
                value={localAssumptions.equipment_cost}
                onChange={(e) => handleChange('equipment_cost', Number(e.target.value))}
                className="h-8 text-sm mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Score Weights */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Entry Score Weights</h3>
          <p className="text-xs text-gray-600 mb-4">
            Adjust importance of each factor in your entry decision
          </p>
          <div className="space-y-3">
            {Object.entries(template.weights).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </Label>
                  <span className="text-xs font-semibold text-gray-900">
                    {(value * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[value * 100]}
                  onValueChange={(newValue) => {
                    // This would need to be properly implemented with weight balancing
                    console.log('Weight change:', key, newValue)
                  }}
                  max={50}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800">
                Weights must sum to 100%. Adjusting one factor will redistribute others proportionally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Customization Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>• <strong>Pricing:</strong> Set competitive ranges based on local market research</li>
          <li>• <strong>Labor:</strong> Adjust based on skill level and market rates in your area</li>
          <li>• <strong>Rent:</strong> Prime = high-traffic locations, Secondary = residential/suburban</li>
          <li>• <strong>Weights:</strong> Emphasize factors most critical to your business success</li>
        </ul>
      </div>
    </div>
  )
}
