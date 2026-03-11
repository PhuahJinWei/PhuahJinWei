/**
 * tilt.js — 3D Card Tilt + Depth Effect
 *
 * Tracks mouse position (desktop) or device orientation (mobile)
 * and applies perspective rotation to .tilt-content, plus drives
 * the layered card depth offset system.
 *
 * Desktop: mousemove → cursor-driven tilt + depth
 * Mobile:  DeviceOrientationEvent (gyroscope) → device-driven tilt + depth
 * iOS 13+: Requests gyroscope permission via tap prompt
 */
(function () {
  'use strict';

  var content = document.querySelector('.tilt-content');
  if (!content) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var isTouchDevice = window.matchMedia('(hover: none)').matches;

  // ========== SETTINGS ==========
  var MAX_TILT    = 2;     // degrees — max tilt added by input movement
  var REVERSE     = true;  // true = tilts away from input, false = tilts toward
  var BASE_ROTATE = -1;    // degrees — default Z-axis rotation (anti-clockwise)
  var BASE_TILT_X = 3;     // degrees — default X tilt (positive = top tilts away)
  var BASE_TILT_Y = -1;    // degrees — default Y tilt (positive = left tilts away)
  var DEPTH        = 10;   // px — base depth offset for back-layer at relX = ±1
  var DEPTH_Y      = 5;    // px — base downward offset for back-layer
  var CURSOR_SCALE = 2;    // how much input X amplifies position-based depth
  var CURSOR_DEPTH = 4;    // px — input-driven depth for all cards
  var CURSOR_DEPTH_Y = 10; // px — how much input Y modulates downward peek

  // Gyroscope settings (mobile)
  var GYRO_RANGE     = 20;   // degrees from center to reach full ±1
  var GYRO_DEADZONE  = 3;    // degrees of dead zone around center
  var GYRO_SMOOTHING = 0.15; // lerp factor (0 = no update, 1 = instant)
  // ==============================

  var rafId = null;

  // Apply base transforms immediately so the page starts rotated + tilted
  content.style.transform =
    'rotateX(' + BASE_TILT_X + 'deg) rotateY(' + BASE_TILT_Y + 'deg) rotateZ(' + BASE_ROTATE + 'deg)';

  // --- 3D Depth Layers (Endfield-style back-layer offset) ---
  var depthWrappers = [];
  var depthRelX     = [];
  var depthTimer    = null;

  function cacheGridPositions() {
    depthWrappers = Array.prototype.slice.call(
      document.querySelectorAll('.card-3d-wrapper')
    );
    depthRelX = [];
    if (!depthWrappers.length) return;

    for (var i = 0; i < depthWrappers.length; i++) {
      var rect = depthWrappers[i].getBoundingClientRect();
      var grid = depthWrappers[i].closest('.project-grid');
      var gridRect = grid ? grid.getBoundingClientRect() : { left: 0, width: window.innerWidth };

      var cardCenterX = rect.left + rect.width / 2;
      var gridCenterX = gridRect.left + gridRect.width / 2;
      var gridHalfW   = gridRect.width / 2 || 1;

      // relX: -1 (left edge) to +1 (right edge) within the grid
      var relX = Math.max(-1, Math.min(1, (cardCenterX - gridCenterX) / gridHalfW));
      depthRelX.push(relX);
    }

    // Set initial resting offsets (input at center)
    updateDepthLayers(0, 0);
  }

  function updateDepthLayers(inputX, inputY) {
    if (!depthWrappers.length) return;

    // Vertical depth: input bottom → more down peek, input top → less (min 5px)
    var dy = Math.max(5, DEPTH_Y + inputY * CURSOR_DEPTH_Y);

    for (var i = 0; i < depthWrappers.length; i++) {
      var relX = depthRelX[i];
      // Position scale: amplifies when input is far from card, fades to 0 when near
      var posScale = Math.max(0, 1 - inputX * relX * CURSOR_SCALE);
      // Position-based offset + input offset (positive = follows input direction)
      var dx = -relX * DEPTH * posScale + inputX * CURSOR_DEPTH;
      // Hard cap
      dx = Math.max(-20, Math.min(20, dx));
      depthWrappers[i].style.setProperty('--depth-x', dx.toFixed(1) + 'px');
      depthWrappers[i].style.setProperty('--depth-y', dy.toFixed(1) + 'px');
    }
  }

  // Cache after page-enter animation finishes
  setTimeout(cacheGridPositions, 500);

  window.addEventListener('resize', function () {
    clearTimeout(depthTimer);
    depthTimer = setTimeout(cacheGridPositions, 200);
  });

  // --- Shared tilt application ---
  function applyTilt(xNorm, yNorm) {
    var sign = REVERSE ? -1 : 1;
    var rotateY = BASE_TILT_Y + sign * xNorm * MAX_TILT;
    var rotateX = BASE_TILT_X + sign * -yNorm * MAX_TILT;

    content.style.transform =
      'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + BASE_ROTATE + 'deg)';

    updateDepthLayers(xNorm, yNorm);
  }

  // --- Input branching ---
  if (isTouchDevice) {
    // ====== MOBILE: Gyroscope ======
    var betaCenter  = null;
    var gammaCenter = null;
    var smoothX = 0;
    var smoothY = 0;

    function applyDeadzone(val, zone) {
      if (Math.abs(val) < zone) return 0;
      return val > 0 ? val - zone : val + zone;
    }

    function handleOrientation(e) {
      if (e.beta === null || e.gamma === null) return;

      // First valid reading: set center reference
      if (betaCenter === null) {
        betaCenter  = e.beta;
        gammaCenter = e.gamma;
      }

      // Delta from center
      var dBeta  = e.beta  - betaCenter;
      var dGamma = e.gamma - gammaCenter;

      // Apply dead zone
      dBeta  = applyDeadzone(dBeta, GYRO_DEADZONE);
      dGamma = applyDeadzone(dGamma, GYRO_DEADZONE);

      // Normalize to -1..1
      var rawX = Math.max(-1, Math.min(1, dGamma / GYRO_RANGE));
      var rawY = Math.max(-1, Math.min(1, dBeta  / GYRO_RANGE));

      // Smooth (lerp toward target)
      smoothX += (rawX - smoothX) * GYRO_SMOOTHING;
      smoothY += (rawY - smoothY) * GYRO_SMOOTHING;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        applyTilt(smoothX, smoothY);
        rafId = null;
      });
    }

    function startGyro() {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Re-calibrate when page regains visibility (user may have rotated phone)
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        betaCenter = null;
        gammaCenter = null;
      }
    });

    // iOS 13+ permission flow
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      var gyroPrompt = document.getElementById('gyro-prompt');
      if (gyroPrompt) {
        // Show prompt after page-enter animation finishes
        setTimeout(function () {
          gyroPrompt.classList.remove('hidden');
        }, 600);

        gyroPrompt.addEventListener('click', function () {
          DeviceOrientationEvent.requestPermission().then(function (state) {
            if (state === 'granted') {
              startGyro();
            }
          }).catch(function () {});
          gyroPrompt.classList.add('hidden');
        });
      }
    } else {
      // Android & other platforms — start directly
      startGyro();
    }

  } else {
    // ====== DESKTOP: Mouse ======
    document.addEventListener('mousemove', function (e) {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(function () {
        var xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
        var yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
        applyTilt(xNorm, yNorm);
        rafId = null;
      });
    });

    // When cursor leaves the window, keep the last tilt + depth state
    // (no reset — page stays where it was)
  }
})();
