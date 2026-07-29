export type Category = 'Protein' | 'Vegetarian' | 'Sides'

export type MenuItem = {
  id: string
  name: string
  category: Category
  price: number
  description: string
  ingredients: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  image: string
  accent: string
}

export const formatIsoDate = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const formatLongDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T12:00:00`))

const proteins: MenuItem[] = [
  { id: 'lemon-chicken', name: 'Lemon herb chicken', category: 'Protein', price: 18, description: 'Juicy roasted chicken with garden herbs and caramelized lemon.', ingredients: ['Chicken', 'Lemon', 'Garlic', 'Rosemary', 'Olive oil'], calories: 390, protein: 42, carbs: 7, fat: 19, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', accent: '#dca95f' },
  { id: 'braised-beef', name: 'Slow-braised beef', category: 'Protein', price: 22, description: 'Fork-tender beef braised with tomato, red wine, and warming spices.', ingredients: ['Beef chuck', 'Tomato', 'Red wine', 'Onion', 'Spices'], calories: 510, protein: 46, carbs: 12, fat: 29, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', accent: '#bd7254' },
  { id: 'salmon', name: 'Maple glazed salmon', category: 'Protein', price: 24, description: 'Roasted salmon finished with maple, whole-grain mustard, and citrus.', ingredients: ['Salmon', 'Maple syrup', 'Mustard', 'Orange', 'Thyme'], calories: 440, protein: 39, carbs: 16, fat: 24, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85', accent: '#db8264' },
  { id: 'turkey-meatballs', name: 'Tuscan turkey meatballs', category: 'Protein', price: 17, description: 'Tender turkey meatballs simmered in a rustic tomato-basil sauce.', ingredients: ['Turkey', 'Tomato', 'Parmesan', 'Basil', 'Breadcrumbs'], calories: 420, protein: 38, carbs: 22, fat: 20, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=85', accent: '#c76549' },
  { id: 'garlic-shrimp', name: 'Garlic butter shrimp', category: 'Protein', price: 23, description: 'Plump shrimp sautéed with cultured butter, garlic, and fresh parsley.', ingredients: ['Shrimp', 'Butter', 'Garlic', 'Parsley', 'Lemon'], calories: 360, protein: 34, carbs: 8, fat: 21, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85', accent: '#dd8e64' },
  { id: 'pulled-pork', name: 'Cider pulled pork', category: 'Protein', price: 19, description: 'Slow-cooked pork shoulder with apple cider and a tangy pan sauce.', ingredients: ['Pork shoulder', 'Apple cider', 'Onion', 'Paprika', 'Vinegar'], calories: 530, protein: 43, carbs: 18, fat: 31, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', accent: '#b9694c' },
  { id: 'chicken-kofta', name: 'Spiced chicken kofta', category: 'Protein', price: 18, description: 'Grilled chicken kofta with toasted cumin, coriander, and herbs.', ingredients: ['Chicken', 'Cumin', 'Coriander', 'Parsley', 'Onion'], calories: 380, protein: 40, carbs: 9, fat: 19, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85', accent: '#c9844e' },
]

const vegetarian: MenuItem[] = [
  { id: 'eggplant', name: 'Roasted eggplant caponata', category: 'Vegetarian', price: 15, description: 'Silky eggplant, tomatoes, olives, and capers with a sweet-sour finish.', ingredients: ['Eggplant', 'Tomato', 'Olives', 'Capers', 'Celery'], calories: 280, protein: 7, carbs: 31, fat: 16, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', accent: '#7f9471' },
  { id: 'mushroom-pasta', name: 'Wild mushroom rigatoni', category: 'Vegetarian', price: 17, description: 'Rigatoni tossed with woodland mushrooms, cream, thyme, and parmesan.', ingredients: ['Rigatoni', 'Mushrooms', 'Cream', 'Parmesan', 'Thyme'], calories: 540, protein: 18, carbs: 67, fat: 23, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', accent: '#a9916c' },
  { id: 'chickpea-tagine', name: 'Apricot chickpea tagine', category: 'Vegetarian', price: 16, description: 'Aromatic chickpeas with apricot, tomato, saffron, and toasted almonds.', ingredients: ['Chickpeas', 'Apricot', 'Tomato', 'Almonds', 'Saffron'], calories: 410, protein: 15, carbs: 59, fat: 14, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', accent: '#dc9b4c' },
  { id: 'stuffed-peppers', name: 'Harvest stuffed peppers', category: 'Vegetarian', price: 16, description: 'Roasted peppers filled with herbed rice, lentils, feta, and greens.', ingredients: ['Bell pepper', 'Rice', 'Lentils', 'Feta', 'Spinach'], calories: 390, protein: 16, carbs: 51, fat: 14, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', accent: '#cb7651' },
  { id: 'cauliflower', name: 'Golden cauliflower steaks', category: 'Vegetarian', price: 15, description: 'Spice-roasted cauliflower over lemony white bean purée.', ingredients: ['Cauliflower', 'White beans', 'Lemon', 'Turmeric', 'Tahini'], calories: 330, protein: 14, carbs: 39, fat: 15, image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=85', accent: '#c7a54c' },
]

const sides: MenuItem[] = [
  { id: 'rosemary-potatoes', name: 'Crispy rosemary potatoes', category: 'Sides', price: 8, description: 'Golden baby potatoes roasted with rosemary and flaky sea salt.', ingredients: ['Potatoes', 'Rosemary', 'Olive oil', 'Sea salt'], calories: 260, protein: 5, carbs: 39, fat: 10, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85', accent: '#b99a56' },
  { id: 'seasonal-salad', name: 'Seasonal garden salad', category: 'Sides', price: 9, description: 'Market greens, crisp vegetables, seeds, and house vinaigrette.', ingredients: ['Mixed greens', 'Cucumber', 'Radish', 'Seeds', 'Vinaigrette'], calories: 180, protein: 5, carbs: 14, fat: 13, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', accent: '#6f9b72' },
  { id: 'saffron-rice', name: 'Saffron almond rice', category: 'Sides', price: 9, description: 'Fragrant basmati rice with saffron, herbs, and toasted almonds.', ingredients: ['Basmati rice', 'Saffron', 'Almonds', 'Parsley', 'Butter'], calories: 310, protein: 7, carbs: 52, fat: 9, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85', accent: '#d6a848' },
  { id: 'green-beans', name: 'Blistered green beans', category: 'Sides', price: 8, description: 'Charred green beans with lemon, garlic, and toasted breadcrumbs.', ingredients: ['Green beans', 'Lemon', 'Garlic', 'Breadcrumbs'], calories: 190, protein: 6, carbs: 21, fat: 10, image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=900&q=85', accent: '#719362' },
]

const rotateTake = (items: MenuItem[], start: number, count: number) =>
  Array.from({ length: count }, (_, index) => items[(start + index) % items.length])

export const getMenuForDate = (iso: string) => {
  const day = new Date(`${iso}T12:00:00`).getDay()
  return [
    ...rotateTake(proteins, day, 5),
    ...rotateTake(vegetarian, day, 3),
    ...rotateTake(sides, day, 2),
  ]
}
