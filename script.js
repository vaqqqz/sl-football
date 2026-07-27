/* =========================================================
   Чемпионат Свинленда по футболу — скрипты
   Только: плавная прокрутка, мобильное меню, fade-in секций
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Мобильное меню ---------- */
  var burgerBtn = document.getElementById('burger-btn');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMobileMenu() {
    burgerBtn.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  }

  function toggleMobileMenu() {
    var isOpen = mobileNav.classList.toggle('is-open');
    burgerBtn.classList.toggle('is-open', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', toggleMobileMenu);

    /* Закрываем мобильное меню при выборе пункта */
    var mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- Плавная прокрутка к разделам ---------- */
  var navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Появление секций при прокрутке ---------- */
  var fadeSections = document.querySelectorAll('.fade-in-section');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeSections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    /* Резервный вариант без IntersectionObserver */
    fadeSections.forEach(function (section) {
      section.classList.add('is-visible');
    });
  }

});
