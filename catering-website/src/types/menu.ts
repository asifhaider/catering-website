export type FoodCategory = 'protein' | 'vegetarian' | 'sides'

export interface NutritionFacts {
  servingSize: string
  calories: number
  totalFatGrams: number
  saturatedFatGrams: number
  cholesterolMg: number
  sodiumMg: number
  totalCarbsGrams: number
  dietaryFiberGrams: number
  sugarsGrams: number
  proteinGrams: number
}

export interface FoodItem {
  id: string
  name: string
  category: FoodCategory
  /** Price per portion (one portion = one person), in US dollars. */
  pricePerPortion: number
  imageUrl: string
  description: string
  ingredients: string[]
  nutrition: NutritionFacts
  allergens: string[]
}

/** 0 = Sunday ... 6 = Saturday, matching Date#getDay(). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DayMenu {
  dayOfWeek: DayOfWeek
  items: FoodItem[]
}

export const MIN_PORTIONS = 6
export const MAX_PORTIONS = 30

export const MIN_LEAD_DAYS = 2
export const MAX_LEAD_DAYS = 14
