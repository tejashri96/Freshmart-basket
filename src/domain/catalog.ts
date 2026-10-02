export type ProductId =
  | 'bread' | 'milk' | 'cheese' | 'soup' | 'butter'
  | 'eggs' | 'apples' | 'bananas' | 'tomatoes' | 'rice' | 'tea' | 'juice';

export type Category = 'Bakery' | 'Dairy' | 'Pantry' | 'Fruits & Veg' | 'Beverages';

export interface Product {
  id: ProductId;
  name: string;
  category: Category;
  
  unit: string;
  brand: string;
  rating: number;
  
  price: number;
}

const brand = 'FreshMart Select';

export const PRODUCTS: readonly Product[] = [
 
  { id: 'bread', name: 'Wholemeal Bread', category: 'Bakery', unit: '800 g loaf', brand, rating: 4.4, price: 110 },
  { id: 'milk', name: 'Fresh Milk', category: 'Dairy', unit: '1 L', brand, rating: 4.6, price: 50 },
  { id: 'cheese', name: 'Mature Cheddar Cheese', category: 'Dairy', unit: '200 g', brand, rating: 4.5, price: 90 },
  { id: 'soup', name: 'Tomato Soup', category: 'Pantry', unit: '400 g can', brand, rating: 4.2, price: 60 },
  { id: 'butter', name: 'Salted Butter', category: 'Dairy', unit: '250 g', brand, rating: 4.7, price: 120 },
  
  { id: 'eggs', name: 'Free Range Eggs', category: 'Dairy', unit: 'Pack of 6', brand, rating: 4.5, price: 280 },
  { id: 'apples', name: 'Red Apples', category: 'Fruits & Veg', unit: '1 kg', brand, rating: 4.3, price: 180 },
  { id: 'bananas', name: 'Bananas', category: 'Fruits & Veg', unit: '6 pcs', brand, rating: 4.4, price: 90 },
  { id: 'tomatoes', name: 'Vine Tomatoes', category: 'Fruits & Veg', unit: '500 g', brand, rating: 4.1, price: 110 },
  { id: 'rice', name: 'Basmati Rice', category: 'Pantry', unit: '1 kg', brand, rating: 4.6, price: 250 },
  { id: 'tea', name: 'Breakfast Tea', category: 'Beverages', unit: '80 tea bags', brand, rating: 4.5, price: 190 },
  { id: 'juice', name: 'Orange Juice', category: 'Beverages', unit: '1 L', brand, rating: 4.3, price: 160 },
];

export const CATEGORIES: readonly Category[] = ['Bakery', 'Dairy', 'Pantry', 'Fruits & Veg', 'Beverages'];

export const formatPrice = (pence: number): string => `£${(pence / 100).toFixed(2)}`;
