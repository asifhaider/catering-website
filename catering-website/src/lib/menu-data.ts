import type { FoodItem, Weekday } from "./types";

function nutrition(
  overrides: Partial<FoodItem["nutrition"]> &
    Pick<FoodItem["nutrition"], "calories" | "protein">
): FoodItem["nutrition"] {
  return {
    servingSize: "1 catering portion (approx. 1 guest)",
    totalFat: "12g",
    saturatedFat: "3.5g",
    cholesterol: "45mg",
    sodium: "480mg",
    totalCarbohydrate: "28g",
    dietaryFiber: "4g",
    sugars: "6g",
    ...overrides,
  };
}

const monday: FoodItem[] = [
  {
    id: "mon-herb-roast-chicken",
    name: "Herb-Roasted Chicken Thighs",
    category: "protein",
    pricePerPortion: 14.5,
    description:
      "Bone-in chicken thighs roasted with rosemary, thyme, and lemon until the skin crisps and the meat stays juicy.",
    ingredients: [
      "Chicken thighs",
      "Rosemary",
      "Thyme",
      "Lemon",
      "Garlic",
      "Olive oil",
      "Sea salt",
      "Black pepper",
    ],
    nutrition: nutrition({ calories: 320, protein: "28g", totalFat: "18g" }),
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    imageAlt: "Herb-roasted chicken thighs on a platter",
  },
  {
    id: "mon-braised-short-rib",
    name: "Braised Short Ribs",
    category: "protein",
    pricePerPortion: 18.0,
    description:
      "Slow-braised beef short ribs in red wine and stock until fork-tender, finished with a reduced pan sauce.",
    ingredients: [
      "Beef short ribs",
      "Red wine",
      "Beef stock",
      "Onion",
      "Carrot",
      "Celery",
      "Tomato paste",
      "Bay leaf",
    ],
    nutrition: nutrition({
      calories: 410,
      protein: "32g",
      totalFat: "26g",
      saturatedFat: "10g",
      cholesterol: "95mg",
    }),
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imageAlt: "Braised short ribs with rich sauce",
  },
  {
    id: "mon-citrus-salmon",
    name: "Citrus-Glazed Salmon",
    category: "protein",
    pricePerPortion: 16.5,
    description:
      "Oven-roasted salmon fillets brushed with a honey-citrus glaze and finished with fresh dill.",
    ingredients: [
      "Salmon fillets",
      "Orange",
      "Lemon",
      "Honey",
      "Dill",
      "Olive oil",
      "Salt",
      "Pepper",
    ],
    nutrition: nutrition({
      calories: 290,
      protein: "30g",
      totalFat: "14g",
      cholesterol: "70mg",
      sodium: "320mg",
    }),
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    imageAlt: "Citrus-glazed salmon fillet with herbs",
  },
  {
    id: "mon-turkey-meatballs",
    name: "Turkey Meatballs in Tomato Sauce",
    category: "protein",
    pricePerPortion: 13.0,
    description:
      "Lean turkey meatballs simmered in a house tomato sauce with basil and Parmesan.",
    ingredients: [
      "Ground turkey",
      "Breadcrumbs",
      "Egg",
      "Parmesan",
      "Tomato sauce",
      "Basil",
      "Garlic",
      "Onion",
    ],
    nutrition: nutrition({ calories: 275, protein: "26g", sodium: "560mg" }),
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80",
    imageAlt: "Turkey meatballs in tomato sauce",
  },
  {
    id: "mon-pork-tenderloin",
    name: "Maple Mustard Pork Tenderloin",
    category: "protein",
    pricePerPortion: 15.0,
    description:
      "Roasted pork tenderloin glazed with maple syrup and Dijon, sliced and served with pan juices.",
    ingredients: [
      "Pork tenderloin",
      "Maple syrup",
      "Dijon mustard",
      "Garlic",
      "Apple cider vinegar",
      "Salt",
      "Pepper",
    ],
    nutrition: nutrition({ calories: 305, protein: "29g", sugars: "8g" }),
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
    imageAlt: "Sliced maple mustard pork tenderloin",
  },
  {
    id: "mon-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    category: "vegetarian",
    pricePerPortion: 12.5,
    description:
      "Creamy arborio rice cooked with mixed wild mushrooms, white wine, and Parmesan.",
    ingredients: [
      "Arborio rice",
      "Mixed mushrooms",
      "Vegetable stock",
      "White wine",
      "Parmesan",
      "Shallot",
      "Butter",
      "Thyme",
    ],
    nutrition: nutrition({
      calories: 340,
      protein: "11g",
      totalCarbohydrate: "48g",
      totalFat: "10g",
    }),
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    imageAlt: "Bowl of wild mushroom risotto",
  },
  {
    id: "mon-eggplant-parm",
    name: "Baked Eggplant Parmesan",
    category: "vegetarian",
    pricePerPortion: 11.5,
    description:
      "Layers of roasted eggplant, house marinara, and melted mozzarella baked until bubbling.",
    ingredients: [
      "Eggplant",
      "Marinara",
      "Mozzarella",
      "Parmesan",
      "Basil",
      "Olive oil",
      "Breadcrumbs",
    ],
    nutrition: nutrition({
      calories: 310,
      protein: "14g",
      totalFat: "16g",
      sodium: "620mg",
    }),
    image:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=800&q=80",
    imageAlt: "Baked eggplant Parmesan in a dish",
  },
  {
    id: "mon-lentil-stew",
    name: "Spiced Lentil Stew",
    category: "vegetarian",
    pricePerPortion: 10.5,
    description:
      "Hearty red lentils simmered with warm spices, tomatoes, and spinach.",
    ingredients: [
      "Red lentils",
      "Tomato",
      "Spinach",
      "Cumin",
      "Coriander",
      "Garlic",
      "Onion",
      "Vegetable stock",
    ],
    nutrition: nutrition({
      calories: 250,
      protein: "15g",
      totalFat: "4g",
      dietaryFiber: "12g",
      cholesterol: "0mg",
    }),
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    imageAlt: "Bowl of spiced lentil stew",
  },
  {
    id: "mon-garlic-green-beans",
    name: "Garlic Butter Green Beans",
    category: "sides",
    pricePerPortion: 5.5,
    description:
      "Blanched green beans tossed in garlic butter and finished with toasted almonds.",
    ingredients: [
      "Green beans",
      "Butter",
      "Garlic",
      "Almonds",
      "Lemon zest",
      "Salt",
    ],
    nutrition: nutrition({
      calories: 120,
      protein: "3g",
      totalFat: "8g",
      totalCarbohydrate: "10g",
      cholesterol: "15mg",
      sodium: "180mg",
    }),
    image:
      "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=800&q=80",
    imageAlt: "Garlic butter green beans with almonds",
  },
  {
    id: "mon-herb-potatoes",
    name: "Roasted Herb Potatoes",
    category: "sides",
    pricePerPortion: 5.0,
    description:
      "Crispy Yukon Gold potatoes tossed with olive oil, rosemary, and sea salt.",
    ingredients: [
      "Yukon Gold potatoes",
      "Olive oil",
      "Rosemary",
      "Sea salt",
      "Black pepper",
      "Garlic",
    ],
    nutrition: nutrition({
      calories: 180,
      protein: "3g",
      totalFat: "7g",
      totalCarbohydrate: "28g",
      cholesterol: "0mg",
      sodium: "220mg",
    }),
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&q=80",
    imageAlt: "Roasted herb potatoes on a sheet pan",
  },
];

