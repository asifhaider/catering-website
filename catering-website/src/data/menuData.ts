import type { FoodItem, NutritionFacts, WeekdayIndex } from "../types";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Small deterministic hash so the same dish always gets the same "random" nutrition numbers. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRange(seed: number, min: number, max: number): number {
  const value = (seed % 1000) / 1000;
  return Math.round(min + value * (max - min));
}

interface NutritionRange {
  calories: [number, number];
  totalFat: [number, number];
  protein: [number, number];
  carbs: [number, number];
}

const NUTRITION_RANGES: Record<FoodItem["category"], NutritionRange> = {
  protein: { calories: [320, 520], totalFat: [12, 28], protein: [24, 42], carbs: [4, 20] },
  vegetarian: { calories: [180, 340], totalFat: [6, 18], protein: [5, 14], carbs: [18, 38] },
  side: { calories: [140, 260], totalFat: [3, 14], protein: [3, 9], carbs: [20, 40] },
};

function generateNutrition(name: string, category: FoodItem["category"]): NutritionFacts {
  const seed = hashString(name);
  const range = NUTRITION_RANGES[category];
  const calories = seededRange(seed, range.calories[0], range.calories[1]);
  const totalFatG = seededRange(seed >> 1, range.totalFat[0], range.totalFat[1]);
  const proteinG = seededRange(seed >> 2, range.protein[0], range.protein[1]);
  const totalCarbsG = seededRange(seed >> 3, range.carbs[0], range.carbs[1]);
  return {
    servingSize: "1 portion (~8 oz)",
    calories,
    totalFatG,
    saturatedFatG: Math.max(1, Math.round(totalFatG * 0.3)),
    cholesterolMg: category === "protein" ? seededRange(seed >> 4, 60, 120) : seededRange(seed >> 4, 0, 20),
    sodiumMg: seededRange(seed >> 5, 280, 780),
    totalCarbsG,
    dietaryFiberG: Math.max(1, Math.round(totalCarbsG * 0.15)),
    sugarsG: Math.max(0, Math.round(totalCarbsG * 0.2)),
    proteinG,
  };
}

const PRICE_RANGE: Record<FoodItem["category"], [number, number]> = {
  protein: [10, 14],
  vegetarian: [7, 10],
  side: [4, 6],
};

function generatePrice(name: string, category: FoodItem["category"]): number {
  const seed = hashString(name + "-price");
  const [min, max] = PRICE_RANGE[category];
  const cents = seededRange(seed, min * 100, max * 100);
  return Math.round(cents / 25) * 25 / 100;
}

interface DishSeed {
  name: string;
  category: FoodItem["category"];
  shortDescription: string;
  description: string;
  ingredients: string[];
  allergens: string[];
}

function buildItem(seed: DishSeed): FoodItem {
  const id = slugify(seed.name);
  return {
    id,
    name: seed.name,
    category: seed.category,
    pricePerPerson: generatePrice(seed.name, seed.category),
    imageUrl: `https://picsum.photos/seed/${id}/480/360`,
    imageAlt: `${seed.name}, plated and ready to serve`,
    shortDescription: seed.shortDescription,
    description: seed.description,
    ingredients: seed.ingredients,
    allergens: seed.allergens,
    nutrition: generateNutrition(seed.name, seed.category),
  };
}

interface DayMenuSeed {
  weekday: WeekdayIndex;
  dayName: string;
  theme: string;
  protein: DishSeed[];
  vegetarian: DishSeed[];
  side: DishSeed[];
}

