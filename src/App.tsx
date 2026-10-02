import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Shop from './pages/Shop';
import Bill from './pages/Bill';
import { Logo } from './components/ProductArt';
import { formatPrice } from './domain/catalog';
import { selectBill, selectQuantities, useAppSelector } from './store';

export default function App() {
  const [query, setQuery] = useState('');
  const count = useAppSelector((s) => Object.values(selectQuantities(s)).reduce((a, b) => a + b, 0));
  const { total } = useAppSelector(selectBill);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="bg-green-700 py-1.5 text-center text-xs font-medium text-white print:hidden">
        🚚 Free delivery on orders over £20 · Fresh groceries, every day
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm print:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Logo size={40} />
            <span className="text-2xl font-extrabold tracking-tight text-green-700">Fresh<span className="text-orange-500">Mart</span></span>
          </Link>

          <div className="relative hidden flex-1 md:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for bread, milk, cheese…"
              aria-label="Search products"
              className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-5 pr-12 text-sm outline-none focus:border-green-600 focus:bg-white"
            />
            <span className="absolute right-4 top-2.5 text-slate-400" aria-hidden>🔍</span>
          </div>

          <Link to="/bill" className="relative ml-auto flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700 md:ml-0">
            🛒 <span>{formatPrice(total)}</span>
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-[11px]">{count}</span>}
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Shop query={query} />} />
        <Route path="/bill" element={<div className="bg-slate-50 px-4 py-10"><Bill /></div>} />
      </Routes>

      <footer className="mt-10 bg-slate-900 text-slate-300 print:hidden">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-white"><Logo size={32} /><b className="text-lg">FreshMart</b></div>
            <p className="text-sm">Your neighbourhood grocery store, online. Quality food at honest prices.</p>
          </div>
          <div><h4 className="mb-3 font-bold text-white">Shop</h4><ul className="space-y-1 text-sm"><li>Bakery</li><li>Dairy</li><li>Pantry</li><li>Deals</li></ul></div>
          <div><h4 className="mb-3 font-bold text-white">Help</h4><ul className="space-y-1 text-sm"><li>Delivery info</li><li>Returns</li><li>FAQs</li><li>Contact us</li></ul></div>
          <div><h4 className="mb-3 font-bold text-white">Contact</h4><p className="text-sm">hello@freshmart.example<br />Mon–Sun, 8am – 10pm</p></div>
        </div>
        <p className="border-t border-slate-700 py-4 text-center text-xs">© 2026 FreshMart. All rights reserved.</p>
      </footer>
    </div>
  );
}
