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
};

type ConfirmedOrder = {
  reference: string;
  customer: CheckoutFormState;
  items: Array<{
    slug: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  discountCode: string | null;
  discountAmount: number;
  total: number;
  date: string;
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
  };
}

function getCheckoutValidationError(
  formState: CheckoutFormState,
  items: Array<{ slug: string; quantity: number }>,
): string | null {
  if (items.length === 0) return 'Your cart is empty. Add products before checking out.';
  if (items.some((item) => !item.slug?.trim() || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    return 'Your cart has an invalid item. Please remove it and add it again.';
  }
  if (formState.fullName.length < 2) return 'Please enter your full name.';
  if (!formState.email.includes('@') || !formState.email.includes('.')) {
    return 'Please enter a valid email address.';
  }
  const cleanPhone = formState.phone.replace(/\D/g, '');
  if (cleanPhone.length < 8) return 'Please enter a valid phone number (at least 8 digits).';
  if (formState.line1.length < 3) return 'Please enter your delivery street address.';
  if (formState.city.length < 2) return 'Please enter your city.';
  if (formState.state.length < 2) return 'Please enter your state.';
  if (formState.postalCode.length < 3) return 'Please enter your postal/PIN code.';
  return null;
}

export default function CheckoutPage() {
  const { items, subtotal, discountCode, discountAmount, discountPercent, clearCart } = useCart();
  const [formState, setFormState] = useState<CheckoutFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  // Flat demo shipping rate: ₹100 per order
  const shippingAmount = useMemo(() => (items.length > 0 ? 100 : 0), [items]);

  const totalPayable = useMemo(
    () => Math.max(0, subtotal + shippingAmount - discountAmount),
    [discountAmount, shippingAmount, subtotal],
  );

  const canSubmit = items.length > 0 && !isSubmitting;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setErrorMessage(null);
    const trimmedForm = toTrimmedCheckoutForm(formState);
    const validationError = getCheckoutValidationError(trimmedForm, items);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic client-demo order placement
    setTimeout(() => {
      const demoReference = `SB-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSnapshot: ConfirmedOrder = {
        reference: demoReference,
        customer: trimmedForm,
        items: items.map((i) => ({
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
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

      setConfirmedOrder(orderSnapshot);
      clearCart();
      setIsSubmitting(false);

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 700);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FAF6EC]">
      <Navbar />

      {/* =========================================================================
          CONFIRMED DEMO ORDER SCREEN
          ========================================================================= */}
      {confirmedOrder ? (
        <section className="mx-auto w-full max-w-[960px] px-6 pb-28 pt-32 md:px-10 md:pt-40">
          <div className="rounded-3xl border-3 border-[#163300] bg-white p-6 shadow-[6px_6px_0px_#163300] md:p-10">
            {/* Header Badge */}
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D7F557] border-2 border-[#163300] text-3xl shadow-[3px_3px_0px_#163300]">
                🥒
              </div>
              <h1 className="mt-4 font-coolvetica text-[clamp(2.4rem,4.5vw,3.6rem)] text-[#E81B6D] leading-tight">
                Order Received!
              </h1>
              <p className="mt-1 font-schoolbell text-[1.3rem] text-[#163300]">
                Demo Order Reference:{' '}
                <span className="font-bold underline text-[#E81B6D]">
                  {confirmedOrder.reference}
                </span>
              </p>
            </div>

            {/* MANDATORY CLIENT DEMO NOTICE BANNER */}
            <div className="mt-6 rounded-2xl border-2 border-[#E81B6D] bg-[#FFEBF3] p-4 text-center">
              <p className="font-coolvetica text-[1.15rem] font-bold text-[#E81B6D] uppercase tracking-wide">
                Demo Notice
              </p>
              <p className="mt-1 font-schoolbell text-[1.1rem] text-[#163300]">
                This is a demo order. No payment has been processed and no actual order has been placed.
              </p>
            </div>

            {/* Order Details Grid */}
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {/* Customer & Delivery */}
              <div className="rounded-2xl border-2 border-[#163300] bg-[#FAF6EC] p-5">
                <h3 className="font-coolvetica text-[1.3rem] text-[#163300] border-b-2 border-[#163300] pb-2">
                  Delivery Details
                </h3>
                <div className="mt-3 space-y-1.5 font-schoolbell text-[1.1rem] text-[#163300]">
                  <p>
                    <strong>Name:</strong> {confirmedOrder.customer.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {confirmedOrder.customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {confirmedOrder.customer.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {confirmedOrder.customer.line1}
                    {confirmedOrder.customer.line2 ? `, ${confirmedOrder.customer.line2}` : ''}
                  </p>
                  <p>
                    <strong>City / State:</strong> {confirmedOrder.customer.city},{' '}
                    {confirmedOrder.customer.state} - {confirmedOrder.customer.postalCode}
                  </p>
                  <p className="pt-2 text-[0.95rem] text-[#556947]">
                    <strong>Placed On:</strong> {confirmedOrder.date}
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-2xl border-2 border-[#163300] bg-[#FAF6EC] p-5">
                <h3 className="font-coolvetica text-[1.3rem] text-[#163300] border-b-2 border-[#163300] pb-2">
                  Items Purchased
                </h3>
                <div className="mt-3 divide-y divide-[#E0DACB] space-y-2">
                  {confirmedOrder.items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center justify-between pt-2 text-[1.05rem]"
                    >
                      <div>
                        <p className="font-coolvetica font-bold text-[#163300]">{item.name}</p>
                        <p className="font-schoolbell text-[0.95rem] text-[#556947]">
                          Qty: {item.quantity} × {formatInr(item.price)}
                        </p>
                      </div>
                      <p className="font-coolvetica font-bold text-[#163300]">
                        {formatInr(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t-2 border-[#163300] pt-3 font-schoolbell text-[1.1rem] text-[#163300] space-y-1.5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatInr(confirmedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping (Demo Flat Rate)</span>
                    <span>{formatInr(confirmedOrder.shipping)}</span>
                  </div>
                  {confirmedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-[#E81B6D]">
                      <span>Discount ({confirmedOrder.discountCode})</span>
                      <span>-{formatInr(confirmedOrder.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#163300] font-coolvetica text-[1.35rem] font-bold text-[#163300]">
                    <span>Total</span>
                    <span>{formatInr(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Shop Button */}
            <div className="mt-8 text-center">
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#163300] bg-[#D7F557] px-8 py-4 font-coolvetica text-[1.25rem] font-bold text-[#163300] shadow-[4px_4px_0px_#163300] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#163300]"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* =========================================================================
            CHECKOUT FORM & ORDER SUMMARY SCREEN
            ========================================================================= */
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-28 pt-32 md:px-10 md:pt-40">
          <div className="text-center">
            <span className="inline-block rounded-full border-2 border-[#163300] bg-[#FFE664] px-4 py-1 font-schoolbell text-[1.05rem] text-[#163300] shadow-[2px_2px_0px_#163300]">
              *client presentation demo*
            </span>
            <h1 className="mt-3 font-coolvetica text-[clamp(2.8rem,5.5vw,4.8rem)] text-[#E81B6D] leading-[0.95]">
              Demo Checkout
            </h1>
            <p className="mt-2 font-schoolbell text-[clamp(1.2rem,2.2vw,1.6rem)] text-[#163300]">
              Simulate the complete Sourboo ordering experience
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            {/* Form Column */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border-3 border-[#163300] bg-white p-6 shadow-[5px_5px_0px_#163300] md:p-8"
              noValidate
            >
              <div className="flex items-center justify-between border-b-2 border-[#163300] pb-3">
                <h2 className="font-coolvetica text-[1.8rem] text-[#163300]">
                  1. Delivery Details
                </h2>
                <span className="font-schoolbell text-[0.95rem] text-[#556947]">
                  *all fields required
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Full Name</span>
                  <input
                    required
                    placeholder="e.g. Sakshi Agarwal"
                    value={formState.fullName}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Phone</span>
                  <input
                    required
                    type="tel"
                    placeholder="9876543210"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Address Line 1</span>
                  <input
                    required
                    placeholder="Flat / House No., Street, Building"
                    value={formState.line1}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, line1: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Address Line 2 (optional)</span>
                  <input
                    placeholder="Landmark, Area"
                    value={formState.line2}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, line2: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">City</span>
                  <input
                    required
                    placeholder="e.g. Mumbai"
                    value={formState.city}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">State</span>
                  <input
                    required
                    placeholder="e.g. Maharashtra"
                    value={formState.state}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="font-schoolbell text-[1.05rem] text-[#163300]">Postal / PIN Code</span>
                  <input
                    required
                    placeholder="e.g. 400001"
                    value={formState.postalCode}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, postalCode: e.target.value }))
                    }
                    className="rounded-xl border-2 border-[#163300] bg-[#FAF6EC] px-3.5 py-2.5 font-coolvetica text-[#163300] text-[1rem] focus:outline-none focus:ring-2 focus:ring-[#E81B6D]"
                  />
                </label>
              </div>

              {errorMessage && (
                <div className="mt-4 rounded-xl border-2 border-[#E81B6D] bg-[#FFEBF3] p-3 text-center">
                  <p className="font-schoolbell text-[1rem] text-[#E81B6D] font-bold">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-2xl border-2 border-[#163300] bg-[#E81B6D] py-4 text-center font-coolvetica text-[1.35rem] font-bold text-white shadow-[4px_4px_0px_#163300] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#163300] active:translate-x-0 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Confirming Demo Order...' : 'Complete Demo Order →'}
                </button>
                <p className="mt-2 text-center font-schoolbell text-[0.95rem] text-[#556947]">
                  No real payment will be charged. This completes the simulated client demonstration.
                </p>
              </div>
            </form>

            {/* Order Summary Column */}
            <aside className="h-fit rounded-3xl border-3 border-[#163300] bg-[#D7F557] p-6 shadow-[5px_5px_0px_#163300] md:p-8">
              <h2 className="font-coolvetica text-[1.8rem] text-[#163300] border-b-2 border-[#163300] pb-2">
                Order Summary ({itemCount})
              </h2>

              {items.length === 0 ? (
                <div className="mt-6 text-center">
                  <p className="font-schoolbell text-[1.2rem] text-[#163300]">
                    Your bag is empty!
                  </p>
                  <Link
                    href="/product"
                    className="mt-3 inline-block rounded-full border-2 border-[#163300] bg-white px-5 py-2 font-coolvetica text-[1rem] text-[#163300] shadow-[2px_2px_0px_#163300]"
                  >
                    Browse Stash →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mt-4 divide-y divide-[#BEDC3D] space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center justify-between pt-2 text-[#163300]"
                      >
                        <div>
                          <p className="font-coolvetica font-bold text-[1.1rem]">{item.name}</p>
                          <p className="font-schoolbell text-[0.95rem]">
                            Qty: {item.quantity} × {formatInr(item.price)}
                          </p>
                        </div>
                        <p className="font-coolvetica font-bold text-[1.15rem]">
                          {formatInr(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t-2 border-[#163300] pt-4 font-schoolbell text-[1.1rem] text-[#163300] space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">{formatInr(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping (Demo Standard)</span>
                      <span className="font-bold">{formatInr(shippingAmount)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#E81B6D] font-bold">
                        <span>Discount ({discountCode || `${discountPercent}% OFF`})</span>
                        <span>-{formatInr(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t-2 border-[#163300] pt-3 font-coolvetica text-[1.45rem] font-bold text-[#163300]">
                      <span>Total Payable</span>
                      <span className="text-[#E81B6D]">{formatInr(totalPayable)}</span>
                    </div>
                  </div>

                  {discountCode && (
                    <div className="mt-4 rounded-xl border border-[#163300] bg-white p-2.5 text-center font-schoolbell text-[0.95rem] text-[#163300]">
                      🎉 Code <span className="font-bold text-[#E81B6D]">{discountCode}</span>{' '}
                      applied!
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}