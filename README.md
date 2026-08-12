# Leathertique Impex

A full-stack MERN e-commerce website for **Leathertique Impex**, a premium leather goods
manufacturing and export brand. Built with a complete backend, MongoDB database, JWT
authentication, cart, checkout (Cash on Delivery), and an admin dashboard.

## Project Overview

Leathertique Impex is a 10-page e-commerce application covering the full customer journey
(browse → search/filter → product details → cart → checkout → order history) plus a secured
admin dashboard for managing products, categories, orders, and customers.

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Axios (centralized API client)
- Framer Motion (animations)
- Zustand (global state: auth, cart, wishlist — persisted to `localStorage`)
- React Hook Form
- lucide-react (icons)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication, bcryptjs password hashing
- express-async-handler, centralized error middleware

## Features

**Customers**
- Browse, search, filter (category/price), and sort products
- Product detail pages with image gallery, variants, specs, and reviews
- Cart with quantity limits tied to live stock, persisted in `localStorage`
- Checkout with shipping details and Cash on Delivery
- Register/login, profile management, order history and order detail views
- Contact form wired to the backend

**Admin** (`/admin`, role-protected)
- Dashboard stats: revenue, orders, customers, products, recent orders, status breakdown
- Product CRUD (create/edit/delete with image URLs, specs, variants, featured flag)
- Order management with live status updates (Pending → Confirmed → Processing → Shipped → Delivered / Cancelled)
- Customer list

## Folder Structure

```
leathertique-impex/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # layout, product, ui, common, admin
│       ├── pages/          # Home, Shop, ProductDetails, About, Contact,
│       │                   # Cart, Checkout, Account, NotFound, admin/*
│       ├── layouts/        # MainLayout, AdminLayout
│       ├── context/        # Zustand stores (auth, cart, wishlist)
│       ├── services/       # Axios instance + per-resource API modules
│       └── utils/          # formatting, pricing helpers
├── server/                 # Express + MongoDB backend
│   ├── config/db.js
│   ├── models/             # User, Product, Category, Order, Review, ContactMessage
│   ├── controllers/
│   ├── routes/
│   ├── middleware/         # auth, admin, error handling
│   └── seed/                # seed data + seed script
├── .env.example
└── package.json             # root convenience scripts
```

## Installation

Requires Node.js 18+ and a running MongoDB instance (local or Atlas).

```bash
npm run install:all
```

This installs dependencies for both `client/` and `server/`.

## Environment Variables

Copy `.env.example` to `server/.env` (and adjust `client/.env` if your API runs elsewhere):

```env
MONGO_URI=mongodb://127.0.0.1:27017/leathertique-impex
JWT_SECRET=replace_this_with_a_long_random_secret
PORT=5000
NODE_ENV=development
```

`client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

This project was set up against a local **MongoDB Community Server** (installed via `winget install MongoDB.Server`, running as a Windows service on `mongodb://127.0.0.1:27017`). You can instead point `MONGO_URI` at a MongoDB Atlas cluster — no code changes needed.

## Seeding the Database

```bash
npm run seed
```

Seeds 6 categories, 20 products, and two accounts:

| Role     | Email                            | Password     |
|----------|-----------------------------------|--------------|
| Admin    | admin@leathertiqueimpex.com       | Admin@123    |
| Customer | customer@leathertiqueimpex.com    | Customer@123 |

**These are demo credentials only — replace them before any production deployment.**

To wipe all data: `npm run seed -- -d` (run from `server/`, or `cd server && npm run seed:destroy`).

## Development

```bash
npm run dev
```

Runs the client (`http://localhost:5173`) and server (`http://localhost:5000`) concurrently.
Run them separately with `npm run client` / `npm run server` if preferred.

## Production Build

```bash
npm run build
```

Builds the frontend to `client/dist/`. Serve it with any static host, and run
`node server/server.js` (with `NODE_ENV=production`) for the API, pointed at your
production `MONGO_URI`.

## API Overview

All routes are prefixed with `/api`.

| Resource   | Routes |
|------------|--------|
| Auth       | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| Users      | `PUT /users/profile`, `GET /users` (admin) |
| Products   | `GET /products` (search/filter/sort/paginate), `GET /products/:id`, `GET /products/:id/related`, `POST` / `PUT` / `DELETE /products/:id` (admin) |
| Categories | `GET /categories`, `POST` / `PUT` / `DELETE /categories/:id` (admin) |
| Orders     | `POST /orders`, `GET /orders/my-orders`, `GET /orders/:id`, `GET /orders` (admin), `PUT /orders/:id/status` (admin) |
| Reviews    | `GET /reviews/:productId`, `POST /reviews/:productId` |
| Contact    | `POST /contact`, `GET /contact` (admin) |
| Admin      | `GET /admin/stats` |

Protected routes require `Authorization: Bearer <token>`. Admin-only routes additionally
require the authenticated user's `role` to be `admin`.

## Admin Setup

The seed script creates a default admin account (see table above). To promote another user
to admin, update their `role` field to `"admin"` directly in the `users` collection — there is
intentionally no self-service "become admin" endpoint.

## Future Improvements

- Online payment gateway (Stripe/PayPal) — the order/payment model already separates
  `paymentMethod` and `paymentStatus` so this can be added without a schema change
- Image upload (Cloudinary/S3) instead of pasting image URLs in the admin product form
- Server-side pagination for the admin orders/customers tables
- Email notifications on order status changes
