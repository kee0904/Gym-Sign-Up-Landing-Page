const header = document.querySelector('.site-header');
const modal = document.querySelector('#signup-modal');
const offerSelect = document.querySelector('#signup-offer');
const form = document.querySelector('.signup-form');
const formNote = document.querySelector('.form-note');
const openButtons = document.querySelectorAll('[data-open-signup]');
const closeButtons = document.querySelectorAll('[data-close-signup]');
let lastFocusedElement = null;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 24;
  header?.classList.toggle('is-scrolled', scrolled);
});

const closeSignupModal = () => {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
};

const openSignupModal = (offer) => {
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  if (offerSelect && offer) {
    offerSelect.value = offer;
  }
  if (formNote) {
    formNote.textContent = '';
  }
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.signup-form input')?.focus();
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => openSignupModal(button.dataset.offer));
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeSignupModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeSignupModal();
  }
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formNote) {
    formNote.textContent = 'Thanks — your sign up details are ready to be connected to your email/CRM tool.';
  }
});
