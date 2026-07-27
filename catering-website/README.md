# Harvest Table Catering

A customer-facing website for a homemade food catering service. Customers browse daily menus, build a cart, check out, and receive an invoice — all without accounts or online payment.

## Features

- **Daily menus** — Each day of the week has a unique menu (5 protein, 3 vegetarian, 2 sides)
- **Date-based ordering** — Orders must be placed 2–14 days before pickup
- **Menu browsing** — Categorized item list with detail views (description, ingredients, nutrition)
- **Cart** — Add items, adjust quantities, remove items
- **Checkout** — Contact info, pickup time, portion size (6–30 people), payment preference, special instructions
- **Invoices** — Generated on order placement and saved to `localStorage` for the business owner
- **About & Contact** — Business story, social links, and contact form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5180](http://localhost:5180) (this project uses port **5180** — port 5173 is often taken by other Vite apps).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS v4

## Invoice Storage

Completed orders are stored in the browser under the key `harvest-table-invoices`. The business owner can retrieve them from DevTools → Application → Local Storage.
