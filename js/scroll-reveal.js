/**
 * scroll-reveal.js — Intersection Observer Scroll Animations
 *
 * Elements with the .reveal class start hidden (opacity 0, translateY 30px)
 * and animate into view when they enter the viewport.
 *
 * - Stagger effect is handled via CSS transition-delay on .reveal-stagger children
 * - Each element only animates once (unobserved after reveal)
 */
(function () {
  'use strict';

  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
