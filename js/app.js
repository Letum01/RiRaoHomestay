/* ==========================================================
   APP.JS – Rì Rào Homestay
   Main app initialization: scroll reveal, nav, mobile menu
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
  initMobileNav();
  initSmoothScroll();
  initActiveNavLinks();
});

/* ── Scroll Reveal (IntersectionObserver) ─────────────────── */

function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe all elements with reveal classes
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* ── Header Scroll Effect ────────────────────────────────── */

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = window.pageYOffset;
  const SCROLL_TOP_THRESHOLD = 60; // qua ngưỡng này thì header có nền mờ/blur
  const HIDE_OFFSET           = 300; // chỉ ẩn header khi cuộn sâu hơn mức này
  const HIDE_DELTA            = 10;  // ngưỡng rung – chống giật khi kéo thanh cuộn chậm

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Nền mờ/blur khi rời khỏi hero
    header.classList.toggle('scrolled', currentScroll > SCROLL_TOP_THRESHOLD);
    
    // Ẩn/hiện mượt bằng CLASS thay vì inline transform.
    // (Inline transform biến header thành containing block của position:fixed
    //  bên trong → menu drawer bị trôi theo header – lỗi khi kéo thả.)
    const delta    = currentScroll - lastScroll;
    const menuOpen = document.body.classList.contains('nav-open');

    if (menuOpen) {
      header.classList.remove('header--hidden');
    } else if (delta > HIDE_DELTA && currentScroll > HIDE_OFFSET) {
      header.classList.add('header--hidden');
    } else if (delta < -HIDE_DELTA || currentScroll <= HIDE_OFFSET) {
      header.classList.remove('header--hidden');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ── Mobile Navigation ───────────────────────────────────── */

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  
  if (!hamburger || !nav) return;
  
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
  
  // Close nav when clicking on a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Đóng drawer khi quay về chế độ desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      closeMobileNav();
    }
  });
}

function openMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  
  nav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.innerHTML = '<i class="ph ph-x"></i>';

  // Ép header luôn hiển thị khi menu đang mở để drawer (position:fixed) neo đúng viewport
  const header = document.getElementById('header');
  if (header) header.classList.remove('header--hidden');
  document.body.classList.add('nav-open');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  
  nav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<i class="ph ph-list"></i>';
  document.body.classList.remove('nav-open');
  
  // Restore body scroll
  document.body.style.overflow = '';
}

/* ── Smooth Scroll ────────────────────────────────────────── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ── Active Navigation Links ──────────────────────────────── */

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (!sections.length || !navLinks.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

/* ── Toast (shared with booking.js) ───────────────────────── */

function showToast(message) {
  let toast = document.getElementById('toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<i class="ph ph-warning-circle"></i> <span>${message}</span>`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ── Exports ───────────────────────────────────────────────── */

window.showToast = showToast;
window.openMobileNav = openMobileNav;
window.closeMobileNav = closeMobileNav;