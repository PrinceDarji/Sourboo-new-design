'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { formatInr } from '@/src/lib/cart/price';

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
    <div className="sb-cart-item">
      <div className="sb-cart-item-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="sb-cart-item-img" />
      </div>

      <div className="sb-cart-item-info">
        <h4 className="sb-cart-item-title font-coolvetica">{name}</h4>
        <div className="sb-cart-item-price font-schoolbell">{formatInr(price)}</div>

        <div className="sb-cart-qty-control">
          <button
            type="button"
            onClick={() => updateQuantity(slug, quantity - 1)}
            className="sb-cart-qty-btn"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="sb-cart-qty-num">{quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(slug, quantity + 1)}
            className="sb-cart-qty-btn"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(slug)}
        className="sb-cart-item-remove"
        aria-label={`Remove ${name}`}
      >
        ✕
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    subtotalAfterDiscount,
    isOpen,
    closeCart,
    applyDiscountCode,
    clearDiscountCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  if (!isOpen) return null;

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

  return (
    <>
      <div
        className="sb-cart-drawer-overlay active"
        onClick={closeCart}
        role="presentation"
      />

      <aside
        className="sb-cart-drawer active"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="sb-cart-drawer-header">
          <div className="sb-cart-drawer-title-row">
            <h3 className="sb-cart-drawer-title font-coolvetica">
              your bag ({totalItems})
            </h3>
            <button
              type="button"
              onClick={closeCart}
              className="sb-cart-drawer-close"
              aria-label="Close cart drawer"
            >
              ✕
            </button>
          </div>
          <div className="sb-cart-preorder-badge font-schoolbell">
            ⚡ ships in 3-5 business days • small-batch handcrafted
          </div>
        </div>

        {/* Item List */}
        <div className="sb-cart-drawer-body">
          {items.length === 0 ? (
            <div className="sb-cart-empty">
              <p className="sb-cart-empty-text font-schoolbell">
                your bag is empty :(
              </p>
              <p className="sb-cart-empty-sub">
                don&apos;t leave your tastebuds hanging. get some sour snacks!
              </p>
              <Link
                href="/product"
                onClick={closeCart}
                className="sb-cart-shop-now-btn font-coolvetica"
              >
                shop all flavours →
              </Link>
            </div>
          ) : (
            <div className="sb-cart-items-list">
              {items.map((item) => (
                <CartItemRow key={item.slug} {...item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="sb-cart-drawer-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCode} className="sb-cart-discount-form">
              <input
                type="text"
                placeholder="Discount code (e.g. SOURBABE05)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="sb-cart-discount-input"
              />
              <button type="submit" className="sb-cart-discount-apply">
                Apply
              </button>
            </form>

            {discountError && (
              <p className="sb-cart-discount-error font-schoolbell">{discountError}</p>
            )}

            {discountCode && (
              <div className="sb-cart-active-discount">
                <span>Code <strong>{discountCode}</strong> applied (−5%)</span>
                <button
                  type="button"
                  onClick={clearDiscountCode}
                  className="sb-cart-remove-discount"
                >
                  remove
                </button>
              </div>
            )}

            {/* Calculations */}
            <div className="sb-cart-summary">
              <div className="sb-cart-summary-row">
                <span>Subtotal</span>
                <span>{formatInr(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="sb-cart-summary-row discount">
                  <span>Discount</span>
                  <span>−{formatInr(discountAmount)}</span>
                </div>
              )}
              <div className="sb-cart-summary-row total">
                <span>Total</span>
                <span>{formatInr(subtotalAfterDiscount)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="sb-cart-checkout-btn font-coolvetica"
            >
              proceed to checkout →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
