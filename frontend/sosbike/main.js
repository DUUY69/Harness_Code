/* ============================================================
   SOSBIKE Landing Page — main.js
   ============================================================ */

// ---- Elements ----
const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const header = document.getElementById("site-header");
const hamburger = document.getElementById("hamburger");
const siteNav = document.getElementById("site-nav");
const navOverlay = document.getElementById("nav-overlay");
const blogGrid = document.getElementById("blog-grid");
const blogStatus = document.getElementById("blog-status");
const blogDetailCache = new Map();

const apiBaseUrl = (() => {
  if (
    window.SOSBIKE_API_BASE_URL &&
    typeof window.SOSBIKE_API_BASE_URL === "string"
  ) {
    return window.SOSBIKE_API_BASE_URL.replace(/\/$/, "");
  }
  if (
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "https://api.sosbike.io.vn/api";
  }
  // Mặc định khi deploy lên Vercel/Production (Dùng HTTPS ngrok để tránh lỗi Mixed Content)
  return "https://api.sosbike.io.vn/api";
})();

// ============================================================
// REVEAL ON SCROLL
// ============================================================
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

reveals.forEach((el, i) => {
  // Stagger siblings within the same parent container
  const siblings = [...el.parentElement.querySelectorAll(".reveal")];
  const sibIndex = siblings.indexOf(el);
  el.style.transitionDelay = `${Math.min(sibIndex * 80, 280)}ms`;
  revealObserver.observe(el);
});

// ============================================================
// ACTIVE NAV SECTION HIGHLIGHT
// ============================================================
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

// ============================================================
// HEADER SCROLL STATE
// ============================================================
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 20),
  { passive: true },
);

// ============================================================
// HAMBURGER MENU
// ============================================================
const toggleMenu = (forceOpen) => {
  const willOpen = forceOpen ?? !hamburger.classList.contains("is-open");

  hamburger.classList.toggle("is-open", willOpen);
  hamburger.setAttribute("aria-expanded", String(willOpen));
  siteNav.classList.toggle("is-open", willOpen);
  navOverlay.classList.toggle("is-open", willOpen);
  navOverlay.setAttribute("aria-hidden", String(!willOpen));
  document.body.classList.toggle("menu-open", willOpen);
};

hamburger.addEventListener("click", () => toggleMenu());
navOverlay.addEventListener("click", () => toggleMenu(false));

// Close menu when a nav link is clicked
navLinks.forEach((link) =>
  link.addEventListener("click", () => toggleMenu(false)),
);

// Close menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && hamburger.classList.contains("is-open")) {
    toggleMenu(false);
    hamburger.focus();
  }
});

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
const statValues = document.querySelectorAll(".stat-value[data-target]");

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const duration = 1800; // ms
  const start = performance.now();

  const tick = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
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

// ============================================================
// BLOG CONTENT FROM API
// ============================================================
const formatBlogDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const escapeText = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

const createBlogModal = () => {
  const overlay = document.createElement("div");
  overlay.className = "blog-modal";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="blog-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="blog-modal-title">
      <button class="blog-modal__close" type="button" aria-label="Đóng bài viết">×</button>
      <div class="blog-modal__meta"></div>
      <h3 id="blog-modal-title" class="blog-modal__title"></h3>
      <div class="blog-modal__summary"></div>
      <div class="blog-modal__image"></div>
      <div class="blog-modal__content"></div>
    </div>
  `;

  const dialog = overlay.querySelector(".blog-modal__dialog");
  const closeBtn = overlay.querySelector(".blog-modal__close");
  const meta = overlay.querySelector(".blog-modal__meta");
  const title = overlay.querySelector(".blog-modal__title");
  const summary = overlay.querySelector(".blog-modal__summary");
  const image = overlay.querySelector(".blog-modal__image");
  const content = overlay.querySelector(".blog-modal__content");

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("blog-modal-open");
  };

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  closeBtn.addEventListener("click", close);
  dialog.addEventListener("click", (event) => event.stopPropagation());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      close();
    }
  });

  document.body.appendChild(overlay);

  return { overlay, meta, title, summary, image, content, close };
};

const blogModal = createBlogModal();

const renderBlogCards = (items) => {
  if (!blogGrid) return;
  const cards = items
    .slice(0, 6)
    .map((item) => {
      const title = escapeText(item.title);
      const summary = escapeText(item.summary);
      const category = escapeText(item.category || "Blog");
      const publishedAt = formatBlogDate(item.publishedat);
      const viewCountText =
        item.viewCount !== undefined
          ? ` • 👁️ ${item.viewCount.toLocaleString()}`
          : "";
      const image = item.coverimageurl
        ? ` style="background-image:url('${encodeURI(item.coverimageurl)}')"`
        : "";
      const imageClass = item.coverimageurl
        ? "blog-card reveal is-featured"
        : "blog-card reveal";
      return `
      <article class="${imageClass}">
        <div class="blog-thumb"${image} aria-hidden="true">${item.coverimageurl ? "" : "📝"}</div>
        <span class="blog-meta">${category}${publishedAt ? ` • ${publishedAt}` : ""}${viewCountText}</span>
        <h3>${title}</h3>
        <p>${summary}</p>
        <button class="blog-read-more" type="button" data-blog-slug="${escapeText(item.slug)}">
          Đọc thêm
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </article>
    `;
    })
    .join("");

  blogGrid.innerHTML =
    cards ||
    `
    <article class="blog-card reveal">
      <div class="blog-thumb" aria-hidden="true">📝</div>
      <span class="blog-meta">Blog</span>
      <h3>Chưa có bài viết nào</h3>
      <p>Hãy quay lại sau khi Admin đăng bài.</p>
    </article>
  `;

  blogGrid.querySelectorAll(".reveal").forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 80, 280)}ms`;
    revealObserver.observe(el);
  });
};

