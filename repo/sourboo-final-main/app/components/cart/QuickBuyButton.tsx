'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { parsePriceLabel } from '@/src/lib/cart/price';

type QuickBuyButtonProps = {
  slug: string;
  name: string;
  priceLabel: string;
  image: string;
  className?: string;
  children?: React.ReactNode;
};

export default function QuickBuyButton({
  slug,
  name,
  priceLabel,
  image,
  className = '',
  children,
}: QuickBuyButtonProps) {
  const { addItem, openCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      slug,
      name,
      image,
      price: parsePriceLabel(priceLabel),
    });

    // If running in a Shopify theme or store, sync to Shopify Ajax Cart API (/cart/add.js)
    if (typeof window !== 'undefined' && (window as unknown as { Shopify?: unknown }).Shopify) {
      try {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ items: [{ id: slug, quantity: 1 }] }),
        }).catch(() => {});
      } catch {
        // Fall back gracefully to internal cart
      }
    }

    setJustAdded(true);
    openCart();

    setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className} ${justAdded ? 'added' : ''}`}
      aria-label={`Add ${name} to bag`}
    >
      {justAdded ? 'ADDED 🥒 ✓' : children || 'QUICK ADD +'}
    </button>
  );
}
