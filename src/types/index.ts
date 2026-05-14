export type DayOfWeek =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday';

export type FoodCategory = 'protein' | 'vegetarian' | 'side';
export type PaymentMethod = 'cash' | 'e-transfer' | 'check';
export type CheckoutStep = 'pickup' | 'contact' | 'payment' | 'review';

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  pricePerPerson: number;
  imageSrc: string;
  imageAlt: string;
  description: string;
  ingredients: string[];
  nutritionFacts: NutritionFacts;
  allergens: string[];
}

export interface DailyMenu {
  day: DayOfWeek;
  items: FoodItem[];
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface CartState {
  cateringDate: string | null;
  portionSize: number | null;
  items: CartItem[];
}

export interface PickupInfo {
  pickupDate: string;
  pickupTime: string;
  specialInstructions: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CheckoutFormData {
  pickup: PickupInfo;
  contact: ContactInfo;
  paymentMethod: PaymentMethod;
}

export interface InvoiceLineItem {
  foodItemId: string;
  foodItemName: string;
  category: FoodCategory;
  pricePerPerson: number;
  quantity: number;
  portionSize: number;
  lineTotal: number;
}

export interface Invoice {
  invoiceId: string;
  createdAt: string;
  cateringDate: string;
  portionSize: number;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  contact: ContactInfo;
  pickup: PickupInfo;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface AboutContent {
  heroHeading: string;
  heroSubtext: string;
  storyParagraphs: string[];
  teamMembers: TeamMember[];
  values: { title: string; description: string }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  businessHours: { day: string; hours: string }[];
  socialLinks: SocialLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
