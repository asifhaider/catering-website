// Each day of the week (0=Sunday … 6=Saturday) has a unique menu.
// Menu: 5 protein, 3 vegetarian, 2 sides = 10 items.

const proteinItems = {
  // Pool of protein items reused across different days
  grilledChicken: {
    id: 'p-grilled-chicken',
    name: 'Herb-Grilled Chicken Thighs',
    category: 'protein',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&h=300&fit=crop',
    description: 'Juicy bone-in chicken thighs marinated overnight in a blend of rosemary, thyme, garlic, and lemon zest, then grilled to perfection. Each portion serves one and is delivered warm.',
    ingredients: ['Chicken thighs', 'Rosemary', 'Thyme', 'Garlic', 'Lemon zest', 'Olive oil', 'Sea salt', 'Black pepper'],
    nutrition: { servingSize: '1 thigh (approx. 180g)', calories: 320, totalFat: '18g', saturatedFat: '5g', transFat: '0g', cholesterol: '120mg', sodium: '480mg', totalCarbs: '2g', fiber: '0g', sugars: '0g', protein: '36g' },
  },
  beefBrisket: {
    id: 'p-beef-brisket',
    name: 'Slow-Braised Beef Brisket',
    category: 'protein',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    description: 'Fork-tender brisket braised for 6 hours in a rich tomato and red wine sauce with caramelized onions and fresh herbs. Sliced thick and served in its braising jus.',
    ingredients: ['Beef brisket', 'Roma tomatoes', 'Red wine', 'Onions', 'Carrots', 'Celery', 'Garlic', 'Bay leaves', 'Thyme', 'Beef stock', 'Olive oil', 'Salt', 'Pepper'],
    nutrition: { servingSize: '200g', calories: 410, totalFat: '22g', saturatedFat: '8g', transFat: '0g', cholesterol: '135mg', sodium: '620mg', totalCarbs: '8g', fiber: '1g', sugars: '4g', protein: '42g' },
  },
  lambChops: {
    id: 'p-lamb-chops',
    name: 'Garlic & Mint Lamb Chops',
    category: 'protein',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
    description: 'Tender lamb loin chops rubbed with fresh mint, garlic, and cumin, pan-seared to a rosy medium and finished with a drizzle of pomegranate molasses.',
    ingredients: ['Lamb loin chops', 'Fresh mint', 'Garlic', 'Cumin', 'Pomegranate molasses', 'Olive oil', 'Salt', 'Black pepper', 'Sumac'],
    nutrition: { servingSize: '2 chops (approx. 200g)', calories: 380, totalFat: '24g', saturatedFat: '9g', transFat: '0g', cholesterol: '115mg', sodium: '390mg', totalCarbs: '5g', fiber: '0g', sugars: '4g', protein: '38g' },
  },
  salmonFillet: {
    id: 'p-salmon',
    name: 'Lemon-Dill Baked Salmon',
    category: 'protein',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    description: 'Atlantic salmon fillets baked with a bright lemon-dill butter crust. Flaky, moist, and finished with capers and a wedge of fresh lemon.',
    ingredients: ['Atlantic salmon fillet', 'Unsalted butter', 'Fresh dill', 'Lemon', 'Capers', 'Garlic', 'Dijon mustard', 'Salt', 'White pepper'],
    nutrition: { servingSize: '1 fillet (approx. 170g)', calories: 290, totalFat: '17g', saturatedFat: '6g', transFat: '0g', cholesterol: '90mg', sodium: '340mg', totalCarbs: '2g', fiber: '0g', sugars: '1g', protein: '32g' },
  },
  turkeyMeatballs: {
    id: 'p-turkey-meatballs',
    name: 'Turkey & Spinach Meatballs',
    category: 'protein',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop',
    description: 'Light and juicy ground turkey meatballs packed with wilted spinach, sun-dried tomatoes, and Parmesan, simmered in a rustic marinara sauce.',
    ingredients: ['Ground turkey', 'Fresh spinach', 'Sun-dried tomatoes', 'Parmesan cheese', 'Breadcrumbs', 'Egg', 'Garlic', 'Onion', 'Crushed tomatoes', 'Basil', 'Oregano', 'Salt', 'Pepper'],
    nutrition: { servingSize: '4 meatballs (approx. 180g)', calories: 270, totalFat: '12g', saturatedFat: '4g', transFat: '0g', cholesterol: '105mg', sodium: '580mg', totalCarbs: '14g', fiber: '2g', sugars: '6g', protein: '28g' },
  },
  shrimpScampi: {
    id: 'p-shrimp-scampi',
    name: 'Garlic Butter Shrimp Scampi',
    category: 'protein',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
    description: 'Plump jumbo shrimp sautéed in a fragrant garlic-butter and white wine sauce with a splash of fresh lemon juice and a sprinkle of parsley.',
    ingredients: ['Jumbo shrimp', 'Unsalted butter', 'Garlic', 'Dry white wine', 'Lemon juice', 'Fresh parsley', 'Red pepper flakes', 'Salt', 'Olive oil'],
    nutrition: { servingSize: '200g', calories: 240, totalFat: '14g', saturatedFat: '7g', transFat: '0g', cholesterol: '210mg', sodium: '520mg', totalCarbs: '4g', fiber: '0g', sugars: '0g', protein: '26g' },
  },
  porkloin: {
    id: 'p-pork-loin',
    name: 'Apple-Glazed Pork Loin',
    category: 'protein',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop',
    description: 'Tender sliced pork loin roasted with a sweet apple cider and whole grain mustard glaze, served with a spoonful of pan drippings and crispy sage.',
    ingredients: ['Pork loin', 'Apple cider', 'Whole grain mustard', 'Honey', 'Fresh sage', 'Garlic', 'Rosemary', 'Salt', 'Black pepper', 'Olive oil'],
    nutrition: { servingSize: '200g', calories: 300, totalFat: '11g', saturatedFat: '3g', transFat: '0g', cholesterol: '95mg', sodium: '420mg', totalCarbs: '12g', fiber: '0g', sugars: '10g', protein: '36g' },
  },
};

