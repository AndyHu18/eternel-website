/* ========================================
   ÉTERNEL — Animations
   Typewriter effects + FAB carousel
   ======================================== */

(function () {
  "use strict";

  /* ---- Hero Typewriter ---- */
  const logoText = document.querySelector(".logo-text[data-typewriter]");
  const logoSub = document.querySelector(
    ".logo-subtitle[data-typewriter-delay]",
  );

  function typewrite(el, text, speed, cb) {
    el.textContent = "";
    el.style.visibility = "visible";
    let i = 0;
    const cursor = document.createElement("span");
    cursor.className = "tw-cursor";
    el.appendChild(cursor);

    const timer = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => cursor.remove(), 1500);
        if (cb) cb();
      }
    }, speed);
  }

  if (logoText) {
    const fullText = logoText.getAttribute("data-typewriter");
    logoText.style.visibility = "hidden";
    if (logoSub) logoSub.style.visibility = "hidden";

    setTimeout(() => {
      typewrite(logoText, fullText, 120, () => {
        if (logoSub) {
          const subText = logoSub.textContent.trim();
          typewrite(logoSub, subText, 80);
        }
      });
    }, 600);
  }

  /* ---- Scroll Typewriter (Feature section) ---- */
  const scrollTypewriters = document.querySelectorAll(".typewriter-scroll");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
          entry.target.dataset.typed = "true";
          const lines = JSON.parse(entry.target.dataset.lines);
          typewriteLines(entry.target, lines, 90);
        }
      });
    },
    { threshold: 0.5 },
  );

  function typewriteLines(el, lines, speed) {
    el.textContent = "";
    let lineIdx = 0;

    function nextLine() {
      if (lineIdx >= lines.length) return;
      const text = lines[lineIdx];
      let charIdx = 0;

      if (lineIdx > 0) el.appendChild(document.createElement("br"));

      const cursor = document.createElement("span");
      cursor.className = "tw-cursor";
      el.appendChild(cursor);

      const timer = setInterval(() => {
        if (charIdx < text.length) {
          el.insertBefore(document.createTextNode(text[charIdx]), cursor);
          charIdx++;
        } else {
          clearInterval(timer);
          cursor.remove();
          lineIdx++;
          if (lineIdx < lines.length) {
            setTimeout(nextLine, 400);
          }
        }
      }, speed);
    }

    nextLine();
  }

  scrollTypewriters.forEach((el) => scrollObserver.observe(el));

  /* ---- FAB Carousel Label ---- */
  const fabLabelText = document.querySelector(".ring-fab-label-text");
  const fabLabel = document.querySelector(".ring-fab-label");

  const fabMessages = [
    "璀璨每一刻",
    "愛值得永恆",
    "珍藏你的愛",
    "奢華的承諾",
    "立即預約吧",
  ];

  let fabMsgIdx = 0;
  let fabVisible = false;

  function showFabOnScroll() {
    const wrapper = document.querySelector(".ring-fab-wrapper");
    if (!wrapper) return;

    if (window.scrollY > 300) {
      if (!fabVisible) {
        wrapper.classList.add("visible");
        fabVisible = true;
        startFabCarousel();
      }
    } else {
      wrapper.classList.remove("visible");
      fabVisible = false;
    }
  }

  function startFabCarousel() {
    typeFabMessage();
  }

  function typeFabMessage() {
    if (!fabLabelText || !fabLabel) return;

    const msg = fabMessages[fabMsgIdx % fabMessages.length];
    fabMsgIdx++;

    fabLabel.classList.add("typing");
    fabLabelText.textContent = "";

    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < msg.length) {
        fabLabelText.textContent += msg[i];
        i++;
      } else {
        clearInterval(typeTimer);
        // Hold for 2.5s then erase
        setTimeout(() => {
          eraseFabMessage(msg.length);
        }, 2500);
      }
    }, 80);
  }

  function eraseFabMessage(len) {
    if (!fabLabelText || !fabLabel) return;

    const eraseTimer = setInterval(() => {
      const current = fabLabelText.textContent;
      if (current.length > 0) {
        fabLabelText.textContent = current.slice(0, -1);
      } else {
        clearInterval(eraseTimer);
        fabLabel.classList.remove("typing");
        // Pause then type next
        setTimeout(() => {
          if (fabVisible) typeFabMessage();
        }, 1200);
      }
    }, 50);
  }

  window.addEventListener("scroll", showFabOnScroll, { passive: true });
  showFabOnScroll();
})();
