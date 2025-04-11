"use strict";

const utils = {
  smoothScrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start * (1 - easeInOutCubic));

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  },
};

// ハンバーガーメニュー
const hamburgerMenu = (() => {
  const init = () => {
    const button = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".navListItem a");

    if (button && nav) {
      button.addEventListener("click", toggleMenu);

      navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }

    function toggleMenu() {
      button.classList.toggle("open");
      nav.classList.toggle("open");
    }

    function closeMenu() {
      button.classList.remove("open");
      nav.classList.remove("open");
    }
  };

  return { init };
})();

// スクロールトップボタン
const scrollTopButton = (() => {
  const init = () => {
    const pageTopBtn = document.getElementById("js-scroll-top");

    if (pageTopBtn) {
      window.addEventListener("scroll", () => {
        const currentY = window.pageYOffset;
        requestAnimationFrame(() => {
          if (currentY > 500) {
            pageTopBtn.style.opacity = 1;
            pageTopBtn.classList.remove("is-hide");
          } else {
            pageTopBtn.style.opacity = 0;
            pageTopBtn.classList.add("is-hide");
          }
        });
      });

      pageTopBtn.addEventListener("click", () => {
        utils.smoothScrollToTop(200);
      });
    }
  };

  return { init };
})();

// フローティングCTAボタン
const floatingCtaButton = (() => {
  const init = () => {
    const ctaBlockLink = document.querySelector(".ctaBlockLink");
    const footer = document.querySelector("footer");

    if (ctaBlockLink) {
      window.addEventListener("scroll", handleScroll);

      ctaBlockLink.addEventListener("click", (e) => {
        console.log("CTAリンクがクリックされました");
      });
    }

    function handleScroll() {
      const currentY = window.pageYOffset;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth < 769) {
        if (currentY > 2300) {
          ctaBlockLink.style.opacity = "1";
        } else {
          ctaBlockLink.style.opacity = "0";
        }

        if (footer) {
          const footerOffsetTop = footer.offsetTop;
          if (currentY + windowHeight >= footerOffsetTop - 100) {
            ctaBlockLink.style.opacity = "0";
          }
        }
      }
    }
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  hamburgerMenu.init();
  scrollTopButton.init();
  floatingCtaButton.init();
});
