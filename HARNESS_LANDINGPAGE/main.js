/* Harness Engineering Landing Page — main.js */

const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const header = document.getElementById("site-header");
const hamburger = document.getElementById("hamburger");
const siteNav = document.getElementById("site-nav");
const navOverlay = document.getElementById("nav-overlay");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
);

reveals.forEach((el) => {
  const siblings = [...el.parentElement.querySelectorAll(".reveal")];
  const sibIndex = siblings.indexOf(el);
  el.style.transitionDelay = `${Math.min(sibIndex * 80, 280)}ms`;
  revealObserver.observe(el);
});

const setActiveSection = () => {
  const offset = window.scrollY + 220;
  let activeId = "";

  for (const section of sections) {
    if (offset >= section.offsetTop) {
      activeId = section.id;
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === `#${activeId}`);
  });
};

window.addEventListener("scroll", setActiveSection, { passive: true });
window.addEventListener("load", setActiveSection);

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("scrolled", window.scrollY > 20),
  { passive: true },
);

const toggleMenu = (forceOpen) => {
  const willOpen = forceOpen ?? !hamburger.classList.contains("is-open");

  hamburger.classList.toggle("is-open", willOpen);
  hamburger.setAttribute("aria-expanded", String(willOpen));
  siteNav.classList.toggle("is-open", willOpen);
  navOverlay.classList.toggle("is-open", willOpen);
  navOverlay.setAttribute("aria-hidden", String(!willOpen));
  document.body.classList.toggle("menu-open", willOpen);
};

hamburger?.addEventListener("click", () => toggleMenu());
navOverlay?.addEventListener("click", () => toggleMenu(false));

navLinks.forEach((link) =>
  link.addEventListener("click", () => toggleMenu(false)),
);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && hamburger?.classList.contains("is-open")) {
    toggleMenu(false);
    hamburger.focus();
  }
});

const statValues = document.querySelectorAll(".stat-value[data-target]");

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = target * eased;
    const display =
      decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
    el.textContent = display + suffix;

    if (elapsed < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 },
);

statValues.forEach((el) => counterObserver.observe(el));
