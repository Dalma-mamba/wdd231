const toggleButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.main-nav');

if (toggleButton && primaryNav) {
  toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });
}
