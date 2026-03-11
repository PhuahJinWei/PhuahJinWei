/**
 * search.js — Filter project cards by search query
 *
 * Matches against project title, shortDesc, and tag.
 * Hides non-matching cards and collapses empty sections.
 *
 * Must be loaded AFTER card-renderer.js (cards must exist in DOM).
 */
(function () {
  'use strict';

  var input = document.getElementById('project-search');
  var clearBtn = document.getElementById('search-clear');
  var container = document.getElementById('projects-container');
  if (!input || !container || !window.PROJECTS) return;

  var noResults = null; // lazy-created "no results" message

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();

    // Toggle clear button visibility
    if (clearBtn) {
      clearBtn.classList.toggle('visible', query.length > 0);
    }

    filter(query);
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      clearBtn.classList.remove('visible');
      filter('');
      input.focus();
    });
  }

  function filter(query) {
    var cards = container.querySelectorAll('.project-card');
    var sections = container.querySelectorAll('.projects');
    var anyVisible = false;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];

      // Extract searchable text from the card's data attribute
      var href = card.getAttribute('href') || '';
      var idMatch = href.match(/[?&]id=([^&]+)/);
      var projectId = idMatch ? decodeURIComponent(idMatch[1]) : '';
      var project = projectId ? window.getProjectById(projectId) : null;

      var match = true;

      if (query && project) {
        var haystack = (
          project.title + ' ' +
          project.shortDesc + ' ' +
          project.tag
        ).toLowerCase();

        match = haystack.indexOf(query) !== -1;
      } else if (query && !project) {
        // Fallback: match against visible text
        var text = (card.textContent || '').toLowerCase();
        match = text.indexOf(query) !== -1;
      }

      // Toggle on wrapper (hides both back-layer and card)
      var cardWrapper = card.closest('.card-3d-wrapper');
      if (cardWrapper) {
        cardWrapper.classList.toggle('search-hidden', !match);
      } else {
        card.classList.toggle('search-hidden', !match);
      }
      if (match) anyVisible = true;
    }

    // Hide sections that have zero visible cards
    for (var s = 0; s < sections.length; s++) {
      var visibleCards = sections[s].querySelectorAll('.card-3d-wrapper:not(.search-hidden)');
      sections[s].classList.toggle('section-hidden', visibleCards.length === 0);
    }

    // Show / hide "no results" message
    if (!anyVisible && query) {
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.className = 'search-no-results';
        container.appendChild(noResults);
      }
      noResults.textContent = 'No projects found for "' + query + '"';
      noResults.style.display = '';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  }
})();
