export const business = {
  name: "Zara's Kitchen",
  tagline: 'Homemade with Heart, Served with Love',
  description:
    "Zara's Kitchen is a family-run homemade catering service bringing the warmth of South Asian home cooking to your gatherings, celebrations, and corporate events. Every dish is prepared fresh from scratch using time-honoured recipes passed down through generations.",
  founded: 2018,
  address: {
    street: '142 Saffron Lane',
    city: 'Thorndale',
    province: 'Ontario',
    postalCode: 'L4K 3M2',
    country: 'Canada',
  },
  contact: {
    phone: '+1 (905) 555-0174',
    phonePlain: '19055550174',
    email: 'hello@zaraskitchen.ca',
    whatsapp: '+1 (905) 555-0174',
    whatsappPlain: '19055550174',
  },
  social: {
    instagram: { handle: '@zaraskitchen', url: 'https://instagram.com/zaraskitchen' },
    facebook: { handle: 'Zara\'s Kitchen', url: 'https://facebook.com/zaraskitchen' },
    tiktok: { handle: '@zaraskitchen.ca', url: 'https://tiktok.com/@zaraskitchen.ca' },
  },
  hours: {
    orderPickup: '11:00 AM – 7:00 PM (Pickup window)',
    orderDeadline: 'Orders must be placed at least 2 days in advance',
    response: 'We respond to inquiries within 24 hours',
  },
  about: {
    story: `It all started in Zara's home kitchen, where the scent of simmering curries and freshly baked naan drew neighbours and friends to the door. What began as cooking for loved ones quickly grew into a passion — and then a calling.

In 2018, Zara Malik turned her lifelong love of cooking into Zara's Kitchen, a catering service rooted in the belief that homemade food carries something no restaurant can replicate: the warmth of someone who genuinely cares.

Every recipe in our kitchen has a story. The Butter Chicken is Zara's mother's recipe, perfected over forty years. The Lamb Rogan Josh comes from her grandmother's handwritten notes. The Biryani is made just as it was for Eid celebrations growing up — with patience, saffron, and joy.

We serve events large and small: intimate family dinners, wedding receptions, corporate lunches, cultural celebrations, and milestone birthdays. Whatever the occasion, we bring the same dedication: fresh ingredients, homemade masalas, and food that makes people feel at home.`,
    mission:
      'To bring the nourishing comfort of homemade South Asian cooking to every table, honouring tradition while creating new memories.',
    values: [
      {
        title: 'Fresh & Homemade',
        description:
          'Every dish is prepared fresh from scratch on the day of your pickup. No preservatives, no shortcuts.',
      },
      {
        title: 'Family Recipes',
        description:
          'Our menu is built on recipes passed down through generations, each carrying decades of love and refinement.',
      },
      {
        title: 'Community First',
        description:
          'We source our spices and produce locally wherever possible, supporting farmers and suppliers in our community.',
      },
      {
        title: 'Inclusive Flavors',
        description:
          'We proudly cater to diverse dietary needs and are happy to accommodate requests with advance notice.',
      },
    ],
    team: [
      {
        name: 'Zara Malik',
        role: 'Founder & Head Chef',
        bio: 'With over 20 years of cooking experience, Zara is the heart of the kitchen. Her intuitive understanding of spice and her commitment to quality set the standard for everything we make.',
      },
      {
        name: 'Imran Malik',
        role: 'Operations & Logistics',
        bio: "Zara's husband and business partner, Imran ensures every order is coordinated, packed with care, and ready for pickup on time.",
      },
      {
        name: 'Sana Rashid',
        role: 'Pastry & Desserts',
        bio: 'A trained pastry chef and family friend, Sana handles our dessert offerings including the beloved Kheer and Fruit Chaat.',
      },
    ],
  },
  faq: [
    {
      question: 'How far in advance do I need to order?',
      answer:
        'We require a minimum of 2 days notice for all orders. You can order up to 2 weeks in advance. This allows us to source fresh ingredients and prepare everything from scratch.',
    },
    {
      question: 'What is the minimum and maximum order size?',
      answer:
        'Our minimum order is for 6 people per dish, and the maximum is 30 people per dish. This ensures every portion is made with the same care and quality.',
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer:
        'Yes! Many of our dishes are naturally gluten-free or dairy-free, and allergen information is listed for every item. For specific requests or severe allergies, please contact us directly before ordering.',
    },
    {
      question: 'Is pickup the only option?',
      answer:
        'Currently, we offer pickup only from our kitchen in Thorndale. We are exploring delivery options for the future. Pickup times are between 11:00 AM and 7:00 PM.',
    },
    {
      question: 'How is payment handled?',
      answer:
        'We accept cash on pickup, cheque (payable to Zara\'s Kitchen), and e-transfer. Payment is completed at the time of pickup.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer:
        'Please contact us as soon as possible if you need to modify your order. Modifications are accepted up to 48 hours before your pickup time, subject to availability.',
    },
  ],
}

export const contactFormSubjects = [
  'General Inquiry',
  'Order Question',
  'Dietary Accommodation Request',
  'Large Event Inquiry',
  'Feedback',
  'Other',
]
