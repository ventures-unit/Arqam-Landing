import { faker } from '@faker-js/faker'

export interface MetricData {
  id: string
  name: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  format: 'number' | 'currency' | 'percentage'
  description?: string
}

export interface ChartData {
  name: string
  value: number
  [key: string]: any
}

export interface TableData {
  id: string
  [key: string]: any
}

// Economy Module Data
export function generateEconomyData() {
  const countries = ['US', 'China', 'Germany', 'Japan', 'UK', 'France', 'India', 'Brazil']
  const quarters = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024']
  const egyptGovernorates = ['Cairo', 'Alexandria', 'Giza', 'Qalyubia', 'Port Said', 'Suez', 'Dakahlia', 'Sharqia', 'Gharbia', 'Minya', 'Asyut', 'Sohag', 'Luxor', 'Aswan', 'Red Sea', 'North Sinai', 'South Sinai']

  return {
    metrics: [
      {
        id: 'gdp',
        name: 'GDP Growth',
        value: 2.4,
        change: 0.3,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Year-over-year GDP growth'
      },
      {
        id: 'inflation',
        name: 'Inflation Rate',
        value: 3.2,
        change: -0.5,
        changeType: 'decrease' as const,
        format: 'percentage' as const,
        description: 'Consumer price index change'
      },
      {
        id: 'unemployment',
        name: 'Unemployment',
        value: 4.1,
        change: -0.2,
        changeType: 'decrease' as const,
        format: 'percentage' as const,
        description: 'Unemployment rate'
      },
      {
        id: 'interest',
        name: 'Interest Rate',
        value: 5.25,
        change: 0.25,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Federal funds rate'
      }
    ],
    chartData: quarters.map(quarter => ({
      quarter,
      gdp: faker.number.float({ min: 1.5, max: 3.5, fractionDigits: 1 }),
      inflation: faker.number.float({ min: 2.0, max: 4.5, fractionDigits: 1 }),
      unemployment: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 })
    })),
    tableData: [
      ...countries.map(country => ({
        id: country,
        country,
        region: country === 'China' || country === 'Japan' || country === 'India' ? 'mena' : 'mena',
        gdpGrowth: faker.number.float({ min: 1.0, max: 4.0, fractionDigits: 1 }),
        inflation: faker.number.float({ min: 1.5, max: 5.0, fractionDigits: 1 }),
        unemployment: faker.number.float({ min: 2.0, max: 8.0, fractionDigits: 1 }),
        population: faker.number.int({ min: 50, max: 1400 }),
        gdpPerCapita: faker.number.int({ min: 20000, max: 80000 })
      })),
      // Add Egypt with governorates
      {
        id: 'Egypt',
        country: 'Egypt',
        region: 'mena',
        gdpGrowth: faker.number.float({ min: 3.0, max: 5.5, fractionDigits: 1 }),
        inflation: faker.number.float({ min: 15.0, max: 25.0, fractionDigits: 1 }),
        unemployment: faker.number.float({ min: 7.0, max: 10.0, fractionDigits: 1 }),
        population: 104,
        gdpPerCapita: faker.number.int({ min: 3000, max: 4500 })
      },
      // Add Egypt governorates as separate entries
      ...egyptGovernorates.map(gov => ({
        id: `Egypt-${gov}`,
        country: 'Egypt',
        governorate: gov,
        region: 'mena',
        gdpGrowth: faker.number.float({ min: 2.5, max: 6.0, fractionDigits: 1 }),
        inflation: faker.number.float({ min: 14.0, max: 26.0, fractionDigits: 1 }),
        unemployment: faker.number.float({ min: 6.0, max: 12.0, fractionDigits: 1 }),
        population: faker.number.int({ min: 1, max: 10 }),
        gdpPerCapita: faker.number.int({ min: 2500, max: 6000 })
      }))
    ],
    pieData: [
      { name: 'US', value: 25.4, color: '#3b82f6' },
      { name: 'China', value: 18.2, color: '#10b981' },
      { name: 'Germany', value: 12.1, color: '#f59e0b' },
      { name: 'Japan', value: 8.7, color: '#ef4444' },
      { name: 'UK', value: 6.3, color: '#8b5cf6' },
      { name: 'Others', value: 29.3, color: '#6b7280' }
    ]
  }
}

