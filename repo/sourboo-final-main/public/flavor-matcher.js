/**
 * SOURBOO FLAVOUR MATCHER INTERACTION
 * Brand: Sourboo Snacks LLP
 */

(function () {
  'use strict';

  function initFlavorMatcher() {
    const matcher = document.getElementById('ShopFlavorMatcher');
    if (!matcher) return;

    const meters = matcher.querySelectorAll('.sb-meter-fill');
    
    // Animate meters when in view
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            meters.forEach((meter) => {
              const targetFill = meter.getAttribute('data-fill') || '80';
              meter.style.width = targetFill + '%';
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(matcher);
    } else {
      meters.forEach((meter) => {
        const targetFill = meter.getAttribute('data-fill') || '80';
        meter.style.width = targetFill + '%';
      });
    }

    // Toggle between Player 1 and Player 2 recommendations
    const switchBtns = matcher.querySelectorAll('.sb-matcher-switch-btn');
    const playerCards = matcher.querySelectorAll('.sb-matcher-player-card');

    switchBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetPlayer = btn.getAttribute('data-target-player');
        switchBtns.forEach((b) => b.classList.remove('active'));
        playerCards.forEach((c) => c.style.display = 'none');

        btn.classList.add('active');
        const activeCard = matcher.querySelector(`.sb-matcher-player-${targetPlayer}`);
        if (activeCard) {
          activeCard.style.display = 'block';
          // Re-trigger meter animations
          activeCard.querySelectorAll('.sb-meter-fill').forEach((m) => {
            const f = m.getAttribute('data-fill') || '80';
            m.style.width = '0%';
            setTimeout(() => { m.style.width = f + '%'; }, 50);
          });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFlavorMatcher);
})();
