# Kebabscrib Web App

Full-stack ordering platform for Kebabs Crib that lets guests build tacos, manage carts, and submit orders while the team creates, updates, and fulfills them from the admin dashboard.

## Overview

Kebabscrib is built with Next.js App Router and React 19 to deliver a modern ordering experience for a French-inspired kebab restaurant. Customers can explore the menu, customize tacos with live previews, and save their cart to local storage before submitting orders that the staff finalizes offline. Administrators work from a dedicated `/admin` workspace to add new dishes (with Cloudinary uploads), hide or delete menu items, and monitor live orders backed by MongoDB. Authentication, verification, password resets, and transactional emails are powered by NextAuth and Resend.

## Feature Highlights

- **Menu & Discovery** – Responsive hero, menu grid, and detailed item modals powered by SWR (`MenuProvider`) so guests always see the latest offerings.
- **Custom Taco Builder** – Guided workflow (`components/Menu/Tacos`) for building tacos, limiting base meats by size, selecting sauces, cheese, vegetables, and upselling meal add-ons via modal pickers.
- **Shopping Cart & Checkout** – Client cart context persists to `localStorage`, enforces unique cart IDs for every combination, calculates add-on totals, and submits draft orders directly to the backend.
- **Authentication & Accounts** – Credential-based auth with NextAuth, protected routes via middleware, verification & password reset tokens, and profile management.
- **Order Management** – Draft orders stored in MongoDB can be reviewed and marked complete from the admin dashboard, ensuring every submission is tracked.
- **Email Workflows** – Resend templates for order receipts, verification, password resets, and contact us submissions keep customers informed.
- **Admin Operations** – Role-gated dashboard with menu CRUD (includes Cloudinary uploads and slug generation), order completion actions, and live toast feedback.

## Tech Stack

- **Framework** – Next.js 15 (App Router) + React 19 + TypeScript
- **Styling & UI** – Tailwind CSS, Headless UI, Heroicons, GSAP animations
- **State & Data** – SWR for data fetching, custom React Contexts for menu, cart, and orders
- **Backend** – Next.js Route Handlers, MongoDB (Mongoose models), NextAuth JWT sessions
- **Fulfillment & Media** – Draft order tracking plus Cloudinary uploads
- **Emails** – Resend with React Email templates

## Project Structure

| Path | Description |
| --- | --- |
| `app/(public)` | Public-facing pages (home, menu, cart, contact, taco builder, auth flows, profile). |
| `app/(admin)` | Auth-protected admin shell with sidebar navigation and dashboard pages. |
| `app/api` | Route handlers for admin CRUD, auth, menu fetches, contact form, and user flows. |
| `components` | UI building blocks grouped by domain (`Admin`, `Auth`, `Menu`, etc.). |
| `lib` | Integrations (MongoDB connection, Resend + email templates). |
| `model` | Mongoose schemas for users, menu items, orders, verification/reset tokens. |
| `utils/context` | React Context providers for cart, menu, and orders. |
| `public` | Static assets, fonts, and global styles. |

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create `.env.local`** with the variables below.
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` to explore the storefront. Use `/admin` with an admin user to reach the dashboard.

> **Node version**: Next.js 15/React 19 require Node.js 18.17+ (20+ recommended).

## Environment Variables (`.env.local`)

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secure-random-string
MONGODB_URI=mongodb+srv://...

CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

RESEND_API_KEY=re_...

```

### Notes

- `NEXTAUTH_SECRET` secures JWT sessions and the middleware guard that keeps `/profile` and `/admin` protected.
- Cloudinary credentials enable image uploads when admins add new menu items.
- Resend is used for verification, password reset, order receipt, and contact emails.

## Available Scripts

- `npm run dev` – Start the Next.js dev server.
- `npm run build` – Create a production build.
- `npm run start` – Serve the production build (after running `build`).

## Key Workflows

- **Creating menu items**: Admins submit the add-item form, which uploads the image to Cloudinary, generates a slug, and saves the record via `/api/admin/additem`.
- **Managing visibility**: Toggles call `/api/admin/hideitem`, which flips the `isHidden` flag so items can be soft-launched before going live.
- **Cart -> Checkout**: Items added via `CartProvider` persist in local storage, extras are priced per item, and draft orders created via `/api/users/order/createdraftorder` capture every submission for staff follow-up.
- **Order fulfillment**: Admins review draft orders from the dashboard, update their status, and complete them once payment is handled offline.
- **Auth + Verification**: Signups store verification tokens, Resend delivers the verify link, middleware blocks unverified users from protected areas, and password reset tokens expire automatically through TTL indexes.
- **Contact Us**: Submissions call `/api/users/contactus`, which relays the message via Resend to the restaurant team.

## Emails & Domains

- Verify your sending domain in Resend so messages from `no-reply@kebabscrib.com` (configured in `lib/emails/sendEmail.tsx`) are delivered.
- Update the `from`/`to` addresses or make them configurable via env vars if needed.
- When testing locally, you can swap `resend.emails.send` with console logs or a mock key (`resend_25...`) to avoid live sends.

## Contributing / Next Steps

- Add automated tests for route handlers and contexts.
- Expand analytics (e.g., order trends, fulfillment metrics).
- Introduce role-based UI for `staff` vs `admin`.
- Localize copy and currency if Kebabscrib expands beyond AED pricing.
