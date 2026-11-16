// Canan (Wipavee Pinyamuksapong) — 2026 Interactive Portfolio Logic

// Tool Dock Spotlight Data (5 Years Experience Context)
const TOOL_SPOTLIGHTS = {
  ai: {
    name: 'Adobe Illustrator (Ai)',
    badge: 'Vector & Brand CI',
    color: '#FF9A00',
    desc: 'Used across 5 years for custom vector mascots (Mooca states), campaign typography, brand logos, and scalable SVG UI assets.'
  },
  ps: {
    name: 'Adobe Photoshop (Ps)',
    badge: 'Key Visuals & Retouching',
    color: '#31A8FF',
    desc: 'Crafted high-converting promotional banners and social media campaigns for GSB มีที่ มีเงิน, Feel Great Now, Beauty Pro Japan, and Hometools.'
  },
  figma: {
    name: 'Figma',
    badge: 'Primary UX/UI & Prototyping',
    color: '#A259FF',
    desc: 'Core design tool for Sitemaps, Wireframes, 3-Option Mood & Tone client proposals (Petstopia), CPN 7-step Kiosk/Mobile flows, and interactive prototypes.'
  },
  wp: {
    name: 'WordPress CMS',
    badge: '5 Years Full-Stack Web',
    color: '#21759B',
    desc: 'End-to-end production deployment, custom theme configuration, multilingual setup, and security/speed optimization for 6+ live client websites.'
  },
  el: {
    name: 'Elementor Pro + HTML/CSS',
    badge: 'Responsive Frontend',
    color: '#FF7BE5',
    desc: 'Pixel-perfect responsive development translating Figma UI systems into interactive desktop, tablet, and mobile layouts with custom CSS animations.'
  },
  canva: {
    name: 'Canva',
    badge: 'Rapid Social & Deck Assets',
    color: '#00C4CC',
    desc: 'Fast-turnaround marketing templates, client presentation decks, and collaborative social media content systems.'
  },
  gpt: {
    name: 'ChatGPT & UX Copywriting',
    badge: 'AI-Assisted UX Research',
    color: '#10A37F',
    desc: 'Accelerated UX microcopy, bilingual Thai/English content structuring, and empathetic user-flow scenarios (such as Ooca Mind Check-in).'
  },
  gemini: {
    name: 'Google Gemini & SEO Workflow',
    badge: 'Design Engineering & SEO',
    color: '#6366F1',
    desc: 'Interactive web component prototyping, structured schema/SEO keyword mapping, and rapid front-end design engineering.'
  }
};

// Mooca Interactive States Data for Ooca Card
const MOOCA_STATES = {
  moon: {
    emoji: '🌙',
    title: 'Moon Dreamer · Deep Rest',
    thai: '“อยากนอนพักยาวๆ โดยไม่ต้องตั้งนาฬิกาปลุก”',
    summary: 'Reflects a mind carrying invisible fatigue that needs guilt-free rest and quiet recovery.',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
  },
  balloon: {
    emoji: '🎈',
    title: 'Balloon Explorer · Freedom',
    thai: '“อยากลองเดินทางไปที่ใหม่ๆ ที่ไม่เคยไป”',
    summary: 'Reflects a desire to step outside routine pressures and rediscover fresh inspiration.',
    gradient: 'linear-gradient(135deg, #0F766E 0%, #2DD4BF 100%)'
  },
  bench: {
    emoji: '🪑',
    title: 'Bench Break · Safe Pause',
    thai: '“อยากนั่งพักเงียบๆ ในที่ที่สบายใจ”',
    summary: 'Reflects the need for a calm, stable pause button amidst fast-paced daily demands.',
    gradient: 'linear-gradient(135deg, #B45309 0%, #FBBF24 100%)'
  },
  curious: {
    emoji: '✨',
    title: 'Curious Spark · Connection',
    thai: '“อยากพูดคุยแลกเปลี่ยนมุมมองใหม่ๆ”',
    summary: 'Reflects openness to meaningful conversation and gentle self-discovery.',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)'
  },
  heart: {
    emoji: '💖',
    title: 'Glowing Heart · Warm Care',
    thai: '“อยากใช้เวลาดูแลคนสำคัญรอบตัวและตัวเอง”',
    summary: 'Reflects emotional warmth, empathy, and nurturing energy ready to be shared.',
    gradient: 'linear-gradient(135deg, #9D174D 0%, #FB7185 100%)'
  }
};