const DAY_SEEDS: DayMenuSeed[] = [
  {
    weekday: 0,
    dayName: "Sunday",
    theme: "Comfort Classics",
    protein: [
      { name: "Slow-Roasted Pot Roast", category: "protein", shortDescription: "Fork-tender beef braised with root vegetables.", description: "Chuck roast slow-braised for six hours with carrots, onions, and celery in a savory beef broth until fork-tender.", ingredients: ["Beef chuck roast", "Carrots", "Celery", "Onion", "Beef broth", "Garlic", "Thyme", "Bay leaf"], allergens: [] },
      { name: "Buttermilk Fried Chicken", category: "protein", shortDescription: "Crispy, golden fried chicken, buttermilk-brined overnight.", description: "Bone-in chicken thighs brined overnight in buttermilk and spices, then dredged and fried to a crackling golden crust.", ingredients: ["Chicken thighs", "Buttermilk", "Flour", "Paprika", "Garlic powder", "Cayenne pepper", "Salt"], allergens: ["Dairy", "Gluten"] },
      { name: "Honey-Glazed Ham", category: "protein", shortDescription: "Bone-in ham glazed with honey and brown sugar.", description: "Bone-in spiral-cut ham slow-baked with a honey, brown sugar, and clove glaze until caramelized.", ingredients: ["Bone-in ham", "Honey", "Brown sugar", "Dijon mustard", "Cloves"], allergens: ["Mustard"] },
      { name: "Meatloaf with Tomato Glaze", category: "protein", shortDescription: "Classic beef meatloaf topped with a tangy glaze.", description: "Ground beef and pork blended with breadcrumbs, egg, and onion, baked and finished with a tangy tomato glaze.", ingredients: ["Ground beef", "Ground pork", "Breadcrumbs", "Egg", "Onion", "Tomato sauce", "Brown sugar"], allergens: ["Gluten", "Egg"] },
      { name: "Herb-Roasted Turkey Breast", category: "protein", shortDescription: "Turkey breast roasted with rosemary and sage.", description: "Bone-in turkey breast rubbed with fresh rosemary, sage, and thyme, roasted until juicy and golden.", ingredients: ["Turkey breast", "Butter", "Rosemary", "Sage", "Thyme", "Garlic"], allergens: ["Dairy"] },
    ],
    vegetarian: [
      { name: "Three-Cheese Baked Ziti", category: "vegetarian", shortDescription: "Baked pasta with ricotta, mozzarella, and parmesan.", description: "Ziti pasta baked in marinara with layers of ricotta, mozzarella, and parmesan until bubbling.", ingredients: ["Ziti pasta", "Ricotta", "Mozzarella", "Parmesan", "Marinara sauce", "Basil"], allergens: ["Gluten", "Dairy"] },
      { name: "Vegetable Pot Pie", category: "vegetarian", shortDescription: "Flaky pie filled with root vegetables in gravy.", description: "A buttery, flaky crust filled with carrots, peas, potatoes, and mushrooms in a rich vegetarian gravy.", ingredients: ["Pie crust", "Carrots", "Peas", "Potatoes", "Mushrooms", "Vegetable broth", "Butter"], allergens: ["Gluten", "Dairy"] },
      { name: "Stuffed Bell Peppers", category: "vegetarian", shortDescription: "Bell peppers stuffed with rice, beans, and cheese.", description: "Bell peppers filled with a savory mix of rice, black beans, corn, and cheese, baked until tender.", ingredients: ["Bell peppers", "Rice", "Black beans", "Corn", "Cheddar cheese", "Tomato sauce"], allergens: ["Dairy"] },
    ],
    side: [
      { name: "Garlic Mashed Potatoes", category: "side", shortDescription: "Creamy potatoes with roasted garlic and butter.", description: "Yukon gold potatoes mashed with roasted garlic, butter, and cream until silky smooth.", ingredients: ["Yukon gold potatoes", "Roasted garlic", "Butter", "Cream", "Salt"], allergens: ["Dairy"] },
      { name: "Southern Green Beans", category: "side", shortDescription: "Slow-simmered green beans with smoked turkey.", description: "Fresh green beans simmered low and slow with smoked turkey, onion, and a touch of vinegar.", ingredients: ["Green beans", "Smoked turkey", "Onion", "Chicken broth", "Vinegar"], allergens: [] },
    ],
  },
  {
    weekday: 1,
    dayName: "Monday",
    theme: "Mediterranean Table",
    protein: [
      { name: "Lemon Herb Grilled Chicken", category: "protein", shortDescription: "Chicken marinated in lemon, garlic, and oregano.", description: "Boneless chicken breast marinated in lemon juice, garlic, and oregano, then chargrilled.", ingredients: ["Chicken breast", "Lemon juice", "Garlic", "Oregano", "Olive oil"], allergens: [] },
      { name: "Beef & Lamb Kofta Kebabs", category: "protein", shortDescription: "Spiced ground beef and lamb skewers.", description: "A blend of ground beef and lamb seasoned with cumin, coriander, and parsley, formed onto skewers and grilled.", ingredients: ["Ground beef", "Ground lamb", "Cumin", "Coriander", "Parsley", "Onion"], allergens: [] },
      { name: "Pan-Seared Salmon with Tzatziki", category: "protein", shortDescription: "Salmon filet with a cool cucumber-yogurt sauce.", description: "Salmon filets pan-seared crisp and served with a house-made tzatziki of cucumber, yogurt, and dill.", ingredients: ["Salmon", "Greek yogurt", "Cucumber", "Dill", "Garlic", "Lemon"], allergens: ["Fish", "Dairy"] },
      { name: "Chicken Shawarma", category: "protein", shortDescription: "Slow-roasted spiced chicken thighs.", description: "Chicken thighs marinated in a blend of turmeric, cumin, and paprika, roasted and thinly sliced.", ingredients: ["Chicken thighs", "Turmeric", "Cumin", "Paprika", "Garlic", "Yogurt"], allergens: ["Dairy"] },
      { name: "Braised Lamb Shoulder", category: "protein", shortDescription: "Lamb braised with tomatoes, cinnamon, and mint.", description: "Lamb shoulder slow-braised with tomatoes, warm cinnamon, and fresh mint until deeply tender.", ingredients: ["Lamb shoulder", "Tomatoes", "Cinnamon", "Mint", "Onion", "Garlic"], allergens: [] },
    ],
    vegetarian: [
      { name: "Falafel with Tahini Sauce", category: "vegetarian", shortDescription: "Crispy chickpea fritters with tahini drizzle.", description: "Ground chickpeas blended with herbs and spices, fried until crisp, served with a creamy tahini sauce.", ingredients: ["Chickpeas", "Parsley", "Cilantro", "Cumin", "Tahini", "Lemon"], allergens: ["Sesame"] },
      { name: "Spanakopita", category: "vegetarian", shortDescription: "Flaky phyllo pastry filled with spinach and feta.", description: "Layers of buttery phyllo dough wrapped around a filling of spinach, feta, and dill.", ingredients: ["Phyllo dough", "Spinach", "Feta cheese", "Dill", "Egg", "Butter"], allergens: ["Gluten", "Dairy", "Egg"] },
      { name: "Mediterranean Stuffed Eggplant", category: "vegetarian", shortDescription: "Roasted eggplant filled with rice, tomato, and herbs.", description: "Halved eggplant roasted and filled with a fragrant mix of rice, tomato, pine nuts, and herbs.", ingredients: ["Eggplant", "Rice", "Tomato", "Pine nuts", "Parsley", "Olive oil"], allergens: ["Tree nuts"] },
    ],
    side: [
      { name: "Greek Lemon Rice", category: "side", shortDescription: "Fluffy rice brightened with lemon and herbs.", description: "Long-grain rice simmered in broth with fresh lemon zest, dill, and a touch of olive oil.", ingredients: ["Rice", "Vegetable broth", "Lemon", "Dill", "Olive oil"], allergens: [] },
      { name: "Roasted Vegetable Medley", category: "side", shortDescription: "Zucchini, peppers, and onions roasted with herbs.", description: "Zucchini, bell peppers, and red onion roasted with olive oil, oregano, and a splash of balsamic.", ingredients: ["Zucchini", "Bell peppers", "Red onion", "Olive oil", "Oregano", "Balsamic vinegar"], allergens: [] },
    ],
  },
  {
    weekday: 2,
    dayName: "Tuesday",
    theme: "Tex-Mex Fiesta",
    protein: [
      { name: "Carne Asada", category: "protein", shortDescription: "Grilled marinated skirt steak, sliced thin.", description: "Skirt steak marinated in lime, garlic, and cilantro, grilled hot and fast, then sliced against the grain.", ingredients: ["Skirt steak", "Lime juice", "Garlic", "Cilantro", "Cumin"], allergens: [] },
      { name: "Chicken Tinga", category: "protein", shortDescription: "Shredded chicken in a smoky chipotle-tomato sauce.", description: "Poached chicken shredded and simmered in a smoky chipotle and tomato sauce with onions.", ingredients: ["Chicken breast", "Chipotle peppers", "Tomato", "Onion", "Garlic"], allergens: [] },
      { name: "Carnitas", category: "protein", shortDescription: "Slow-braised pork shoulder, crisped to order.", description: "Pork shoulder braised low and slow in citrus and spices until it shreds easily, then crisped.", ingredients: ["Pork shoulder", "Orange juice", "Lime juice", "Cumin", "Bay leaf"], allergens: [] },
      { name: "Beer-Braised Beef Barbacoa", category: "protein", shortDescription: "Tender shredded beef in a rich chile sauce.", description: "Beef chuck braised with a blend of dried chiles, cumin, and dark beer until deeply tender.", ingredients: ["Beef chuck", "Dried chiles", "Cumin", "Garlic", "Beer"], allergens: ["Gluten"] },
      { name: "Chili-Lime Shrimp", category: "protein", shortDescription: "Shrimp tossed in chili and fresh lime.", description: "Gulf shrimp sauteed with chili powder, garlic, and a generous squeeze of fresh lime.", ingredients: ["Shrimp", "Chili powder", "Garlic", "Lime juice", "Butter"], allergens: ["Shellfish", "Dairy"] },
    ],
    vegetarian: [
      { name: "Black Bean & Corn Enchiladas", category: "vegetarian", shortDescription: "Corn tortillas rolled with black beans and cheese.", description: "Corn tortillas filled with black beans, roasted corn, and cheese, baked in a red chile sauce.", ingredients: ["Corn tortillas", "Black beans", "Corn", "Cheddar cheese", "Red chile sauce"], allergens: ["Dairy"] },
      { name: "Vegetarian Chile Relleno", category: "vegetarian", shortDescription: "Roasted poblano stuffed with cheese, lightly fried.", description: "Fire-roasted poblano peppers stuffed with melted cheese, battered and lightly fried.", ingredients: ["Poblano peppers", "Monterey jack cheese", "Egg", "Flour"], allergens: ["Dairy", "Egg", "Gluten"] },
      { name: "Grilled Veggie & Bean Fajitas", category: "vegetarian", shortDescription: "Peppers, onions, and pinto beans, fajita-style.", description: "Bell peppers and onions charred fajita-style and tossed with seasoned pinto beans.", ingredients: ["Bell peppers", "Onion", "Pinto beans", "Cumin", "Chili powder"], allergens: [] },
    ],
    side: [
      { name: "Cilantro Lime Rice", category: "side", shortDescription: "Fluffy rice with fresh cilantro and lime.", description: "Long-grain rice tossed with fresh cilantro, lime juice, and a hint of garlic.", ingredients: ["Rice", "Cilantro", "Lime", "Garlic"], allergens: [] },
      { name: "Charro Beans", category: "side", shortDescription: "Pinto beans simmered with bacon and tomato.", description: "Pinto beans slow-simmered with bacon, tomato, onion, and jalapeno.", ingredients: ["Pinto beans", "Bacon", "Tomato", "Onion", "Jalapeno"], allergens: [] },
    ],
  },
  {
    weekday: 3,
    dayName: "Wednesday",
    theme: "Asian Fusion",
    protein: [
      { name: "Teriyaki Glazed Chicken", category: "protein", shortDescription: "Chicken thighs glazed in a sweet-savory teriyaki sauce.", description: "Chicken thighs seared and glazed with a house-made teriyaki sauce of soy, ginger, and brown sugar.", ingredients: ["Chicken thighs", "Soy sauce", "Ginger", "Brown sugar", "Garlic"], allergens: ["Soy", "Gluten"] },
      { name: "Mongolian Beef", category: "protein", shortDescription: "Crispy beef strips in a savory-sweet sauce.", description: "Thinly sliced beef flash-fried until crisp and tossed in a savory-sweet soy and garlic sauce.", ingredients: ["Beef flank steak", "Soy sauce", "Garlic", "Ginger", "Brown sugar", "Green onion"], allergens: ["Soy", "Gluten"] },
      { name: "General Tso's Tofu", category: "protein", shortDescription: "Crispy tofu tossed in a tangy-sweet chili sauce.", description: "Crispy fried tofu tossed in a tangy-sweet chili and garlic sauce, topped with sesame seeds.", ingredients: ["Tofu", "Soy sauce", "Garlic", "Chili paste", "Cornstarch", "Sesame seeds"], allergens: ["Soy", "Sesame"] },
      { name: "Korean BBQ Short Ribs", category: "protein", shortDescription: "Beef short ribs marinated in a sweet soy glaze.", description: "Beef short ribs marinated in soy, pear, and garlic, then grilled to a caramelized char.", ingredients: ["Beef short ribs", "Soy sauce", "Asian pear", "Garlic", "Sesame oil"], allergens: ["Soy", "Sesame"] },
      { name: "Orange Ginger Salmon", category: "protein", shortDescription: "Salmon glazed with fresh orange and ginger.", description: "Salmon filets glazed with fresh orange juice, ginger, and a touch of soy, broiled until caramelized.", ingredients: ["Salmon", "Orange juice", "Ginger", "Soy sauce", "Honey"], allergens: ["Fish", "Soy"] },
    ],
    vegetarian: [
      { name: "Vegetable Fried Rice", category: "vegetarian", shortDescription: "Wok-tossed rice with egg and mixed vegetables.", description: "Day-old rice wok-tossed with egg, carrots, peas, and green onion in a light soy seasoning.", ingredients: ["Rice", "Egg", "Carrots", "Peas", "Green onion", "Soy sauce"], allergens: ["Egg", "Soy"] },
      { name: "Vegetable Lo Mein", category: "vegetarian", shortDescription: "Wheat noodles tossed with vegetables and soy.", description: "Wheat noodles stir-fried with cabbage, carrots, and mushrooms in a savory soy-sesame sauce.", ingredients: ["Wheat noodles", "Cabbage", "Carrots", "Mushrooms", "Soy sauce", "Sesame oil"], allergens: ["Gluten", "Soy", "Sesame"] },
      { name: "Vegetable Pad Thai", category: "vegetarian", shortDescription: "Rice noodles with tamarind sauce and peanuts.", description: "Rice noodles stir-fried with egg, bean sprouts, and a tangy tamarind sauce, topped with crushed peanuts.", ingredients: ["Rice noodles", "Egg", "Bean sprouts", "Tamarind paste", "Peanuts"], allergens: ["Egg", "Peanuts"] },
    ],
    side: [
      { name: "Garlic Bok Choy", category: "side", shortDescription: "Baby bok choy stir-fried with garlic.", description: "Baby bok choy quickly stir-fried with garlic and a touch of sesame oil.", ingredients: ["Bok choy", "Garlic", "Sesame oil", "Soy sauce"], allergens: ["Soy", "Sesame"] },
      { name: "Steamed Jasmine Rice", category: "side", shortDescription: "Fragrant steamed jasmine rice.", description: "Classic steamed jasmine rice, light and fragrant.", ingredients: ["Jasmine rice", "Water"], allergens: [] },
    ],
  },
  {
    weekday: 4,
    dayName: "Thursday",
    theme: "Southern Soul",
    protein: [
      { name: "Smothered Pork Chops", category: "protein", shortDescription: "Pork chops braised in a rich onion gravy.", description: "Bone-in pork chops seared and braised low in a rich onion and pan gravy.", ingredients: ["Pork chops", "Onion", "Flour", "Chicken broth", "Black pepper"], allergens: ["Gluten"] },
      { name: "Cajun Blackened Catfish", category: "protein", shortDescription: "Catfish filets seasoned with a Cajun spice blend.", description: "Catfish filets coated in a bold Cajun spice blend and blackened in a cast-iron skillet.", ingredients: ["Catfish", "Paprika", "Cayenne pepper", "Garlic powder", "Butter"], allergens: ["Fish", "Dairy"] },
      { name: "Smoked BBQ Chicken", category: "protein", shortDescription: "Chicken quarters slow-smoked and glazed with BBQ sauce.", description: "Chicken quarters slow-smoked over hickory and finished with a tangy house BBQ sauce.", ingredients: ["Chicken quarters", "BBQ sauce", "Paprika", "Brown sugar"], allergens: [] },
      { name: "Country Fried Steak", category: "protein", shortDescription: "Breaded steak fried crisp, topped with white gravy.", description: "Tenderized beef steak breaded and fried golden, smothered in creamy peppered white gravy.", ingredients: ["Beef cube steak", "Flour", "Buttermilk", "Black pepper", "Milk"], allergens: ["Gluten", "Dairy"] },
      { name: "Jambalaya with Andouille Sausage", category: "protein", shortDescription: "Rice simmered with sausage, chicken, and shrimp.", description: "A one-pot classic of rice simmered with andouille sausage, chicken, shrimp, and the holy trinity of vegetables.", ingredients: ["Rice", "Andouille sausage", "Chicken", "Shrimp", "Bell pepper", "Celery", "Onion"], allergens: ["Shellfish"] },
    ],
    vegetarian: [
      { name: "Red Beans & Rice", category: "vegetarian", shortDescription: "Creamy red beans simmered with Creole spices.", description: "Red beans slow-simmered with onion, celery, and Creole spices until creamy, served over rice.", ingredients: ["Red beans", "Rice", "Onion", "Celery", "Creole seasoning"], allergens: [] },
      { name: "Black-Eyed Pea Cakes", category: "vegetarian", shortDescription: "Crispy patties made from black-eyed peas.", description: "Mashed black-eyed peas seasoned and pan-fried into crispy, golden patties.", ingredients: ["Black-eyed peas", "Breadcrumbs", "Onion", "Egg", "Paprika"], allergens: ["Gluten", "Egg"] },
      { name: "Cornbread-Stuffed Acorn Squash", category: "vegetarian", shortDescription: "Roasted squash filled with savory cornbread stuffing.", description: "Roasted acorn squash halves filled with a savory cornbread, pecan, and herb stuffing.", ingredients: ["Acorn squash", "Cornbread", "Pecans", "Sage", "Butter"], allergens: ["Gluten", "Tree nuts", "Dairy"] },
    ],
    side: [
      { name: "Creamy Stone-Ground Grits", category: "side", shortDescription: "Slow-cooked grits with butter and cheese.", description: "Stone-ground grits slow-cooked in broth and finished with butter and sharp cheddar.", ingredients: ["Grits", "Butter", "Cheddar cheese", "Chicken broth"], allergens: ["Dairy"] },
      { name: "Collard Greens", category: "side", shortDescription: "Slow-braised collards with smoked ham hock.", description: "Collard greens braised low and slow with smoked ham hock, onion, and a splash of vinegar.", ingredients: ["Collard greens", "Ham hock", "Onion", "Vinegar"], allergens: [] },
    ],
  },
  {
    weekday: 5,
    dayName: "Friday",
    theme: "Italian Kitchen",
    protein: [
      { name: "Chicken Parmesan", category: "protein", shortDescription: "Breaded chicken topped with marinara and mozzarella.", description: "Breaded chicken breast fried golden, topped with marinara and melted mozzarella, baked until bubbly.", ingredients: ["Chicken breast", "Breadcrumbs", "Marinara sauce", "Mozzarella", "Parmesan"], allergens: ["Gluten", "Dairy"] },
      { name: "Classic Beef Lasagna", category: "protein", shortDescription: "Layered pasta with beef ragu and three cheeses.", description: "Layers of pasta, slow-simmered beef ragu, ricotta, mozzarella, and parmesan, baked until golden.", ingredients: ["Lasagna noodles", "Ground beef", "Ricotta", "Mozzarella", "Marinara sauce"], allergens: ["Gluten", "Dairy"] },
      { name: "Osso Buco", category: "protein", shortDescription: "Braised veal shanks with a bright gremolata.", description: "Veal shanks braised in white wine and tomato until falling off the bone, topped with fresh gremolata.", ingredients: ["Veal shanks", "White wine", "Tomato", "Carrot", "Celery", "Lemon zest"], allergens: [] },
      { name: "Italian Sausage & Peppers", category: "protein", shortDescription: "Sweet sausage simmered with peppers and onions.", description: "Sweet Italian sausage seared and simmered with bell peppers, onions, and a light tomato sauce.", ingredients: ["Italian sausage", "Bell peppers", "Onion", "Tomato sauce"], allergens: [] },
      { name: "Shrimp Scampi", category: "protein", shortDescription: "Shrimp sauteed in garlic butter and white wine.", description: "Gulf shrimp sauteed in garlic, butter, white wine, and a squeeze of lemon.", ingredients: ["Shrimp", "Garlic", "Butter", "White wine", "Lemon", "Parsley"], allergens: ["Shellfish", "Dairy"] },
    ],
    vegetarian: [
      { name: "Eggplant Parmesan", category: "vegetarian", shortDescription: "Breaded eggplant layered with marinara and cheese.", description: "Breaded eggplant slices layered with marinara, mozzarella, and parmesan, baked until bubbling.", ingredients: ["Eggplant", "Breadcrumbs", "Marinara sauce", "Mozzarella", "Parmesan"], allergens: ["Gluten", "Dairy"] },
      { name: "Mushroom Risotto", category: "vegetarian", shortDescription: "Creamy arborio rice with wild mushrooms.", description: "Arborio rice slowly stirred with vegetable broth, white wine, and sauteed wild mushrooms until creamy.", ingredients: ["Arborio rice", "Wild mushrooms", "Vegetable broth", "White wine", "Parmesan"], allergens: ["Dairy"] },
      { name: "Caprese Stuffed Portobellos", category: "vegetarian", shortDescription: "Portobello caps filled with tomato, mozzarella, basil.", description: "Roasted portobello mushroom caps filled with fresh tomato, mozzarella, and basil, drizzled with balsamic glaze.", ingredients: ["Portobello mushrooms", "Tomato", "Mozzarella", "Basil", "Balsamic glaze"], allergens: ["Dairy"] },
    ],
    side: [
      { name: "Garlic Parmesan Roasted Potatoes", category: "side", shortDescription: "Crispy potatoes tossed with garlic and parmesan.", description: "Baby potatoes roasted until crispy, tossed with garlic, parmesan, and fresh rosemary.", ingredients: ["Baby potatoes", "Garlic", "Parmesan", "Rosemary", "Olive oil"], allergens: ["Dairy"] },
      { name: "Caesar Salad", category: "side", shortDescription: "Crisp romaine with parmesan and garlic croutons.", description: "Crisp romaine lettuce tossed with creamy Caesar dressing, parmesan, and garlic croutons.", ingredients: ["Romaine lettuce", "Parmesan", "Croutons", "Caesar dressing"], allergens: ["Gluten", "Dairy", "Egg", "Fish"] },
    ],
  },
  {
    weekday: 6,
    dayName: "Saturday",
    theme: "Backyard BBQ",
    protein: [
      { name: "Hickory-Smoked Beef Brisket", category: "protein", shortDescription: "Brisket smoked low and slow for 14 hours.", description: "Beef brisket rubbed with a signature spice blend and smoked over hickory for fourteen hours until tender.", ingredients: ["Beef brisket", "Brown sugar", "Paprika", "Black pepper", "Garlic powder"], allergens: [] },
      { name: "St. Louis Style Ribs", category: "protein", shortDescription: "Pork ribs smoked and glazed with BBQ sauce.", description: "St. Louis cut pork ribs dry-rubbed, smoked, and finished with a sticky house BBQ glaze.", ingredients: ["Pork ribs", "Brown sugar", "Paprika", "BBQ sauce"], allergens: [] },
      { name: "Pulled Pork", category: "protein", shortDescription: "Slow-smoked pork shoulder, hand-pulled.", description: "Pork shoulder smoked for twelve hours, hand-pulled and tossed with a light vinegar BBQ sauce.", ingredients: ["Pork shoulder", "Vinegar", "Brown sugar", "Paprika"], allergens: [] },
      { name: "Grilled BBQ Chicken Thighs", category: "protein", shortDescription: "Bone-in thighs grilled and basted with BBQ sauce.", description: "Bone-in chicken thighs grilled over open flame and basted with a smoky-sweet BBQ sauce.", ingredients: ["Chicken thighs", "BBQ sauce", "Paprika", "Brown sugar"], allergens: [] },
      { name: "Smoked Beef Sausage", category: "protein", shortDescription: "Coarse-ground beef sausage, smoked in-house.", description: "Coarse-ground beef sausage seasoned with black pepper and garlic, smoked in-house until snappy.", ingredients: ["Ground beef", "Black pepper", "Garlic", "Beef casing"], allergens: [] },
    ],
    vegetarian: [
      { name: "BBQ Jackfruit Sliders", category: "vegetarian", shortDescription: "Pulled jackfruit tossed in smoky BBQ sauce.", description: "Young jackfruit shredded and simmered in a smoky BBQ sauce, served slider-style.", ingredients: ["Jackfruit", "BBQ sauce", "Onion", "Slider buns"], allergens: ["Gluten"] },
      { name: "Grilled Portobello Steaks", category: "vegetarian", shortDescription: "Marinated portobellos grilled like a steak.", description: "Whole portobello caps marinated in balsamic and herbs, grilled until juicy and steak-like.", ingredients: ["Portobello mushrooms", "Balsamic vinegar", "Garlic", "Thyme"], allergens: [] },
      { name: "Smoked Vegetable Skewers", category: "vegetarian", shortDescription: "Zucchini, peppers, and mushrooms, smoked.", description: "Zucchini, bell pepper, red onion, and mushroom skewers smoked over hickory with a light herb marinade.", ingredients: ["Zucchini", "Bell pepper", "Red onion", "Mushrooms", "Olive oil"], allergens: [] },
    ],
    side: [
      { name: "Classic Coleslaw", category: "side", shortDescription: "Crunchy cabbage slaw in a creamy dressing.", description: "Shredded cabbage and carrot tossed in a tangy, creamy mayonnaise-based dressing.", ingredients: ["Cabbage", "Carrot", "Mayonnaise", "Apple cider vinegar", "Sugar"], allergens: ["Egg"] },
      { name: "Smoky Baked Beans", category: "side", shortDescription: "Baked beans simmered with brown sugar and bacon.", description: "Navy beans slow-baked with brown sugar, molasses, bacon, and a touch of smoky BBQ sauce.", ingredients: ["Navy beans", "Brown sugar", "Molasses", "Bacon", "BBQ sauce"], allergens: [] },
    ],
  },
];

export interface DayMenu {
  weekday: WeekdayIndex;
  dayName: string;
  theme: string;
  items: FoodItem[];
}

export const WEEKLY_MENUS: Record<WeekdayIndex, DayMenu> = DAY_SEEDS.reduce(
  (acc, day) => {
    acc[day.weekday] = {
      weekday: day.weekday,
      dayName: day.dayName,
      theme: day.theme,
      items: [...day.protein, ...day.vegetarian, ...day.side].map(buildItem),
    };
    return acc;
  },
  {} as Record<WeekdayIndex, DayMenu>,
);

export const ALL_ITEMS: FoodItem[] = Object.values(WEEKLY_MENUS).flatMap((d) => d.items);

export function getItemById(id: string): FoodItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}

export function getMenuForDate(date: Date): DayMenu {
  return WEEKLY_MENUS[date.getDay() as WeekdayIndex];
}
