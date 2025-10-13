export interface BusinessArchetype {
  id: string
  name: string
  nameAr: string
  isic_code: string
  sector: string
  tags: string[]
  icon: string
  popular: boolean
}

export const BUSINESS_ARCHETYPES: BusinessArchetype[] = [
  {
    id: 'pizza_shop',
    name: 'Pizza Restaurant',
    nameAr: 'مطعم بيتزا',
    isic_code: '5610',
    sector: 'Food & Beverage',
    tags: ['food', 'restaurant', 'retail'],
    
    popular: true
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    nameAr: 'مقهى',
    isic_code: '5630',
    sector: 'Food & Beverage',
    tags: ['food', 'beverage', 'retail'],
    
    popular: true
  },
  {
    id: 'grocery_store',
    name: 'Grocery Store',
    nameAr: 'بقالة',
    isic_code: '4711',
    sector: 'Retail Trade',
    tags: ['retail', 'food', 'essentials'],
    
    popular: true
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    nameAr: 'صيدلية',
    isic_code: '4772',
    sector: 'Healthcare Retail',
    tags: ['healthcare', 'retail', 'regulated'],
    
    popular: true
  },
  {
    id: 'clothing_boutique',
    name: 'Clothing Boutique',
    nameAr: 'بوتيك ملابس',
    isic_code: '4771',
    sector: 'Fashion Retail',
    tags: ['fashion', 'retail', 'apparel'],
    
    popular: true
  },
  {
    id: 'textile_workshop',
    name: 'Textile Workshop',
    nameAr: 'ورشة نسيج',
    isic_code: '1311',
    sector: 'Manufacturing',
    tags: ['manufacturing', 'textiles', 'production'],
    
    popular: false
  },
  {
    id: 'bakery',
    name: 'Bakery',
    nameAr: 'مخبز',
    isic_code: '1071',
    sector: 'Food Manufacturing',
    tags: ['food', 'manufacturing', 'retail'],
    
    popular: true
  },
  {
    id: 'beauty_salon',
    name: 'Beauty Salon',
    nameAr: 'صالون تجميل',
    isic_code: '9602',
    sector: 'Personal Services',
    tags: ['services', 'beauty', 'personal care'],
    
    popular: true
  },
  {
    id: 'gym_fitness',
    name: 'Gym & Fitness Center',
    nameAr: 'صالة رياضية',
    isic_code: '9311',
    sector: 'Sports & Recreation',
    tags: ['sports', 'fitness', 'services'],
    
    popular: false
  },
  {
    id: 'electronics_repair',
    name: 'Electronics Repair Shop',
    nameAr: 'محل تصليح إلكترونيات',
    isic_code: '9511',
    sector: 'Repair Services',
    tags: ['services', 'repair', 'electronics'],
    
    popular: false
  },
  {
    id: 'car_wash',
    name: 'Car Wash',
    nameAr: 'غسيل سيارات',
    isic_code: '4520',
    sector: 'Automotive Services',
    tags: ['automotive', 'services', 'cleaning'],
    
    popular: false
  },
  {
    id: 'daycare',
    name: 'Daycare Center',
    nameAr: 'حضانة أطفال',
    isic_code: '8891',
    sector: 'Childcare Services',
    tags: ['education', 'childcare', 'services'],
    
    popular: false
  }
]

export const POPULAR_ARCHETYPES = BUSINESS_ARCHETYPES.filter(a => a.popular)

export function searchArchetypes(query: string): BusinessArchetype[] {
  const q = query.toLowerCase()
  return BUSINESS_ARCHETYPES.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.nameAr.includes(q) ||
    a.sector.toLowerCase().includes(q) ||
    a.tags.some(t => t.includes(q))
  )
}
