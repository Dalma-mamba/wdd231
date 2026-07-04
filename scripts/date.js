document.addEventListener('DOMContentLoaded', () => {
  const currentYear = document.querySelector('#currentyear');
  const modified = document.querySelector('#lastModified');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (modified) {
    modified.textContent = document.lastModified;
  }
});
