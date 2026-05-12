// All food items available across the week
export const foodItems = {
  // ─── PROTEINS ────────────────────────────────────────────────────────────
  'butter-chicken': {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    category: 'protein',
    pricePerPerson: 12,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop&q=80',
    description:
      'Tender chicken pieces slow-cooked in a velvety tomato-cream sauce kissed with aromatic spices. A beloved classic perfected over generations.',
    ingredients: [
      'Bone-in chicken thighs', 'Roma tomatoes', 'Heavy cream', 'Butter',
      'Garlic', 'Fresh ginger', 'Garam masala', 'Kashmiri red chili',
      'Dried fenugreek leaves', 'Cardamom pods', 'Cinnamon',
    ],
    nutrition: { calories: 380, protein: 32, carbs: 12, fat: 22, fiber: 2, sodium: 620 },
  },
  'beef-biryani': {
    id: 'beef-biryani',
    name: 'Beef Biryani',
    category: 'protein',
    pricePerPerson: 14,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&q=80',
    description:
      'Fragrant aged basmati rice layered with slow-braised beef, crispy caramelized onions, and saffron. A royal dish requiring patience and love.',
    ingredients: [
      'Aged basmati rice', 'Beef chuck', 'Caramelized onions', 'Saffron',
      'Cardamom', 'Cloves', 'Cinnamon', 'Bay leaves', 'Fresh mint',
      'Full-fat yogurt', 'Ghee', 'Fried cashews',
    ],
    nutrition: { calories: 480, protein: 28, carbs: 52, fat: 18, fiber: 3, sodium: 580 },
  },
  'lamb-korma': {
    id: 'lamb-korma',
    name: 'Lamb Korma',
    category: 'protein',
    pricePerPerson: 16,
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&h=400&fit=crop&q=80',
    description:
      'Succulent lamb shoulder slow-cooked in a rich, aromatic gravy of cashews, yogurt, and warming spices. Rich, indulgent, and utterly satisfying.',
    ingredients: [
      'Lamb shoulder', 'Cashew paste', 'Full-fat yogurt', 'Onions', 'Garlic',
      'Ginger', 'Saffron', 'Rose water', 'Cardamom', 'Cloves', 'Mace', 'Kewra',
    ],
    nutrition: { calories: 440, protein: 35, carbs: 8, fat: 28, fiber: 1, sodium: 540 },
  },
  'chicken-tikka-masala': {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    category: 'protein',
    pricePerPerson: 13,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&q=80',
    description:
      'Smoky chargrilled chicken tikka simmered in a tangy, vibrant masala sauce. A crowd-pleaser with the perfect balance of heat and richness.',
    ingredients: [
      'Chicken breast', 'Yogurt marinade', 'Tomato puree', 'Heavy cream',
      'Onions', 'Green peppers', 'Ginger-garlic paste', 'Fenugreek',
      'Coriander powder', 'Cumin', 'Smoked paprika',
    ],
    nutrition: { calories: 360, protein: 34, carbs: 14, fat: 20, fiber: 3, sodium: 660 },
  },
  'shrimp-curry': {
    id: 'shrimp-curry',
    name: 'Shrimp Curry',
    category: 'protein',
    pricePerPerson: 15,
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&h=400&fit=crop&q=80',
    description:
      'Plump tiger shrimp simmered in a golden coconut-tomato curry with mustard seeds and curry leaves. Fresh, fragrant, and full of coastal character.',
    ingredients: [
      'Tiger shrimp', 'Coconut milk', 'Tomatoes', 'Mustard seeds', 'Curry leaves',
      'Turmeric', 'Red chili', 'Ginger', 'Garlic', 'Onions', 'Coconut oil',
    ],
    nutrition: { calories: 290, protein: 28, carbs: 10, fat: 16, fiber: 2, sodium: 540 },
  },
  'beef-nihari': {
    id: 'beef-nihari',
    name: 'Beef Nihari',
    category: 'protein',
    pricePerPerson: 15,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop&q=80',
    description:
      'A slow-cooked overnight stew of beef shank in a deeply spiced, silky gravy. Traditionally a dawn meal, now a celebration dish that warms the soul.',
    ingredients: [
      'Beef shank', 'Nihari masala', 'Whole wheat flour', 'Ginger',
      'Green chilies', 'Fried onions', 'Ghee', 'Coriander', 'Lemon',
      'Cardamom', 'Fennel seeds', 'Star anise',
    ],
    nutrition: { calories: 420, protein: 36, carbs: 14, fat: 24, fiber: 2, sodium: 700 },
  },
  'chicken-haleem': {
    id: 'chicken-haleem',
    name: 'Chicken Haleem',
    category: 'protein',
    pricePerPerson: 12,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&q=80',
    description:
      'A slow-cooked blend of shredded chicken, lentils, and broken wheat — pounded to a luscious, porridge-like consistency and topped with crispy onions.',
    ingredients: [
      'Chicken', 'Red lentils', 'Chana dal', 'Cracked wheat', 'Fried onions',
      'Ginger-garlic paste', 'Haleem masala', 'Lemon', 'Fresh mint',
      'Green chilies', 'Ghee',
    ],
    nutrition: { calories: 340, protein: 30, carbs: 28, fat: 12, fiber: 5, sodium: 580 },
  },
  'mutton-biryani': {
    id: 'mutton-biryani',
    name: 'Mutton Biryani',
    category: 'protein',
    pricePerPerson: 17,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop&q=80',
    description:
      'Tender slow-cooked mutton and aromatic basmati rice sealed and dum-cooked in a vessel. The steam-opened lid releases an intoxicating aroma.',
    ingredients: [
      'Mutton on bone', 'Aged basmati rice', 'Saffron milk', 'Fried onions',
      'Biryani masala', 'Whole spices', 'Yogurt', 'Fresh mint', 'Ghee',
      'Kewra water', 'Rose water',
    ],
    nutrition: { calories: 510, protein: 30, carbs: 54, fat: 20, fiber: 3, sodium: 610 },
  },
  'chicken-karahi': {
    id: 'chicken-karahi',
    name: 'Chicken Karahi',
    category: 'protein',
    pricePerPerson: 13,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop&q=80',
    description:
      'A bold, tomato-forward chicken stir-fry with whole black peppercorns, ginger julienne, and fresh coriander. Made in a karahi (wok) for the best char.',
    ingredients: [
      'Whole chicken cut', 'Fresh tomatoes', 'Black peppercorns', 'Ginger julienne',
      'Green chilies', 'Garlic', 'Fresh coriander', 'Ghee', 'Cumin seeds',
    ],
    nutrition: { calories: 350, protein: 33, carbs: 8, fat: 20, fiber: 2, sodium: 500 },
  },
  'beef-kofta-curry': {
    id: 'beef-kofta-curry',
    name: 'Beef Kofta Curry',
    category: 'protein',
    pricePerPerson: 14,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&q=80',
    description:
      'Spiced ground-beef meatballs simmered in a rich, aromatic onion-tomato gravy. Each kofta is hand-rolled and packed with herbs and spices.',
    ingredients: [
      'Ground beef', 'Onions', 'Fresh coriander', 'Green chilies', 'Egg',
      'Breadcrumbs', 'Tomato gravy', 'Yogurt', 'Garam masala', 'Cardamom',
    ],
    nutrition: { calories: 400, protein: 30, carbs: 16, fat: 24, fiber: 3, sodium: 640 },
  },
  'prawn-masala': {
    id: 'prawn-masala',
    name: 'Prawn Masala',
    category: 'protein',
    pricePerPerson: 16,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop&q=80',
    description:
      'Jumbo prawns cooked in a vibrant, dry masala of fresh tomatoes, onions, and coastal spices. Quick to cook, impossible to forget.',
    ingredients: [
      'Jumbo prawns', 'Tomatoes', 'Onions', 'Garlic', 'Ginger',
      'Turmeric', 'Chili powder', 'Coriander powder', 'Curry leaves',
      'Fresh coriander', 'Lemon',
    ],
    nutrition: { calories: 280, protein: 30, carbs: 8, fat: 14, fiber: 2, sodium: 520 },
  },
  'chicken-seekh-kebab': {
    id: 'chicken-seekh-kebab',
    name: 'Chicken Seekh Kebab',
    category: 'protein',
    pricePerPerson: 13,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80',
    description:
      'Minced chicken mixed with herbs, onions, and spices — shaped on skewers and cooked over a flame. Served with mint chutney and pickled onions.',
    ingredients: [
      'Ground chicken', 'Fresh coriander', 'Mint', 'Green chilies', 'Onions',
      'Ginger-garlic paste', 'Seekh kebab masala', 'Egg', 'Breadcrumbs',
    ],
    nutrition: { calories: 320, protein: 28, carbs: 10, fat: 18, fiber: 1, sodium: 480 },
  },
  'fish-tahari': {
    id: 'fish-tahari',
    name: 'Fish Tahari',
    category: 'protein',
    pricePerPerson: 14,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
    description:
      'A fragrant one-pot dish of flaky white fish and basmati rice, cooked in a spiced, saffron-tinted broth with crispy fried onions on top.',
    ingredients: [
      'White fish fillets', 'Basmati rice', 'Fried onions', 'Saffron',
      'Turmeric', 'Cumin', 'Coriander', 'Ginger', 'Garlic', 'Bay leaves', 'Ghee',
    ],
    nutrition: { calories: 420, protein: 26, carbs: 50, fat: 14, fiber: 2, sodium: 560 },
  },
  'bbq-chicken': {
    id: 'bbq-chicken',
    name: 'BBQ Chicken',
    category: 'protein',
    pricePerPerson: 12,
    image: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?w=600&h=400&fit=crop&q=80',
    description:
      'Overnight-marinated chicken quarters, slow-roasted and finished over charcoal for a smoky crust and juicy interior. Family favourite.',
    ingredients: [
      'Chicken quarters', 'Yogurt', 'Tandoori masala', 'Lemon juice',
      'Garlic', 'Ginger', 'Smoked paprika', 'Cumin', 'Oil',
    ],
    nutrition: { calories: 340, protein: 36, carbs: 4, fat: 18, fiber: 1, sodium: 460 },
  },

  // ─── VEGETARIAN ──────────────────────────────────────────────────────────
  'palak-paneer': {
    id: 'palak-paneer',
    name: 'Palak Paneer',
    category: 'vegetarian',
    pricePerPerson: 10,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop&q=80',
    description:
      'Velvety, slow-cooked spinach curry studded with golden-fried paneer cubes. Deeply nourishing, mildly spiced, and beautiful on the plate.',
    ingredients: [
      'Baby spinach', 'Paneer', 'Onions', 'Tomatoes', 'Garlic', 'Ginger',
      'Cumin seeds', 'Kashmiri chili', 'Cream', 'Butter', 'Garam masala',
    ],
    nutrition: { calories: 280, protein: 14, carbs: 10, fat: 20, fiber: 4, sodium: 420 },
  },
  'chana-masala': {
    id: 'chana-masala',
    name: 'Chana Masala',
    category: 'vegetarian',
    pricePerPerson: 9,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop&q=80',
    description:
      'Hearty chickpeas braised in a bold, tangy tomato-onion masala with dried pomegranate powder and whole spices. A North Indian staple done right.',
    ingredients: [
      'Kabuli chana', 'Tomatoes', 'Onions', 'Garlic', 'Ginger', 'Amchur',
      'Chana masala spice blend', 'Bay leaf', 'Coriander', 'Green chili',
    ],
    nutrition: { calories: 240, protein: 12, carbs: 34, fat: 8, fiber: 9, sodium: 380 },
  },
  'dal-makhani': {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    category: 'vegetarian',
    pricePerPerson: 9,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&q=80',
    description:
      'Black lentils and kidney beans slow-simmered overnight with butter and cream until they reach a luxurious, restaurant-quality consistency.',
    ingredients: [
      'Black urad dal', 'Red kidney beans', 'Butter', 'Cream', 'Tomato puree',
      'Garlic', 'Ginger', 'Garam masala', 'Kashmiri chili', 'Coriander',
    ],
    nutrition: { calories: 260, protein: 11, carbs: 30, fat: 12, fiber: 8, sodium: 440 },
  },
  'mixed-vegetable-curry': {
    id: 'mixed-vegetable-curry',
    name: 'Mixed Vegetable Curry',
    category: 'vegetarian',
    pricePerPerson: 8,
    image: 'https://images.unsplash.com/photo-1540420773420-3421f207b1f7?w=600&h=400&fit=crop&q=80',
    description:
      'A colourful medley of seasonal vegetables — potatoes, peas, carrots, and cauliflower — cooked in a bright, well-spiced tomato gravy.',
    ingredients: [
      'Potatoes', 'Green peas', 'Carrots', 'Cauliflower', 'Tomatoes',
      'Onions', 'Garlic', 'Ginger', 'Cumin', 'Turmeric', 'Coriander powder',
    ],
    nutrition: { calories: 200, protein: 7, carbs: 32, fat: 6, fiber: 7, sodium: 360 },
  },
  'aloo-gobi': {
    id: 'aloo-gobi',
    name: 'Aloo Gobi',
    category: 'vegetarian',
    pricePerPerson: 8,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8182ae57?w=600&h=400&fit=crop&q=80',
    description:
      'Dry-style potato and cauliflower stir-fry with cumin, turmeric, and fresh coriander. Simple, honest, and deeply comforting home cooking.',
    ingredients: [
      'Yukon gold potatoes', 'Cauliflower', 'Cumin seeds', 'Turmeric',
      'Ginger', 'Green chili', 'Fresh coriander', 'Amchur', 'Oil',
    ],
    nutrition: { calories: 210, protein: 5, carbs: 34, fat: 7, fiber: 6, sodium: 300 },
  },
  'mushroom-masala': {
    id: 'mushroom-masala',
    name: 'Mushroom Masala',
    category: 'vegetarian',
    pricePerPerson: 10,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
    description:
      'Earthy button and cremini mushrooms sautéed in a fragrant, spiced onion-tomato masala. Meaty in texture, rich in flavour, and entirely plant-based.',
    ingredients: [
      'Button mushrooms', 'Cremini mushrooms', 'Onions', 'Tomatoes', 'Garlic',
      'Ginger', 'Coriander powder', 'Cumin', 'Kashmiri chili', 'Garam masala',
    ],
    nutrition: { calories: 190, protein: 6, carbs: 18, fat: 10, fiber: 4, sodium: 380 },
  },
  'baingan-bharta': {
    id: 'baingan-bharta',
    name: 'Baingan Bharta',
    category: 'vegetarian',
    pricePerPerson: 9,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&q=80',
    description:
      'Flame-roasted eggplant, hand-mashed and cooked with onions, tomatoes, green chilies, and aromatic spices. The smoky char is the signature.',
    ingredients: [
      'Large eggplant', 'Onions', 'Tomatoes', 'Green chilies', 'Garlic',
      'Ginger', 'Fresh coriander', 'Cumin seeds', 'Turmeric', 'Mustard oil',
    ],
    nutrition: { calories: 180, protein: 4, carbs: 22, fat: 9, fiber: 8, sodium: 340 },
  },
  'rajma': {
    id: 'rajma',
    name: 'Rajma',
    category: 'vegetarian',
    pricePerPerson: 9,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&q=80',
    description:
      'Red kidney beans slow-cooked in a thick, deeply spiced tomato gravy. A Punjabi comfort classic that pairs perfectly with steamed basmati rice.',
    ingredients: [
      'Red kidney beans', 'Tomatoes', 'Onions', 'Garlic', 'Ginger',
      'Rajma masala', 'Cumin', 'Bay leaf', 'Butter', 'Fresh coriander',
    ],
    nutrition: { calories: 250, protein: 13, carbs: 36, fat: 6, fiber: 10, sodium: 400 },
  },
  'malai-kofta': {
    id: 'malai-kofta',
    name: 'Malai Kofta',
    category: 'vegetarian',
    pricePerPerson: 11,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop&q=80',
    description:
      'Soft, melt-in-your-mouth potato-paneer dumplings fried golden and served in a luscious cashew-cream gravy. A festive showstopper.',
    ingredients: [
      'Potatoes', 'Paneer', 'Cashews', 'Cream', 'Onions', 'Tomatoes',
      'Cardamom', 'Rose water', 'Kewra', 'Saffron', 'Raisins',
    ],
    nutrition: { calories: 340, protein: 10, carbs: 28, fat: 22, fiber: 3, sodium: 440 },
  },
  'paneer-tikka': {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    category: 'vegetarian',
    pricePerPerson: 12,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&q=80',
    description:
      'Cubes of paneer marinated in spiced yogurt, skewered with peppers and onions, then charred in a tandoor. Bold, smoky, and restaurant-worthy.',
    ingredients: [
      'Paneer', 'Bell peppers', 'Red onions', 'Yogurt', 'Ginger-garlic paste',
      'Tikka masala', 'Ajwain', 'Chaat masala', 'Lemon', 'Mustard oil',
    ],
    nutrition: { calories: 290, protein: 16, carbs: 10, fat: 20, fiber: 2, sodium: 480 },
  },
  'stuffed-bell-peppers': {
    id: 'stuffed-bell-peppers',
    name: 'Stuffed Bell Peppers',
    category: 'vegetarian',
    pricePerPerson: 10,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop&q=80',
    description:
      'Vibrant bell peppers filled with spiced rice, lentils, and fresh herbs, then oven-roasted until tender. Hearty, colourful, and crowd-pleasing.',
    ingredients: [
      'Bell peppers', 'Basmati rice', 'Masoor dal', 'Onions', 'Tomatoes',
      'Garlic', 'Cumin', 'Coriander', 'Feta cheese', 'Fresh parsley',
    ],
    nutrition: { calories: 240, protein: 9, carbs: 36, fat: 8, fiber: 6, sodium: 420 },
  },

  // ─── SIDES ───────────────────────────────────────────────────────────────
  'garlic-naan': {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    category: 'sides',
    pricePerPerson: 3,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&q=80',
    description:
      'Pillowy soft leavened flatbread slathered with garlic butter and finished in a tandoor. Freshly baked for each order.',
    ingredients: ['All-purpose flour', 'Yogurt', 'Yeast', 'Garlic butter', 'Nigella seeds', 'Fresh coriander'],
    nutrition: { calories: 210, protein: 6, carbs: 36, fat: 5, fiber: 1, sodium: 320 },
  },
  'basmati-rice': {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    category: 'sides',
    pricePerPerson: 3,
    image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b915?w=600&h=400&fit=crop&q=80',
    description:
      'Perfectly steamed long-grain aged basmati rice, each grain separate and fragrant. The ideal companion for any curry.',
    ingredients: ['Aged basmati rice', 'Whole cumin seeds', 'Bay leaf', 'Salt', 'Ghee'],
    nutrition: { calories: 200, protein: 4, carbs: 44, fat: 1, fiber: 0, sodium: 80 },
  },
  'raita': {
    id: 'raita',
    name: 'Cucumber Raita',
    category: 'sides',
    pricePerPerson: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80',
    description:
      'Cool, creamy yogurt with grated cucumber, fresh mint, roasted cumin, and a pinch of black salt. The perfect cooling counterpart to spiced dishes.',
    ingredients: ['Full-fat yogurt', 'Cucumber', 'Fresh mint', 'Roasted cumin', 'Black salt', 'Coriander'],
    nutrition: { calories: 80, protein: 5, carbs: 8, fat: 3, fiber: 1, sodium: 180 },
  },
  'kachumber-salad': {
    id: 'kachumber-salad',
    name: 'Kachumber Salad',
    category: 'sides',
    pricePerPerson: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80',
    description:
      'A fresh, crunchy chopped salad of tomatoes, cucumbers, red onions, and green chilies, dressed with lemon juice and chaat masala.',
    ingredients: ['Roma tomatoes', 'Cucumber', 'Red onion', 'Green chili', 'Lemon juice', 'Chaat masala', 'Fresh coriander'],
    nutrition: { calories: 60, protein: 2, carbs: 12, fat: 1, fiber: 3, sodium: 140 },
  },
  'roasted-vegetables': {
    id: 'roasted-vegetables',
    name: 'Roasted Vegetables',
    category: 'sides',
    pricePerPerson: 4,
    image: 'https://images.unsplash.com/photo-1540420773420-3421f207b1f7?w=600&h=400&fit=crop&q=80',
    description:
      'Seasonal vegetables — zucchini, bell peppers, red onions, and cherry tomatoes — roasted at high heat with olive oil, herbs, and spices.',
    ingredients: ['Zucchini', 'Bell peppers', 'Red onions', 'Cherry tomatoes', 'Olive oil', 'Za\'atar', 'Sumac', 'Fresh thyme'],
    nutrition: { calories: 120, protein: 3, carbs: 18, fat: 5, fiber: 4, sodium: 200 },
  },
  'fruit-chaat': {
    id: 'fruit-chaat',
    name: 'Fruit Chaat',
    category: 'sides',
    pricePerPerson: 3,
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop&q=80',
    description:
      'A refreshing medley of tropical and seasonal fruits tossed with chaat masala, black salt, and a squeeze of lemon. Sweet, tangy, and vibrant.',
    ingredients: ['Mango', 'Banana', 'Pomegranate', 'Apple', 'Guava', 'Chaat masala', 'Black salt', 'Lemon'],
    nutrition: { calories: 130, protein: 2, carbs: 30, fat: 1, fiber: 4, sodium: 120 },
  },
  'mint-chutney': {
    id: 'mint-chutney',
    name: 'Mint Chutney',
    category: 'sides',
    pricePerPerson: 2,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
    description:
      'A bright, herbaceous chutney blended from fresh mint, coriander, green chili, and ginger. Goes with everything on the table.',
    ingredients: ['Fresh mint', 'Fresh coriander', 'Green chili', 'Ginger', 'Garlic', 'Lemon juice', 'Salt'],
    nutrition: { calories: 30, protein: 1, carbs: 5, fat: 0, fiber: 1, sodium: 160 },
  },
  'tamarind-chutney': {
    id: 'tamarind-chutney',
    name: 'Tamarind Chutney',
    category: 'sides',
    pricePerPerson: 2,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop&q=80',
    description:
      'Sweet-sour tamarind chutney slow-reduced with jaggery, ginger, and cumin. A sticky, glossy essential for kebabs and chaats alike.',
    ingredients: ['Tamarind paste', 'Jaggery', 'Ginger', 'Cumin', 'Black salt', 'Red chili'],
    nutrition: { calories: 70, protein: 1, carbs: 16, fat: 0, fiber: 1, sodium: 200 },
  },
}

