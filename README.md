# FreshCart – React + Redux Toolkit + TypeScript basket

Select products, see the subtotal, each special offer applied with its saving, and the final total.

## Run
    npm install
    npm run dev      # local
    npm test         # unit tests (Vitest)
    npm run build    # production build -> dist/

## Design decisions
- **Pricing logic is pure and separate from UI** (`src/domain/pricing.ts`) and fully unit tested.
- **Money in integer pence** to avoid floating point errors.
- **Offers are data** (`OFFERS` array) – add a new offer without touching components.
- **Redux stores only quantities**; the bill is derived with a memoised selector.
- Tailwind CSS for styling; accessible labels on buttons.

## Deploy (Netlify)
Build command `npm run build`, publish directory `dist`. Or: `npx netlify deploy --prod --dir=dist`.

## Save orders to Firebase Firestore
1. Create a project at console.firebase.google.com and add a Web app.
2. Build > Firestore Database > Create database (start in test mode while developing).
3. Copy `.env.example` to `.env` and paste your Firebase values.
4. Run `npm install` then `npm run dev`. On the bill page, click **Place order**; a document appears in the `orders` collection.
Never commit `.env` (it is already in `.gitignore`).
