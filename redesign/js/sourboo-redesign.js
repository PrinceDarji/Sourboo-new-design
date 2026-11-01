/**
 * SOURBOO V3 — Redesign JavaScript
 * Cart management, popup, and UI interactions
 */
(function() {
  'use strict';

  // ============================================================
  // CART STATE MANAGEMENT
  // ============================================================
  const CART_STORAGE_KEY = 'sourboo_cart_v3';

  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function getCartTotal() {
    return getCart().reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  }

  // Update all cart count badges on the page
  function updateCartUI() {
    const count = getCartCount();
    const total = getCartTotal();

    // Update all .sb-cart-count elements
    document.querySelectorAll('.sb-cart-count').forEach(el => {
      if (count > 0) {
        el.textContent = count;
        el.style.display = '';
      } else {
        el.textContent = '';
        el.style.display = 'none';
      }
    });

    // Update cart drawer
    const subtotalEl = document.getElementById('CartSubtotal');
    const totalEl = document.getElementById('CartTotal');
    if (subtotalEl) subtotalEl.textContent = '₹' + total;
    if (totalEl) totalEl.textContent = '₹' + total;

    // Render cart items
    renderCartItems();
  }

  function renderCartItems() {
    const container = document.getElementById('CartDrawerItems');
    if (!container) return;

    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = '<div style="text-align: center; padding: 40px 20px;"><p class="font-schoolbell" style="font-size: 1.3rem; color: var(--sb-text-muted);">Your bag is empty.<br>Time to fix that.</p><a href="/collections/all" style="display: inline-block; margin-top: 16px; font-family: Coolvetica, sans-serif; color: var(--sb-pink); text-decoration: underline;">Browse pickles →</a></div>';
      return;
    }

    container.innerHTML = cart.map((item, i) => `
      <div class="sb-cart-item" style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(23,23,23,0.1);">
        <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--sb-charcoal);" />
        <div style="flex: 1;">
          <div class="font-coolvetica" style="font-size: 1rem;">${item.name}</div>
          <div class="font-schoolbell" style="color: var(--sb-pink); font-size: 1rem;">₹${item.price}</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button type="button" class="sb-cart-qty-btn" data-action="dec" data-index="${i}" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--sb-charcoal); background: transparent; font-size: 1rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">-</button>
            <span class="font-coolvetica" style="min-width: 20px; text-align: center;">${item.qty}</span>
            <button type="button" class="sb-cart-qty-btn" data-action="inc" data-index="${i}" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--sb-charcoal); background: transparent; font-size: 1rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">+</button>
            <button type="button" class="sb-cart-remove-btn" data-index="${i}" style="margin-left: auto; font-family: Schoolbell, cursive; font-size: 0.85rem; color: var(--sb-pink); text-decoration: underline; cursor: pointer; background: none; border: none;">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // Bind qty buttons
    container.querySelectorAll('.sb-cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.index);
        const action = this.dataset.action;
        const cart = getCart();
        if (action === 'inc') {
          cart[idx].qty = (cart[idx].qty || 1) + 1;
        } else if (action === 'dec') {
          cart[idx].qty = (cart[idx].qty || 1) - 1;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        saveCart(cart);
        updateCartUI();
      });
    });

    container.querySelectorAll('.sb-cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.index);
        const cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        updateCartUI();
      });
    });
  }

  function addToCart(slug, name, price, image) {
    const cart = getCart();
    const existing = cart.find(item => item.slug === slug);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ slug, name, price: parseInt(price), image, qty: 1 });
    }
    saveCart(cart);
    updateCartUI();
    openCartDrawer();
  }

  // ============================================================
  // CART DRAWER
  // ============================================================
  function openCartDrawer() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('CartDrawerOverlay');
    if (drawer) drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('CartDrawerOverlay');
    if (drawer) drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ============================================================
  // POPUP MODAL
  // ============================================================
  function openPopup() {
    const modal = document.getElementById('LandingPersonalityPopup');
    if (modal) modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    const modal = document.getElementById('LandingPersonalityPopup');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    // Mark as seen
    try { sessionStorage.setItem('sourboo_popup_seen', '1'); } catch(e) {}
  }

  // ============================================================
  // DISCOUNT CODE
  // ============================================================
  function applyDiscount() {
    const input = document.getElementById('CartDiscountInput');
    const feedback = document.getElementById('CartDiscountFeedback');
    const discountLine = document.getElementById('CartDiscountLine');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'SOURBABE05') {
      if (feedback) {
        feedback.textContent = '✓ Code applied! 5% off your order.';
        feedback.style.color = '#6B8E23';
      }
      if (discountLine) {
        discountLine.style.display = 'flex';
        const total = getCartTotal();
        const discount = Math.round(total * 0.05);
        const discountVal = discountLine.querySelector('.sb-discount-val');
        if (discountVal) discountVal.textContent = '-₹' + discount;
        const cartTotal = document.getElementById('CartTotal');
        if (cartTotal) cartTotal.textContent = '₹' + (total - discount);
      }
    } else if (code.length > 0) {
      if (feedback) {
        feedback.textContent = 'Invalid code. Try SOURBABE05 ;)';
        feedback.style.color = '#B4232B';
      }
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    // Initialize cart count
    updateCartUI();

    // Add to cart buttons
    document.addEventListener('click', function(e) {
      const addBtn = e.target.closest('.sb-add-to-cart-trigger');
      if (addBtn) {
        e.preventDefault();
        addToCart(
          addBtn.dataset.slug,
          addBtn.dataset.name,
          addBtn.dataset.price,
          addBtn.dataset.image
        );
      }

      // Open cart drawer
      if (e.target.closest('.sb-open-cart-trigger')) {
        e.preventDefault();
        openCartDrawer();
      }

      // Close cart drawer
      if (e.target.closest('.sb-close-cart-trigger')) {
        e.preventDefault();
        closeCartDrawer();
      }

      // Open popup/quiz
      if (e.target.closest('.sb-open-quiz-trigger')) {
        e.preventDefault();
        openPopup();
      }

      // Close popup
      if (e.target.closest('.sb-close-popup-trigger')) {
        e.preventDefault();
        closePopup();
      }
    });

    // Popup personality choices
    document.querySelectorAll('.sb-popup-option-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const personality = this.dataset.personality;
        const screen1 = document.getElementById('PopupScreen1');
        const screen2 = document.getElementById('PopupScreen2');
        const heading = document.getElementById('PopupChosenHeading');
        if (screen1) screen1.style.display = 'none';
        if (screen2) screen2.style.display = 'block';
        if (heading) heading.textContent = "You're " + personality;
      });
    });

    // Popup lead form
    const leadForm = document.getElementById('PopupLeadForm');
    if (leadForm) {
      leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('PopupEmailInput');
        const phone = document.getElementById('PopupPhoneInput');
        const error = document.getElementById('PopupFormError');

        if (!email || !email.value.includes('@')) {
          if (error) error.textContent = 'Please enter a valid email';
          return;
        }
        if (!phone || phone.value.length < 10) {
          if (error) error.textContent = 'Please enter a valid phone number';
          return;
        }

        // Submit lead
        fetch('/api/popup-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            phone: phone.value,
            personality: document.getElementById('PopupChosenHeading')?.textContent || ''
          })
        }).catch(() => {});

        // Show coupon screen
        const screen2 = document.getElementById('PopupScreen2');
        const screen3 = document.getElementById('PopupScreen3');
        if (screen2) screen2.style.display = 'none';
        if (screen3) screen3.style.display = 'block';
      });
    }

    // Copy coupon code
    const copyBtn = document.getElementById('PopupCopyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText('SOURBABE05').then(() => {
          const copyText = document.getElementById('PopupCopyText');
          if (copyText) {
            copyText.textContent = 'COPIED!';
            setTimeout(() => { copyText.textContent = 'COPY'; }, 2000);
          }
        }).catch(() => {});
      });
    }

    // Discount code input
    const discountInput = document.getElementById('CartDiscountInput');
    if (discountInput) {
      discountInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') applyDiscount();
      });
      discountInput.addEventListener('blur', applyDiscount);
    }

    // Auto-show popup after 3 seconds (if not seen)
    try {
      if (!sessionStorage.getItem('sourboo_popup_seen')) {
        setTimeout(openPopup, 3000);
      }
    } catch(e) {}

    // FAQ accordion
    document.querySelectorAll('.sb-faq-question-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.closest('.sb-faq-item');
        if (item) {
          const isOpen = item.classList.contains('open');
          // Close all
          document.querySelectorAll('.sb-faq-item').forEach(i => i.classList.remove('open'));
          // Toggle current
          if (!isOpen) item.classList.add('open');
        }
      });
    });

    // PDP thumbnail switcher
    document.querySelectorAll('.sb-pdp-thumb').forEach(thumb => {
      thumb.addEventListener('click', function() {
        document.querySelectorAll('.sb-pdp-thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const mainImg = document.getElementById('PdpMainImage');
        if (mainImg && this.dataset.fullSrc) {
          mainImg.src = this.dataset.fullSrc;
        }
      });
    });

    // PDP quantity picker
    const qtyDec = document.getElementById('PdpQtyDec');
    const qtyInc = document.getElementById('PdpQtyInc');
    const qtyInput = document.getElementById('PdpQuantityInput');
    if (qtyDec && qtyInc && qtyInput) {
      qtyDec.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
      qtyInc.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      });
    }

    // Flavour matcher tabs (shop page)
    document.querySelectorAll('.sb-matcher-switch-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.sb-matcher-switch-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.targetPlayer;
        document.querySelectorAll('.sb-matcher-player-card').forEach(card => {
          card.style.display = 'none';
        });
        const targetCard = document.querySelector('.sb-matcher-player-' + target);
        if (targetCard) targetCard.style.display = 'block';
      });
    });

    // PDP tab switcher
    document.querySelectorAll('.sb-tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.sb-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.sb-tab-panel').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const panel = document.getElementById(this.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