// Weekly menu — each day gets 5 protein, 3 vegetarian, 2 sides (unique combo per day)
export const weeklyMenu = {
  0: { // Sunday
    protein:     ['butter-chicken', 'beef-biryani', 'lamb-korma', 'chicken-tikka-masala', 'shrimp-curry'],
    vegetarian:  ['palak-paneer', 'chana-masala', 'dal-makhani'],
    sides:       ['garlic-naan', 'basmati-rice'],
  },
  1: { // Monday
    protein:     ['beef-nihari', 'chicken-haleem', 'fish-tahari', 'chicken-seekh-kebab', 'prawn-masala'],
    vegetarian:  ['mixed-vegetable-curry', 'aloo-gobi', 'mushroom-masala'],
    sides:       ['raita', 'kachumber-salad'],
  },
  2: { // Tuesday
    protein:     ['mutton-biryani', 'chicken-karahi', 'bbq-chicken', 'beef-kofta-curry', 'shrimp-curry'],
    vegetarian:  ['baingan-bharta', 'rajma', 'malai-kofta'],
    sides:       ['garlic-naan', 'roasted-vegetables'],
  },
  3: { // Wednesday
    protein:     ['butter-chicken', 'mutton-biryani', 'beef-nihari', 'chicken-seekh-kebab', 'beef-kofta-curry'],
    vegetarian:  ['palak-paneer', 'mushroom-masala', 'paneer-tikka'],
    sides:       ['basmati-rice', 'raita'],
  },
  4: { // Thursday
    protein:     ['beef-biryani', 'chicken-haleem', 'lamb-korma', 'prawn-masala', 'bbq-chicken'],
    vegetarian:  ['chana-masala', 'rajma', 'stuffed-bell-peppers'],
    sides:       ['garlic-naan', 'fruit-chaat'],
  },
  5: { // Friday
    protein:     ['chicken-tikka-masala', 'beef-nihari', 'fish-tahari', 'chicken-karahi', 'mutton-biryani'],
    vegetarian:  ['dal-makhani', 'malai-kofta', 'aloo-gobi'],
    sides:       ['kachumber-salad', 'roasted-vegetables'],
  },
  6: { // Saturday
    protein:     ['lamb-korma', 'prawn-masala', 'chicken-seekh-kebab', 'beef-biryani', 'chicken-tikka-masala'],
    vegetarian:  ['baingan-bharta', 'paneer-tikka', 'stuffed-bell-peppers'],
    sides:       ['basmati-rice', 'mint-chutney'],
  },
}

export function getMenuForDate(date) {
  const day = new Date(date).getDay()
  const menu = weeklyMenu[day]
  return {
    protein:    menu.protein.map(id => foodItems[id]),
    vegetarian: menu.vegetarian.map(id => foodItems[id]),
    sides:      menu.sides.map(id => foodItems[id]),
  }
}

export function getValidDateRange() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const min = new Date(today)
  min.setDate(min.getDate() + 2)
  const max = new Date(today)
  max.setDate(max.getDate() + 14)
  return { min, max }
}

export function formatDateString(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const CATEGORY_LABELS = { protein: 'Proteins', vegetarian: 'Vegetarian', sides: 'Sides' }
export const MIN_PORTIONS = 6
export const MAX_PORTIONS = 30