const getOrCreateVisitorId = () => {
  let visitorId = localStorage.getItem("sosbike_blog_visitor_id");
  if (!visitorId) {
    visitorId =
      "visitor-" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("sosbike_blog_visitor_id", visitorId);
  }
  return visitorId;
};

const trackBlogView = async (slug) => {
  try {
    const visitorId = getOrCreateVisitorId();
    const payload = {
      source: "LANDING_PAGE",
      visitorId: visitorId,
      referrerUrl: document.referrer || window.location.href,
      userAgent: navigator.userAgent,
    };

    const response = await fetch(
      `${apiBaseUrl}/blogs/${encodeURIComponent(slug)}/view`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      console.warn(`Failed to track view for ${slug}: HTTP ${response.status}`);
    }
  } catch (error) {
    console.warn(`Error tracking view for ${slug}`, error);
  }
};

const openBlogDetail = async (slug) => {
  if (!slug) return;

  blogModal.meta.textContent = "Đang tải bài viết...";
  blogModal.title.textContent = "";
  blogModal.summary.innerHTML = "";
  blogModal.image.innerHTML = "";
  blogModal.content.innerHTML = "";
  blogModal.overlay.classList.add("is-open");
  blogModal.overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("blog-modal-open");

  // Track and increment the view count on the server
  await trackBlogView(slug);

  try {
    // Fetch fresh blog details from server to reflect the incremented view count
    const response = await fetch(
      `${apiBaseUrl}/blogs/${encodeURIComponent(slug)}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const detail = await response.json();
    blogDetailCache.set(slug, detail);

    const viewCountText =
      detail.viewCount !== undefined && detail.viewCount !== null
        ? ` • 👁️ ${detail.viewCount.toLocaleString()} lượt xem`
        : "";
    blogModal.meta.textContent = `${detail.category || "Blog"}${detail.publishedat ? ` • ${formatBlogDate(detail.publishedat)}` : ""}${viewCountText}`;
    blogModal.title.textContent = detail.title || "Bài viết";
    blogModal.summary.textContent = detail.summary || "";
    blogModal.image.innerHTML = detail.coverimageurl
      ? `<img src="${encodeURI(detail.coverimageurl)}" alt="${escapeText(detail.title)}">`
      : "";
    blogModal.content.innerHTML =
      detail.content || `<p>${escapeText(detail.summary || "")}</p>`;

    // Dynamically update the view count text of the corresponding card in the main blog grid
    const trigger = blogGrid?.querySelector(`[data-blog-slug="${slug}"]`);
    if (trigger) {
      const card = trigger.closest(".blog-card");
      if (card) {
        const metaSpan = card.querySelector(".blog-meta");
        if (
          metaSpan &&
          detail.viewCount !== undefined &&
          detail.viewCount !== null
        ) {
          const publishedAt = formatBlogDate(detail.publishedat);
          const category = escapeText(detail.category || "Blog");
          const cardViewCountText = ` • 👁️ ${detail.viewCount.toLocaleString()}`;
          metaSpan.innerHTML = `${category}${publishedAt ? ` • ${publishedAt}` : ""}${cardViewCountText}`;
        }
      }
    }
  } catch (error) {
    blogModal.meta.textContent = "Không tải được bài viết";
    blogModal.title.textContent = "Đã xảy ra lỗi";
    blogModal.summary.textContent = `Vui lòng thử lại sau. (Chi tiết: ${error.message} - URL: ${apiBaseUrl}/blogs/${encodeURIComponent(slug)})`;
    blogModal.content.innerHTML = "";
    console.warn("Failed to load blog detail", error);
  }
};

const loadBlogs = async () => {
  if (!blogGrid) return;
  if (blogStatus) blogStatus.textContent = "Đang tải bài viết...";

  try {
    const response = await fetch(`${apiBaseUrl}/blogs?page=1&pageSize=6`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.items) ? payload.items : [];
    if (items.length > 0) {
      renderBlogCards(items);
      if (blogStatus)
        blogStatus.textContent = `Đang hiển thị ${items.length} bài viết mới nhất.`;
    } else if (blogStatus) {
      blogStatus.textContent = "Chưa có bài viết được xuất bản.";
    }
  } catch (error) {
    if (blogStatus) {
      blogStatus.textContent =
        "Không tải được blog từ API, đang dùng nội dung mẫu.";
    }
    console.warn("Failed to load blogs", error);
  }
};

window.addEventListener("load", loadBlogs);

if (blogGrid) {
  blogGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-blog-slug]");
    if (!trigger) return;
    event.preventDefault();
    openBlogDetail(trigger.getAttribute("data-blog-slug"));
  });
}
