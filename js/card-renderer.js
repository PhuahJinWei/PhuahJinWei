/**
 * card-renderer.js — Render project sections on the index page
 *
 * Reads window.PROJECTS, groups them by tag, and generates a
 * full <section> with heading + card grid for each group.
 *
 * Must be loaded AFTER projects-data.js and BEFORE scroll-reveal/
 * transitions scripts.
 */
(function () {
  'use strict';

  var container = document.getElementById('projects-container');
  if (!container || !window.PROJECTS) return;

  var projects = window.PROJECTS;

  // --- Collect unique tags in the order they first appear ---
  var tagOrder = [];
  var groups = {};

  for (var i = 0; i < projects.length; i++) {
    var tag = projects[i].tag;
    if (!groups[tag]) {
      groups[tag] = [];
      tagOrder.push(tag);
    }
    groups[tag].push(projects[i]);
  }

  // --- Build a section for each tag group ---
  for (var t = 0; t < tagOrder.length; t++) {
    var tag = tagOrder[t];
    var items = groups[tag];

    var section = document.createElement('section');
    section.className = 'projects';

    var wrapper = document.createElement('div');
    wrapper.className = 'container';

    var heading = document.createElement('h2');
    heading.className = 'section-title reveal';
    heading.textContent = capitalize(tag) + 's';

    var grid = document.createElement('div');
    grid.className = 'project-grid reveal-stagger';

    for (var j = 0; j < items.length; j++) {
      grid.appendChild(buildCard(items[j]));
    }

    wrapper.appendChild(heading);
    wrapper.appendChild(grid);
    section.appendChild(wrapper);
    container.appendChild(section);
  }

  // --- Build a single project card wrapped in a 3D depth wrapper ---
  function buildCard(p) {
    // 3D wrapper holds both the back layer and the front card
    var wrapper = document.createElement('div');
    wrapper.className = 'card-3d-wrapper reveal';

    // Back silhouette layer (peeks out behind the card)
    var backLayer = document.createElement('div');
    backLayer.className = 'card-back-layer';

    // Front card (no .reveal — wrapper handles the reveal animation)
    var card = document.createElement('a');
    card.href = 'projects/project.html?id=' + encodeURIComponent(p.id);
    card.className = 'project-card';

    var imgTag = p.cardImage
      ? '<img src="' + escapeAttr(p.cardImage) + '" alt="' + escapeAttr(p.cardPlaceholder) + '" loading="lazy">'
      : '';

    card.innerHTML =
      '<div class="card-image" data-placeholder="' + escapeAttr(p.cardPlaceholder) + '">' + imgTag + '</div>' +
      '<div class="card-content">' +
        '<span class="card-tag ' + p.tag + '">' + capitalize(p.tag) + '</span>' +
        '<h3>' + escapeHtml(p.title) + '</h3>' +
        '<p>' + escapeHtml(p.shortDesc) + '</p>' +
      '</div>' +
      '<div class="card-footer">' +
        '<span class="card-play-btn" data-demo="' + escapeAttr(p.demoUrl) + '">&#9654; ' + escapeHtml(p.actionLabel) + '</span>' +
      '</div>';

    wrapper.appendChild(backLayer);
    wrapper.appendChild(card);
    return wrapper;
  }

  // --- Helper functions ---

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
})();
