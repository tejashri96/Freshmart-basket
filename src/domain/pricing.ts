import { PRODUCTS, ProductId } from './catalog';

export type Quantities = Partial<Record<ProductId, number>>;

export interface Offer {
  id: string;
  description: string;
  
  calculate: (qty: Quantities) => number;
}

const price = (id: ProductId) => PRODUCTS.find((p) => p.id === id)!.price;
const qtyOf = (q: Quantities, id: ProductId) => q[id] ?? 0;

export const OFFERS: readonly Offer[] = [
  {
    id: 'cheese-bogof',
    description: 'Buy a Cheese, get a second Cheese free',
    calculate: (q) => Math.floor(qtyOf(q, 'cheese') / 2) * price('cheese'),
  },
  {
    id: 'soup-bread',
    description: 'Buy a Soup, get a half price Bread',
    calculate: (q) =>
      Math.min(qtyOf(q, 'soup'), qtyOf(q, 'bread')) * Math.round(price('bread') / 2),
  },
  {
    id: 'butter-third',
    description: 'A third off Butter',
    calculate: (q) => qtyOf(q, 'butter') * Math.round(price('butter') / 3),
  },
];

export interface AppliedOffer {
  id: string;
  description: string;
  saving: number;
}

export interface Bill {
  subtotal: number;
  offers: AppliedOffer[];
  totalSavings: number;
  total: number;
}

export function calculateBill(qty: Quantities): Bill {
  const subtotal = PRODUCTS.reduce((sum, p) => sum + p.price * qtyOf(qty, p.id), 0);
  const offers = OFFERS.map(({ id, description, calculate }) => ({
    id,
    description,
    saving: calculate(qty),
  })).filter((o) => o.saving > 0);
  const totalSavings = offers.reduce((sum, o) => sum + o.saving, 0);
  return { subtotal, offers, totalSavings, total: subtotal - totalSavings };
}
