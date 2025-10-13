export interface BusinessTemplate {
  id: string
  archetype_id: string
  country: string
  last_verified: string
  assumptions: {
    pricing: Record<string, [number, number]>
    cogs_per_unit?: number
    cogs_percentage?: number
    labor_month: number
    rent_m2: { prime: number; secondary: number }
    energy_month: number
    space_m2_required: [number, number]
    initial_investment: [number, number]
    equipment_cost: number
  }
  market: {
    tam_range_local_b: [number, number]
    market_growth_rate: number
    delivery_share?: number
    avg_transaction: [number, number]
    customer_freq_per_month: [number, number]
    target_customers: string[]
  }
  competition: {
    intl: string[]
    local: string[]
    market_concentration: 'low' | 'medium' | 'high'
  }
  regulatory: {
    permits: string[]
    fees_range: [number, number]
    sla_days: number
    difficulty: 'easy' | 'medium' | 'hard'
  }
  supply_inputs: Record<string, any>
  risk_rules: Array<{
    key: string
    severity: 'low' | 'med' | 'high'
    likelihood: 'low' | 'med' | 'high'
    description: string
  }>
  weights: {
    regulatory: number
    market: number
    competition: number
    cost: number
    talent: number
    finance: number
  }
}

export interface GeoOverride {
  template_id: string
  geo_id: string
  city_name: string
  overrides: {
    rent_m2?: { prime: number; secondary: number }
    labor_month?: number
    energy_month?: number
    demand_index?: number
    traffic_index?: number
  }
}

