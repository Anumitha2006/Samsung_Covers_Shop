const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('formMessage');

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.elements.namedItem('name')?.value || 'there';
    contactMessage.textContent = `Thanks, ${name}! Your message is ready to send.`;
    contactForm.reset();
  });
}

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm && loginMessage) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginMessage.textContent = 'Login form is ready — this demo can be connected to a real auth flow.';
    loginForm.reset();
  });
}
