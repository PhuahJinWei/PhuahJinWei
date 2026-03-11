/**
 * transitions.js — Center-Expand Page Transitions + Play Button Handler
 *
 * Page enter: content expands from center (scale 0 → 1, 0.2s)
 * Page exit:  content shrinks to center  (scale 1 → 0, 0.2s)
 *
 * Also handles .card-play-btn clicks — opens demo URL in new tab
 * without triggering card navigation.
 */
(function () {
  'use strict';

  var overlay = document.querySelector('.page-transition-overlay');
  var tiltContainer = document.querySelector('.tilt-container');
  var tiltContent = document.querySelector('.tilt-content');

  /**
   * Hides the transition overlay so it no longer covers the page.
   */
  function hideOverlay() {
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.classList.remove('blocking');
    }
  }

  // --- Page Load: clean up after expandIn animation ---
  // page-enter is set in the HTML so the animation starts from first render.
  // We just need to remove it once the animation finishes so tilt.js can
  // control the transform property freely.
  if (tiltContainer && tiltContent && tiltContainer.classList.contains('page-enter')) {
    tiltContent.addEventListener('animationend', function handler(e) {
      if (e.target !== tiltContent) return;
      tiltContent.removeEventListener('animationend', handler);
      tiltContainer.classList.remove('page-enter');
    });

    // Safety fallback — always clean up even if animationend never fires
    setTimeout(function () {
      tiltContainer.classList.remove('page-enter');
    }, 400);
  }

  // --- Play Button Handler ---
  // Intercepts clicks on .card-play-btn to open demo in new tab
  document.addEventListener('click', function (e) {
    var playBtn = e.target.closest('.card-play-btn');
    if (playBtn) {
      e.preventDefault();
      e.stopPropagation();
      var demoUrl = playBtn.getAttribute('data-demo');
      if (demoUrl) {
        window.open(demoUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }
  });

  // --- Intercept internal link clicks for shrink-then-navigate ---
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip external links, hash links, and new-tab links
    if (
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      link.target === '_blank'
    ) {
      return;
    }

    // Don't intercept if we already handled a play button
    if (e.defaultPrevented) return;

    e.preventDefault();

    if (tiltContainer && tiltContent) {
      // Show overlay behind the shrinking content + block interaction
      if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('blocking');
      }

      // Set transform-origin to viewport center (accounting for scroll)
      var originY = window.scrollY + window.innerHeight / 2;
      tiltContent.style.transformOrigin = '50% ' + originY + 'px';

      // Trigger shrink animation
      tiltContainer.classList.add('page-exit');

      // Navigate after the shrink animation (200ms)
      tiltContent.addEventListener('animationend', function handler(e) {
        if (e.target !== tiltContent) return;
        tiltContent.removeEventListener('animationend', handler);
        window.location.href = href;
      });

      // Safety fallback in case animationend doesn't fire
      setTimeout(function () {
        window.location.href = href;
      }, 250);
    } else {
      // No tilt content — just navigate
      window.location.href = href;
    }
  });

  // --- Handle back/forward cache ---
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // Page was restored from bfcache — reset state
      if (tiltContainer) {
        tiltContainer.classList.remove('page-exit');
        tiltContainer.classList.remove('page-enter');
      }
      if (tiltContent) {
        tiltContent.style.transform = '';
        tiltContent.style.opacity = '';
      }
      hideOverlay();
    }
  });
})();
