/* ==========================================================================
   ЧЕМПИОНАТ СВИНЛЕНДА ПО ФУТБОЛУ — СКРИПТЫ
   1. Бургер-меню
   2. Закрытие меню при выборе раздела / клике вне меню
   3. Плавная прокрутка (fallback для старых браузеров)
   4. Подсветка активного раздела в меню
   5. Появление секций при прокрутке
   6. Кнопка «наверх»
   7. Безопасная проверка загрузки изображений
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Бургер-меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('main-nav');

  function closeMenu() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!nav || !burger) return;
    var isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (burger) {
    burger.addEventListener('click', toggleMenu);
  }

  /* ---------- 2. Закрытие меню при выборе раздела ---------- */
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Закрытие меню при клике вне навигации (актуально для мобильных)
  document.addEventListener('click', function (event) {
    if (!nav || !burger) return;
    var isClickInsideNav = nav.contains(event.target);
    var isClickOnBurger = burger.contains(event.target);
    if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ---------- 3. Плавная прокрутка (fallback) ---------- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      var headerOffset = 76;
      var elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      var offsetPosition = elementPosition - headerOffset + 1;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ---------- 4. Подсветка активного раздела в меню ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinkMap = {};
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      navLinkMap[href.slice(1)] = link;
    }
  });

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        var link = navLinkMap[id];
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- 5. Появление секций при прокрутке ---------- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Фолбэк, если IntersectionObserver недоступен
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- 6. Кнопка «наверх» ---------- */
  var toTopBtn = document.getElementById('to-top');

  function toggleToTopButton() {
    if (!toTopBtn) return;
    if (window.scrollY > 480) {
      toTopBtn.classList.add('is-visible');
    } else {
      toTopBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', toggleToTopButton, { passive: true });
  toggleToTopButton();

  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 7. Безопасная проверка загрузки изображений ---------- */
  // Если изображение (например, логотип команды) отсутствует или не
  // загрузилось, скрываем его без вывода ошибок в консоль и без поломки макета.
  var allImages = document.querySelectorAll('img');
  allImages.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
    }, { once: true });
  });

});
