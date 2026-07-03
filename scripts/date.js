document.addEventListener('DOMContentLoaded', () => {
  const yearTarget = document.getElementById('currentyear');
  const modifiedTarget = document.getElementById('lastModified');

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  if (modifiedTarget) {
    modifiedTarget.textContent = document.lastModified;
  }
});
