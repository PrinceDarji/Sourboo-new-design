/**
 * SOURBOO SNACK DIARY — REDESIGN INTERACTIVE ENGINE
 * Brand: Sourboo Snacks LLP
 * Target File: redesign/js/sourboo-redesign.js
 * Version: 2.0.0 (Concept A: Editorial Chaos / Snack Diary)
 *
 * Capabilities:
 * 1. 4-Step Personality Quiz Engine & Lead Capture (POST /api/popup-leads)
 * 2. Slide-Out Cart Drawer with SOURBABE05 (-5%) Discount Engine
 * 3. PDP 3-Tab Physical Folder Dossier Switcher (In the jar / On the tongue / After opening)
 * 4. PDP Gallery Carousel & Quantity Selector
 * 5. Interactive 2-Player Flavour Matcher Engine
 * 6. Asymmetrical Poster Pinboard & Popping Speech Bubble Observers
 * 7. FAQ Accessible Accordion Controller
 * 8. 1-Click Quick-Add Pill Integration
 */

(function (window, document) {
  'use strict';

  // ==========================================================================
  // CONFIGURATION CONSTANTS
  // ==========================================================================
  const CONFIG = {
    DISCOUNT_CODE: 'SOURBABE05',
    DISCOUNT_RATE: 0.05,
    POPUP_DELAY_MS: 5000,
    POSTER_STEP_MS: 1800,
    LEAD_API_ENDPOINT: '/api/popup-leads',
    STORAGE_KEYS: {
      CART: 'sourboo_cart',
      DISCOUNT: 'sourboo_cart_discount',
      LEADS: 'sourboo_leads',
      POPUP_DISMISSED: 'sourboo_popup_dismissed',
      PERSONALITY: 'sourboo_personality'
    }
  };

  // ==========================================================================
  // UTILITY HELPERS
  // ==========================================================================
  const Utils = {
    formatCurrency(amount) {
      const num = Math.round(Number(amount) || 0);
      return `₹${num.toLocaleString('en-IN')}`;
    },

    safeJsonParse(str, fallback) {
      if (!str) return fallback;
      try {
        return JSON.parse(str);
      } catch (err) {
        console.warn('[Sourboo] JSON parse error:', err);
        return fallback;
      }
    },

    setScrollLock(locked) {
      document.body.style.overflow = locked ? 'hidden' : '';
    },

    copyToClipboard(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }
      // Fallback for non-secure / local iframe contexts
      return new Promise((resolve, reject) => {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (success) resolve();
          else reject(new Error('execCommand copy failed'));
        } catch (err) {
          reject(err);
        }
      });
    },

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
    },

    validatePhone(phone) {
      const digits = String(phone).replace(/\D/g, '');
      return digits.length >= 8 && digits.length <= 15;
    }
  };

  // ==========================================================================
  // 1. FOUR-STEP PERSONALITY POPUP ENGINE
  // ==========================================================================
  const Popup = {
    modal: null,
    screen1: null,
    screen2: null,
    screen3: null,
    selectedPersonality: 'Sour & Savage',

    init() {
      this.modal = document.getElementById('LandingPersonalityPopup');
      if (!this.modal) return;

      this.screen1 = document.getElementById('PopupScreen1');
      this.screen2 = document.getElementById('PopupScreen2');
      this.screen3 = document.getElementById('PopupScreen3');

      this.bindEvents();
      this.evaluateAutoTrigger();
    },

    bindEvents() {
      // 1. Dismiss / Close Buttons
      const closeTriggers = this.modal.querySelectorAll('.sb-close-popup-trigger, .sb-modal-close-btn');
      closeTriggers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeModal(true);
        });
      });

      // Close on Backdrop Click
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal(true);
        }
      });

      // Close on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.closeModal(true);
        }
      });

      // 2. Screen 1: Personality Option Buttons
      const optionButtons = this.modal.querySelectorAll('.sb-popup-option-btn');
      optionButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const chosen = btn.getAttribute('data-personality') || btn.innerText.replace('→', '').trim();
          this.selectPersonality(chosen);
        });
      });

      // 3. Screen 2: Lead Form Submission
      const leadForm = document.getElementById('PopupLeadForm');
      if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleLeadSubmit();
        });

        // Inline live validation on input
        const emailInput = document.getElementById('PopupEmailInput');
        const phoneInput = document.getElementById('PopupPhoneInput');
        const formError = document.getElementById('PopupFormError');

        [emailInput, phoneInput].forEach((input) => {
          if (!input) return;
          input.addEventListener('input', () => {
            if (formError && formError.textContent) {
              formError.textContent = '';
            }
            input.classList.remove('sb-input-error');
          });
        });
      }

      // 4. Screen 3: 1-Click Clipboard Copy
      const copyBtn = document.getElementById('PopupCopyBtn');
      const copyText = document.getElementById('PopupCopyText');
      if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          Utils.copyToClipboard(CONFIG.DISCOUNT_CODE)
            .then(() => {
              if (copyText) {
                const prev = copyText.textContent;
                copyText.textContent = 'COPIED!';
                copyText.style.background = 'var(--sb-lime, #BFEA5A)';
                copyText.style.color = 'var(--sb-text-charcoal, #171717)';
                setTimeout(() => {
                  copyText.textContent = prev;
                  copyText.style.background = 'var(--sb-pink, #E61E6E)';
                  copyText.style.color = '#ffffff';
                }, 2500);
              }
            })
            .catch(() => {
              if (copyText) copyText.textContent = 'COPIED!';
            });
        });
      }

      // External open triggers (e.g., header quiz pill)
      document.querySelectorAll('.sb-open-quiz-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openModal(1);
        });
      });
    },

    evaluateAutoTrigger() {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const isExplicitRoute = pathname.startsWith('/popup') || searchParams.get('popup') === 'true';
      const isDismissed = sessionStorage.getItem(CONFIG.STORAGE_KEYS.POPUP_DISMISSED) === 'true';

      if (isExplicitRoute) {
        this.openModal(1);
      } else if (!isDismissed && (pathname === '/' || pathname === '/home')) {
        setTimeout(() => {
          if (!this.isOpen() && sessionStorage.getItem(CONFIG.STORAGE_KEYS.POPUP_DISMISSED) !== 'true') {
            this.openModal(1);
          }
        }, CONFIG.POPUP_DELAY_MS);
      }
    },

    isOpen() {
      return this.modal && (this.modal.style.display === 'flex' || this.modal.classList.contains('open'));
    },

    openModal(step = 1) {
      if (!this.modal) return;
      this.goToScreen(step);
      this.modal.style.display = 'flex';
      this.modal.classList.add('open');
      Utils.setScrollLock(true);
    },

    closeModal(setDismissFlag = true) {
      if (!this.modal) return;
      this.modal.style.display = 'none';
      this.modal.classList.remove('open');
      Utils.setScrollLock(false);
      if (setDismissFlag) {
        sessionStorage.setItem(CONFIG.STORAGE_KEYS.POPUP_DISMISSED, 'true');
      }
    },

    selectPersonality(personality) {
      this.selectedPersonality = personality || 'Sour & Savage';
      sessionStorage.setItem(CONFIG.STORAGE_KEYS.PERSONALITY, this.selectedPersonality);

      const chosenHeading = document.getElementById('PopupChosenHeading');
      if (chosenHeading) {
        chosenHeading.textContent = `You're ${this.selectedPersonality}`;
      }

      this.goToScreen(2);
    },

    goToScreen(screenNum) {
      if (this.screen1) this.screen1.style.display = screenNum === 1 ? 'block' : 'none';
      if (this.screen2) this.screen2.style.display = screenNum === 2 ? 'block' : 'none';
      if (this.screen3) this.screen3.style.display = screenNum === 3 ? 'block' : 'none';

      // Screen 3 setup
      if (screenNum === 3) {
        const codeDisplay = document.getElementById('PopupCodeDisplay');
        if (codeDisplay) codeDisplay.textContent = CONFIG.DISCOUNT_CODE;
      }
    },

    async handleLeadSubmit() {
      const emailInput = document.getElementById('PopupEmailInput');
      const phoneInput = document.getElementById('PopupPhoneInput');
      const formError = document.getElementById('PopupFormError');

      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      // Screen 4: Inline Validation States
      if (!email && !phone) {
        this.setValidationError(formError, [emailInput, phoneInput], 'need an email & phone, babe!');
        return;
      }

      if (!email || !Utils.validateEmail(email)) {
        this.setValidationError(formError, [emailInput], 'need a real email babe');
        return;
      }

      if (!phone || !Utils.validatePhone(phone)) {
        this.setValidationError(formError, [phoneInput], 'need a valid phone for secret drops');
        return;
      }

      // Clear any errors
      if (formError) formError.textContent = '';
      if (emailInput) emailInput.classList.remove('sb-input-error');
      if (phoneInput) phoneInput.classList.remove('sb-input-error');

      const leadPayload = {
        email,
        phone,
        personality: this.selectedPersonality,
        selectedOptionLabel: this.selectedPersonality,
        timestamp: new Date().toISOString()
      };

      // 1. Store lead locally
      try {
        const leads = Utils.safeJsonParse(localStorage.getItem(CONFIG.STORAGE_KEYS.LEADS), []);
        leads.push(leadPayload);
        localStorage.setItem(CONFIG.STORAGE_KEYS.LEADS, JSON.stringify(leads));
      } catch (_) {}

      // 2. Auto-apply 5% discount to Cart
      Cart.applyDiscount(CONFIG.DISCOUNT_CODE);

      // 3. Dispatch POST to server API
      try {
        fetch(CONFIG.LEAD_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        }).catch((err) => {
          console.warn('[Sourboo] Popup lead POST network warning:', err);
        });
      } catch (err) {
        console.warn('[Sourboo] Popup lead POST exception:', err);
      }

      // Transition to Screen 3 (Coupon Code Reveal)
      this.goToScreen(3);
    },

    setValidationError(errorEl, inputs, message) {
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.color = '#B4232B';
      }
      inputs.forEach((input) => {
        if (input) {
          input.classList.add('sb-input-error');
          input.focus();
        }
      });
    }
  };

  // ==========================================================================
  // 2. SLIDE-OUT CART DRAWER & STATE MANAGEMENT
  // ==========================================================================
  const Cart = {
    items: [],
    discountCode: '',

    init() {
      this.items = Utils.safeJsonParse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART), []);
      this.discountCode = localStorage.getItem(CONFIG.STORAGE_KEYS.DISCOUNT) || '';

      this.bindEvents();
      this.render();
    },

    save() {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(this.items));
        if (this.discountCode) {
          localStorage.setItem(CONFIG.STORAGE_KEYS.DISCOUNT, this.discountCode);
        } else {
          localStorage.removeItem(CONFIG.STORAGE_KEYS.DISCOUNT);
        }
      } catch (err) {
        console.error('[Sourboo] LocalStorage save error:', err);
      }
      this.render();
    },

    addItem(product) {
      if (!product || !product.slug) return;
      const existing = this.items.find((item) => item.slug === product.slug);
      const qtyToAdd = Math.max(1, parseInt(product.quantity, 10) || 1);

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        this.items.push({
          slug: product.slug,
          name: product.name || 'Sourboo Snack',
          price: parseInt(product.price, 10) || 399,
          image: product.image || '/side-eye.webp',
          quantity: qtyToAdd
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
        this.removeItem(slug);
        return;
      }
      this.save();
    },

    removeItem(slug) {
      this.items = this.items.filter((i) => i.slug !== slug);
      this.save();
    },

    applyDiscount(code) {
      const clean = (code || '').trim().toUpperCase();
      if (clean === CONFIG.DISCOUNT_CODE) {
        this.discountCode = CONFIG.DISCOUNT_CODE;
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
      Utils.setScrollLock(true);
    },

    closeDrawer() {
      const drawer = document.getElementById('CartDrawer');
      const overlay = document.getElementById('CartDrawerOverlay');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      Utils.setScrollLock(false);
    },

    render() {
      const listEl = document.getElementById('CartDrawerItems');
      const countEls = document.querySelectorAll('.sb-cart-count');
      const subtotalEl = document.getElementById('CartSubtotal');
      const discountLineEl = document.getElementById('CartDiscountLine');
      const totalEl = document.getElementById('CartTotal');

      const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);

      // Badge Counts
      countEls.forEach((el) => {
        el.textContent = totalItems > 0 ? `(${totalItems})` : '';
      });

      // Price Calculations
      const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const isDiscountValid = this.discountCode === CONFIG.DISCOUNT_CODE;
      const discountAmount = isDiscountValid ? Math.round(subtotal * CONFIG.DISCOUNT_RATE) : 0;
      const total = Math.max(0, subtotal - discountAmount);

      // Subtotal Text
      if (subtotalEl) {
        subtotalEl.textContent = Utils.formatCurrency(subtotal);
      }

      // Discount Line
      if (discountLineEl) {
        if (discountAmount > 0) {
          discountLineEl.style.display = 'flex';
          const valEl = discountLineEl.querySelector('.sb-discount-val');
          if (valEl) valEl.textContent = `-${Utils.formatCurrency(discountAmount)}`;
        } else {
          discountLineEl.style.display = 'none';
        }
      }

      // Total Text
      if (totalEl) {
        totalEl.textContent = Utils.formatCurrency(total);
      }

      // Items Scroll Area
      if (listEl) {
        if (this.items.length === 0) {
          listEl.innerHTML = `
            <div class="sb-cart-empty-state" style="text-align: center; padding: 48px 16px;">
              <p class="font-coolvetica sb-cart-empty-title" style="font-size: 20px; margin-bottom: 8px;">Your cart is empty.</p>
              <p class="font-schoolbell sb-cart-empty-sub" style="color: var(--sb-text-muted); font-size: 16px;">Add some spicy-sour gherkins!</p>
              <a href="/collections/all" class="sb-btn-quickadd sb-close-cart-trigger" style="margin-top: 18px; display: inline-block;">
                Explore Flavours →
              </a>
            </div>
          `;
          return;
        }

        listEl.innerHTML = this.items
          .map(
            (item) => `
            <div class="sb-cart-item-row" data-slug="${item.slug}">
              <img src="${item.image}" alt="${item.name}" class="sb-cart-item-img" loading="lazy" />
              <div class="sb-cart-item-info">
                <p class="sb-cart-item-title font-coolvetica">${item.name}</p>
                <div class="sb-cart-item-controls">
                  <button type="button" class="sb-cart-qty-btn" data-slug="${item.slug}" data-delta="-1" aria-label="Decrease quantity">-</button>
                  <span class="sb-cart-qty-val font-coolvetica" style="padding: 0 6px;">${item.quantity}</span>
                  <button type="button" class="sb-cart-qty-btn" data-slug="${item.slug}" data-delta="1" aria-label="Increase quantity">+</button>
                  <button type="button" class="sb-cart-remove-btn font-schoolbell" data-slug="${item.slug}" aria-label="Remove item">remove</button>
                </div>
              </div>
              <p class="sb-cart-item-price font-coolvetica" style="font-size: 18px;">${Utils.formatCurrency(item.price * item.quantity)}</p>
            </div>
          `
          )
          .join('');

        // Wire dynamic item buttons
        listEl.querySelectorAll('.sb-cart-qty-btn').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const slug = btn.getAttribute('data-slug');
            const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
            this.updateQuantity(slug, delta);
          });
        });

        listEl.querySelectorAll('.sb-cart-remove-btn').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const slug = btn.getAttribute('data-slug');
            this.removeItem(slug);
          });
        });
      }
    },

    bindEvents() {
      // Open Cart Triggers
      document.querySelectorAll('.sb-open-cart-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      // Close Cart Triggers
      document.querySelectorAll('.sb-close-cart-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeDrawer();
        });
      });

      // ESC key to close cart
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const drawer = document.getElementById('CartDrawer');
          if (drawer && drawer.classList.contains('open')) {
            this.closeDrawer();
          }
        }
      });

      // Quick-Add / Add-to-Cart Trigger Delegation
      document.querySelectorAll('.sb-add-to-cart-trigger, .sb-quickadd-pill, .sb-quick-add-pill, .sb-quick-add-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const slug = btn.getAttribute('data-slug');
          if (!slug) return;

          e.preventDefault();
          const name = btn.getAttribute('data-name');
          const price = parseInt(btn.getAttribute('data-price'), 10) || 399;
          const image = btn.getAttribute('data-image');
          const qtyInput = document.getElementById('PdpQuantityInput');
          const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

          this.addItem({ slug, name, price, image, quantity });
        });
      });

      // Discount Code Input
      const discountInput = document.getElementById('CartDiscountInput');
      const discountFeedback = document.getElementById('CartDiscountFeedback');

      if (discountInput) {
        discountInput.value = this.discountCode;

        const handleDiscountChange = (e) => {
          const val = e.target.value.trim().toUpperCase();
          if (!val) {
            this.clearDiscount();
            if (discountFeedback) discountFeedback.textContent = '';
            return;
          }
          const res = this.applyDiscount(val);
          if (discountFeedback) {
            discountFeedback.textContent = res.message;
            discountFeedback.style.color = res.ok ? 'var(--sb-bg-yellow, #FFFF88)' : '#FFBABA';
          }
        };

        discountInput.addEventListener('input', handleDiscountChange);
        discountInput.addEventListener('change', handleDiscountChange);
      }
    }
  };

  // ==========================================================================
  // 3. PDP 3-TAB PHYSICAL FOLDER DOSSIER SWITCHER & GALLERY
  // ==========================================================================
  const DossierTabs = {
    init() {
      const tabButtons = document.querySelectorAll('.sb-tab-btn, .sb-dossier-tab');
      const tabPanels = document.querySelectorAll('.sb-tab-panel, .sb-dossier-content');
      if (!tabButtons.length) return;

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-tab');
          if (!targetId) return;

          // Handle dual ID convention: TabInJar vs TabInTheJar, TabOnTongue vs TabOnTheTongue
          const resolvedTargetId =
            document.getElementById(targetId) ? targetId :
            document.getElementById(targetId.replace('The', '')) ? targetId.replace('The', '') :
            targetId.replace('Tab', 'TabThe');

          tabButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          tabPanels.forEach((p) => {
            p.classList.remove('active');
            p.setAttribute('aria-hidden', 'true');
          });

          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const activePanel = document.getElementById(resolvedTargetId) || document.getElementById(targetId);
          if (activePanel) {
            activePanel.classList.add('active');
            activePanel.setAttribute('aria-hidden', 'false');
          }
        });

        // Accessible Keyboard Navigation for Tabs
        btn.addEventListener('keydown', (e) => {
          const tabsArray = Array.from(tabButtons);
          const index = tabsArray.indexOf(btn);

          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = tabsArray[(index + 1) % tabsArray.length];
            next.focus();
            next.click();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = tabsArray[(index - 1 + tabsArray.length) % tabsArray.length];
            prev.focus();
            prev.click();
          }
        });
      });

      // Gallery Thumbnails Switching
      const mainImg = document.getElementById('PdpMainImage');
      const thumbs = document.querySelectorAll('.sb-pdp-thumb');
      if (mainImg && thumbs.length) {
        thumbs.forEach((th) => {
          th.addEventListener('click', (e) => {
            e.preventDefault();
            thumbs.forEach((t) => t.classList.remove('active'));
            th.classList.add('active');
            const src = th.getAttribute('data-full-src');
            if (src) {
              mainImg.src = src;
            }
          });
        });
      }

      // PDP Quantity Selector
      const qtyInput = document.getElementById('PdpQuantityInput');
      const decBtn = document.getElementById('PdpQtyDec');
      const incBtn = document.getElementById('PdpQtyInc');
      if (qtyInput && decBtn && incBtn) {
        decBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const current = parseInt(qtyInput.value, 10) || 1;
          if (current > 1) {
            qtyInput.value = current - 1;
          }
        });

        incBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const current = parseInt(qtyInput.value, 10) || 1;
          qtyInput.value = current + 1;
        });
      }
    }
  };

  // ==========================================================================
  // 4. INTERACTIVE 2-PLAYER FLAVOUR MATCHER ENGINE
  // ==========================================================================
  const FlavorMatcher = {
    init() {
      const matcher = document.getElementById('ShopFlavorMatcher');
      if (!matcher) return;

      const meters = matcher.querySelectorAll('.sb-meter-fill');
      const switchBtns = matcher.querySelectorAll('.sb-matcher-switch-btn');
      const playerCards = matcher.querySelectorAll('.sb-matcher-player-card');

      const animateMeters = (container) => {
        const targetMeters = (container || matcher).querySelectorAll('.sb-meter-fill');
        targetMeters.forEach((meter) => {
          const fill = meter.getAttribute('data-fill') || '80';
          meter.style.width = '0%';
          setTimeout(() => {
            meter.style.width = `${fill}%`;
          }, 60);
        });
      };

      // Intersection Observer trigger
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateMeters();
                observer.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(matcher);
      } else {
        animateMeters();
      }

      // Switcher Buttons
      switchBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPlayer = btn.getAttribute('data-target-player');
          switchBtns.forEach((b) => b.classList.remove('active'));
          playerCards.forEach((c) => (c.style.display = 'none'));

          btn.classList.add('active');
          const activeCard = matcher.querySelector(`.sb-matcher-player-${targetPlayer}`);
          if (activeCard) {
            activeCard.style.display = 'block';
            animateMeters(activeCard);
          }
        });
      });
    }
  };

  // ==========================================================================
  // 5. ASYMMETRICAL POSTER PINBOARD & REVIEW BUBBLE OBSERVERS
  // ==========================================================================
  const Pinboard = {
    init() {
      this.initPosters();
      this.initReviewPhone();
    },

    initPosters() {
      const pinboard = document.getElementById('HomePosterPinboard');
      if (!pinboard) return;

      const cards = pinboard.querySelectorAll('.home-poster-card, .sb-zine-poster-card');
      const pins = pinboard.querySelectorAll('.home-poster-pin, .sb-pushpin-red');
      if (!cards.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.forEach((c) => c.classList.add('home-poster-card-visible'));
        pins.forEach((p) => p.classList.add('home-poster-pin-visible'));
        return;
      }

      let hasStarted = false;
      const revealStep = (index) => {
        if (index >= cards.length) return;
        cards[index].classList.add('home-poster-card-visible');
        if (pins[index]) {
          pins[index].classList.add('home-poster-pin-visible');
        }
        setTimeout(() => {
          revealStep(index + 1);
        }, CONFIG.POSTER_STEP_MS);
      };

      const startSequence = () => {
        if (hasStarted) return;
        hasStarted = true;
        revealStep(0);
      };

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
    },

    initReviewPhone() {
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
  };

  // ==========================================================================
  // 6. ACCESSIBLE FAQ ACCORDION
  // ==========================================================================
  const FaqAccordion = {
    init() {
      const items = document.querySelectorAll('.sb-faq-item');
      if (!items.length) return;

      items.forEach((item) => {
        const btn = item.querySelector('.sb-faq-question-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const wasOpen = item.classList.contains('open');
          items.forEach((i) => {
            i.classList.remove('open');
            const b = i.querySelector('.sb-faq-question-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
          });

          if (!wasOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }
  };

  // ==========================================================================
  // BOOTSTRAP INITIALIZATION
  // ==========================================================================
  function bootstrap() {
    Cart.init();
    Popup.init();
    DossierTabs.init();
    FlavorMatcher.init();
    Pinboard.init();
    FaqAccordion.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  // Export public API
  window.Sourboo = {
    Cart,
    Popup,
    DossierTabs,
    FlavorMatcher,
    Pinboard,
    FaqAccordion,
    Utils,
    CONFIG
  };

})(window, document);
