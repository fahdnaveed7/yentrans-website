/* Yentrans — minimal progressive enhancement. No dependencies.
   Everything here is additive: with JS off the site still reads and navigates. */
(function () {
  // Mobile navigation
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Some browsers hold back autoplay even on a muted, playsinline video.
  // Nudge each one once; if the policy still refuses, the poster frame stands in
  // and nothing breaks.
  var vids = document.querySelectorAll('video[autoplay]');
  for (var v = 0; v < vids.length; v++) {
    (function (vid) {
      var p = vid.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    })(vids[v]);
  }

  // Scroll reveal. Respects prefers-reduced-motion by simply revealing everything,
  // and degrades to visible content if IntersectionObserver is unavailable.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el, idx) {
    // Small stagger so a row of cards resolves in sequence rather than as a block.
    el.style.transitionDelay = ((idx % 4) * 70) + 'ms';
    io.observe(el);
  });

  // Safety net. If anything is still hidden shortly after load, reveal it: a
  // blank section is far worse than a missed animation.
  window.addEventListener('load', function () {
    setTimeout(function () {
      for (var j = 0; j < items.length; j++) {
        var r = items[j].getBoundingClientRect();
        if (r.top < window.innerHeight * 1.5) items[j].classList.add('in');
      }
    }, 400);
  });
})();
