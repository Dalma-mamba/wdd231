const toggleButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (toggleButton && primaryNav) {
  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    primaryNav.classList.toggle('open');
  });
}
