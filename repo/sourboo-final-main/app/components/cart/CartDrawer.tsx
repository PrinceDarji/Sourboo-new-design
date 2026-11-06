'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { formatInr } from '@/src/lib/cart/price';
import { SHIPPING_CHARGE_INR } from '@/src/lib/checkout/totals';

function CartItemRow({
  slug,
  name,
  price,
  image,
  quantity,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="sbx-cart__item">
      <div className="sbx-cart__item-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" />
      </div>

      <div className="sbx-cart__item-info">
        <p className="sbx-cart__item-name">{name}</p>
        <p className="sbx-cart__item-price">{formatInr(price * quantity)}</p>

        <div className="sbx-cart__qty" role="group" aria-label={`Quantity of ${name}`}>
          <button type="button" onClick={() => updateQuantity(slug, quantity - 1)} aria-label={`Decrease quantity of ${name}`}>
            −
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(slug, quantity + 1)}
            aria-label={`Increase quantity of ${name}`}
            disabled={quantity >= 99}
          >
            +
          </button>
        </div>
      </div>

      <button type="button" onClick={() => removeItem(slug)} className="sbx-cart__remove" aria-label={`Remove ${name} from bag`}>
        remove
      </button>
    </li>
  );
}

export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    discountPercent,
    subtotalAfterDiscount,
    isOpen,
    closeCart,
    applyDiscountCode,
    clearDiscountCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen, closeCart]);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscountError('');
    if (!inputCode.trim()) return;

    const res = applyDiscountCode(inputCode.trim());
    if (!res.ok) {
      setDiscountError(res.error);
    } else {
      setInputCode('');
    }
  };

  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
    if (shopifyDomain && items.length > 0) {
      e.preventDefault();
      const lineItems = items.map((i) => `${i.slug}:${i.quantity}`).join(',');
      const discountParam = discountCode ? `?discount=${discountCode}` : '';
      window.location.href = `https://${shopifyDomain}/cart/${lineItems}${discountParam}`;
    }
  };

  return (
    <>
      <div className={`sbx-cart-overlay ${isOpen ? 'is-open' : ''}`} onClick={closeCart} role="presentation" aria-hidden="true" />

      <aside
        className={`sbx-cart ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sbx-cart-title"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <svg className="sbx-cart__edge" viewBox="0 0 24 800" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M14 0C9 40 17 78 12 120C7 164 16 204 11 250C6 296 15 338 12 384C9 430 17 470 11 518C6 562 15 604 12 648C9 694 16 742 12 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M18 0C15 52 20 96 17 150C14 202 21 248 17 300C13 356 20 404 17 456C14 510 20 560 17 612C14 664 20 716 18 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        <div className="sbx-cart__head">
          <h2 id="sbx-cart-title" className="sbx-cart__title">
            your bag <span className="font-rascal">({totalItems})</span>
          </h2>
          <button ref={closeRef} type="button" onClick={closeCart} className="sbx-cart__close" aria-label="Close bag">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5.5c4.6 4.2 9 8.6 13.6 13.2M18.6 5.2C14 9.8 9.6 14.2 5.3 18.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="sbx-cart__note">small-batch handcrafted • ships in 2-4 business days</p>

        <div className="sbx-cart__body">
          {items.length === 0 ? (
            <div className="sbx-cart__empty">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/product/side-eye-jar.webp" alt="" className="sbx-cart__empty-jar" />
              <p className="sbx-cart__empty-title">your bag is empty</p>
              <Link href="/product" onClick={closeCart} className="sbx-cart__shop">
                SHOP NOW →
              </Link>
            </div>
          ) : (
            <ul className="sbx-cart__items">
              {items.map((item) => (
                <CartItemRow key={item.slug} {...item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="sbx-cart__foot">
            <form onSubmit={handleApplyCode} className="sbx-cart__code">
              <label htmlFor="sbx-cart-code" className="sr-only">
                Discount code
              </label>
              <input
                id="sbx-cart-code"
                type="text"
                placeholder="discount code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                autoComplete="off"
              />
              <button type="submit">apply</button>
            </form>

            {discountError && <p className="sbx-cart__error">{discountError}</p>}

            {discountCode && (
              <p className="sbx-cart__applied">
                <span>
                  code <strong>{discountCode}</strong> applied (−{discountPercent}%)
                </span>
                <button type="button" onClick={clearDiscountCode}>
                  remove
                </button>
              </p>
            )}

            <dl className="sbx-cart__summary">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatInr(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="is-discount">
                  <dt>Discount ({discountCode})</dt>
                  <dd>−{formatInr(discountAmount)}</dd>
                </div>
              )}
              <div>
                <dt>Shipping</dt>
                <dd>+ {formatInr(SHIPPING_CHARGE_INR)} per order</dd>
              </div>
              <div className="is-total">
                <dt>Estimated total</dt>
                <dd>{formatInr(subtotalAfterDiscount + SHIPPING_CHARGE_INR)}</dd>
              </div>
            </dl>

            <Link href="/checkout" onClick={handleCheckoutClick} className="sbx-cart__checkout">
              PROCEED TO CHECKOUT →
            </Link>

            <p className="sbx-cart__secure">🔒 100% secure checkout via PhonePe &amp; Shopify</p>
          </div>
        )}
      </aside>
    </>
  );
}
