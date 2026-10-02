import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, Category, ProductId, formatPrice } from '../domain/catalog';
import { decrement, increment } from '../store/basketSlice';
import { selectQuantities, useAppDispatch, useAppSelector } from '../store';
import ProductArt, { ProductImage } from '../components/ProductArt';


const offerTags: Partial<Record<ProductId, string>> = {
  cheese: 'BUY 1 GET 1 FREE',
  soup: 'SOUP + ½ PRICE BREAD',
  bread: '½ PRICE WITH SOUP',
  butter: '⅓ OFF',
};

const features = [
  { icon: '🚚', title: 'Free delivery', text: 'On orders over £20' },
  { icon: '🌿', title: 'Always fresh', text: 'Picked daily' },
  { icon: '💷', title: 'Best prices', text: 'Savings applied for you' },
  { icon: '🔒', title: 'Secure checkout', text: 'Safe & simple' },
];

export default function Shop({ query }: { query: string }) {
  const dispatch = useAppDispatch();
  const quantities = useAppSelector(selectQuantities);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Keep only the products that match the category and the search text
  const search = query.trim().toLowerCase();
  const shownProducts = PRODUCTS.filter((product) => {
    const categoryMatches = selectedCategory === 'All' || product.category === selectedCategory;
    const nameMatches = product.name.toLowerCase().includes(search);
    return categoryMatches && nameMatches;
  });

  return (
    <>
     
      <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-6 md:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 p-8 text-white sm:flex-row sm:items-center sm:justify-between overflow-hidden md:col-span-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-300">Fresh deals this week</p>
            <h1 className="mt-2 max-w-sm text-3xl font-extrabold leading-tight sm:text-4xl">Fresh groceries, delivered with big savings</h1>
            <a href="#products" className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-bold hover:bg-orange-600">Shop now</a>
          </div>
          
          <div className="hidden gap-2 self-end sm:flex">
            <ProductArt id="bread" size={120} />
            <ProductArt id="apples" size={120} />
          </div>
        </div>

       
        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-2xl bg-yellow-100 p-5">
            <div><p className="text-xs font-bold text-orange-600">BUY 1 GET 1</p><p className="text-xl font-extrabold">Free Cheese</p></div>
            <ProductArt id="cheese" size={70} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-amber-100 p-5">
            <div><p className="text-xs font-bold text-orange-600">HALF PRICE</p><p className="text-xl font-extrabold">Bread with Soup</p></div>
            <ProductArt id="soup" size={70} />
          </div>
        </div>
      </section>

     
      <section id="products" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-56 lg:shrink-0">
            <h2 className="mb-3 hidden text-sm font-bold uppercase text-slate-500 lg:block">Shop by category</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {(['All', ...CATEGORIES] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-left text-sm font-semibold ${selectedCategory === category ? 'border-green-600 bg-green-600 text-white' : 'border-slate-200 bg-white hover:border-green-600'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold">
                {selectedCategory === 'All' ? 'All products' : selectedCategory}{' '}
                <span className="text-sm font-medium text-slate-400">({shownProducts.length} items)</span>
              </h2>
              <Link to="/bill" className="text-sm font-bold text-green-700 hover:underline">View bill →</Link>
            </div>

            {shownProducts.length === 0 && <p className="py-10 text-center text-slate-500">No products found.</p>}

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {shownProducts.map((product) => {
                const quantity = quantities[product.id] ?? 0;
                return (
                  <li key={product.id} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg">
                    {offerTags[product.id] && (
                      <span className="absolute left-0 top-3 z-10 rounded-r bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {offerTags[product.id]}
                      </span>
                    )}

                    <div className="grid h-48 place-items-center overflow-hidden bg-white p-2">
                      <ProductImage id={product.id} />
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-slate-400">{product.brand}</p>
                      <h3 className="font-semibold leading-tight">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">{product.unit}</p>
                      <span className="mt-2 inline-block rounded bg-green-600 px-1.5 py-0.5 text-[11px] font-bold text-white">{product.rating} ★</span>
                      <p className="my-2 text-lg font-extrabold">{formatPrice(product.price)}</p>

                      {quantity === 0 ? (
                        <button onClick={() => dispatch(increment(product.id))} className="w-full rounded-full border-2 border-green-600 py-1.5 text-sm font-bold text-green-700 hover:bg-green-600 hover:text-white">
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded-full bg-green-600 p-1 text-white">
                          <button aria-label={`Remove one ${product.name}`} onClick={() => dispatch(decrement(product.id))} className="h-8 w-8 rounded-full text-lg font-bold hover:bg-green-700">−</button>
                          <span className="font-bold">{quantity}</span>
                          <button aria-label={`Add one ${product.name}`} onClick={() => dispatch(increment(product.id))} className="h-8 w-8 rounded-full text-lg font-bold hover:bg-green-700">+</button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 md:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
            <span className="text-3xl">{feature.icon}</span>
            <div><p className="font-bold">{feature.title}</p><p className="text-xs text-slate-500">{feature.text}</p></div>
          </div>
        ))}
      </section>
    </>
  );
}
