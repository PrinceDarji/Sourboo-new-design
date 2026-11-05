'use client';

import { useState } from 'react';
import { useCart } from '@/app/components/cart/CartProvider';
import { parsePriceLabel } from '@/src/lib/cart/price';
import type { CatalogProduct } from '@/src/lib/catalog/products';

export default function PdpInteractiveSection({ product }: { product: CatalogProduct }) {
  const [activeImage, setActiveImage] = useState(product.jarImage);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'jar' | 'tongue' | 'storage'>('jar');

  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        price: parsePriceLabel(product.price),
        image: product.jarImage,
      },
      quantity,
    );
    openCart();
  };

  const words = product.name.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.jarImage];

  return (
    <section className="sb-pdp-section" aria-label="Product Details">
      <div className="sb-pdp-grid">
        {/* Gallery Column */}
        <div className="sb-pdp-gallery-col sb-entry-jar-drop sb-delay-1">
          <div className="sb-pdp-gallery-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="PdpMainImage"
              src={activeImage}
              alt={product.name}
              width={600}
              height={600}
              style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'contain' }}
            />
          </div>
          <div className="sb-pdp-thumbs">
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`sb-pdp-thumb ${activeImage === img ? 'active' : ''}`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.name} preview ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="sb-pdp-info-col">
          <h1 className="sb-pdp-title">
            <span className="font-coolvetica text-pickle">{firstWord} </span>
            <span className="font-rascal text-pink">{restWords}</span>
          </h1>
          <p className="sb-pdp-price font-coolvetica">{product.price}</p>
          <p
            className="font-schoolbell"
            style={{
              fontSize: '1.45rem',
              lineHeight: 1.25,
              color: 'var(--sb-text-charcoal)',
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
            }}
          >
            {product.hoverLabel}
          </p>

          <div
            style={{
              background: 'rgba(255, 255, 136, 0.55)',
              borderLeft: '4px solid var(--sb-green-moss, #4A6318)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '24px',
            }}
          >
            <p
              className="font-coolvetica"
              style={{ fontSize: '1.15rem', color: 'var(--sb-green-dark)', margin: 0 }}
            >
              ★ {product.detailDispatchNote}
            </p>
          </div>

          {/* Quantity and Add to Cart Row */}
          <div className="sb-pdp-qty-row">
            <div className="sb-qty-picker">
              <button
                type="button"
                id="PdpQtyDec"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="sb-qty-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="text"
                id="PdpQuantityInput"
                value={quantity}
                readOnly
                className="sb-qty-value font-coolvetica"
                aria-label="Current quantity"
              />
              <button
                type="button"
                id="PdpQtyInc"
                onClick={() => setQuantity((q) => q + 1)}
                className="sb-qty-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="sb-pdp-add-cta sb-add-to-cart-trigger font-coolvetica"
            >
              Add to Cart →
            </button>
          </div>

          {/* 3 Handwritten Folder Tabs */}
          <div className="sb-pdp-tabs-wrap">
            <div className="sb-tab-buttons-row">
              <button
                type="button"
                id="TabInTheJar"
                onClick={() => setActiveTab('jar')}
                className={`sb-tab-btn font-schoolbell ${activeTab === 'jar' ? 'active' : ''}`}
              >
                {product.detailInJarTitle}
              </button>
              <button
                type="button"
                id="TabOnTheTongue"
                onClick={() => setActiveTab('tongue')}
                className={`sb-tab-btn font-schoolbell ${activeTab === 'tongue' ? 'active' : ''}`}
              >
                {product.detailOnTongueTitle}
              </button>
              <button
                type="button"
                id="TabAfterOpening"
                onClick={() => setActiveTab('storage')}
                className={`sb-tab-btn font-schoolbell ${activeTab === 'storage' ? 'active' : ''}`}
              >
                {product.detailAfterOpeningTitle}
              </button>
            </div>

            {activeTab === 'jar' && (
              <div id="TabInJar" className="sb-tab-panel active font-coolvetica">
                <h3
                  className="font-coolvetica text-pickle"
                  style={{ fontSize: '1.4rem', margin: '0 0 10px' }}
                >
                  {product.name}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '1.15rem' }}>
                  <strong>Quantity:</strong> 350 grams (Snackable pickled gherkins)
                </p>
                <p style={{ margin: '0', fontSize: '1.1rem', lineHeight: '1.4' }}>
                  <strong>Ingredients:</strong>
                  <br />
                  {product.detailInJarIngredients}
                </p>
              </div>
            )}

            {activeTab === 'tongue' && (
              <div id="TabOnTongue" className="sb-tab-panel active">
                <p
                  className="font-schoolbell"
                  style={{
                    margin: 0,
                    fontSize: '1.35rem',
                    lineHeight: '1.35',
                    whiteSpace: 'pre-line',
                    color: 'var(--sb-green-dark)',
                  }}
                >
                  {product.detailOnTongueBody}
                </p>
              </div>
            )}

            {activeTab === 'storage' && (
              <div id="TabAfterOpening" className="sb-tab-panel active">
                <p
                  className="font-schoolbell"
                  style={{
                    margin: 0,
                    fontSize: '1.35rem',
                    lineHeight: '1.35',
                    whiteSpace: 'pre-line',
                    color: 'var(--sb-green-dark)',
                  }}
                >
                  {product.detailAfterOpeningBody}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
