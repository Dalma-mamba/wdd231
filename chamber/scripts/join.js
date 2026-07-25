const timestampField = document.querySelector('#timestamp');

if (timestampField) {
  timestampField.value = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

const memberButtons = document.querySelectorAll('.modal-opener');
const dialogs = document.querySelectorAll('.membership-modal');

memberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.target);
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  });
});

dialogs.forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  const closeButton = dialog.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      dialog.close();
    });
  }
});
