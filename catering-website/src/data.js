export const baseItems = [
  { id:'chicken', category:'Protein', name:'Herb Roasted Chicken', price:14, pos:'58% 19%', description:'Slow-roasted chicken with lemon, garlic, and garden herbs.', ingredients:['Chicken','lemon','garlic','rosemary','olive oil'], calories:390, protein:'42g', carbs:'4g', fat:'21g' },
  { id:'salmon', category:'Protein', name:'Maple Glazed Salmon', price:17, pos:'76% 8%', description:'Roasted salmon brushed with maple, mustard, and cracked pepper.', ingredients:['Salmon','maple syrup','Dijon mustard','black pepper'], calories:420, protein:'38g', carbs:'12g', fat:'23g' },
  { id:'beef', category:'Protein', name:'Sunday Braised Beef', price:16, pos:'55% 49%', description:'Fork-tender beef braised with carrots in a rich herb gravy.', ingredients:['Beef','carrot','onion','beef stock','thyme'], calories:510, protein:'45g', carbs:'16g', fat:'29g' },
  { id:'turkey', category:'Protein', name:'Creamy Turkey Meatballs', price:14, pos:'88% 25%', description:'Tender turkey meatballs in a light garlic-parmesan sauce.', ingredients:['Turkey','parmesan','garlic','cream','parsley'], calories:430, protein:'39g', carbs:'10g', fat:'25g' },
  { id:'shrimp', category:'Protein', name:'Lemon Garlic Shrimp', price:17, pos:'75% 49%', description:'Juicy shrimp sautéed with lemon, garlic, and parsley.', ingredients:['Shrimp','lemon','garlic','parsley','olive oil'], calories:270, protein:'36g', carbs:'5g', fat:'11g' },
  { id:'peppers', category:'Vegetarian', name:'Harvest Stuffed Peppers', price:12, pos:'90% 78%', description:'Sweet peppers filled with quinoa, tomato, herbs, and feta.', ingredients:['Bell peppers','quinoa','tomato','feta','oregano'], calories:340, protein:'13g', carbs:'48g', fat:'11g' },
  { id:'pasta', category:'Vegetarian', name:'Wild Mushroom Pasta', price:13, pos:'33% 52%', description:'Silky ribbons of pasta with mushrooms, thyme, and parmesan.', ingredients:['Pasta','mushrooms','parmesan','cream','thyme'], calories:520, protein:'18g', carbs:'67g', fat:'21g' },
  { id:'cauliflower', category:'Vegetarian', name:'Golden Roasted Cauliflower', price:10, pos:'64% 78%', description:'Caramelized cauliflower with warm spices and lemon.', ingredients:['Cauliflower','cumin','paprika','lemon','olive oil'], calories:210, protein:'7g', carbs:'24g', fat:'12g' },
  { id:'potatoes', category:'Sides', name:'Rosemary Roasted Potatoes', price:8, pos:'39% 82%', description:'Crisp baby potatoes tossed with rosemary and sea salt.', ingredients:['Potatoes','rosemary','olive oil','sea salt'], calories:260, protein:'5g', carbs:'42g', fat:'9g' },
  { id:'salad', category:'Sides', name:'Orchard Green Salad', price:8, pos:'13% 67%', description:'Tender greens with apple, cranberry, pecan, and cider vinaigrette.', ingredients:['Mixed greens','apple','cranberry','pecan','cider vinegar'], calories:190, protein:'4g', carbs:'22g', fat:'11g' }
];

const dayTwists = ['Sunday Supper','Garden Table','Family Favorites','Harvest Kitchen','Cozy Classics','Friday Feast','Weekend Gathering'];
export const menuForDate = (date) => {
  const day = new Date(`${date}T12:00:00`).getDay();
  return { title: dayTwists[day], items: baseItems.map((item, i) => ({...item, price:item.price + ((day+i)%3 === 0 ? 1 : 0)})) };
};
