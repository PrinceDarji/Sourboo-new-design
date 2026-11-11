'use client';

import { useState, useRef, TouchEvent } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/CartProvider';

interface ProductItem {
  id: string;
  name: string;
  flavor: string;
  price: number;
  image: string;
  slug: string;
  tagline: string;
  bgGradient: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'sideeyesour',
    name: 'SIDE EYE SOUR',
    flavor: 'Lemon + Chaat Masala',
    price: 399,
    image: '/product/catalog/side-eye.webp',
    slug: '/product/sideeyesour',
    tagline: 'Extra tangy. Chaat masala obsessed.',
    bgGradient: 'radial-gradient(circle, #F4EFFB 0%, #FFFFFF 100%)',
  },
  {
    id: 'tamarintease',
    name: "TAMARIN' TEASE",
    flavor: 'Tamarind + Chilli',
    price: 399,
    image: '/product/catalog/tamarin-tease.webp',
    slug: '/product/tamarintease',
    tagline: 'Sweet, sour and a little fiery.',
    bgGradient: 'radial-gradient(circle, #FFF7ED 0%, #FFFFFF 100%)',
  },
  {
    id: 'lemon-lovers',
    name: 'LEMON LOVERS DUO',
    flavor: 'Double Lemon Intensity',
    price: 749,
    image: '/product/catalog/lemon-lovers.webp',
    slug: '/product/lemon-lovers',
    tagline: 'For when one jar is simply not enough.',
    bgGradient: 'radial-gradient(circle, #FEFCE8 0%, #FFFFFF 100%)',
  },
  {
    id: 'tamarind-twins',
    name: 'TAMARIND TWINS',
    flavor: 'Sweet & Fiery 2-Pack',
    price: 749,
    image: '/product/catalog/tamarind-twins.webp',
    slug: '/product/tamarind-twins',
    tagline: 'Double the tease, double the crunch.',
    bgGradient: 'radial-gradient(circle, #FFF1F2 0%, #FFFFFF 100%)',
  },
  {
    id: 'sour-sampler',
    name: 'THE SOUR SAMPLER',
    flavor: 'The Ultimate Flight',
    price: 1099,
    image: '/product/catalog/sour-sampler.webp',
    slug: '/product/sour-sampler',
    tagline: 'Every single khatta mood in one box.',
    bgGradient: 'radial-gradient(circle, #FAF5FF 0%, #FFFFFF 100%)',
  },
];

export default function MobileProductSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { addItem, openCart } = useCart();

  const minSwipeDistance = 45;

  const handleTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    } else if (isRightSwipe) {
      // Prev
      setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const currentProd = PRODUCTS[currentIndex];

  const handleQuickAdd = () => {
    addItem(
      {
        slug: currentProd.id,
        name: currentProd.name,
        price: currentProd.price,
        image: currentProd.image,
      },
      1,
    );
    openCart();
  };

  return (
    <section className="sb-mobile-swipe-section md:hidden" aria-label="Mobile Product Swiper">
      <div className="sb-swipe-header text-center">
        <span className="sb-swipe-pill-tag font-schoolbell">
          👈 Swipe to Explore Flavours 👉
        </span>
        <h2 className="font-coolvetica text-3xl text-tamarind mt-2">
          Pick Your Pickle
        </h2>
      </div>

      <div
        className="sb-swipe-card-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ background: currentProd.bgGradient }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="sb-swipe-nav-btn prev font-schoolbell"
          aria-label="Previous product"
        >
          ‹
        </button>

        {/* Current Single Product Card */}
        <div className="sb-swipe-single-card">
          <Link href={currentProd.slug} className="sb-swipe-jar-link">
            <div className="sb-swipe-jar-holder">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentProd.image}
                alt={currentProd.name}
                className="sb-swipe-jar-img"
              />
            </div>
            <h3 className="sb-swipe-prod-name font-coolvetica">
              {currentProd.name}
            </h3>
            <p className="sb-swipe-prod-flavor font-schoolbell">
              {currentProd.flavor} • ₹{currentProd.price}
            </p>
            <p className="sb-swipe-prod-tagline font-schoolbell">
              {currentProd.tagline}
            </p>
          </Link>

          {/* Quick Action Button */}
          <div className="sb-swipe-action-row">
            <Link
              href={currentProd.slug}
              className="sb-swipe-explore-btn font-coolvetica"
            >
              DETAILS →
            </Link>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="sb-swipe-add-btn font-coolvetica"
            >
              + ADD TO BAG
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="sb-swipe-nav-btn next font-schoolbell"
          aria-label="Next product"
        >
          ›
        </button>
      </div>

      {/* Swipe Dots Indicator */}
      <div className="sb-swipe-dots-row">
        {PRODUCTS.map((prod, idx) => (
          <button
            key={prod.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`sb-swipe-dot ${idx === currentIndex ? 'active' : ''}`}
            aria-label={`Go to ${prod.name}`}
          />
        ))}
      </div>
    </section>
  );
}
