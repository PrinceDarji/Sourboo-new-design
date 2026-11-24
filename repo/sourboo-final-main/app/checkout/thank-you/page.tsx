'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/about/AboutNavbar';
import SiteFooter from '@/app/components/SiteFooter';

type OrderData = {
  reference: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  total: number;
  date: string;
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId') || searchParams.get('merchantOrderId');
  const [order, setOrder] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('sourboo_latest_order');
      if (stored) {
        const parsed = JSON.parse(stored) as OrderData;
        if (!orderIdParam || parsed.reference === orderIdParam) {
          setOrder(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }

    if (orderIdParam) {
      setOrder({
        reference: orderIdParam,
        customer: {
          fullName: 'Sourboo Baddie',
          email: 'baddie@sourboo.com',
          phone: '+91 98765 43210',
          line1: 'Your Delivery Address',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
        },
        total: 898,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      });
    }
  }, [orderIdParam]);

  if (!mounted) {
    return (
      <main className="min-h-screen w-full bg-[#FAF8F5]">
        <Navbar />
        <div className="mx-auto max-w-[800px] px-6 py-40 text-center">
          <p className="font-coolvetica text-[1.4rem] text-[#0e3e1f]">Loading your confirmation...</p>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#FAF8F5] text-[#0e3e1f] overflow-x-hidden selection:bg-[#d7f557] selection:text-[#0e3e1f]">
      <Navbar />

      <section
        className="mx-auto w-full max-w-[960px] px-6 pb-24 md:px-10"
        style={{ paddingTop: 'calc(var(--sbx-nav-h, 74px) + 36px)' }}
      >
        {/* Celebration Header - EXACT headline kept verbatim */}
        <div className="text-center relative">
          <span className="inline-block rounded-full bg-[#d7f557] px-4 py-1.5 font-coolvetica text-[1.05rem] font-bold tracking-wider text-[#0e3e1f] border border-[#0e3e1f]/20 shadow-sm">
            ORDER CONFIRMED &bull; BRINE IS READY
          </span>

          <h1 className="mt-4 font-coolvetica text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-[0.95] text-[#0e3e1f]">
            YOU&apos;RE OFFICIALLY A{' '}
            <span className="inline-block -rotate-2 rounded bg-[#f50a59] px-3 py-1 text-[#d7f557] shadow-lg">
              SOURBOO BADDIE
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] font-satoshi text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium leading-relaxed text-[#143820]">
            The jars are sealed, the brine is bubbling, and your tastebuds are about to misbehave. We&apos;re prepping your crunch right now!
          </p>

          {/* Quirky Floating Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-coolvetica text-[1.05rem] font-bold text-[#8b5cf6] border-2 border-[#8b5cf6] shadow-[2px_2px_0px_#8b5cf6] -rotate-1">
              ✨ 100% Snackable
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d7f557] px-4 py-1.5 font-coolvetica text-[1.05rem] font-bold text-[#0e3e1f] border-2 border-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f] rotate-2">
              🥒 Certified Cult Crunch
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f50a59] px-4 py-1.5 font-coolvetica text-[1.05rem] font-bold text-white border-2 border-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f] -rotate-2">
              🌶️ Zero Apologies
            </span>
          </div>
        </div>

        {/* Playful Order Ticket / Confirmation Pass (No extra product details) */}
        <div className="mt-10 relative rounded-3xl border-3 border-[#0e3e1f] bg-white p-6 shadow-[6px_6px_0px_#0e3e1f] md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-dashed border-[#0e3e1f]/20 pb-6">
            <div>
              <span className="font-schoolbell text-[1.1rem] text-[#8b5cf6] block">
                Official Stash Ticket:
              </span>
              <p className="font-coolvetica text-[1.6rem] font-bold text-[#0e3e1f] tracking-wide">
                ORDER #{order?.reference || 'SOURBOO-VIP'}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#d7f557] px-4 py-2 border-2 border-[#0e3e1f] font-coolvetica text-[1.05rem] font-bold text-[#0e3e1f]">
              <span className="inline-block h-3 w-3 rounded-full bg-[#0e3e1f] animate-pulse" />
              STATUS: PREPPING CRUNCH
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-[#0e3e1f]/10">
              <span className="font-schoolbell text-[1.1rem] text-[#8b5cf6] block mb-1">
                Delivering straight to:
              </span>
              <p className="font-coolvetica text-[1.25rem] font-bold text-[#0e3e1f]">
                {order?.customer.fullName || 'Sourboo Baddie'}
              </p>
              <p className="font-satoshi text-[1rem] text-[#143820] mt-1">
                {order?.customer.line1 ? (
                  <>
                    {order.customer.line1}
                    {order.customer.line2 && `, ${order.customer.line2}`}
                    <br />
                    {order.customer.city}, {order.customer.state} &bull; {order.customer.postalCode}
                  </>
                ) : (
                  'Your doorstep (2-4 business days)'
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f2fac2] p-5 border border-[#0e3e1f]/10 flex flex-col justify-center">
              <span className="font-schoolbell text-[1.1rem] text-[#0e3e1f] block mb-1">
                WhatsApp Dispatch Ping:
              </span>
              <p className="font-satoshi text-[1.02rem] text-[#143820] leading-snug">
                As soon as your stash rolls out of our kitchen, your live tracking link will ping directly on your phone ({order?.customer.phone || 'your number'}).
              </p>
            </div>
          </div>
        </div>

        {/* Quirky Protocol: What Happens Next */}
        <div className="mt-10 rounded-3xl border-3 border-[#8b5cf6] bg-[#fbf9ff] p-6 shadow-[6px_6px_0px_#8b5cf6] md:p-8">
          <h2 className="text-center font-coolvetica text-[clamp(1.8rem,3.2vw,2.4rem)] font-bold text-[#8b5cf6]">
            WHAT HAPPENS NEXT?
          </h2>
          <p className="text-center font-schoolbell text-[1.15rem] text-[#1e0a3c] mt-1">
            (The official 3-step crunch protocol)
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-white p-5 border-2 border-[#8b5cf6]/30 shadow-sm text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7f557] border-2 border-[#0e3e1f] font-coolvetica text-[1.6rem] font-bold text-[#0e3e1f] shadow-[2px_2px_0px_#0e3e1f] -rotate-3">
                1
              </div>
              <h3 className="mt-4 font-coolvetica text-[1.3rem] font-bold text-[#0e3e1f]">
                THE BRINE BATH
              </h3>
              <p className="mt-2 font-satoshi text-[0.95rem] text-[#143820] leading-relaxed">
                Small-batch fermented and sealed tight so you get maximum crunch in every single bite.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl bg-white p-5 border-2 border-[#8b5cf6]/30 shadow-sm text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b5cf6] border-2 border-[#0e3e1f] font-coolvetica text-[1.6rem] font-bold text-white shadow-[2px_2px_0px_#0e3e1f] rotate-3">
                2
              </div>
              <h3 className="mt-4 font-coolvetica text-[1.3rem] font-bold text-[#0e3e1f]">
                THE SPEEDY SPRINT
              </h3>
              <p className="mt-2 font-satoshi text-[0.95rem] text-[#143820] leading-relaxed">
                Shipped right to your doorstep with tracking updates sent directly to your WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl bg-white p-5 border-2 border-[#8b5cf6]/30 shadow-sm text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f50a59] border-2 border-[#0e3e1f] font-coolvetica text-[1.6rem] font-bold text-[#d7f557] shadow-[2px_2px_0px_#0e3e1f] -rotate-2">
                3
              </div>
              <h3 className="mt-4 font-coolvetica text-[1.3rem] font-bold text-[#0e3e1f]">
                CHILL &amp; DEVOUR
              </h3>
              <p className="mt-2 font-satoshi text-[0.95rem] text-[#143820] leading-relaxed">
                Toss the jars straight in the fridge. Ice-cold gherkin crunch hits ten times louder!
              </p>
            </div>
          </div>
        </div>

        {/* Quirky Pro-Tip Callout Card */}
        <div className="mt-8 rounded-2xl border-2 border-[#0e3e1f] bg-[#d7f557] p-5 text-center shadow-[4px_4px_0px_#0e3e1f] rotate-0.5 md:p-6">
          <p className="font-coolvetica text-[1.3rem] font-bold tracking-wide text-[#0e3e1f]">
            PRO TIP FOR RECKLESS SNACKERS:
          </p>
          <p className="mt-1 font-schoolbell text-[1.2rem] text-[#0e3e1f]">
            Don&apos;t you dare throw away the brine when the jars are empty. Use it for spicy-sour cocktails, bloody marys, or crispy fried chicken marinades!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            href="/product"
            className="inline-flex items-center justify-center rounded-full bg-[#0e3e1f] px-8 py-4 font-coolvetica text-[1.2rem] font-bold uppercase tracking-wider text-white border-2 border-[#0e3e1f] shadow-[4px_4px_0px_#d7f557] transition-transform hover:-translate-y-1 hover:bg-[#8b5cf6]"
          >
            CRUNCH MORE (SHOP) &rarr;
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#0e3e1f] bg-white px-8 py-4 font-coolvetica text-[1.2rem] font-bold uppercase tracking-wider text-[#0e3e1f] shadow-[4px_4px_0px_#0e3e1f] transition-transform hover:-translate-y-1 hover:bg-[#d7f557]"
          >
            BACK TO HOMEPAGE
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-[#FAF8F5]">
          <Navbar />
          <div className="py-40 text-center font-coolvetica text-xl text-[#0e3e1f]">
            Loading your confirmation...
          </div>
          <SiteFooter />
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
