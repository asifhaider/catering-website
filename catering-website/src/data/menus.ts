import type { FoodCategory, FoodItem, NutritionalFacts } from '../types'

const CATEGORY_IMAGES: Record<FoodCategory, string[]> = {
  protein: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  ],
  vegetarian: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
  ],
  sides: [
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  ],
}

const PROTEIN_NAMES = [
  ['Herb-Roasted Chicken', 'Grilled Salmon', 'Beef Stroganoff', 'Honey Glazed Ham', 'Lamb Kofta'],
  ['BBQ Pulled Pork', 'Lemon Garlic Shrimp', 'Turkey Meatballs', 'Pork Tenderloin', 'Chicken Tikka'],
  ['Teriyaki Chicken', 'Baked Cod', 'Beef Bourguignon', 'Roast Duck', 'Grilled Steak Tips'],
  ['Coconut Curry Chicken', 'Pan-Seared Tilapia', 'Meatloaf', 'Pork Chops', 'Chicken Parmesan'],
  ['Moroccan Tagine', 'Fish Tacos', 'Pot Roast', 'Stuffed Peppers', 'Chicken Marsala'],
  ['Korean BBQ Beef', 'Salmon Teriyaki', 'Chicken Cacciatore', 'Pork Carnitas', 'Beef Kebabs'],
  ['Jerk Chicken', 'Shrimp Scampi', 'Shepherd\'s Pie', 'Turkey Cutlets', 'Beef Brisket'],
]

const VEGETARIAN_NAMES = [
  ['Garden Salad Bowl', 'Roasted Vegetable Medley', 'Caprese Pasta'],
  ['Mushroom Risotto', 'Stuffed Eggplant', 'Quinoa Buddha Bowl'],
  ['Spinach & Feta Pie', 'Ratatouille', 'Vegetable Lasagna'],
  ['Thai Green Curry', 'Stuffed Portobello', 'Mediterranean Couscous'],
  ['Butternut Squash Soup', 'Eggplant Parmesan', 'Vegetable Stir Fry'],
  ['Lentil Shepherd\'s Pie', 'Grilled Vegetable Platter', 'Pasta Primavera'],
  ['Black Bean Enchiladas', 'Roasted Cauliflower Steak', 'Vegetable Paella'],
]

const SIDES_NAMES = [
  ['Garlic Mashed Potatoes', 'Seasonal Green Beans'],
  ['Wild Rice Pilaf', 'Honey Roasted Carrots'],
  ['Creamy Coleslaw', 'Herbed Dinner Rolls'],
  ['Roasted Sweet Potatoes', 'Garden Salad'],
  ['Mac & Cheese', 'Steamed Broccoli'],
  ['Cornbread', 'Roasted Asparagus'],
  ['Baked Beans', 'Fresh Fruit Salad'],
]

const CATEGORY_COUNTS: Record<FoodCategory, number> = {
  protein: 5,
  vegetarian: 3,
  sides: 2,
}

function makeNutrition(name: string): NutritionalFacts {
  const base = name.length * 3 + 180
  return {
    servingSize: '1 serving (approx. 8 oz)',
    calories: base,
    totalFat: `${(base * 0.04).toFixed(0)}g`,
    saturatedFat: `${(base * 0.015).toFixed(0)}g`,
    cholesterol: `${Math.round(base * 0.3)}mg`,
    sodium: `${Math.round(base * 4)}mg`,
    totalCarbs: `${(base * 0.08).toFixed(0)}g`,
    dietaryFiber: `${(base * 0.01).toFixed(0)}g`,
    protein: `${(base * 0.05).toFixed(0)}g`,
  }
}

function createFoodItem(
  dayIndex: number,
  category: FoodCategory,
  index: number,
  name: string,
): FoodItem {
  const id = `day${dayIndex}-${category}-${index}`
  const basePrice = category === 'protein' ? 14 : category === 'vegetarian' ? 10 : 6
  const price = basePrice + (index % 3) * 2

  return {
    id,
    name,
    description: `Homemade ${name.toLowerCase()}, prepared fresh for your catering order. A customer favorite from our ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex]} menu.`,
    ingredients: [
      'Fresh locally sourced ingredients',
      'House-made seasoning blend',
      'Extra virgin olive oil',
      'Sea salt & cracked pepper',
      ...(category === 'vegetarian' ? ['Seasonal vegetables'] : []),
      ...(category === 'protein' ? ['Premium cut protein'] : []),
    ],
    price,
    category,
    image: CATEGORY_IMAGES[category][index],
    nutritionalFacts: makeNutrition(name),
  }
}

function buildDayMenu(dayIndex: number): FoodItem[] {
  const items: FoodItem[] = []

  PROTEIN_NAMES[dayIndex].forEach((name, i) => {
    items.push(createFoodItem(dayIndex, 'protein', i, name))
  })
  VEGETARIAN_NAMES[dayIndex].forEach((name, i) => {
    items.push(createFoodItem(dayIndex, 'vegetarian', i, name))
  })
  SIDES_NAMES[dayIndex].forEach((name, i) => {
    items.push(createFoodItem(dayIndex, 'sides', i, name))
  })

  return items
}

export const weeklyMenus: Record<number, FoodItem[]> = Object.fromEntries(
  Array.from({ length: 7 }, (_, day) => [day, buildDayMenu(day)]),
)

export function getMenuForDate(isoDate: string): FoodItem[] {
  const date = new Date(isoDate + 'T12:00:00')
  return weeklyMenus[date.getDay()] ?? []
}

export function getCategoryLabel(category: FoodCategory): string {
  const labels: Record<FoodCategory, string> = {
    protein: 'Protein',
    vegetarian: 'Vegetarian',
    sides: 'Sides',
  }
  return labels[category]
}

export function getItemsByCategory(items: FoodItem[]): Record<FoodCategory, FoodItem[]> {
  return {
    protein: items.filter((i) => i.category === 'protein'),
    vegetarian: items.filter((i) => i.category === 'vegetarian'),
    sides: items.filter((i) => i.category === 'sides'),
  }
}

export const CATEGORY_ORDER: FoodCategory[] = ['protein', 'vegetarian', 'sides']

export function validateMenuStructure(dayIndex: number): boolean {
  const menu = weeklyMenus[dayIndex]
  return (
    menu.length === 10 &&
    menu.filter((i) => i.category === 'protein').length === CATEGORY_COUNTS.protein &&
    menu.filter((i) => i.category === 'vegetarian').length === CATEGORY_COUNTS.vegetarian &&
    menu.filter((i) => i.category === 'sides').length === CATEGORY_COUNTS.sides
  )
}