function remapDay(items: FoodItem[], dayPrefix: string, nameTweaks: string[]): FoodItem[] {
  return items.map((item, index) => ({
    ...item,
    id: `${dayPrefix}-${item.id.split("-").slice(1).join("-")}`,
    name: nameTweaks[index] ?? item.name,
  }));
}

const tuesday = remapDay(monday, "tue", [
  "Lemon Pepper Roast Chicken",
  "Coffee-Rubbed Brisket",
  "Miso-Glazed Cod",
  "Chicken Parmesan Meatballs",
  "Apple Cider Pork Loin",
  "Butternut Squash Risotto",
  "Spinach & Ricotta Bake",
  "Chickpea Coconut Curry",
  "Honey-Glazed Carrots",
  "Creamy Mashed Potatoes",
]);

const wednesday = remapDay(monday, "wed", [
  "Paprika Roast Chicken",
  "Korean-Style Short Ribs",
  "Dill Butter Salmon",
  "Italian Sausage Links",
  "Honey Garlic Pork Chops",
  "Asparagus Lemon Risotto",
  "Zucchini Lasagna",
  "Three-Bean Chili",
  "Sesame Broccoli",
  "Wild Rice Pilaf",
]);

const thursday = remapDay(monday, "thu", [
  "Garlic Herb Whole Chicken",
  "Bourbon Braised Beef",
  "Teriyaki Glazed Salmon",
  "Beef & Veal Meatballs",
  "Chipotle Pork Shoulder",
  "Pea & Mint Risotto",
  "Caprese Stuffed Peppers",
  "Moroccan Vegetable Tagine",
  "Lemon Parmesan Asparagus",
  "Sweet Potato Mash",
]);

const friday = remapDay(monday, "fri", [
  "Crispy Skin Roast Chicken",
  "Red Wine Braised Chuck",
  "Blackened Catfish",
  "Swedish Turkey Meatballs",
  "Brown Sugar Glazed Ham",
  "Tomato Basil Risotto",
  "Cauliflower Gratin",
  "Black Bean Quinoa Bowl",
  "Charred Corn Salad",
  "Garlic Bread Rolls",
]);

const saturday = remapDay(monday, "sat", [
  "Sunday-Style Roast Chicken",
  "Smoked Beef Ribs",
  "Herb Crusted Halibut",
  "Lamb Meatballs",
  "Carnival Roast Pork",
  "Truffle Mushroom Risotto",
  "Roasted Vegetable Tian",
  "Paneer Tikka Masala",
  "Cucumber Dill Salad",
  "Cheesy Scalloped Potatoes",
]);

const sunday = remapDay(monday, "sun", [
  "Family Roast Chicken",
  "Pot Roast with Vegetables",
  "Lemon Butter Sole",
  "Sunday Meatball Platter",
  "Glazed Holiday Ham",
  "Spring Vegetable Risotto",
  "Stuffed Portobello Caps",
  "Garden Vegetable Soup",
  "Maple Roasted Squash",
  "Buttermilk Biscuits",
]);

export const menusByWeekday: Record<Weekday, FoodItem[]> = {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
};

export const weekdayLabels: Record<Weekday, string> = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

export function getWeekdayFromDate(date: Date): Weekday {
  const days: Weekday[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
}

export function getMenuForDate(date: Date): FoodItem[] {
  return menusByWeekday[getWeekdayFromDate(date)];
}

export function getFoodItemById(id: string): FoodItem | undefined {
  for (const items of Object.values(menusByWeekday)) {
    const found = items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export const categoryLabels: Record<FoodItem["category"], string> = {
  protein: "Protein",
  vegetarian: "Vegetarian",
  sides: "Sides",
};

export const categoryOrder: FoodItem["category"][] = [
  "protein",
  "vegetarian",
  "sides",
];
