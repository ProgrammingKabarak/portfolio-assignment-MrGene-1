// ---------- 1. Responsive navigation menu ----------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after a link is tapped
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- 2. Dark / light mode toggle ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.innerHTML = theme === 'light'
    ? '<span aria-hidden="true">\u263D</span>'
    : '<span aria-hidden="true">\u2600</span>';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
});

// ---------- 3. Dynamic greeting based on time of day ----------
const greetingEl = document.getElementById('greeting');
const hour = new Date().getHours();
let greeting = 'Good evening, welcome';
if (hour < 12) greeting = 'Good morning, welcome';
else if (hour < 18) greeting = 'Good afternoon, welcome';
greetingEl.textContent = greeting;

// ---------- 4. Scroll-to-top button ----------
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'inline-block' : 'none';
});
topBtn.style.display = 'none';

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- 5. Animated skill bars (reveal on scroll) ----------
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = `${fill.dataset.level}%`;
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach((fill) => skillObserver.observe(fill));

// ---------- 6. Scroll reveal animations for sections ----------
const revealTargets = document.querySelectorAll(
  '#about, #skills, #projects, #resume, #contact, .project-card, .skill-card'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));

// ---------- 7. Contact form validation ----------
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(`${inputId}Error`);
  input.closest('.form-row').classList.toggle('invalid', Boolean(message));
  errorEl.textContent = message || '';
}

function validateForm() {
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    showError('name', 'Please enter your full name.');
    isValid = false;
  } else {
    showError('name', '');
  }

  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  } else {
    showError('email', '');
  }

  const message = document.getElementById('message').value.trim();
  if (message.length < 10) {
    showError('message', 'Message should be at least 10 characters.');
    isValid = false;
  } else {
    showError('message', '');
  }

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validateForm()) {
    formStatus.textContent = 'Thanks! Your message has been captured. (Connect this form to a backend or service like Formspree to actually send it.)';
    form.reset();
    document.querySelectorAll('.form-row').forEach((row) => row.classList.remove('invalid'));
  } else {
    formStatus.textContent = 'Please fix the highlighted fields and try again.';
  }
});

// ---------- 8. Dynamic footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();