document.addEventListener('DOMContentLoaded', () => {
  const currentYear = document.getElementById('currentyear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const lastModified = document.getElementById('lastModified');
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});
