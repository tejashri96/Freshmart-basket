import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, formatPrice } from '../domain/catalog';
import { clear } from '../store/basketSlice';
import { selectBill, selectQuantities, useAppDispatch, useAppSelector } from '../store';
import { saveOrder } from '../services/orders';
import { Logo, OfferLogo, ProductImage, bgFor } from '../components/ProductArt';

export default function Bill() {
  const dispatch = useAppDispatch();
  const quantities = useAppSelector(selectQuantities);
  const bill = useAppSelector(selectBill);
  const items = PRODUCTS.filter((p) => (quantities[p.id] ?? 0) > 0);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  
  async function handlePlaceOrder() {
    setSaveStatus('saving');
    try {
      await saveOrder(quantities, bill);
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🛒</p>
        <p className="mt-4 text-slate-500">Your cart is empty.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-green-600 px-6 py-2 font-semibold text-white">Start shopping</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">
      <header className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">FreshMart</h1>
            <p className="text-xs text-slate-500">Your bill · {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">RECEIPT</span>
      </header>

      <ul className="divide-y divide-slate-100 py-2">
        {items.map((p) => {
          const qty = quantities[p.id]!;
          return (
            <li key={p.id} className="flex items-center gap-4 py-3">
              <span className={`grid h-14 w-14 place-items-center overflow-hidden rounded-xl ${bgFor[p.id]}`}>
                <ProductImage id={p.id} size={44} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-500">{formatPrice(p.price)} × {qty}</p>
              </div>
              <p className="font-semibold text-slate-700">{formatPrice(p.price * qty)}</p>
            </li>
          );
        })}
      </ul>

      <dl className="space-y-3 border-t border-dashed border-slate-300 pt-4">
        <div className="flex justify-between text-slate-600">
          <dt>Subtotal (before offers)</dt>
          <dd>{formatPrice(bill.subtotal)}</dd>
        </div>

        {bill.offers.length > 0 && (
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Special offers applied</p>
            {bill.offers.map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-1 text-sm text-emerald-700">
                <OfferLogo />
                <dt className="flex-1">{o.description}</dt>
                <dd className="font-bold">−{formatPrice(o.saving)}</dd>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-emerald-200 pt-2 text-sm font-bold text-emerald-800">
              <span>Total savings</span>
              <span>{formatPrice(bill.totalSavings)}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between border-t border-slate-200 pt-3 text-2xl font-extrabold text-slate-900">
          <dt>Total to pay</dt>
          <dd>{formatPrice(bill.total)}</dd>
        </div>
      </dl>

      <footer className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button
          onClick={handlePlaceOrder}
          disabled={saveStatus === 'saving' || saveStatus === 'saved'}
          className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {saveStatus === 'saving' ? 'Saving…' : saveStatus === 'saved' ? 'Order saved ✓' : 'Place order'}
        </button>
        {saveStatus === 'error' && (
          <p className="w-full text-center text-sm text-rose-600">Could not save the order. Check your Firebase settings in the .env file.</p>
        )}
        <Link to="/" className="flex-1 rounded-xl border border-slate-300 py-2 text-center font-semibold text-slate-700 hover:bg-slate-50">← Back to shop</Link>
        <button onClick={() => window.print()} className="flex-1 rounded-xl bg-green-600 py-2 font-semibold text-white hover:bg-green-700">Print bill</button>
        <button onClick={() => dispatch(clear())} className="w-full text-sm text-slate-400 hover:text-rose-600">Clear cart</button>
      </footer>
      <p className="mt-4 text-center text-xs text-slate-400">Thank you for shopping at FreshMart 💚</p>
    </article>
  );
}
