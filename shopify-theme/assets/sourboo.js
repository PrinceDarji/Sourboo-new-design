/**
 * SOURBOO SHOPIFY STOREFRONT INTERACTIONS
 * Brand: Sourboo Snacks LLP
 */

(function () {
  'use strict';

  const POPUP_DISCOUNT_CODE = 'SOURBABE05';
  const POPUP_DELAY_MS = 5000;
  const POSTER_STEP_MS = 1800;

  // 1. POSTER PINBOARD SEQUENTIAL DROP
  function initPosterPinboard() {
    const pinboard = document.getElementById('HomePosterPinboard');
    if (!pinboard) return;

    const cards = pinboard.querySelectorAll('.home-poster-card');
    const pins = pinboard.querySelectorAll('.home-poster-pin');
    if (!cards.length) return;

    let hasStarted = false;

    const revealStep = (index) => {
      if (index >= cards.length) return;
      cards[index].classList.add('home-poster-card-visible');
      if (pins[index]) {
        pins[index].classList.add('home-poster-pin-visible');
      }
      setTimeout(() => {
        revealStep(index + 1);
      }, POSTER_STEP_MS);
    };

    const startSequence = () => {
      if (hasStarted) return;
      hasStarted = true;
      revealStep(0);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((c) => c.classList.add('home-poster-card-visible'));
      pins.forEach((p) => p.classList.add('home-poster-pin-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      startSequence();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.15) {
            startSequence();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(pinboard);
  }

  // 2. REVIEW PHONE POPPING SPEECH BUBBLES
  function initReviewPhone() {
    const section = document.getElementById('HomeReviewPhoneSection');
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      section.classList.add('home-review-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('home-review-visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
  }

  // 3. PERSONALITY POPUP & 5% COUPON FLOW
  function initPersonalityPopup() {
    const modal = document.getElementById('LandingPersonalityPopup');
    if (!modal) return;

    const isHome = window.location.pathname === '/' || window.location.pathname === '/home';
    const isExplicitPopup = window.location.pathname.startsWith('/popup');
    
    // Check if dismissed in this session
    if (!isExplicitPopup && sessionStorage.getItem('sourboo_popup_dismissed') === 'true') {
      return;
    }

    const screen1 = document.getElementById('PopupScreen1');
    const screen2 = document.getElementById('PopupScreen2');
    const screen3 = document.getElementById('PopupScreen3');
    const chosenHeading = document.getElementById('PopupChosenHeading');
    const leadForm = document.getElementById('PopupLeadForm');
    const emailInput = document.getElementById('PopupEmailInput');
    const phoneInput = document.getElementById('PopupPhoneInput');
    const formError = document.getElementById('PopupFormError');
    const copyBtn = document.getElementById('PopupCopyBtn');
    const copyText = document.getElementById('PopupCopyText');
    const codeDisplay = document.getElementById('PopupCodeDisplay');

    let selectedPersonality = 'Sour & Savage';

    const showModal = () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      sessionStorage.setItem('sourboo_popup_dismissed', 'true');
    };

    // Close listeners
    modal.querySelectorAll('.sb-close-popup-trigger').forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    // Screen 1: Options selection
    modal.querySelectorAll('.sb-popup-option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectedPersonality = btn.getAttribute('data-personality') || 'Sour & Savage';
        
        if (screen1 && screen2) {
          screen1.style.display = 'none';
          screen2.style.display = 'block';
          if (chosenHeading) {
            chosenHeading.textContent = `You're ${selectedPersonality}`;
          }
        }
      });
    });

    // Screen 2: Lead form submission
    if (leadForm) {
      leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        if (!email || !phone) {
          if (formError) formError.textContent = 'please enter both email and phone number.';
          return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValid) {
          if (formError) formError.textContent = 'email is not in the right format';
          return;
        }

        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 8) {
          if (formError) formError.textContent = 'please enter a valid phone number.';
          return;
        }

        if (formError) formError.textContent = '';

        // Save lead locally and attempt API call
        const lead = {
          email,
          phone,
          personality: selectedPersonality,
          timestamp: new Date().toISOString()
        };
        try {
          const leads = JSON.parse(localStorage.getItem('sourboo_leads') || '[]');
          leads.push(lead);
          localStorage.setItem('sourboo_leads', JSON.stringify(leads));
        } catch (_) {}

        // Auto apply coupon in cart!
        localStorage.setItem('sourboo_cart_discount', POPUP_DISCOUNT_CODE);

        // Transition to Screen 3 (Success)
        if (screen2 && screen3) {
          screen2.style.display = 'none';
          screen3.style.display = 'block';
          if (codeDisplay) codeDisplay.textContent = POPUP_DISCOUNT_CODE;
        }
      });
    }

    // Screen 3: Clipboard copy
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(POPUP_DISCOUNT_CODE).then(() => {
          if (copyText) copyText.textContent = 'COPIED!';
          setTimeout(() => {
            if (copyText) copyText.textContent = POPUP_DISCOUNT_CODE;
          }, 2500);
        }).catch(() => {
          if (copyText) copyText.textContent = 'COPIED!';
        });
      });
    }

    // Trigger timer on homepage or immediately on direct /popup
    if (isExplicitPopup) {
      showModal();
    } else if (isHome) {
      setTimeout(showModal, POPUP_DELAY_MS);
    }
  }

  // 4. CART DRAWER & STATE MANAGEMENT
  const Cart = {
    items: [],
    discountCode: '',

    init() {
      try {
        const saved = localStorage.getItem('sourboo_cart');
        if (saved) this.items = JSON.parse(saved);
        this.discountCode = localStorage.getItem('sourboo_cart_discount') || '';
      } catch (_) {}

      this.bindEvents();
      this.render();
    },

    save() {
      try {
        localStorage.setItem('sourboo_cart', JSON.stringify(this.items));
        if (this.discountCode) {
          localStorage.setItem('sourboo_cart_discount', this.discountCode);
        } else {
          localStorage.removeItem('sourboo_cart_discount');
        }
      } catch (_) {}
      this.render();
    },

    addItem(product) {
      const existing = this.items.find((i) => i.slug === product.slug);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        this.items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity || 1
        });
      }
      this.save();
      this.openDrawer();
    },

    updateQuantity(slug, delta) {
      const item = this.items.find((i) => i.slug === slug);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.items = this.items.filter((i) => i.slug !== slug);
      }
      this.save();
    },

    removeItem(slug) {
      this.items = this.items.filter((i) => i.slug !== slug);
      this.save();
    },

    applyDiscount(code) {
      const clean = (code || '').trim().toUpperCase();
      if (clean === POPUP_DISCOUNT_CODE) {
        this.discountCode = POPUP_DISCOUNT_CODE;
        this.save();
        return { ok: true, message: 'SOURBABE05 applied! 5% off is live.' };
      }
      return { ok: false, message: 'Invalid code. Try SOURBABE05' };
    },

    clearDiscount() {
      this.discountCode = '';
      this.save();
    },

    openDrawer() {
      const drawer = document.getElementById('CartDrawer');
      const overlay = document.getElementById('CartDrawerOverlay');
      if (drawer) drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeDrawer() {
      const drawer = document.getElementById('CartDrawer');
      const overlay = document.getElementById('CartDrawerOverlay');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    },

    render() {
      const listEl = document.getElementById('CartDrawerItems');
      const countEls = document.querySelectorAll('.sb-cart-count');
      const subtotalEl = document.getElementById('CartSubtotal');
      const discountEl = document.getElementById('CartDiscountLine');
      const totalEl = document.getElementById('CartTotal');

      const totalItems = this.items.reduce((sum, i) => sum + i.quantity, 0);
      countEls.forEach((el) => {
        el.textContent = totalItems > 0 ? `(${totalItems})` : '';
      });

      const subtotal = this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const discountAmount = this.discountCode === POPUP_DISCOUNT_CODE ? Math.round(subtotal * 0.05) : 0;
      const total = Math.max(0, subtotal - discountAmount);

      if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
      if (discountEl) {
        if (discountAmount > 0) {
          discountEl.style.display = 'flex';
          const valEl = discountEl.querySelector('.sb-discount-val');
          if (valEl) valEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
        } else {
          discountEl.style.display = 'none';
        }
      }
      if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

      if (listEl) {
        if (this.items.length === 0) {
          listEl.innerHTML = `
            <div style="padding: 48px 0; text-align: center;">
              <p class="font-coolvetica" style="font-size: 2rem; margin: 0;">Your cart is empty.</p>
              <p style="font-size: 1.25rem; margin-top: 10px; opacity: 0.8;">Add some spicy-sour gherkins!</p>
            </div>
          `;
          return;
        }

        listEl.innerHTML = this.items
          .map(
            (item) => `
          <div class="sb-cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="sb-cart-item-img" />
            <div>
              <p class="sb-cart-item-title">${item.name}</p>
              <div style="display: inline-flex; align-items: center; gap: 8px; margin-top: 4px;">
                <button type="button" class="sb-cart-qty-btn" data-slug="${item.slug}" data-delta="-1" style="width: 28px; height: 28px; border: 1px solid currentColor; border-radius: 50%; font-size: 18px; line-height: 1;">-</button>
                <span style="font-family: 'coolvetica', sans-serif; font-size: 1.15rem; min-width: 20px; text-align: center;">${item.quantity}</span>
                <button type="button" class="sb-cart-qty-btn" data-slug="${item.slug}" data-delta="1" style="width: 28px; height: 28px; border: 1px solid currentColor; border-radius: 50%; font-size: 18px; line-height: 1;">+</button>
                <button type="button" class="sb-cart-remove-btn" data-slug="${item.slug}" style="margin-left: 12px; font-size: 14px; opacity: 0.8; text-decoration: underline;">remove</button>
              </div>
            </div>
            <p class="sb-cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
          </div>
        `
          )
          .join('');

        listEl.querySelectorAll('.sb-cart-qty-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const slug = btn.getAttribute('data-slug');
            const delta = parseInt(btn.getAttribute('data-delta'), 10);
            Cart.updateQuantity(slug, delta);
          });
        });

        listEl.querySelectorAll('.sb-cart-remove-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const slug = btn.getAttribute('data-slug');
            Cart.removeItem(slug);
          });
        });
      }
    },

    bindEvents() {
      document.querySelectorAll('.sb-open-cart-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      document.querySelectorAll('.sb-close-cart-trigger').forEach((btn) => {
        btn.addEventListener('click', () => this.closeDrawer());
      });

      // Quick Buy / Add to cart buttons
      document.querySelectorAll('.sb-add-to-cart-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const slug = btn.getAttribute('data-slug');
          const name = btn.getAttribute('data-name');
          const price = parseInt(btn.getAttribute('data-price'), 10) || 399;
          const image = btn.getAttribute('data-image');
          const qtyInput = document.getElementById('PdpQuantityInput');
          const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

          this.addItem({ slug, name, price, image, quantity });
        });
      });

      // Discount code input inside cart
      const discountInput = document.getElementById('CartDiscountInput');
      const discountFeedback = document.getElementById('CartDiscountFeedback');
      if (discountInput) {
        discountInput.value = this.discountCode;
        discountInput.addEventListener('input', (e) => {
          const val = e.target.value.trim().toUpperCase();
          if (!val) {
            this.clearDiscount();
            if (discountFeedback) discountFeedback.textContent = '';
            return;
          }
          if (val === POPUP_DISCOUNT_CODE) {
            const res = this.applyDiscount(val);
            if (discountFeedback) {
              discountFeedback.textContent = res.message;
              discountFeedback.style.color = '#FFF7D6';
            }
          }
        });
      }
    }
  };

  // 5. PRODUCT DETAIL PAGE (PDP) TABS & GALLERY
  function initPdpTabs() {
    const tabButtons = document.querySelectorAll('.sb-tab-btn');
    const tabPanels = document.querySelectorAll('.sb-tab-panel');
    if (!tabButtons.length) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabButtons.forEach((b) => b.classList.remove('active'));
        tabPanels.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const activePanel = document.getElementById(targetId);
        if (activePanel) activePanel.classList.add('active');
      });
    });

    // Gallery Thumbnails
    const mainImg = document.getElementById('PdpMainImage');
    const thumbs = document.querySelectorAll('.sb-pdp-thumb');
    if (mainImg && thumbs.length) {
      thumbs.forEach((th) => {
        th.addEventListener('click', () => {
          thumbs.forEach((t) => t.classList.remove('active'));
          th.classList.add('active');
          const src = th.getAttribute('data-full-src');
          if (src) mainImg.src = src;
        });
      });
    }

    // Quantity modifiers on PDP
    const qtyInput = document.getElementById('PdpQuantityInput');
    const decBtn = document.getElementById('PdpQtyDec');
    const incBtn = document.getElementById('PdpQtyInc');
    if (qtyInput && decBtn && incBtn) {
      decBtn.addEventListener('click', () => {
        const current = parseInt(qtyInput.value, 10) || 1;
        if (current > 1) qtyInput.value = current - 1;
      });
      incBtn.addEventListener('click', () => {
        const current = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = current + 1;
      });
    }
  }

  // 6. FAQ ACCORDION
  function initFaqAccordion() {
    const items = document.querySelectorAll('.sb-faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('.sb-faq-question-btn');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        items.forEach((i) => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // DOMContentLoaded bootstrap
  document.addEventListener('DOMContentLoaded', () => {
    initPosterPinboard();
    initReviewPhone();
    initPersonalityPopup();
    initPdpTabs();
    initFaqAccordion();
    Cart.init();
  });

  window.Sourboo = { Cart };
})();
