# FreshMart – React + Redux Toolkit + TypeScript Grocery Basket

> Built as a take-home assignment for a React + Redux Toolkit + TypeScript hiring process.

Select grocery products and get a bill with the subtotal before offers, each special offer applied with its own saving, and the final total.

## Features
- Browse 12 products with category filters and search
- Special offers applied automatically
- Separate bill page with subtotal, savings and final total
- Orders saved to Firebase Firestore ("Place order" button)

## Special offers
- Buy a Cheese, get a second Cheese free
- Buy a Soup, get a half price Bread
- A third off Butter

## Tech stack
React, Redux Toolkit, TypeScript, Tailwind CSS, Vite, React Router, Vitest, Firebase Firestore

## Run locally
    npm install
    npm run dev

## Run tests
    npm test

## Save orders to Firestore (optional)
1. Create a Firebase project and add a Web app at console.firebase.google.com.
2. Create a Firestore database.
3. Copy `.env.example` to `.env` and fill in your Firebase values.
4. Run `npm run dev`, add items, open the bill and click **Place order**.

`.env` is in `.gitignore` and is never committed.

## Design decisions
- Pricing logic is a pure function, separate from the UI (`src/domain/pricing.ts`), and unit tested.
- Money is stored in whole pence to avoid floating point errors.
- Offers are data (the `OFFERS` list), so a new offer needs no component changes.
- Redux stores only quantities; the bill is derived with a memoised selector.
- Product photos are in `public/images`; a drawn image shows if a photo is missing.

## Nice-to-haves
- Unit tests (Vitest)
- Saving to Firebase Firestore
- Tailwind CSS styling

## Deployment
Not deployed yet. The project is ready for Netlify or Firebase Hosting (build command `npm run build`, output folder `dist`).

## What I would improve
User login and stricter Firestore rules, a cart that survives page refresh, and component tests.