import type { ContactContent } from '../types';

export const contactContent: ContactContent = {
  phone: '+1 (905) 555-0142',
  email: 'hello@nourskitchen.ca',
  address: '142 Maple Grove Ave, Mississauga, ON L5B 2C4',
  businessHours: [
    { day: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Saturday',        hours: '10:00 AM – 3:00 PM' },
    { day: 'Sunday',          hours: 'Closed' },
  ],
  socialLinks: [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/nourskitchen',
      ariaLabel: "Visit Nour's Kitchen on Instagram (opens in new tab)",
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/nourskitchen',
      ariaLabel: "Visit Nour's Kitchen on Facebook (opens in new tab)",
    },
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/19055550142',
      ariaLabel: "Chat with Nour's Kitchen on WhatsApp (opens in new tab)",
    },
  ],
};
