'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import { useCart } from '../components/cart/CartProvider';
import { formatInr } from '@/src/lib/cart/price';

type CheckoutFormState = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
};

const initialFormState: CheckoutFormState = {
  fullName: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  paymentMethod: 'upi',
};

function toTrimmedCheckoutForm(formState: CheckoutFormState): CheckoutFormState {
  return {
    fullName: formState.fullName.trim(),
    email: formState.email.trim(),
    phone: formState.phone.trim(),
    line1: formState.line1.trim(),
    line2: formState.line2.trim(),
    city: formState.city.trim(),
    state: formState.state.trim(),
    postalCode: formState.postalCode.trim(),
    paymentMethod: formState.paymentMethod,
  };
}

function getCheckoutValidationError(
  formState: CheckoutFormState,
  items: Array<{ slug: string; quantity: number }>,
): string | null {
  if (items.length === 0) return 'Your cart is empty. Please add items before checking out.';
  if (formState.fullName.length < 2) return 'Please enter your full name.';
  if (!formState.email.includes('@') || !formState.email.includes('.')) {
    return 'Please enter a valid email address.';
  }
  const cleanPhone = formState.phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) return 'Please enter a valid 10-digit mobile number.';
  if (formState.line1.length < 4) return 'Please enter your street address / flat details.';
  if (formState.city.length < 2) return 'Please enter your city.';
  if (formState.state.length < 2) return 'Please enter your state.';
  if (formState.postalCode.length < 4) return 'Please enter your PIN code.';
  return null;
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discountCode,
    discountAmount,
    discountPercent,
    clearCart,
    applyDiscountCode,
    clearDiscountCode,
  } = useCart();

  const [formState, setFormState] = useState<CheckoutFormState>(initialFormState);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const shippingAmount = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 700 ? 0 : 100;
  }, [items.length, subtotal]);

  const totalPayable = useMemo(
    () => Math.max(0, subtotal + shippingAmount - discountAmount),
    [discountAmount, shippingAmount, subtotal],
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const res = applyDiscountCode(code);
    if (res.ok) {
      setCouponMessage({ text: `Boom! ${code} applied successfully!`, isError: false });
      setCouponInput('');
    } else {
      setCouponMessage({ text: res.error, isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    clearDiscountCode();
    setCouponMessage(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = toTrimmedCheckoutForm(formState);
    const validationError = getCheckoutValidationError(trimmed, items);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderRef = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSnapshot = {
        reference: orderRef,
        customer: trimmed,
        items: items.map((it) => ({
          slug: it.slug,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          image: it.image,
        })),
        subtotal,
        shipping: shippingAmount,
        discountCode,
        discountAmount,
        total: totalPayable,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      try {
        localStorage.setItem('sourboo_latest_order', JSON.stringify(orderSnapshot));
      } catch {
        // ignore
      }

      clearCart();
      window.location.href = `/checkout/thank-you?orderId=${encodeURIComponent(orderRef)}`;
    }, 600);
  };

  return (
    <main className="min-h-screen w-full bg-[#FAF8F5] text-[#0e3e1f] overflow-x-hidden selection:bg-[#d7f557] selection:text-[#0e3e1f]">
      <Navbar />

      {/* Main Container with generous bottom padding to prevent ANY footer wave clipping */}
      <div
        className="mx-auto w-full max-w-[1140px] px-5 sm:px-8 pb-48 md:pb-60"
        style={{ paddingTop: 'calc(var(--sbx-nav-h, 74px) + 36px)' }}
      >
        {/* Playful & Clean Header */}
        <div className="border-b-2 border-[#0e3e1f]/10 pb-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d7f557] px-3.5 py-1 text-xs font-bold tracking-wider text-[#0e3e1f] uppercase border border-[#0e3e1f]/20 shadow-sm font-coolvetica">
                🔒 100% SECURE CHECKOUT
              </div>
              <h1 className="mt-2 font-coolvetica text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold text-[#0e3e1f] leading-none">
                Claim Your Stash
              </h1>
            </div>
            <Link
              href="/product"
              className="inline-flex items-center gap-1.5 font-coolvetica text-base font-bold text-[#0e3e1f] underline decoration-[#f50a59] decoration-2 underline-offset-4 hover:text-[#f50a59] transition-colors"
            >
              &larr; Return to Shop
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto my-16 max-w-lg rounded-3xl border-3 border-[#0e3e1f] bg-white p-8 sm:p-12 text-center shadow-[6px_6px_0px_#0e3e1f]">
            <span className="text-4xl block mb-3">🥒</span>
            <h2 className="font-coolvetica text-3xl font-bold text-[#0e3e1f]">Your Bag is Empty</h2>
            <p className="mt-3 font-satoshi text-base text-[#143820] max-w-sm mx-auto">
              Looks like you haven&apos;t added any pickled crunch to your cart yet. Let&apos;s fix that!
            </p>
            <Link
              href="/product"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0e3e1f] px-8 py-4 font-coolvetica text-lg font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_#d7f557] transition-transform hover:-translate-y-1 hover:bg-[#8b5cf6]"
            >
              Explore Flavours &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.22fr_0.78fr] items-start">
            {/* Left Column: Checkout Forms */}
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Step 1: Contact Details */}
              <div className="rounded-3xl border-2 border-[#0e3e1f]/15 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b-2 border-[#0e3e1f]/10 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d7f557] border-2 border-[#0e3e1f] font-coolvetica text-base font-bold text-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f]">
                    1
                  </span>
                  <div>
                    <h2 className="font-coolvetica text-xl sm:text-2xl font-bold text-[#0e3e1f]">
                      Contact Information
                    </h2>
                    <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                      Where should we send tracking updates?
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      Full Name *
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={formState.fullName}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      Email Address *
                    </span>
                    <input
                      required
                      type="email"
                      placeholder="priya@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      Mobile Number (for WhatsApp Tracker) *
                    </span>
                    <input
                      required
                      type="tel"
                      placeholder="9876543210"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="rounded-3xl border-2 border-[#0e3e1f]/15 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b-2 border-[#0e3e1f]/10 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d7f557] border-2 border-[#0e3e1f] font-coolvetica text-base font-bold text-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f]">
                    2
                  </span>
                  <div>
                    <h2 className="font-coolvetica text-xl sm:text-2xl font-bold text-[#0e3e1f]">
                      Delivery Address
                    </h2>
                    <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                      Doorstep delivery in 2-4 business days
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      Street Address / House / Flat No. *
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="Flat 402, Sunshine Heights, 12th Main Road"
                      value={formState.line1}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, line1: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      Landmark / Area (Optional)
                    </span>
                    <input
                      type="text"
                      placeholder="Near Metro Station / City Park"
                      value={formState.line2}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, line2: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      City *
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={formState.city}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      State *
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Karnataka"
                      value={formState.state}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, state: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="font-satoshi text-xs font-bold uppercase tracking-wider text-[#0e3e1f]">
                      PIN Code *
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 560001"
                      value={formState.postalCode}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, postalCode: e.target.value }))
                      }
                      className="h-12 w-full rounded-2xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-4 font-satoshi text-sm text-[#0e3e1f] placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="rounded-3xl border-2 border-[#0e3e1f]/15 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3 border-b-2 border-[#0e3e1f]/10 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d7f557] border-2 border-[#0e3e1f] font-coolvetica text-base font-bold text-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f]">
                    3
                  </span>
                  <div>
                    <h2 className="font-coolvetica text-xl sm:text-2xl font-bold text-[#0e3e1f]">
                      Payment Method
                    </h2>
                    <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                      Encrypted &amp; secure transaction
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      formState.paymentMethod === 'upi'
                        ? 'border-[#0e3e1f] bg-[#FAF8F5] shadow-sm'
                        : 'border-[#0e3e1f]/15 hover:border-[#0e3e1f]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formState.paymentMethod === 'upi'}
                        onChange={() =>
                          setFormState((prev) => ({ ...prev, paymentMethod: 'upi' }))
                        }
                        className="h-5 w-5 accent-[#0e3e1f]"
                      />
                      <div>
                        <p className="font-coolvetica text-base font-bold text-[#0e3e1f]">
                          UPI (Google Pay, PhonePe, Paytm, QR)
                        </p>
                        <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                          Instant and zero transaction fees
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#d7f557] px-3 py-1 font-coolvetica text-xs font-bold text-[#0e3e1f] border border-[#0e3e1f]/20">
                      FASTEST
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      formState.paymentMethod === 'card'
                        ? 'border-[#0e3e1f] bg-[#FAF8F5] shadow-sm'
                        : 'border-[#0e3e1f]/15 hover:border-[#0e3e1f]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formState.paymentMethod === 'card'}
                        onChange={() =>
                          setFormState((prev) => ({ ...prev, paymentMethod: 'card' }))
                        }
                        className="h-5 w-5 accent-[#0e3e1f]"
                      />
                      <div>
                        <p className="font-coolvetica text-base font-bold text-[#0e3e1f]">
                          Credit / Debit Cards &amp; NetBanking
                        </p>
                        <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                          Visa, Mastercard, RuPay, Amex
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      formState.paymentMethod === 'cod'
                        ? 'border-[#0e3e1f] bg-[#FAF8F5] shadow-sm'
                        : 'border-[#0e3e1f]/15 hover:border-[#0e3e1f]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formState.paymentMethod === 'cod'}
                        onChange={() =>
                          setFormState((prev) => ({ ...prev, paymentMethod: 'cod' }))
                        }
                        className="h-5 w-5 accent-[#0e3e1f]"
                      />
                      <div>
                        <p className="font-coolvetica text-base font-bold text-[#0e3e1f]">
                          Cash on Delivery (COD)
                        </p>
                        <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                          Pay upon arrival at your doorstep
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-center font-satoshi text-sm font-semibold text-red-700">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit CTA Card */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#0e3e1f] py-4 sm:py-5 font-coolvetica text-xl sm:text-2xl font-bold tracking-wide text-white border-2 border-[#0e3e1f] shadow-[4px_4px_0px_#d7f557] transition-transform hover:-translate-y-1 hover:bg-[#8b5cf6] disabled:opacity-50"
                >
                  {isSubmitting
                    ? 'Processing Order...'
                    : `Place Order • ${formatInr(totalPayable)}`}
                </button>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-center font-satoshi text-xs text-[#0e3e1f]/70">
                  <span className="inline-flex items-center gap-1 font-semibold">✓ 100% Secure Checkout</span>
                  <span className="inline-flex items-center gap-1 font-semibold">✓ Sealed Small Batches</span>
                  <span className="inline-flex items-center gap-1 font-semibold">✓ 2-4 Day Dispatch</span>
                </div>
              </div>
            </form>

            {/* Right Column: Order Summary */}
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border-2 border-[#0e3e1f]/15 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b-2 border-[#0e3e1f]/10 pb-4">
                  <h2 className="font-coolvetica text-xl sm:text-2xl font-bold text-[#0e3e1f]">
                    Order Summary
                  </h2>
                  <span className="rounded-full bg-[#d7f557] px-3 py-1 font-coolvetica text-xs font-bold text-[#0e3e1f] border border-[#0e3e1f]/20">
                    {itemCount} {itemCount === 1 ? 'jar' : 'jars'}
                  </span>
                </div>

                {/* Items List */}
                <div className="mt-4 divide-y divide-[#0e3e1f]/10">
                  {items.map((item) => (
                    <div key={item.slug} className="flex items-center gap-3.5 py-3.5">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#FAF8F5] p-1.5 border border-[#0e3e1f]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image || '/product/catalog/side-eye.webp'}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-coolvetica text-base font-bold text-[#0e3e1f]">
                          {item.name}
                        </p>
                        <p className="font-satoshi text-xs text-[#0e3e1f]/70">
                          Qty: {item.quantity} &times; {formatInr(item.price)}
                        </p>
                      </div>
                      <p className="font-coolvetica text-base font-bold text-[#0e3e1f]">
                        {formatInr(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <div className="mt-6 border-t-2 border-[#0e3e1f]/10 pt-5">
                  {discountCode ? (
                    <div className="flex items-center justify-between rounded-2xl bg-[#d7f557]/40 px-4 py-3 border border-[#0e3e1f]/20">
                      <div className="font-satoshi text-xs font-semibold text-[#0e3e1f]">
                        🎉 Code <span className="font-bold uppercase tracking-wider">{discountCode}</span> applied!
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="font-coolvetica text-xs font-bold text-[#f50a59] underline hover:text-[#0e3e1f]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (e.g. SOUR10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="h-11 flex-1 rounded-xl border-2 border-[#0e3e1f]/20 bg-[#FAF8F5] px-3.5 font-satoshi text-xs uppercase placeholder:normal-case placeholder:text-[#0e3e1f]/40 transition-colors focus:border-[#0e3e1f] focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="h-11 rounded-xl bg-[#0e3e1f] px-5 font-coolvetica text-sm font-bold text-white transition-all hover:bg-[#8b5cf6]"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMessage && (
                    <p
                      className={`mt-2 font-satoshi text-xs ${
                        couponMessage.isError ? 'text-red-600' : 'text-emerald-700 font-semibold'
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Calculation Breakdown */}
                <div className="mt-6 space-y-3 border-t-2 border-[#0e3e1f]/10 pt-5 font-satoshi text-sm">
                  <div className="flex justify-between text-[#0e3e1f]/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#0e3e1f]">{formatInr(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-[#0e3e1f]/80">
                    <span>Shipping</span>
                    <span>
                      {shippingAmount === 0 ? (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          FREE
                        </span>
                      ) : (
                        <span className="font-semibold text-[#0e3e1f]">
                          {formatInr(shippingAmount)}
                        </span>
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#f50a59]">
                      <span>Discount ({discountCode || `${discountPercent}% OFF`})</span>
                      <span className="font-bold">-{formatInr(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between border-t-2 border-[#0e3e1f]/10 pt-4">
                    <span className="font-coolvetica text-xl font-bold text-[#0e3e1f]">
                      Total Payable
                    </span>
                    <span className="font-coolvetica text-2xl sm:text-3xl font-bold text-[#0e3e1f]">
                      {formatInr(totalPayable)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Guarantee Info Box */}
              <div className="rounded-3xl border-2 border-[#0e3e1f] bg-[#d7f557] p-5 text-center shadow-[4px_4px_0px_#0e3e1f]">
                <p className="font-coolvetica text-base font-bold text-[#0e3e1f]">
                  ⚡ FRESH BRINE GUARANTEE
                </p>
                <p className="mt-1 font-satoshi text-xs text-[#143820] leading-relaxed">
                  Crafted and cold-packed in artisanal small batches. If you don&apos;t get that audible loud crunch, we replace your jar immediately.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