export const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  // PIZZA SHOP - EGYPT
  {
    id: 'pizza_shop_eg',
    archetype_id: 'pizza_shop',
    country: 'egypt',
    last_verified: '2025-09-15',
    assumptions: {
      pricing: {
        small: [120, 180],
        medium: [180, 280],
        large: [280, 450]
      },
      cogs_per_unit: 15,
      labor_month: 12000,
      rent_m2: { prime: 1800, secondary: 1000 },
      energy_month: 2500,
      space_m2_required: [40, 80],
      initial_investment: [250000, 500000],
      equipment_cost: 150000
    },
    market: {
      tam_range_local_b: [25, 30],
      market_growth_rate: 0.08,
      delivery_share: 0.4,
      avg_transaction: [180, 250],
      customer_freq_per_month: [2, 3],
      target_customers: ['Families', 'Young adults', 'Students']
    },
    competition: {
      intl: ['Pizza Hut', 'Domino\'s', 'Papa John\'s'],
      local: ['Maestro Pizza', 'Pizza Master', 'Al Kabir'],
      market_concentration: 'medium'
    },
    regulatory: {
      permits: ['NFSA Food License', 'Commercial Registry', 'Tax Card', 'Health Permit'],
      fees_range: [5000, 15000],
      sla_days: 30,
      difficulty: 'medium'
    },
    supply_inputs: {
      wheat_availability: 'high',
      dairy_availability: 'high',
      tomatoes_availability: 'high'
    },
    risk_rules: [
      { key: 'fx_volatility', severity: 'med', likelihood: 'med', description: 'Currency fluctuations affecting imported ingredients' },
      { key: 'input_price_spike', severity: 'high', likelihood: 'med', description: 'Wheat and cheese price increases' },
      { key: 'competition', severity: 'med', likelihood: 'high', description: 'High competition from established chains' }
    ],
    weights: {
      regulatory: 0.2,
      market: 0.25,
      competition: 0.15,
      cost: 0.2,
      talent: 0.1,
      finance: 0.1
    }
  },

  // COFFEE SHOP - EGYPT
  {
    id: 'coffee_shop_eg',
    archetype_id: 'coffee_shop',
    country: 'egypt',
    last_verified: '2025-08-20',
    assumptions: {
      pricing: {
        espresso: [35, 50],
        cappuccino: [45, 70],
        latte: [50, 80],
        specialty: [70, 120]
      },
      cogs_percentage: 0.25,
      labor_month: 10000,
      rent_m2: { prime: 2000, secondary: 1200 },
      energy_month: 1800,
      space_m2_required: [30, 60],
      initial_investment: [200000, 400000],
      equipment_cost: 120000
    },
    market: {
      tam_range_local_b: [15, 20],
      market_growth_rate: 0.12,
      avg_transaction: [60, 100],
      customer_freq_per_month: [8, 12],
      target_customers: ['Professionals', 'Students', 'Remote workers']
    },
    competition: {
      intl: ['Starbucks', 'Costa Coffee', 'Caribou'],
      local: ['Cilantro', 'Beano\'s', 'Coffee Bean'],
      market_concentration: 'high'
    },
    regulatory: {
      permits: ['Commercial Registry', 'Tax Card', 'Health Permit'],
      fees_range: [3000, 10000],
      sla_days: 20,
      difficulty: 'easy'
    },
    supply_inputs: {
      coffee_beans: 'imported',
      milk: 'local',
      pastries: 'local'
    },
    risk_rules: [
      { key: 'fx_volatility', severity: 'high', likelihood: 'high', description: 'Coffee beans are imported and FX-sensitive' },
      { key: 'location_dependency', severity: 'high', likelihood: 'med', description: 'Success heavily depends on foot traffic' },
      { key: 'competition', severity: 'high', likelihood: 'high', description: 'Saturated market with strong brands' }
    ],
    weights: {
      regulatory: 0.15,
      market: 0.25,
      competition: 0.2,
      cost: 0.2,
      talent: 0.1,
      finance: 0.1
    }
  },

  // GROCERY STORE - EGYPT
  {
    id: 'grocery_store_eg',
    archetype_id: 'grocery_store',
    country: 'egypt',
    last_verified: '2025-09-01',
    assumptions: {
      pricing: {
        basket_avg: [200, 400]
      },
      cogs_percentage: 0.7,
      labor_month: 8000,
      rent_m2: { prime: 1500, secondary: 800 },
      energy_month: 3500,
      space_m2_required: [50, 120],
      initial_investment: [150000, 350000],
      equipment_cost: 80000
    },
    market: {
      tam_range_local_b: [180, 220],
      market_growth_rate: 0.05,
      avg_transaction: [200, 400],
      customer_freq_per_month: [15, 25],
      target_customers: ['Families', 'Households', 'All demographics']
    },
    competition: {
      intl: ['Carrefour', 'Spinneys', 'Metro'],
      local: ['Kheir Zaman', 'Kazyon', 'Local shops'],
      market_concentration: 'low'
    },
    regulatory: {
      permits: ['Commercial Registry', 'Tax Card', 'Health Permit'],
      fees_range: [2000, 8000],
      sla_days: 15,
      difficulty: 'easy'
    },
    supply_inputs: {
      fmcg: 'high',
      fresh_produce: 'high',
      packaged_goods: 'high'
    },
    risk_rules: [
      { key: 'thin_margins', severity: 'high', likelihood: 'high', description: 'Very low profit margins (5-10%)' },
      { key: 'inventory_spoilage', severity: 'med', likelihood: 'med', description: 'Fresh produce requires careful management' },
      { key: 'cash_flow', severity: 'med', likelihood: 'med', description: 'Inventory financing needed' }
    ],
    weights: {
      regulatory: 0.1,
      market: 0.2,
      competition: 0.15,
      cost: 0.3,
      talent: 0.05,
      finance: 0.2
    }
  },

  // PHARMACY - EGYPT
  {
    id: 'pharmacy_eg',
    archetype_id: 'pharmacy',
    country: 'egypt',
    last_verified: '2025-07-10',
    assumptions: {
      pricing: {
        prescription_avg: [150, 300],
        otc_avg: [50, 120]
      },
      cogs_percentage: 0.65,
      labor_month: 15000,
      rent_m2: { prime: 2000, secondary: 1200 },
      energy_month: 1500,
      space_m2_required: [30, 60],
      initial_investment: [300000, 600000],
      equipment_cost: 100000
    },
    market: {
      tam_range_local_b: [45, 55],
      market_growth_rate: 0.09,
      avg_transaction: [150, 250],
      customer_freq_per_month: [3, 5],
      target_customers: ['All ages', 'Chronic patients', 'Families']
    },
    competition: {
      intl: [],
      local: ['El Ezaby', '19011', 'Seif', 'Local pharmacies'],
      market_concentration: 'medium'
    },
    regulatory: {
      permits: ['Pharmacy License (Pharmacists Syndicate)', 'Commercial Registry', 'Tax Card', 'NFSA Permit'],
      fees_range: [15000, 30000],
      sla_days: 45,
      difficulty: 'hard'
    },
    supply_inputs: {
      pharma_distributors: 'regulated',
      requires_pharmacist: true
    },
    risk_rules: [
      { key: 'regulation_strict', severity: 'high', likelihood: 'high', description: 'Requires licensed pharmacist on premises' },
      { key: 'price_controls', severity: 'med', likelihood: 'high', description: 'Government controls drug prices' },
      { key: 'insurance_dependency', severity: 'med', likelihood: 'med', description: 'Increasing reliance on insurance' }
    ],
    weights: {
      regulatory: 0.3,
      market: 0.2,
      competition: 0.1,
      cost: 0.2,
      talent: 0.15,
      finance: 0.05
    }
  }
]