// Trade Module Data
export function generateTradeData() {
  const countries = ['US', 'China', 'Germany', 'Japan', 'UK', 'France', 'India', 'Brazil']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  return {
    metrics: [
      {
        id: 'exports',
        name: 'Total Exports',
        value: 2.8,
        change: 5.2,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'Monthly exports in trillion USD'
      },
      {
        id: 'imports',
        name: 'Total Imports',
        value: 3.2,
        change: 3.1,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'Monthly imports in trillion USD'
      },
      {
        id: 'balance',
        name: 'Trade Balance',
        value: -0.4,
        change: 2.1,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'Trade surplus/deficit in trillion USD'
      },
      {
        id: 'tariffs',
        name: 'Avg Tariff Rate',
        value: 2.1,
        change: -0.3,
        changeType: 'decrease' as const,
        format: 'percentage' as const,
        description: 'Average tariff rate'
      }
    ],
    chartData: months.map(month => ({
      month,
      exports: faker.number.float({ min: 2.0, max: 3.5, fractionDigits: 1 }),
      imports: faker.number.float({ min: 2.5, max: 4.0, fractionDigits: 1 }),
      balance: faker.number.float({ min: -0.8, max: 0.2, fractionDigits: 1 })
    })),
    tableData: countries.map(country => ({
      id: country,
      country,
      exports: faker.number.float({ min: 0.1, max: 0.8, fractionDigits: 1 }),
      imports: faker.number.float({ min: 0.1, max: 0.9, fractionDigits: 1 }),
      balance: faker.number.float({ min: -0.3, max: 0.2, fractionDigits: 1 }),
      tariffRate: faker.number.float({ min: 0.5, max: 5.0, fractionDigits: 1 }),
      tradeVolume: faker.number.int({ min: 100, max: 2000 })
    }))
  }
}

// Market Entry Module Data
export function generateMarketEntryData() {
  const markets = ['US', 'China', 'Germany', 'Japan', 'UK', 'France', 'India', 'Brazil']
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Energy']
  
  return {
    metrics: [
      {
        id: 'marketSize',
        name: 'Total Market Size',
        value: 15.2,
        change: 8.5,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'Market size in trillion USD'
      },
      {
        id: 'barriers',
        name: 'Entry Barriers',
        value: 6.8,
        change: -1.2,
        changeType: 'decrease' as const,
        format: 'number' as const,
        description: 'Average barrier score (1-10)'
      },
      {
        id: 'competition',
        name: 'Competition Level',
        value: 7.2,
        change: 0.5,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'Competition intensity (1-10)'
      },
      {
        id: 'growth',
        name: 'Growth Rate',
        value: 12.4,
        change: 2.1,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Expected annual growth'
      }
    ],
    chartData: markets.map(market => ({
      market,
      marketSize: faker.number.float({ min: 0.5, max: 3.0, fractionDigits: 1 }),
      barriers: faker.number.float({ min: 3.0, max: 9.0, fractionDigits: 1 }),
      competition: faker.number.float({ min: 4.0, max: 9.0, fractionDigits: 1 }),
      growth: faker.number.float({ min: 5.0, max: 20.0, fractionDigits: 1 })
    })),
    tableData: markets.map(market => ({
      id: market,
      market,
      marketSize: faker.number.float({ min: 0.5, max: 3.0, fractionDigits: 1 }),
      barriers: faker.number.float({ min: 3.0, max: 9.0, fractionDigits: 1 }),
      competition: faker.number.float({ min: 4.0, max: 9.0, fractionDigits: 1 }),
      growth: faker.number.float({ min: 5.0, max: 20.0, fractionDigits: 1 }),
      regulations: faker.number.int({ min: 1, max: 10 }),
      infrastructure: faker.number.int({ min: 1, max: 10 })
    }))
  }
}

