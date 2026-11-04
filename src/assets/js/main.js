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