const vegItems = {
  eggplantParmesan: {
    id: 'v-eggplant-parm',
    name: 'Eggplant Parmigiana',
    category: 'vegetarian',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&h=300&fit=crop',
    description: 'Thick-cut eggplant rounds breaded, fried golden, and layered with house marinara and melted mozzarella, baked until bubbly. A hearty, crowd-pleasing classic.',
    ingredients: ['Eggplant', 'Mozzarella', 'Parmesan', 'Crushed tomatoes', 'Garlic', 'Basil', 'Eggs', 'Breadcrumbs', 'Olive oil', 'Salt', 'Pepper'],
    nutrition: { servingSize: '2 slices (approx. 200g)', calories: 310, totalFat: '16g', saturatedFat: '7g', transFat: '0g', cholesterol: '75mg', sodium: '640mg', totalCarbs: '28g', fiber: '5g', sugars: '9g', protein: '14g' },
  },
  stuffedBellPeppers: {
    id: 'v-stuffed-peppers',
    name: 'Quinoa-Stuffed Bell Peppers',
    category: 'vegetarian',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
    description: 'Vibrant bell peppers halved and filled with a savory quinoa, black bean, corn, and cheddar stuffing, roasted until tender and slightly charred.',
    ingredients: ['Bell peppers', 'Quinoa', 'Black beans', 'Corn', 'Cheddar cheese', 'Cumin', 'Chili powder', 'Onion', 'Garlic', 'Tomatoes', 'Cilantro', 'Salt', 'Pepper'],
    nutrition: { servingSize: '2 halves (approx. 250g)', calories: 280, totalFat: '8g', saturatedFat: '3g', transFat: '0g', cholesterol: '15mg', sodium: '480mg', totalCarbs: '40g', fiber: '8g', sugars: '7g', protein: '13g' },
  },
  mushroomRisotto: {
    id: 'v-mushroom-risotto',
    name: 'Wild Mushroom Risotto',
    category: 'vegetarian',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    description: 'Creamy Arborio rice slow-stirred with a medley of wild mushrooms, white wine, shallots, and finished with truffle oil and aged Parmigiano-Reggiano.',
    ingredients: ['Arborio rice', 'Shiitake mushrooms', 'Cremini mushrooms', 'Porcini mushrooms', 'White wine', 'Shallots', 'Garlic', 'Vegetable stock', 'Parmesan', 'Truffle oil', 'Butter', 'Fresh thyme', 'Salt', 'Pepper'],
    nutrition: { servingSize: '1 cup (approx. 220g)', calories: 340, totalFat: '14g', saturatedFat: '6g', transFat: '0g', cholesterol: '25mg', sodium: '560mg', totalCarbs: '44g', fiber: '3g', sugars: '3g', protein: '10g' },
  },
  chickpeaCurry: {
    id: 'v-chickpea-curry',
    name: 'Creamy Chickpea & Spinach Curry',
    category: 'vegetarian',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    description: 'A warming, fragrant curry of tender chickpeas and wilted spinach simmered in a coconut milk-tomato sauce spiced with garam masala, cumin, and coriander.',
    ingredients: ['Chickpeas', 'Fresh spinach', 'Coconut milk', 'Crushed tomatoes', 'Onion', 'Garlic', 'Ginger', 'Garam masala', 'Cumin', 'Coriander', 'Turmeric', 'Salt', 'Olive oil', 'Cilantro'],
    nutrition: { servingSize: '1 cup (approx. 220g)', calories: 260, totalFat: '10g', saturatedFat: '6g', transFat: '0g', cholesterol: '0mg', sodium: '420mg', totalCarbs: '34g', fiber: '9g', sugars: '6g', protein: '10g' },
  },
  capreseTart: {
    id: 'v-caprese-tart',
    name: 'Tomato & Burrata Caprese Tart',
    category: 'vegetarian',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    description: 'A buttery puff pastry shell filled with pesto cream, heirloom tomato slices, and fresh burrata, finished with basil oil and a balsamic reduction.',
    ingredients: ['Puff pastry', 'Heirloom tomatoes', 'Burrata', 'Basil pesto', 'Cream cheese', 'Balsamic reduction', 'Fresh basil', 'Olive oil', 'Salt', 'Black pepper'],
    nutrition: { servingSize: '1 slice (approx. 160g)', calories: 350, totalFat: '24g', saturatedFat: '11g', transFat: '0g', cholesterol: '55mg', sodium: '480mg', totalCarbs: '25g', fiber: '1g', sugars: '5g', protein: '10g' },
  },
  veggieTagine: {
    id: 'v-veggie-tagine',
    name: 'Moroccan Vegetable Tagine',
    category: 'vegetarian',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    description: 'A fragrant slow-cooked stew of sweet potato, zucchini, chickpeas, and dried apricots in a spiced broth of ras el hanout, cinnamon, and preserved lemon.',
    ingredients: ['Sweet potato', 'Zucchini', 'Chickpeas', 'Dried apricots', 'Onion', 'Garlic', 'Ras el hanout', 'Cinnamon', 'Preserved lemon', 'Vegetable stock', 'Olive oil', 'Cilantro', 'Salt'],
    nutrition: { servingSize: '1 cup (approx. 230g)', calories: 230, totalFat: '7g', saturatedFat: '1g', transFat: '0g', cholesterol: '0mg', sodium: '390mg', totalCarbs: '38g', fiber: '8g', sugars: '12g', protein: '7g' },
  },
};

