/* Yentrans — minimal progressive enhancement. No dependencies.
   Everything here is additive: with JS off the site still reads and navigates. */
(function () {
  // Mega panel. The markup ships with [hidden], so with JS off the panel simply
  // never opens and the primary nav plus the footer still reach every page.
  var menuBtn = document.getElementById('menu-btn');
  var mega = document.getElementById('mega');

  if (menuBtn && mega) {
    var setMega = function (open) {
      mega.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('mega-open', open);
    };

    menuBtn.addEventListener('click', function () {
      setMega(mega.hidden);
      if (!mega.hidden) {
        var first = mega.querySelector('a');
        if (first) first.focus();
      }
    });

    // Escape closes and returns focus to the trigger, so keyboard users are not
    // stranded inside the panel.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mega.hidden) { setMega(false); menuBtn.focus(); }
    });

    // A click anywhere outside the panel or the trigger closes it.
    document.addEventListener('click', function (e) {
      if (mega.hidden) return;
      if (mega.contains(e.target) || menuBtn.contains(e.target)) return;
      setMega(false);
    });

    // Following a link inside the panel should not leave it open behind the
    // next page in browsers that restore scroll position from bfcache.
    mega.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMega(false);
    });

    // Focus leaving the panel entirely closes it.
    mega.addEventListener('focusout', function (e) {
      if (!mega.contains(e.relatedTarget) && e.relatedTarget !== menuBtn) setMega(false);
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

/* ---------------------------------------------------------------------------
   Quote enquiry form.

   Two modes, decided by data-endpoint:
     true  — POST to the configured endpoint. A success message appears ONLY
             after the server returns ok. Any other outcome is reported as a
             failure, because the enquiry was not stored.
     false — no endpoint is provisioned, so the form composes the enquiry into
             the visitor's own mail client. The page says so before they start,
             and the confirmation wording describes exactly that: the message is
             ready to send, not sent. Nothing claims a submission that did not
             happen, and nothing is stored on this site.
--------------------------------------------------------------------------- */
(function () {
  var form = document.getElementById("quote-form");
  if (!form) return;
  var status = document.getElementById("quote-status");

  var LABELS = {
    name: "Name", email: "Email", company: "Company", phone: "Phone",
    origin: "Origin", destination: "Destination", cargo: "Cargo",
    shipmentType: "Shipment type", equipment: "Container type / quantity",
    weight: "Gross weight / volume", readyDate: "Ready date", notes: "Handling requirements",
  };

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = "form-status is-" + kind;
  }

  function firstInvalid() {
    var fields = form.querySelectorAll("[required]");
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var bad = f.type === "checkbox" ? !f.checked : !String(f.value).trim();
      if (!bad && f.type === "email") bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      if (bad) return f;
    }
    return null;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var bad = firstInvalid();
    if (bad) {
      setStatus("Please complete the highlighted field before submitting.", "error");
      bad.setAttribute("aria-invalid", "true");
      bad.focus();
      return;
    }
    form.querySelectorAll("[aria-invalid]").forEach(function (f) { f.removeAttribute("aria-invalid"); });

    var data = new FormData(form);
    var endpointEnabled = form.dataset.endpoint === "true";

    if (!endpointEnabled) {
      var lines = [];
      Object.keys(LABELS).forEach(function (k) {
        var v = (data.get(k) || "").toString().trim();
        if (v) lines.push(LABELS[k] + ": " + v);
      });
      var href = "mailto:" + form.dataset.mailto +
        "?subject=" + encodeURIComponent("Rate enquiry — " + (data.get("origin") || "") + " to " + (data.get("destination") || "")) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      setStatus(
        "Your email application should now be open with these details filled in. " +
        "The enquiry reaches us once you send that message — it has not been submitted from this page.",
        "info"
      );
      return;
    }

    setStatus("Sending your enquiry…", "info");
    fetch(form.dataset.endpoint, { method: "POST", body: data })
      .then(function (res) {
        if (!res.ok) throw new Error("rejected");
        setStatus(
          "Thank you. Your enquiry has been received. Our team will review the details and " +
          "respond using the contact information you provided.", "ok");
        form.reset();
      })
      .catch(function () {
        setStatus(
          "We couldn't send your enquiry just now. Please try again or use a verified contact " +
          "method listed on this page.", "error");
      });
  });
})();


/* ---------------------------------------------------------------------------
   Rate-starter handoff. The hero widget is a GET form, so a visitor arrives at
   /request-a-quote/ with ?origin=&destination=&shipmentType= already set. Copy
   those into the full form so nobody retypes what they just entered, and move
   focus to the first still-empty field.

   Only lane details are read. Nothing personal is ever put in a URL, so there
   is nothing personal here to restore.
--------------------------------------------------------------------------- */
(function () {
  var form = document.getElementById("quote-form");
  if (!form || !window.URLSearchParams) return;

  var params = new URLSearchParams(window.location.search);
  var carried = ["origin", "destination", "shipmentType"];
  var filled = 0;

  carried.forEach(function (key) {
    var value = (params.get(key) || "").trim();
    if (!value) return;
    var field = form.elements[key];
    if (!field) return;

    if (field.tagName === "SELECT") {
      // Only accept a value the select actually offers, so a hand-edited URL
      // cannot inject an arbitrary string into the enquiry.
      var ok = Array.prototype.some.call(field.options, function (o) {
        return o.value === value || o.text === value;
      });
      if (!ok) return;
    }
    field.value = value;
    filled++;
  });

  if (!filled) return;
  var next = form.querySelector("input[required]:placeholder-shown, input[required][value='']") ||
             form.elements.name;
  if (next && typeof next.focus === "function") next.focus({ preventScroll: true });
})();
