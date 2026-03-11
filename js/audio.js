/**
 * audio.js — Site Audio Effects
 *
 * page_load.mp3       : plays once on page load
 * button_hover.mp3    : plays on mouseenter of cards and buttons
 * button_holddown.mp3 : plays while holding down on cards and buttons
 *
 * Works on both index.html (root) and projects/project.html (subdirectory).
 */
(function () {
  'use strict';

  // Resolve path to assets/audio/ relative to this page's location
  var isSubPage = window.location.pathname.replace(/\\/g, '/').indexOf('/projects/') !== -1;
  var base = isSubPage ? '../assets/audio/' : 'assets/audio/';

  // Create and preload an audio instance
  function makeAudio(file) {
    var a = new Audio(base + file);
    a.preload = 'auto';
    return a;
  }

  var sndLoad  = makeAudio('page_load.mp3');
  var sndHover = makeAudio('button_hover.mp3');
  var sndHold  = makeAudio('button_holddown.mp3');

  // Elements that trigger hover / hold audio
  var INTERACTIVE = '.project-card, .break-button, .card-play-btn';

  // --- Page Load ---
  // Browsers may block autoplay before user interaction — fail silently.
  sndLoad.play().catch(function () {});

  // --- Hover ---
  // mouseenter doesn't bubble, so use mouseover + relatedTarget check
  // to fire only when the cursor first enters the element.
  document.addEventListener('mouseover', function (e) {
    var el = e.target.closest(INTERACTIVE);
    if (!el) return;
    if (el.contains(e.relatedTarget)) return; // came from a child — skip
    sndHover.currentTime = 0;
    sndHover.play().catch(function () {});
  });

  // --- Hold Down ---
  document.addEventListener('mousedown', function (e) {
    if (!e.target.closest(INTERACTIVE)) return;
    sndHold.currentTime = 0;
    sndHold.play().catch(function () {});
  });

  // Stop hold sound as soon as button is released
  document.addEventListener('mouseup', function () {
    if (!sndHold.paused) {
      sndHold.pause();
      sndHold.currentTime = 0;
    }
  });

})();