const sideItems = {
  garlicMashedPotato: {
    id: 's-mashed-potato',
    name: 'Roasted Garlic Mashed Potatoes',
    category: 'sides',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    description: 'Creamy Yukon Gold potatoes whipped with roasted garlic, brown butter, and a splash of warm cream. Silky smooth with a subtle sweet garlic flavour.',
    ingredients: ['Yukon Gold potatoes', 'Roasted garlic', 'Unsalted butter', 'Heavy cream', 'Salt', 'White pepper', 'Chives'],
    nutrition: { servingSize: '3/4 cup (approx. 180g)', calories: 220, totalFat: '11g', saturatedFat: '7g', transFat: '0g', cholesterol: '35mg', sodium: '320mg', totalCarbs: '28g', fiber: '2g', sugars: '2g', protein: '4g' },
  },
  roastedVeggies: {
    id: 's-roasted-veggies',
    name: 'Seasonal Roasted Vegetables',
    category: 'sides',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    description: 'A colourful mix of broccolini, cherry tomatoes, bell peppers, zucchini, and red onion tossed in herb olive oil and roasted until caramelized at the edges.',
    ingredients: ['Broccolini', 'Cherry tomatoes', 'Bell peppers', 'Zucchini', 'Red onion', 'Olive oil', 'Garlic', 'Dried oregano', 'Salt', 'Black pepper', 'Lemon juice'],
    nutrition: { servingSize: '1 cup (approx. 150g)', calories: 110, totalFat: '7g', saturatedFat: '1g', transFat: '0g', cholesterol: '0mg', sodium: '180mg', totalCarbs: '12g', fiber: '4g', sugars: '6g', protein: '3g' },
  },
  riceAndLentils: {
    id: 's-rice-lentils',
    name: 'Mujaddara (Rice & Lentils)',
    category: 'sides',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1666043498292-3bdb0ab7a8a4?w=400&h=300&fit=crop',
    description: 'A beloved Middle Eastern comfort dish of long-grain rice and tender green lentils seasoned with cumin and topped with a mountain of sweet crispy fried onions.',
    ingredients: ['Long-grain rice', 'Green lentils', 'Onions', 'Olive oil', 'Cumin', 'Coriander', 'Cinnamon', 'Salt', 'Black pepper'],
    nutrition: { servingSize: '1 cup (approx. 200g)', calories: 280, totalFat: '9g', saturatedFat: '1g', transFat: '0g', cholesterol: '0mg', sodium: '250mg', totalCarbs: '42g', fiber: '8g', sugars: '3g', protein: '9g' },
  },
  ceasarSalad: {
    id: 's-caesar-salad',
    name: 'Classic Caesar Salad',
    category: 'sides',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    description: 'Crisp romaine hearts tossed in a house-made Caesar dressing with house-baked croutons and shaved Parmigiano-Reggiano. Dressing served on the side for freshness.',
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Anchovy paste', 'Garlic', 'Egg yolk', 'Lemon juice', 'Dijon mustard', 'Worcestershire sauce', 'Olive oil', 'Salt', 'Black pepper'],
    nutrition: { servingSize: '1.5 cups (approx. 130g)', calories: 180, totalFat: '13g', saturatedFat: '3g', transFat: '0g', cholesterol: '30mg', sodium: '420mg', totalCarbs: '10g', fiber: '2g', sugars: '2g', protein: '6g' },
  },
  cornbread: {
    id: 's-cornbread',
    name: 'Honey Jalapeño Cornbread',
    category: 'sides',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1604727853525-04d1f9daa0a3?w=400&h=300&fit=crop',
    description: 'Golden, moist skillet cornbread with a hint of honey sweetness and flecks of fresh jalapeño. Baked in cast iron for crispy edges, served in squares.',
    ingredients: ['Cornmeal', 'All-purpose flour', 'Honey', 'Jalapeño', 'Buttermilk', 'Eggs', 'Butter', 'Baking powder', 'Salt'],
    nutrition: { servingSize: '1 square (approx. 80g)', calories: 190, totalFat: '7g', saturatedFat: '4g', transFat: '0g', cholesterol: '45mg', sodium: '280mg', totalCarbs: '28g', fiber: '1g', sugars: '8g', protein: '4g' },
  },
  tabbouleh: {
    id: 's-tabbouleh',
    name: 'Fresh Herb Tabbouleh',
    category: 'sides',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    description: 'A refreshing Lebanese salad of finely chopped flat-leaf parsley, fresh mint, bulgur wheat, ripe tomatoes, cucumber, and a bright lemon-olive oil dressing.',
    ingredients: ['Flat-leaf parsley', 'Fresh mint', 'Bulgur wheat', 'Roma tomatoes', 'Cucumber', 'Green onions', 'Lemon juice', 'Olive oil', 'Salt', 'Black pepper'],
    nutrition: { servingSize: '3/4 cup (approx. 130g)', calories: 120, totalFat: '7g', saturatedFat: '1g', transFat: '0g', cholesterol: '0mg', sodium: '160mg', totalCarbs: '13g', fiber: '3g', sugars: '3g', protein: '3g' },
  },
  sweetPotatoFries: {
    id: 's-sweet-potato-fries',
    name: 'Baked Sweet Potato Fries',
    category: 'sides',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1623238912992-1a264c1db68e?w=400&h=300&fit=crop',
    description: 'Oven-baked sweet potato wedges seasoned with smoked paprika, cumin, and a touch of cayenne. Crispy on the outside, fluffy inside, served with chipotle aioli.',
    ingredients: ['Sweet potatoes', 'Smoked paprika', 'Cumin', 'Cayenne pepper', 'Olive oil', 'Salt', 'Black pepper', 'Mayonnaise', 'Chipotle pepper', 'Lime juice', 'Garlic'],
    nutrition: { servingSize: '1 cup (approx. 150g)', calories: 160, totalFat: '6g', saturatedFat: '1g', transFat: '0g', cholesterol: '0mg', sodium: '310mg', totalCarbs: '26g', fiber: '4g', sugars: '8g', protein: '2g' },
  },
};

