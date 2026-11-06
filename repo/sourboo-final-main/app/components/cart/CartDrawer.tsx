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
    // Check if Shopify store domain is set or running in Shopify environment
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
      {/* Backdrop Overlay */}
      <div
        className={`sb-cart-drawer-overlay ${isOpen ? 'is-open open active' : ''}`}
        onClick={closeCart}
        role="presentation"
        aria-hidden={!isOpen}
      />

      {/* Slide-over Drawer */}
      <aside
        className={`sb-cart-drawer ${isOpen ? 'is-open open active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="sb-cart-drawer-header">
          <div className="sb-cart-drawer-title-row">
            <h3 className="sb-cart-drawer-title font-coolvetica">
              YOUR BAG ({totalItems})
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
            ⚡ small-batch handcrafted • ships in 2-4 business days
          </div>
        </div>

        {/* Item List */}
        <div className="sb-cart-drawer-body">
          {items.length === 0 ? (
            <div className="sb-cart-empty">
              {/* Cute Pickle Doodle Graphic */}
              <svg viewBox="0 0 100 80" width="80" height="64" fill="none" aria-hidden="true">
                <ellipse cx="50" cy="40" rx="42" ry="32" fill="#2E5A27" stroke="#162E13" strokeWidth="3" />
                <ellipse cx="50" cy="40" rx="36" ry="26" fill="#88C744" />
                <ellipse cx="50" cy="40" rx="28" ry="19" fill="#ABDE68" />
                <ellipse cx="44" cy="38" rx="4" ry="2" fill="#2E5A27" transform="rotate(-15 44 38)" />
                <ellipse cx="54" cy="36" rx="4" ry="2" fill="#2E5A27" transform="rotate(20 54 36)" />
              </svg>
              <h4 className="sb-cart-empty-text font-coolvetica">YOUR BAG IS EMPTY :(</h4>
              <p className="sb-cart-empty-sub font-rascal">
                Don&apos;t leave your tastebuds hanging. Get some sour snacks!
              </p>
              <Link
                href="/product"
                onClick={closeCart}
                className="sb-cart-shop-now-btn font-coolvetica"
              >
                SHOP ALL FLAVOURS →
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
                className="sb-cart-discount-input font-coolvetica"
              />
              <button type="submit" className="sb-cart-discount-apply font-coolvetica">
                Apply
              </button>
            </form>

            {discountError && (
              <p className="sb-cart-discount-error font-schoolbell">{discountError}</p>
            )}

            {discountCode && (
              <div className="sb-cart-active-discount font-coolvetica">
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

            {/* Calculations Breakdown */}
            <div className="sb-cart-summary">
              <div className="sb-cart-summary-row">
                <span>Subtotal</span>
                <span>{formatInr(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="sb-cart-summary-row discount">
                  <span>5% Discount ({discountCode})</span>
                  <span>−{formatInr(discountAmount)}</span>
                </div>
              )}
              <div className="sb-cart-summary-row shipping-note">
                <span>Shipping</span>
                <span>+ ₹100 per order</span>
              </div>
              <div className="sb-cart-summary-row total">
                <span>Estimated Total</span>
                <span>{formatInr(subtotalAfterDiscount + 100)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              onClick={handleCheckoutClick}
              className="sb-cart-checkout-btn font-coolvetica"
            >
              PROCEED TO CHECKOUT →
            </Link>

            <p className="sb-cart-guarantee-note font-schoolbell">
              🔒 100% secure checkout via PhonePe &amp; Shopify
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
