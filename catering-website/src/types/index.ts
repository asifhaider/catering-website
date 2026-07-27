export type FoodCategory = 'protein' | 'vegetarian' | 'sides'

export interface NutritionalFacts {
  servingSize: string
  calories: number
  totalFat: string
  saturatedFat: string
  cholesterol: string
  sodium: string
  totalCarbs: string
  dietaryFiber: string
  protein: string
}

export interface FoodItem {
  id: string
  name: string
  description: string
  ingredients: string[]
  price: number
  category: FoodCategory
  image: string
  nutritionalFacts: NutritionalFacts
}

export interface CartItem {
  foodItem: FoodItem
  quantity: number
  cateringDate: string
}

export type PaymentMethod = 'cash' | 'card' | 'venmo'

export interface CheckoutFormData {
  customerName: string
  email: string
  phone: string
  pickupDate: string
  pickupTime: string
  portionSize: number
  paymentMethod: PaymentMethod
  paymentDetails: string
  specialInstructions: string
}

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  checkout: CheckoutFormData
  subtotal: number
  tax: number
  total: number
}