// Smooth Scroll to Section + Highlight Pulse
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const drawer = document.getElementById('mobile-drawer');
  if (drawer && !drawer.classList.contains('hidden')) {
    drawer.classList.add('hidden');
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  target.classList.remove('section-highlight-pulse');
  void target.offsetWidth;
  target.classList.add('section-highlight-pulse');
}

// Toggle Mobile Navigation Drawer
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('hidden');
}

// Copy Contact Info with In-Page Toast
function copyTextToClipboard(text, label) {
  const showToast = (msg) => {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label}: ${text} ✨`);
    }).catch(() => {
      fallbackCopy(text, label, showToast);
    });
  } else {
    fallbackCopy(text, label, showToast);
  }
}

function fallbackCopy(text, label, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    cb(`Copied ${label}: ${text} ✨`);
  } catch (e) {
    cb(`${label}: ${text}`);
  }
  document.body.removeChild(ta);
}

// Interactive Tool Dock Selection in About Me
function selectToolDock(toolKey) {
  const info = TOOL_SPOTLIGHTS[toolKey];
  if (!info) return;

  document.querySelectorAll('.dock-icon').forEach((btn) => {
    btn.classList.toggle('active-tool', btn.getAttribute('data-tool') === toolKey);
  });

  const titleEl = document.getElementById('tool-spotlight-title');
  const badgeEl = document.getElementById('tool-spotlight-badge');
  const descEl = document.getElementById('tool-spotlight-desc');
  const dotEl = document.getElementById('tool-spotlight-dot');

  if (titleEl) titleEl.textContent = info.name;
  if (badgeEl) badgeEl.textContent = info.badge;
  if (descEl) descEl.textContent = info.desc;
  if (dotEl) dotEl.style.backgroundColor = info.color;
}

// CPN View Switcher (Both / Kiosk / Mobile)
function switchCpnView(mode) {
  const kioskWrap = document.getElementById('cpn-kiosk-wrap');
  const mobileWrap = document.getElementById('cpn-mobile-wrap');
  const divider = document.getElementById('cpn-divider');

  document.querySelectorAll('.cpn-tab-btn').forEach((btn) => {
    const active = btn.getAttribute('data-cpn') === mode;
    btn.className = active
      ? 'cpn-tab-btn px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white transition'
      : 'cpn-tab-btn px-3 py-1 rounded-full text-xs font-semibold bg-white text-zinc-700 border border-amber-200 hover:bg-amber-100 transition';
  });

  if (!kioskWrap || !mobileWrap || !divider) return;
  if (mode === 'kiosk') {
    kioskWrap.classList.remove('hidden');
    mobileWrap.classList.add('hidden');
    divider.classList.add('hidden');
  } else if (mode === 'mobile') {
    kioskWrap.classList.add('hidden');
    mobileWrap.classList.remove('hidden');
    divider.classList.add('hidden');
  } else {
    kioskWrap.classList.remove('hidden');
    mobileWrap.classList.remove('hidden');
    divider.classList.remove('hidden');
  }
}

// Ooca Mooca Interactive State Switcher
function selectMoocaState(stateKey) {
  const st = MOOCA_STATES[stateKey];
  if (!st) return;

  document.querySelectorAll('.mooca-state-btn').forEach((btn) => {
    const active = btn.getAttribute('data-mooca') === stateKey;
    btn.style.transform = active ? 'scale(1.18)' : 'scale(1)';
    btn.style.outline = active ? '2px solid #A3E635' : 'none';
  });

  const emojiEl = document.getElementById('mooca-active-emoji');
  const titleEl = document.getElementById('mooca-active-title');
  const thaiEl = document.getElementById('mooca-active-thai');
  const sumEl = document.getElementById('mooca-active-summary');
  const cardEl = document.getElementById('mooca-active-card');

  if (emojiEl) emojiEl.textContent = st.emoji;
  if (titleEl) titleEl.textContent = st.title;
  if (thaiEl) thaiEl.textContent = st.thai;
  if (sumEl) sumEl.textContent = st.summary;
  if (cardEl) cardEl.style.background = st.gradient;
}

// Petstopia Mood & Tone Proposal Highlight Filter
function highlightMoodOption(optKey) {
  document.querySelectorAll('.mood-opt-card').forEach((card) => {
    const key = card.getAttribute('data-mood');
    if (optKey === 'all' || key === optKey) {
      card.classList.remove('opacity-40', 'scale-95');
      card.classList.add('opacity-100', 'scale-100', 'ring-2', 'ring-blue-600');
      if (optKey === 'all') card.classList.remove('ring-2', 'ring-blue-600');
    } else {
      card.classList.add('opacity-40', 'scale-95');
      card.classList.remove('opacity-100', 'scale-100', 'ring-2', 'ring-blue-600');
    }
  });

  document.querySelectorAll('.mood-filter-btn').forEach((btn) => {
    const active = btn.getAttribute('data-mood-btn') === optKey;
    btn.className = active
      ? 'mood-filter-btn px-3 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white transition'
      : 'mood-filter-btn px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition';
  });
}

// Live WordPress & E-Commerce Website Filter
function filterWebsites(category) {
  document.querySelectorAll('.web-site-card').forEach((card) => {
    const cat = card.getAttribute('data-web-cat');
    if (category === 'all' || cat === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  document.querySelectorAll('.web-filter-btn').forEach((btn) => {
    const active = btn.getAttribute('data-web-filter') === category;
    btn.className = active
      ? 'web-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-zinc-900 text-white shadow-sm transition'
      : 'web-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-800 border border-zinc-900 hover:bg-amber-100 transition';
  });
}

// Lightbox Case-Study Inspection Modal (Reads image src by DOM element ID so base64 is never duplicated!)
function openLightboxModal(title, subtitle, desc, imgElemId, liveUrl) {
  const modal = document.getElementById('lightbox-modal');
  const titleEl = document.getElementById('lightbox-title');
  const subEl = document.getElementById('lightbox-subtitle');
  const descEl = document.getElementById('lightbox-desc');
  const imgEl = document.getElementById('lightbox-img');
  const linkEl = document.getElementById('lightbox-live-link');
  const srcImg = document.getElementById(imgElemId);

  if (!modal) return;
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;
  if (descEl) descEl.textContent = desc;
  if (imgEl && srcImg) {
    imgEl.src = srcImg.src;
    imgEl.alt = title;
  }
  if (linkEl) {
    if (liveUrl) {
      linkEl.href = liveUrl;
      linkEl.classList.remove('hidden');
    } else {
      linkEl.classList.add('hidden');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Initialize Scroll Reveal, Scroll-Spy Navbar, and Hero Mouse Parallax
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const sections = ['sec-about', 'sec-folders', 'sec-uxui', 'sec-sitemap', 'sec-wordpress', 'sec-graphics'];
  const backBtn = document.getElementById('floating-folders-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (backBtn) {
      if (scrollY > 900) {
        backBtn.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
        backBtn.classList.add('translate-y-0', 'opacity-100');
      } else {
        backBtn.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        backBtn.classList.remove('translate-y-0', 'opacity-100');
      }
    }

    let currentSec = 'sec-folders';
    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el && scrollY >= el.offsetTop - 240) {
        currentSec = secId;
      }
    });

    document.querySelectorAll('.nav-item-link').forEach((link) => {
      const target = link.getAttribute('data-nav-target');
      link.classList.toggle('active-nav', target === currentSec);
    });
  }, { passive: true });

  const heroSec = document.getElementById('sec-top');
  if (heroSec) {
    heroSec.addEventListener('mousemove', (e) => {
      const rect = heroSec.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      document.querySelectorAll('.parallax-layer').forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '14');
        layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightboxModal();
  });
});

window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.copyTextToClipboard = copyTextToClipboard;
window.selectToolDock = selectToolDock;
window.switchCpnView = switchCpnView;
window.selectMoocaState = selectMoocaState;
window.highlightMoodOption = highlightMoodOption;
window.filterWebsites = filterWebsites;
window.openLightboxModal = openLightboxModal;
window.closeLightboxModal = closeLightboxModal;
