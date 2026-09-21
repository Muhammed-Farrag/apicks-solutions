document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
  }

  // Hero slideshow
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 5000);
  }

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });

  // Counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target.querySelector('.counter');
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        if (counter && target) {
          let current = 0;
          const increment = Math.ceil(target / 80);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              entry.target.classList.add('counted');
            }
            if (target >= 1000000) {
              counter.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
            } else {
              counter.textContent = current.toLocaleString();
            }
          }, 25);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-item[data-target]').forEach((el) => {
    counterObserver.observe(el);
  });

  // Sticky header shadow on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(19,127,63,0.15)';
    } else {
      header.style.boxShadow = '0 2px 16px rgba(19,127,63,0.1)';
    }
  });
});