// Price Monitor Module Data
export function generatePriceData() {
  const commodities = ['Oil', 'Gold', 'Silver', 'Copper', 'Wheat', 'Corn', 'Coffee', 'Sugar']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  return {
    metrics: [
      {
        id: 'oil',
        name: 'Oil Price',
        value: 78.50,
        change: 2.3,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'WTI crude oil per barrel'
      },
      {
        id: 'gold',
        name: 'Gold Price',
        value: 1980.25,
        change: -15.50,
        changeType: 'decrease' as const,
        format: 'currency' as const,
        description: 'Gold per ounce'
      },
      {
        id: 'inflation',
        name: 'Commodity Index',
        value: 145.2,
        change: 3.8,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'Commodity price index'
      },
      {
        id: 'volatility',
        name: 'Volatility',
        value: 18.5,
        change: -2.1,
        changeType: 'decrease' as const,
        format: 'percentage' as const,
        description: 'Price volatility index'
      }
    ],
    chartData: months.map(month => ({
      month,
      oil: faker.number.float({ min: 60, max: 90, fractionDigits: 2 }),
      gold: faker.number.float({ min: 1800, max: 2100, fractionDigits: 2 }),
      silver: faker.number.float({ min: 20, max: 30, fractionDigits: 2 }),
      copper: faker.number.float({ min: 3.5, max: 4.5, fractionDigits: 2 })
    })),
    tableData: commodities.map(commodity => ({
      id: commodity,
      commodity,
      currentPrice: faker.number.float({ min: 10, max: 2000, fractionDigits: 2 }),
      change: faker.number.float({ min: -10, max: 10, fractionDigits: 2 }),
      changePercent: faker.number.float({ min: -5, max: 5, fractionDigits: 1 }),
      volume: faker.number.int({ min: 1000, max: 100000 }),
      marketCap: faker.number.int({ min: 1000000, max: 1000000000 })
    }))
  }
}

// Capital Access Module Data
export function generateCapitalData() {
  const regions = ['North America', 'Europe', 'Asia', 'Latin America', 'Africa', 'Middle East']
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Energy']
  
  return {
    metrics: [
      {
        id: 'funding',
        name: 'Total Funding',
        value: 285.6,
        change: 12.4,
        changeType: 'increase' as const,
        format: 'currency' as const,
        description: 'Global funding in billion USD'
      },
      {
        id: 'interest',
        name: 'Interest Rate',
        value: 4.25,
        change: 0.25,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Average lending rate'
      },
      {
        id: 'vc',
        name: 'VC Investment',
        value: 45.2,
        change: -8.1,
        changeType: 'decrease' as const,
        format: 'currency' as const,
        description: 'Venture capital investment'
      },
      {
        id: 'debt',
        name: 'Debt Markets',
        value: 12.8,
        change: 3.2,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Corporate debt yield'
      }
    ],
    chartData: regions.map(region => ({
      region,
      funding: faker.number.float({ min: 20, max: 80, fractionDigits: 1 }),
      vc: faker.number.float({ min: 5, max: 25, fractionDigits: 1 }),
      debt: faker.number.float({ min: 2, max: 8, fractionDigits: 1 }),
      equity: faker.number.float({ min: 10, max: 40, fractionDigits: 1 })
    })),
    tableData: sectors.map(sector => ({
      id: sector,
      sector,
      funding: faker.number.float({ min: 10, max: 100, fractionDigits: 1 }),
      deals: faker.number.int({ min: 50, max: 500 }),
      avgDealSize: faker.number.float({ min: 1, max: 50, fractionDigits: 1 }),
      growth: faker.number.float({ min: -10, max: 30, fractionDigits: 1 }),
      risk: faker.number.int({ min: 1, max: 10 })
    }))
  }
}

// Regulatory Access Module Data
export function generateRegulatoryData() {
  const countries = ['US', 'EU', 'China', 'Japan', 'UK', 'Canada', 'Australia', 'Brazil']
  const categories = ['Data Privacy', 'Financial', 'Healthcare', 'Environmental', 'Labor', 'Trade']
  
  return {
    metrics: [
      {
        id: 'compliance',
        name: 'Compliance Score',
        value: 7.8,
        change: 0.5,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'Overall compliance rating (1-10)'
      },
      {
        id: 'changes',
        name: 'Policy Changes',
        value: 23,
        change: 5,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'New regulations this quarter'
      },
      {
        id: 'penalties',
        name: 'Penalties',
        value: 2.4,
        change: -0.8,
        changeType: 'decrease' as const,
        format: 'currency' as const,
        description: 'Average penalties in million USD'
      },
      {
        id: 'processing',
        name: 'Processing Time',
        value: 45,
        change: -5,
        changeType: 'decrease' as const,
        format: 'number' as const,
        description: 'Average approval time in days'
      }
    ],
    chartData: countries.map(country => ({
      country,
      compliance: faker.number.float({ min: 5.0, max: 9.5, fractionDigits: 1 }),
      changes: faker.number.int({ min: 10, max: 40 }),
      penalties: faker.number.float({ min: 0.5, max: 5.0, fractionDigits: 1 }),
      processing: faker.number.int({ min: 20, max: 80 })
    })),
    tableData: categories.map(category => ({
      id: category,
      category,
      compliance: faker.number.float({ min: 5.0, max: 9.5, fractionDigits: 1 }),
      changes: faker.number.int({ min: 5, max: 20 }),
      penalties: faker.number.float({ min: 0.1, max: 2.0, fractionDigits: 1 }),
      complexity: faker.number.int({ min: 1, max: 10 }),
      impact: faker.number.int({ min: 1, max: 10 })
    }))
  }
}

