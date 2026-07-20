# Nourish — Food Delivery

Mobile-first food delivery app built with TanStack Start, React 19, Tailwind v4, and Zustand.

## Features

- **Home** — location bar, search entry, category chips, featured restaurants, restaurant cards
- **Restaurant detail** — hero, menu sections, add-to-cart with quantity
- **Cart** — line items, qty adjust, subtotal/delivery/tax/total, checkout
- **Checkout success** — order confirmation with ETA tracking mock
- **Orders** — past/active orders list
- **Bottom nav** — Home, Search, Orders, Cart (with badge)
- **Sticky cart bar** when items are in cart

## Stack

- TanStack Start / Router
- Zustand (cart + orders, persisted to localStorage)
- Tailwind CSS v4 + Fraunces + Plus Jakarta Sans
- lucide-react, sonner

## Scripts

```bash
npm run dev        # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Startup

```bash
sh startup.sh
```
