import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductId } from '../domain/catalog';

const art: Record<ProductId, ReactNode> = {
  bread: (
    <>
      <rect x="14" y="42" width="72" height="40" rx="12" fill="#c98a4b" />
      <ellipse cx="50" cy="42" rx="36" ry="20" fill="#e0a860" />
      <path d="M34 36l8 10M50 31l8 10M66 36l8 10" stroke="#a8692c" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  milk: (
    <>
      <polygon points="30,32 50,14 70,32" fill="#cbd5e1" />
      <rect x="30" y="32" width="40" height="54" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
      <rect x="30" y="52" width="40" height="22" fill="#38bdf8" />
      <circle cx="50" cy="63" r="6" fill="#fff" />
    </>
  ),
  cheese: (
    <>
      <polygon points="10,68 90,68 90,44 10,58" fill="#f6c744" />
      <polygon points="10,58 70,34 90,44" fill="#fde68a" />
      <circle cx="35" cy="63" r="4" fill="#e0a800" />
      <circle cx="62" cy="60" r="5" fill="#e0a800" />
      <circle cx="78" cy="57" r="3" fill="#e0a800" />
    </>
  ),
  soup: (
    <>
      <path d="M12 50H88A38 36 0 0 1 12 50Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="38" ry="7" fill="#ef6c4a" />
      <path d="M38 38q-6-8 0-14M52 38q-6-8 0-14M66 38q-6-8 0-14" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  butter: (
    <>
      <polygon points="18,48 34,32 94,32 78,48" fill="#fef3c7" />
      <rect x="18" y="48" width="60" height="32" rx="3" fill="#fde68a" />
      <rect x="18" y="48" width="26" height="32" fill="#f59e0b" />
      <polygon points="78,48 94,32 94,64 78,80" fill="#fcd34d" />
    </>
  ),
  eggs: (<><rect x="14" y="52" width="72" height="30" rx="6" fill="#d6c3a5" /><ellipse cx="30" cy="48" rx="11" ry="15" fill="#fff7ed" stroke="#e5d3b8" /><ellipse cx="50" cy="48" rx="11" ry="15" fill="#fff7ed" stroke="#e5d3b8" /><ellipse cx="70" cy="48" rx="11" ry="15" fill="#fff7ed" stroke="#e5d3b8" /></>),
  apples: (<><circle cx="38" cy="58" r="22" fill="#dc2626" /><circle cx="62" cy="58" r="22" fill="#ef4444" /><path d="M50 38q2-12 10-14" stroke="#4d7c0f" strokeWidth="4" fill="none" /><ellipse cx="62" cy="26" rx="8" ry="4" fill="#65a30d" /></>),
  bananas: (<path d="M20 38Q28 90 82 70Q58 78 38 34Z" fill="#facc15" stroke="#ca8a04" strokeWidth="3" strokeLinejoin="round" />),
  tomatoes: (<><circle cx="50" cy="56" r="28" fill="#ef4444" /><path d="M36 34l14 8 14-8-6 12H42z" fill="#16a34a" /></>),
  rice: (<><path d="M26 28h48l8 56H18z" fill="#f1e4c3" stroke="#c9b27c" strokeWidth="2" /><rect x="34" y="50" width="32" height="20" rx="4" fill="#16a34a" /></>),
  tea: (<><path d="M22 44h48v18a24 20 0 0 1-48 0z" fill="#fff" stroke="#94a3b8" strokeWidth="2" /><path d="M70 50h8a8 8 0 0 1 0 16H68" fill="none" stroke="#94a3b8" strokeWidth="3" /><rect x="22" y="44" width="48" height="6" fill="#b45309" /></>),
  juice: (<><rect x="32" y="28" width="36" height="58" rx="5" fill="#fb923c" /><rect x="38" y="18" width="24" height="12" fill="#fed7aa" /><circle cx="50" cy="58" r="12" fill="#fff" /><circle cx="50" cy="58" r="8" fill="#f97316" /></>),
};

export const bgFor: Record<ProductId, string> = {
  bread: 'bg-amber-100',
  milk: 'bg-sky-100',
  cheese: 'bg-yellow-100',
  soup: 'bg-orange-100',
  butter: 'bg-lime-100',
  eggs: 'bg-orange-50',
  apples: 'bg-red-100',
  bananas: 'bg-yellow-100',
  tomatoes: 'bg-red-50',
  rice: 'bg-stone-100',
  tea: 'bg-emerald-50',
  juice: 'bg-orange-100',
};

export default function ProductArt({ id, size = 96 }: { id: ProductId; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={id}>
      {art[id]}
    </svg>
  );
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label="FreshMart logo">
      <rect width="48" height="48" rx="12" fill="#16a34a" />
      <path d="M10 18h28l-3 16a3 3 0 0 1-3 2H16a3 3 0 0 1-3-2z" fill="#fff" />
      <path d="M17 18l5-8M31 18l-5-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 22v10M19 27h10" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function OfferLogo() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-sm font-black text-white" aria-hidden>
      %
    </span>
  );
}

// Shows the photo from pu
export function ProductImage({ id, size = 104, fit = 'contain' }: { id: ProductId; size?: number; fit?: 'contain' | 'cover' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <ProductArt id={id} size={size} />;
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain';
  return <img src={`/images/${id}.jpg`} alt={id} loading="lazy" onError={() => setFailed(true)} className={`h-full w-full ${fitClass}`} />;
}
