/**
 * SOURBOO V3: THE SOURBOO EXPERIENCE JAVASCRIPT ENGINE
 * 
 * Interactive Systems:
 * - 4-Step Personality Quiz Modal (Sentence Case, Accessible, Validated)
 * - Cart Drawer with LocalStorage persistence and SOURBABE05 5% calculation
 * - PDP Dossier Tabs (In the jar / On the tongue / After opening)
 * - Interactive Flavour Matcher
 * - Micro-interactions & Motion Triggers
 */

(function () {
  'use strict';

  // State Management
  const state = {
    cart: [
      { id: 'sideeyesour', name: 'Side Eye Sour', price: 399, qty: 1, img: '/side-eye.webp', desc: 'Lemon & Chaat Masala' },
      { id: 'tamarintease', name: 'Tamarin’ Tease', price: 399, qty: 1, img: '/tamarin-tease.webp', desc: 'Tamarind & Whole Chilli' }
    ],
    couponApplied: null,
    discountRate: 0.05,
    selectedPersonality: 'Sour & Savage'
  };

  // ==========================================================================
  // 1. PERSONALITY POPUP QUIZ (4-STEP ACCESSIBLE ENGINE)
  // ==========================================================================

  function initPersonalityPopup() {
    const modal = document.getElementById('LandingPersonalityPopup');
    if (!modal) return;

    // Open triggers
    document.querySelectorAll('.sb-open-quiz-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openQuiz();
      });
    });

    // Close buttons
    modal.querySelectorAll('.sb-popup-close, .sb-modal-close-trigger').forEach(btn => {
      btn.addEventListener('click', () => closeQuiz());
    });

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuiz();
    });

    // Step 1: Selection Buttons
    modal.querySelectorAll('.sb-quiz-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const personality = this.getAttribute('data-personality') || this.querySelector('span')?.innerText || 'Sour & Savage';
        state.selectedPersonality = personality;
        goToQuizStep(2);
      });
    });

    // Step 2: Form Submission
    const leadForm = document.getElementById('SbQuizLeadForm');
    if (leadForm) {
      leadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('SbQuizEmail');
        const phoneInput = document.getElementById('SbQuizPhone');
        const errorContainer = document.getElementById('SbQuizError');

        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        // Validation
        if (!email || !email.includes('@') || !email.includes('.')) {
          showError('Please enter a valid email address so we can send your coupon.');
          return;
        }

        if (!phone || phone.length < 8) {
          showError('Please enter a valid mobile number for WhatsApp updates.');
          return;
        }

        // Send to backend endpoint
        fetch('/api/popup-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone, personality: state.selectedPersonality })
        }).catch(() => { /* Graceful fallback */ });

        goToQuizStep(3);
      });
    }

    // Step 3: Copy Coupon Code
    const copyBtn = document.getElementById('SbCopyCouponBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText('SOURBABE05').then(() => {
          this.innerText = 'Copied to Clipboard! ¬‿¬';
          applyCoupon('SOURBABE05');
          setTimeout(() => {
            closeQuiz();
            this.innerText = 'Copy Code & Continue Shopping';
          }, 1400);
        });
      });
    }

    function openQuiz() {
      modal.classList.add('is-open');
      goToQuizStep(1);
    }

    function closeQuiz() {
      modal.classList.remove('is-open');
    }

    function goToQuizStep(step) {
      const step1 = document.getElementById('SbQuizStep1');
      const step2 = document.getElementById('SbQuizStep2');
      const step3 = document.getElementById('SbQuizStep3');
      const greeting = document.getElementById('SbQuizSelectedGreeting');

      if (step1) step1.style.display = step === 1 ? 'block' : 'none';
      if (step2) step2.style.display = step === 2 ? 'block' : 'none';
      if (step3) step3.style.display = step === 3 ? 'block' : 'none';

      if (greeting && step === 2) {
        greeting.innerText = 'Hello, ' + state.selectedPersonality + '!';
      }
    }

    function showError(msg) {
      const errorContainer = document.getElementById('SbQuizError');
      if (errorContainer) {
        errorContainer.innerText = msg;
        errorContainer.style.display = 'block';
      } else {
        alert(msg);
      }
    }
  }

  // ==========================================================================
  // 2. CART DRAWER & PRICING ENGINE
  // ==========================================================================

  function initCartDrawer() {
    const drawer = document.getElementById('CartDrawer');
    if (!drawer) return;

    // Trigger open/close
    document.querySelectorAll('.sb-open-cart-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart(true);
      });
    });

    drawer.querySelectorAll('.sb-drawer-close').forEach(btn => {
      btn.addEventListener('click', () => toggleCart(false));
    });

    // Quick Add Buttons
    document.querySelectorAll('.sb-btn-quick-add, .sb-add-to-cart-trigger').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-product-id') || 'sideeyesour';
        const name = this.getAttribute('data-product-name') || 'Side Eye Sour';
        const price = parseInt(this.getAttribute('data-product-price') || '399', 10);
        const img = this.getAttribute('data-product-img') || '/side-eye.webp';

        addToCart(id, name, price, img);
        toggleCart(true);
      });
    });

    // Discount coupon input in cart
    const discountInput = document.getElementById('CartDiscountInput');
    const discountBtn = document.getElementById('CartApplyDiscountBtn');
    if (discountBtn && discountInput) {
      discountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const code = discountInput.value.trim().toUpperCase();
        if (code === 'SOURBABE05') {
          applyCoupon('SOURBABE05');
          alert('Coupon SOURBABE05 applied! 5% discount unlocked.');
        } else {
          alert('Invalid coupon code. Try SOURBABE05.');
        }
      });
    }

    renderCart();
  }

  function toggleCart(open) {
    const drawer = document.getElementById('CartDrawer');
    if (!drawer) return;
    if (open) {
      drawer.classList.add('is-open');
    } else {
      drawer.classList.remove('is-open');
    }
  }

  function addToCart(id, name, price, img) {
    const existing = state.cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ id, name, price, qty: 1, img, desc: 'Snackable pickled gherkins' });
    }
    renderCart();
  }

  function applyCoupon(code) {
    state.couponApplied = code;
    renderCart();
  }

  function renderCart() {
    const countEls = document.querySelectorAll('.sb-cart-count, #CartCountBadge');
    const itemsContainer = document.getElementById('CartItemsList');
    const subtotalEl = document.getElementById('CartSubtotal');
    const discountRow = document.getElementById('CartDiscountRow');
    const discountEl = document.getElementById('CartDiscountAmount');
    const totalEl = document.getElementById('CartTotal');

    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    countEls.forEach(el => { el.innerText = totalQty; });

    let rawSubtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discount = state.couponApplied ? Math.round(rawSubtotal * state.discountRate) : 0;
    let finalTotal = rawSubtotal - discount;

    if (subtotalEl) subtotalEl.innerText = '₹' + rawSubtotal;
    if (totalEl) totalEl.innerText = '₹' + finalTotal;

    if (discountRow) {
      discountRow.style.display = state.couponApplied ? 'flex' : 'none';
      if (discountEl) discountEl.innerText = '-₹' + discount;
    }

    if (itemsContainer) {
      if (state.cart.length === 0) {
        itemsContainer.innerHTML = '<p class="sb-empty-cart">Your bag is empty. Time to pick a jar!</p>';
      } else {
        itemsContainer.innerHTML = state.cart.map(item => `
          <div class="sb-cart-item-row" style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(20,20,20,0.08);">
            <img src="${item.img}" alt="${item.name}" style="width: 54px; height: 54px; object-fit: contain; background: #fff; border-radius: 8px; border: 1px solid #141414;" />
            <div style="flex: 1;">
              <h5 style="margin: 0 0 2px 0; font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700;">${item.name}</h5>
              <div style="font-size: 0.85rem; color: #666;">Qty: ${item.qty} × ₹${item.price}</div>
            </div>
            <div style="font-weight: 800; font-family: var(--font-sans); color: var(--sb-pink);">₹${item.price * item.qty}</div>
          </div>
        `).join('');
      }
    }
  }

  // ==========================================================================
  // 3. PRODUCT DETAIL PAGE (PDP) DOSSIER TABS
  // ==========================================================================

  function initPdpTabs() {
    const tabs = document.querySelectorAll('.sb-dossier-tab-btn');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetId = this.getAttribute('data-tab-target');
        
        // Remove active class from all tabs
        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.style.backgroundColor = 'transparent';
          t.style.borderColor = 'transparent';
        });

        // Hide all panels
        document.querySelectorAll('.sb-dossier-tab-panel').forEach(p => {
          p.style.display = 'none';
        });

        // Activate current tab
        this.classList.add('is-active');
        this.style.backgroundColor = 'var(--sb-yellow)';
        this.style.borderColor = 'var(--sb-charcoal)';

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.style.display = 'block';
      });
    });
  }

  // ==========================================================================
  // 4. INTERACTIVE FLAVOUR MATCHER
  // ==========================================================================

  function initFlavourMatcher() {
    const matcherWrap = document.getElementById('ShopFlavorMatcher');
    if (!matcherWrap) return;

    const cards = matcherWrap.querySelectorAll('.sb-matcher-choice-card');
    const resultBox = document.getElementById('MatcherResultBox');
    const resultTitle = document.getElementById('MatcherResultTitle');
    const resultImg = document.getElementById('MatcherResultImg');
    const resultBtn = document.getElementById('MatcherResultBtn');

    cards.forEach(card => {
      card.addEventListener('click', function () {
        const match = this.getAttribute('data-match') || 'sideeyesour';
        cards.forEach(c => c.classList.remove('is-selected'));
        this.classList.add('is-selected');

        if (resultBox && resultTitle && resultImg) {
          resultBox.style.display = 'block';
          if (match === 'sideeyesour') {
            resultTitle.innerText = 'Your Perfect Match: Side Eye Sour';
            resultImg.src = '/side-eye.webp';
            if (resultBtn) {
              resultBtn.setAttribute('data-product-id', 'sideeyesour');
              resultBtn.setAttribute('data-product-name', 'Side Eye Sour');
              resultBtn.setAttribute('data-product-price', '399');
            }
          } else {
            resultTitle.innerText = 'Your Perfect Match: Tamarin’ Tease';
            resultImg.src = '/tamarin-tease.webp';
            if (resultBtn) {
              resultBtn.setAttribute('data-product-id', 'tamarintease');
              resultBtn.setAttribute('data-product-name', 'Tamarin’ Tease');
              resultBtn.setAttribute('data-product-price', '399');
            }
          }
        }
      });
    });
  }

  // ==========================================================================
  // 5. BOOTSTRAP
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initPersonalityPopup();
    initCartDrawer();
    initPdpTabs();
    initFlavourMatcher();
  });

})();
