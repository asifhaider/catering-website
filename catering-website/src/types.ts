export type FoodCategory = "protein" | "vegetarian" | "side";

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  totalFatG: number;
  saturatedFatG: number;
  cholesterolMg: number;
  sodiumMg: number;
  totalCarbsG: number;
  dietaryFiberG: number;
  sugarsG: number;
  proteinG: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  /** Price per person/portion, in USD. */
  pricePerPerson: number;
  imageUrl: string;
  imageAlt: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  nutrition: NutritionFacts;
}

/** Sunday = 0 ... Saturday = 6, matching Date.getDay(). */
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CartLine {
  itemId: string;
  /** Number of portions/servings of this item. */
  quantity: number;
}

export interface OrderCart {
  /** ISO date string (YYYY-MM-DD) for the pickup date this cart applies to. */
  pickupDate: string;
  lines: CartLine[];
}

export interface CustomerContactInfo {
  fullName: string;
  phone: string;
  email: string;
}

export type PaymentMethod = "card" | "cash" | "check";

export interface PaymentInfo {
  method: PaymentMethod;
  /** Only collected for demo purposes; never actually charged. */
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface CheckoutDetails {
  contact: CustomerContactInfo;
  pickupDate: string;
  pickupTime: string;
  payment: PaymentInfo;
  specialInstructions: string;
}

export interface InvoiceLineItem {
  itemId: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  pricePerPerson: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  pickupDate: string;
  pickupTime: string;
  contact: CustomerContactInfo;
  paymentMethod: PaymentMethod;
  specialInstructions: string;
  lineItems: InvoiceLineItem[];
  totalPortions: number;
  subtotal: number;
  tax: number;
  total: number;
}
