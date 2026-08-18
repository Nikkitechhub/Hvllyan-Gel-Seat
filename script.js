/* ==========================================================
   HVLLYAN LANDING PAGE — script.js
   ONLY edit the line below to update every Amazon button
   on the entire site. Do not add any other Amazon URL
   anywhere in index.html, style.css, or this file.
   ========================================================== */

const AMAZON_AFFILIATE_LINK = "PASTE_YOUR_AMAZON_AFFILIATE_LINK_HERE";

function openAmazon() {
  window.open(AMAZON_AFFILIATE_LINK, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Wire every Amazon CTA to the single link ---------- */
  document.querySelectorAll(".js-amazon").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openAmazon();
    });
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = mobileNav.classList.toggle("is-open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      hamburgerBtn.classList.toggle("is-active", isOpen);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Hero product gallery ---------- */
  const mainImage = document.getElementById("mainImage");
  const galleryThumbs = document.getElementById("galleryThumbs");

  if (mainImage && galleryThumbs) {
    const thumbs = galleryThumbs.querySelectorAll(".thumb");

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        const newSrc = thumb.getAttribute("data-src");
        if (!newSrc) return;

        mainImage.style.opacity = "0";

        window.setTimeout(function () {
          mainImage.src = newSrc;
          mainImage.style.opacity = "1";
        }, 120);

        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });

    mainImage.style.transition = "opacity .18s ease";
  }

  /* ---------- FAQ accordion ---------- */
  const accordion = document.getElementById("accordion");

  if (accordion) {
    const triggers = accordion.querySelectorAll(".accordion-trigger");

    triggers.forEach(function (trigger) {
      const item = trigger.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      panel.style.maxHeight = "0px";

      trigger.addEventListener("click", function () {
        const isOpen = item.classList.contains("is-open");

        // close all other items
        accordion.querySelectorAll(".accordion-item.is-open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
            openItem.querySelector(".accordion-panel").style.maxHeight = "0px";
          }
        });

        if (isOpen) {
          item.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
          panel.style.maxHeight = "0px";
        } else {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Product video fallback ---------- */
  const productVideo = document.getElementById("productVideo");
  const videoFallback = document.getElementById("videoFallback");

  if (productVideo && videoFallback) {
    const showFallback = function () {
      productVideo.style.display = "none";
      videoFallback.style.display = "flex";
    };

    productVideo.addEventListener("error", showFallback);

    // If the source itself 404s, the <source> element fires 'error' on the video too,
    // but as a safety net also check readiness shortly after load.
    window.setTimeout(function () {
      if (productVideo.readyState === 0 && productVideo.networkState === 3) {
        showFallback();
      }
    }, 800);
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 12) {
        header.style.boxShadow = "0 6px 20px rgba(31,58,46,0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    }, { passive: true });
  }

});