// GEO OVERRIDES
export const GEO_OVERRIDES: GeoOverride[] = [
  // Cairo - higher costs, higher demand
  {
    template_id: 'pizza_shop_eg',
    geo_id: 'cairo',
    city_name: 'Cairo',
    overrides: {
      rent_m2: { prime: 2000, secondary: 1200 },
      labor_month: 13500,
      energy_month: 2700,
      demand_index: 1.15,
      traffic_index: 1.3
    }
  },
  {
    template_id: 'coffee_shop_eg',
    geo_id: 'cairo',
    city_name: 'Cairo',
    overrides: {
      rent_m2: { prime: 2200, secondary: 1400 },
      labor_month: 11500,
      energy_month: 2000,
      demand_index: 1.2,
      traffic_index: 1.35
    }
  },

  // Alexandria - moderate costs
  {
    template_id: 'pizza_shop_eg',
    geo_id: 'alexandria',
    city_name: 'Alexandria',
    overrides: {
      rent_m2: { prime: 1600, secondary: 900 },
      labor_month: 11000,
      energy_month: 2200,
      demand_index: 1.05,
      traffic_index: 1.1
    }
  },
  {
    template_id: 'coffee_shop_eg',
    geo_id: 'alexandria',
    city_name: 'Alexandria',
    overrides: {
      rent_m2: { prime: 1700, secondary: 1000 },
      labor_month: 9500,
      energy_month: 1600,
      demand_index: 1.0,
      traffic_index: 1.15
    }
  },

  // Giza
  {
    template_id: 'pizza_shop_eg',
    geo_id: 'giza',
    city_name: 'Giza',
    overrides: {
      rent_m2: { prime: 1700, secondary: 1000 },
      labor_month: 12500,
      energy_month: 2500,
      demand_index: 1.1,
      traffic_index: 1.2
    }
  }
]

export function getTemplate(archetypeId: string, country: string): BusinessTemplate | undefined {
  return BUSINESS_TEMPLATES.find(
    t => t.archetype_id === archetypeId && t.country === country
  )
}

export function getGeoOverride(templateId: string, geoId: string): GeoOverride | undefined {
  return GEO_OVERRIDES.find(
    o => o.template_id === templateId && o.geo_id === geoId
  )
}

export function applyGeoOverrides(template: BusinessTemplate, geoId: string): BusinessTemplate {
  const override = getGeoOverride(template.id, geoId)
  if (!override) return template

  return {
    ...template,
    assumptions: {
      ...template.assumptions,
      ...override.overrides.rent_m2 && { rent_m2: override.overrides.rent_m2 },
      ...override.overrides.labor_month && { labor_month: override.overrides.labor_month },
      ...override.overrides.energy_month && { energy_month: override.overrides.energy_month }
    }
  }
}