// Weekly menus: index 0 = Sunday, 6 = Saturday
export const weeklyMenus = [
  // Sunday
  {
    day: 'Sunday',
    theme: 'Sunday Roast Classics',
    protein: [proteinItems.beefBrisket, proteinItems.lambChops, proteinItems.grilledChicken, proteinItems.porkloin, proteinItems.turkeyMeatballs],
    vegetarian: [vegItems.eggplantParmesan, vegItems.mushroomRisotto, vegItems.stuffedBellPeppers],
    sides: [sideItems.garlicMashedPotato, sideItems.roastedVeggies],
  },
  // Monday
  {
    day: 'Monday',
    theme: 'Mediterranean Monday',
    protein: [proteinItems.lambChops, proteinItems.salmonFillet, proteinItems.shrimpScampi, proteinItems.grilledChicken, proteinItems.turkeyMeatballs],
    vegetarian: [vegItems.chickpeaCurry, vegItems.veggieTagine, vegItems.capreseTart],
    sides: [sideItems.tabbouleh, sideItems.riceAndLentils],
  },
  // Tuesday
  {
    day: 'Tuesday',
    theme: 'Comfort Food Tuesday',
    protein: [proteinItems.turkeyMeatballs, proteinItems.porkloin, proteinItems.beefBrisket, proteinItems.grilledChicken, proteinItems.salmonFillet],
    vegetarian: [vegItems.eggplantParmesan, vegItems.stuffedBellPeppers, vegItems.chickpeaCurry],
    sides: [sideItems.garlicMashedPotato, sideItems.cornbread],
  },
  // Wednesday
  {
    day: 'Wednesday',
    theme: 'World Flavours Wednesday',
    protein: [proteinItems.shrimpScampi, proteinItems.lambChops, proteinItems.salmonFillet, proteinItems.porkloin, proteinItems.grilledChicken],
    vegetarian: [vegItems.veggieTagine, vegItems.mushroomRisotto, vegItems.capreseTart],
    sides: [sideItems.riceAndLentils, sideItems.tabbouleh],
  },
  // Thursday
  {
    day: 'Thursday',
    theme: 'Fresh & Light Thursday',
    protein: [proteinItems.salmonFillet, proteinItems.shrimpScampi, proteinItems.grilledChicken, proteinItems.turkeyMeatballs, proteinItems.lambChops],
    vegetarian: [vegItems.capreseTart, vegItems.chickpeaCurry, vegItems.veggieTagine],
    sides: [sideItems.ceasarSalad, sideItems.sweetPotatoFries],
  },
  // Friday
  {
    day: 'Friday',
    theme: 'Feast Friday',
    protein: [proteinItems.beefBrisket, proteinItems.shrimpScampi, proteinItems.lambChops, proteinItems.salmonFillet, proteinItems.porkloin],
    vegetarian: [vegItems.mushroomRisotto, vegItems.eggplantParmesan, vegItems.stuffedBellPeppers],
    sides: [sideItems.garlicMashedPotato, sideItems.ceasarSalad],
  },
  // Saturday
  {
    day: 'Saturday',
    theme: 'Weekend Brunch & BBQ',
    protein: [proteinItems.grilledChicken, proteinItems.porkloin, proteinItems.beefBrisket, proteinItems.shrimpScampi, proteinItems.turkeyMeatballs],
    vegetarian: [vegItems.capreseTart, vegItems.mushroomRisotto, vegItems.veggieTagine],
    sides: [sideItems.cornbread, sideItems.sweetPotatoFries],
  },
];

export function getMenuForDate(date) {
  const dayOfWeek = date.getDay(); // 0–6
  return weeklyMenus[dayOfWeek];
}

export function getEarliestOrderDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getLatestOrderDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isDateValid(date) {
  const earliest = getEarliestOrderDate();
  const latest = getLatestOrderDate();
  return date >= earliest && date <= latest;
}

export function formatDateForInput(date) {
  return date.toISOString().split('T')[0];
}
