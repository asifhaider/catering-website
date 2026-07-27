export type FoodCategory = "protein" | "vegetarian" | "sides";

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  totalFat: string;
  saturatedFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrate: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  pricePerPortion: number;
  description: string;
  ingredients: string[];
  nutrition: NutritionFacts;
  image: string;
  imageAlt: string;
}

export interface CartItem {
  foodItemId: string;
  name: string;
  category: FoodCategory;
  pricePerPortion: number;
  image: string;
  imageAlt: string;
  portions: number;
  cateringDate: string;
}

export type PaymentMethod = "card" | "cash" | "venmo";

export interface CheckoutInfo {
  pickupDate: string;
  pickupTime: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  venmoHandle?: string;
  specialInstructions: string;
}

export interface InvoiceLineItem {
  foodItemId: string;
  name: string;
  category: FoodCategory;
  pricePerPortion: number;
  portions: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  pickupDate: string;
  pickupTime: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  paymentMethod: PaymentMethod;
  specialInstructions: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const MIN_PORTIONS = 6;
export const MAX_PORTIONS = 30;
export const MIN_DAYS_AHEAD = 2;
export const MAX_DAYS_AHEAD = 14;
export const TAX_RATE = 0.0875;
