(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var sheet = document.querySelector(".mobile-sheet");

  function setScrolled() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else if (!header.classList.contains("is-open")) {
      header.classList.remove("is-scrolled");
    }
  }

  if (header) {
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  function closeMenu() {
    if (!header || !sheet || !toggle) return;
    header.classList.remove("is-open");
    sheet.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setScrolled();
  }

  function openMenu() {
    if (!header || !sheet || !toggle) return;
    header.classList.add("is-open");
    sheet.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var firstLink = sheet.querySelector("a");
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  if (toggle && sheet) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    sheet.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // Scroll-reveal: fade/rise elements into place once, honoring reduced motion.
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll("[data-reveal]");

  if (revealTargets.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-revealed"); });
  }

  // Testimonial carousel: simple, accessible, dot-driven.
  var carousel = document.querySelector("[data-testimonial-carousel]");
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-slide]"));
    var dotsWrap = carousel.querySelector("[data-dots]");
    var index = 0;

    if (dotsWrap && slides.length > 1) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Show testimonial " + (i + 1) + " of " + slides.length);
        if (i === 0) dot.setAttribute("aria-current", "true");
        dot.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(next) {
      slides[index].classList.remove("is-active");
      if (dotsWrap) dotsWrap.children[index].removeAttribute("aria-current");
      index = next;
      slides[index].classList.add("is-active");
      if (dotsWrap) dotsWrap.children[index].setAttribute("aria-current", "true");
    }

    if (slides.length) slides[0].classList.add("is-active");
  }

  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
