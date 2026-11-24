'use client';

import { useState } from 'react';
import { useCart } from '@/app/components/cart/CartProvider';
import { parsePriceLabel } from '@/src/lib/cart/price';
import type { CatalogProduct } from '@/src/lib/catalog/products';

export default function PdpInteractiveSection({ product }: { product: CatalogProduct }) {
  const [activeImage, setActiveImage] = useState(product.jarImage);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'jar' | 'tongue' | 'storage'>('jar');

  const basePriceNum = parsePriceLabel(product.price);
  const isSingleJar = product.slug === 'sideeyesour' || product.slug === 'tamarintease';

  const variants = isSingleJar
    ? [
        { id: 'single', name: 'Single Jar (370ml)', price: 399, priceLabel: '₹399' },
        { id: 'duo', name: '2-Pack Duo', price: 729, priceLabel: '₹729', save: 'Save ₹69' },
        { id: 'stash', name: '4-Pack Stash', price: 1299, priceLabel: '₹1,299', save: 'Save ₹297' },
      ]
    : [
        { id: 'standard', name: 'Standard Pack', price: basePriceNum, priceLabel: product.price },
      ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    const itemSlug = selectedVariant.id === 'single' || selectedVariant.id === 'standard'
      ? product.slug
      : selectedVariant.id === 'duo'
        ? (product.slug === 'sideeyesour' ? 'lemon-lovers' : 'tamarind-twins')
        : 'sourboo-stash';

    const itemName = selectedVariant.id === 'single' || selectedVariant.id === 'standard'
      ? product.name
      : `${product.name} (${selectedVariant.name})`;

    addItem(
      {
        slug: itemSlug,
        name: itemName,
        price: selectedVariant.price,
        image: product.jarImage,
      },
      quantity,
    );
    openCart();
  };

  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.jarImage];

  return (
    <section className="sb-pdp-section" aria-label="Product Details">
      <div className="sb-pdp-grid">
        {/* Gallery Column: Product Jar as Primary Visual Focus */}
        <div className="sb-pdp-gallery-col sb-entry-jar-drop sb-delay-1">
          <div className="sb-pdp-stage">
            {/* Visual Backplate */}
            <div className="sb-pdp-stage-bg" />

            {/* Floating Ingredient & Flavor Tags */}
            <div className="sb-pdp-stage-floats" aria-hidden="true">
              {product.slug === 'sideeyesour' ? (
                <>
                  <div className="sb-pdp-tag sb-pdp-tag--top">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/lemon-wedge.png" alt="" width={32} height={32} />
                    <span>Real Lemon</span>
                  </div>
                  <div className="sb-pdp-tag sb-pdp-tag--left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/chaat-masala.png" alt="" width={30} height={30} />
                    <span>Chaat Masala</span>
                  </div>
                  <div className="sb-pdp-tag sb-pdp-tag--bottom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/sliced-gherkin.png" alt="" width={28} height={28} />
                    <span>Crinkle Crunch</span>
                  </div>
                </>
              ) : product.slug === 'tamarintease' ? (
                <>
                  <div className="sb-pdp-tag sb-pdp-tag--top">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/tamarind-pod.png" alt="" width={36} height={36} />
                    <span>Tamarind Pulp</span>
                  </div>
                  <div className="sb-pdp-tag sb-pdp-tag--left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/red-chilli.png" alt="" width={24} height={24} />
                    <span>Fiery Chilli</span>
                  </div>
                  <div className="sb-pdp-tag sb-pdp-tag--bottom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/ingredients/whole-gherkin.png" alt="" width={28} height={28} />
                    <span>Whole Gherkin</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="sb-pdp-tag sb-pdp-tag--top">
                    <span>Bundle Drop</span>
                  </div>
                  <div className="sb-pdp-tag sb-pdp-tag--bottom">
                    <span>Max Value</span>
                  </div>
                </>
              )}
            </div>

            {/* Main Jar Visual */}
            <div className="sb-pdp-gallery-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="PdpMainImage"
                src={activeImage}
                alt={product.name}
                width={600}
                height={600}
                className="sb-pdp-main-jar"
              />
            </div>
          </div>

          {/* Thumbnails Carousel / Selector */}
          {gallery.length > 1 && (
            <div className="sb-pdp-thumbs" role="tablist" aria-label="Product thumbnails">
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
          )}
        </div>

        {/* Info Column: Clear Product Name, Flavor, Price, CTA */}
        <div className="sb-pdp-info-col">
          {/* Eyebrow & Badges */}
          <div className="sb-pdp-kicker">
            <span className="sb-pdp-kicker-pill font-coolvetica">★ INDIA&apos;S FIRST CULT SOUR SNACK</span>
            <span className="sb-pdp-kicker-tag font-coolvetica">
              {product.jarCount > 1 ? `${product.jarCount} JARS PACK` : '350G CRUNCH JAR'}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="sb-pdp-title font-coolvetica">
            {product.name}
          </h1>

          {/* Price & Value Row */}
          <div className="sb-pdp-price-row">
            <span className="sb-pdp-price font-coolvetica">{selectedVariant.priceLabel}</span>
            <span className="sb-pdp-tax-note font-coolvetica">(incl. all taxes)</span>
            {selectedVariant.save && (
              <span className="sb-pdp-save-badge font-coolvetica">{selectedVariant.save}</span>
            )}
          </div>

          {/* Flavour Description Card */}
          <div className="sb-pdp-flavour-box">
            <div className="sb-pdp-flavour-badge font-coolvetica">FLAVOUR PROFILE</div>
            <p className="sb-pdp-flavour-text font-coolvetica">
              {product.hoverLabel}
            </p>
          </div>

          {/* Dispatch Notice */}
          <div className="sb-pdp-dispatch-card font-coolvetica">
            <span className="sb-pdp-dispatch-icon">★</span>
            <span className="sb-pdp-dispatch-text">{product.detailDispatchNote}</span>
          </div>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <div className="sb-pdp-variants-wrap">
              <label className="sb-pdp-variants-label font-coolvetica">
                SELECT PACK SIZE:
              </label>
              <div className="sb-pdp-variants-grid">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`sb-pdp-variant-btn font-coolvetica ${selectedVariant.id === v.id ? 'is-selected' : ''}`}
                  >
                    <span className="sb-pdp-variant-name">{v.name}</span>
                    <span className="sb-pdp-variant-price">
                      {v.priceLabel} {v.save ? `• ${v.save}` : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart Row */}
          <div className="sb-pdp-qty-row">
            <div className="sb-qty-picker" aria-label="Quantity picker">
              <button
                type="button"
                id="PdpQtyDec"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="sb-qty-btn"
                aria-label="Decrease quantity"
              >
                −
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
              id="PdpAddToCartBtn"
            >
              <span>ADD TO CART</span>
              <span className="sb-pdp-cta-divider">•</span>
              <span>{selectedVariant.priceLabel}</span>
              <span className="sb-pdp-cta-arrow">→</span>
            </button>
          </div>

          {/* Information Folder Tabs */}
          <div className="sb-pdp-tabs-wrap">
            <div className="sb-tab-buttons-row" role="tablist">
              <button
                type="button"
                id="TabInTheJar"
                onClick={() => setActiveTab('jar')}
                className={`sb-tab-btn font-coolvetica ${activeTab === 'jar' ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'jar'}
              >
                {product.detailInJarTitle}
              </button>
              <button
                type="button"
                id="TabOnTheTongue"
                onClick={() => setActiveTab('tongue')}
                className={`sb-tab-btn font-coolvetica ${activeTab === 'tongue' ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'tongue'}
              >
                {product.detailOnTongueTitle}
              </button>
              <button
                type="button"
                id="TabAfterOpening"
                onClick={() => setActiveTab('storage')}
                className={`sb-tab-btn font-coolvetica ${activeTab === 'storage' ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === 'storage'}
              >
                {product.detailAfterOpeningTitle}
              </button>
            </div>

            {activeTab === 'jar' && (
              <div id="TabInJar" className="sb-tab-panel active font-coolvetica">
                <h3 className="sb-tab-title font-coolvetica">
                  {product.name}
                </h3>
                <p className="sb-tab-line">
                  <strong>Quantity:</strong> {product.jarCount > 1 ? `${product.jarCount} × 350g Jars` : '350 grams (Snackable pickled gherkins)'}
                </p>
                <div className="sb-tab-ingredients">
                  <strong>Ingredients:</strong>
                  <p>{product.detailInJarIngredients}</p>
                </div>
              </div>
            )}

            {activeTab === 'tongue' && (
              <div id="TabOnTongue" className="sb-tab-panel active">
                <p className="sb-tab-body font-coolvetica">
                  {product.detailOnTongueBody}
                </p>
              </div>
            )}

            {activeTab === 'storage' && (
              <div id="TabAfterOpening" className="sb-tab-panel active">
                <p className="sb-tab-body font-coolvetica">
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
