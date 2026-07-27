import type { FoodItem } from './menu'

export interface CartItem {
  foodItem: FoodItem
  /** Number of portions (one portion = one person) of this dish. */
  quantity: number
}

export type PaymentMethod = 'credit-card' | 'debit-card' | 'cash-on-pickup'

export interface CheckoutDetails {
  pickupDate: string
  pickupTime: string
  fullName: string
  phone: string
  email: string
  paymentMethod: PaymentMethod
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
  specialInstructions?: string
}

export interface Invoice {
  orderId: string
  placedAt: string
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  checkout: CheckoutDetails
}