// Sector Intelligence Module Data
export function generateSectorData() {
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Energy', 'Real Estate', 'Utilities']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  return {
    metrics: [
      {
        id: 'performance',
        name: 'Sector Performance',
        value: 8.4,
        change: 1.2,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Average sector return'
      },
      {
        id: 'volatility',
        name: 'Volatility',
        value: 15.2,
        change: -2.1,
        changeType: 'decrease' as const,
        format: 'percentage' as const,
        description: 'Sector volatility index'
      },
      {
        id: 'valuation',
        name: 'Valuation',
        value: 18.5,
        change: 0.8,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'Average P/E ratio'
      },
      {
        id: 'growth',
        name: 'Growth Rate',
        value: 6.8,
        change: 0.5,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Expected earnings growth'
      }
    ],
    chartData: months.map(month => ({
      month,
      technology: faker.number.float({ min: -5, max: 15, fractionDigits: 1 }),
      healthcare: faker.number.float({ min: -3, max: 12, fractionDigits: 1 }),
      finance: faker.number.float({ min: -8, max: 10, fractionDigits: 1 }),
      manufacturing: faker.number.float({ min: -4, max: 8, fractionDigits: 1 })
    })),
    tableData: sectors.map(sector => ({
      id: sector,
      sector,
      performance: faker.number.float({ min: -10, max: 20, fractionDigits: 1 }),
      volatility: faker.number.float({ min: 8, max: 25, fractionDigits: 1 }),
      valuation: faker.number.float({ min: 10, max: 30, fractionDigits: 1 }),
      growth: faker.number.float({ min: 2, max: 15, fractionDigits: 1 }),
      marketCap: faker.number.int({ min: 1000, max: 10000 }),
      dividend: faker.number.float({ min: 0, max: 5, fractionDigits: 1 })
    }))
  }
}

// Advisor Module Data
export function generateAdvisorData() {
  const insights = [
    'Market volatility expected to increase',
    'Technology sector showing strong momentum',
    'Interest rates likely to remain elevated',
    'Emerging markets offer growth opportunities',
    'Energy sector facing headwinds',
    'Healthcare innovation driving returns',
    'Financial services adapting to new regulations',
    'Manufacturing recovery accelerating'
  ]
  
  return {
    metrics: [
      {
        id: 'confidence',
        name: 'Confidence Score',
        value: 7.8,
        change: 0.3,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'AI confidence in recommendations'
      },
      {
        id: 'accuracy',
        name: 'Prediction Accuracy',
        value: 82.4,
        change: 2.1,
        changeType: 'increase' as const,
        format: 'percentage' as const,
        description: 'Historical prediction accuracy'
      },
      {
        id: 'recommendations',
        name: 'Active Recommendations',
        value: 15,
        change: 3,
        changeType: 'increase' as const,
        format: 'number' as const,
        description: 'Number of active recommendations'
      },
      {
        id: 'risk',
        name: 'Risk Level',
        value: 4.2,
        change: -0.5,
        changeType: 'decrease' as const,
        format: 'number' as const,
        description: 'Current risk assessment (1-10)'
      }
    ],
    insights: insights.map((insight, index) => ({
      id: `insight-${index}`,
      text: insight,
      confidence: faker.number.float({ min: 0.6, max: 0.95, fractionDigits: 2 }),
      category: faker.helpers.arrayElement(['Market', 'Sector', 'Economic', 'Risk']),
      impact: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
      timeframe: faker.helpers.arrayElement(['Short-term', 'Medium-term', 'Long-term'])
    })),
    recommendations: [
      {
        id: 'rec-1',
        title: 'Increase Technology Exposure',
        description: 'Technology sector showing strong momentum with 15% YTD returns',
        confidence: 0.85,
        risk: 'Medium',
        timeframe: '3-6 months'
      },
      {
        id: 'rec-2',
        title: 'Reduce Energy Holdings',
        description: 'Energy sector facing regulatory headwinds and declining demand',
        confidence: 0.78,
        risk: 'Low',
        timeframe: '1-3 months'
      },
      {
        id: 'rec-3',
        title: 'Consider Emerging Markets',
        description: 'Emerging markets offer attractive valuations and growth potential',
        confidence: 0.72,
        risk: 'High',
        timeframe: '6-12 months'
      }
    ]
  }
}
