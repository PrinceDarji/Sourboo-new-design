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
        <div className="sb-cart-item-price font-coolvetica">{formatInr(price)}</div>

        {/* Quantity Controls - NO lines/boxes around plus and minus */}
        <div className="sb-cart-qty-control">
          <button
            type="button"
            onClick={() => updateQuantity(slug, quantity - 1)}
            className="sb-cart-qty-btn-borderless"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="sb-cart-qty-num">{quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(slug, quantity + 1)}
            className="sb-cart-qty-btn-borderless"
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
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    if (shopifyDomain && typeof window !== 'undefined') {
      e.preventDefault();
      const variantId = items[0]?.slug;
      if (variantId) {
        window.location.href = `https://${shopifyDomain}/cart/${variantId}:${items[0].quantity}`;
        return;
      }
    }
    // Default demo checkout simulation
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`sb-cart-drawer-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      {/* Drawer Container */}
      <aside
        className={`sb-cart-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="Shopping Cart"
        aria-hidden={!isOpen}
        role="dialog"
      >
        {/* Child-drawn Hand-Wavy Edge along the left side */}
        <div className="sb-cart-child-drawn-edge" aria-hidden="true">
          <svg
            className="sb-cart-wavy-svg"
            viewBox="0 0 16 1200"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M10 0C6 45 14 90 8 135C2 180 13 225 9 270C5 315 14 360 8 405C2 450 12 495 9 540C6 585 14 630 8 675C2 720 13 765 9 810C5 855 14 900 8 945C2 990 12 1035 9 1080C6 1125 13 1170 10 1200"
              stroke="#E81B6D"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Drawer Header */}
        <div className="sb-cart-drawer-header">
          <div className="sb-cart-drawer-title-row">
            <h2 className="sb-cart-drawer-title">
              YOUR BAG ({totalItems})
            </h2>
            <button
              type="button"
              onClick={closeCart}
              className="sb-cart-drawer-close"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
          <span className="sb-cart-preorder-badge font-schoolbell">
            🥒 Small Batch • Freshly Fermented
          </span>
        </div>

        {/* Drawer Body */}
        <div className="sb-cart-drawer-body">
          {items.length === 0 ? (
            <div className="sb-cart-empty">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cartlogo.webp"
                alt="Empty Cart Pickle"
                style={{ width: '90px', height: 'auto', marginBottom: '14px' }}
              />
              <p className="sb-cart-empty-text">BAG IS EMPTY</p>
              <p className="sb-cart-empty-sub font-schoolbell">
                no pickles? your fridge is judging you.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="sb-cart-shop-now-btn"
              >
                FIND YOUR CRUNCH →
              </button>
            </div>
          ) : (
            <div className="sb-cart-items-list">
              {items.map((item) => (
                <CartItemRow
                  key={item.slug}
                  slug={item.slug}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="sb-cart-drawer-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCode} className="sb-cart-coupon-form">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Discount code (try SOURBABE05)"
                className="sb-cart-coupon-input font-schoolbell"
              />
              <button
                type="submit"
                className="sb-cart-coupon-btn font-coolvetica"
              >
                APPLY
              </button>
            </form>

            {discountError && (
              <p className="sb-cart-discount-err font-schoolbell">{discountError}</p>
            )}

            {discountCode && (
              <div className="sb-cart-active-discount">
                <span>Code {discountCode} applied (-{formatInr(discountAmount)})</span>
                <button
                  type="button"
                  onClick={clearDiscountCode}
                  className="sb-cart-clear-code"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Subtotal */}
            <div className="sb-cart-subtotal-row">
              <span className="font-schoolbell" style={{ fontSize: '1.25rem' }}>Subtotal:</span>
              <span className="sb-cart-subtotal-val font-coolvetica">
                {formatInr(subtotalAfterDiscount)}
              </span>
            </div>
            <p className="sb-cart-shipping-note font-schoolbell">
              Taxes calculated at checkout. Flat ₹100 shipping.
            </p>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              onClick={handleCheckoutClick}
              className="sb-cart-checkout-btn font-coolvetica"
            >
              PROCEED TO CHECKOUT →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
