/**
 * project-renderer.js — Populate project detail template from data
 *
 * Reads ?id= from the URL, looks up the project in window.PROJECTS,
 * and fills in all DOM elements. Redirects to index if project not found.
 *
 * Must be loaded AFTER projects-data.js and BEFORE tilt/scroll-reveal/
 * transitions scripts.
 */
(function () {
  'use strict';

  // Read the project ID from URL query parameter
  var params = new URLSearchParams(window.location.search);
  var projectId = params.get('id');

  // Look up project data
  var project = projectId ? window.getProjectById(projectId) : null;

  if (!project) {
    // Unknown project — redirect back to the index page
    window.location.replace('../index.html');
    return;
  }

  // Update page title
  document.title = project.title + ' | Phuah Jin Wei';

  // Populate hero image placeholder (and inject image if cardImage exists)
  var hero = document.getElementById('project-hero');
  if (hero) {
    hero.setAttribute('data-placeholder', project.heroPlaceholder);
    if (project.cardImage) {
      var img = document.createElement('img');
      img.src = project.cardImage;
      img.alt = project.heroPlaceholder;
      img.loading = 'lazy';
      hero.appendChild(img);
    }
  }

  // Populate title
  var titleEl = document.getElementById('project-title');
  if (titleEl) {
    titleEl.textContent = project.title;
  }

  // Populate tag (add the tag-type class for styling)
  var tagEl = document.getElementById('project-tag');
  if (tagEl) {
    tagEl.classList.add(project.tag);
    tagEl.textContent = project.tag.charAt(0).toUpperCase() + project.tag.slice(1);
  }

  // Populate descriptions
  var descEN = document.getElementById('project-desc-en');
  if (descEN) {
    descEN.textContent = project.descEN;
  }

  var descJP = document.getElementById('project-desc-jp');
  if (descJP) {
    descJP.textContent = project.descJP;
  }

  // Populate links
  var demoLink = document.getElementById('project-demo-link');
  if (demoLink) {
    demoLink.href = project.demoUrl;
  }

  var sourceLink = document.getElementById('project-source-link');
  if (sourceLink) {
    sourceLink.href = project.sourceUrl;
  }
})();
