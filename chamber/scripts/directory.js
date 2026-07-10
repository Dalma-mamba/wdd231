const memberContainer = document.querySelector('#memberGrid');
const statusSummary = document.querySelector('.status-summary');
const viewButtons = document.querySelectorAll('.view-btn');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.main-nav');

const membershipLabels = {
  1: 'Member',
  2: 'Silver',
  3: 'Gold',
};

function updateView(newView) {
  viewButtons.forEach((button) => {
    const active = button.dataset.view === newView;
    button.classList.toggle('active', active);
  });
  memberContainer.classList.toggle('list-view', newView === 'list');
  memberContainer.classList.toggle('grid-view', newView === 'grid');
}

function renderMembers(members) {
  if (!memberContainer) return;
  memberContainer.innerHTML = members
    .map((member) => {
      return `
      <article class="member-card">
        <div class="member-media">
          <div class="member-logo">
            <img src="images/${member.image}" alt="${member.name} logo" />
          </div>
          <div class="member-details">
            <h2>${member.name}</h2>
            <p>${member.category}</p>
            <div class="member-meta">
              <span>${member.address}</span>
              <span>${member.phone}</span>
            </div>
          </div>
        </div>
        <div class="member-actions">
          <a href="${member.website}" target="_blank" rel="noreferrer">Visit website</a>
          <span class="member-badge badge-${member.membershipLevel === 3 ? 'gold' : member.membershipLevel === 2 ? 'silver' : 'member'}">${membershipLabels[member.membershipLevel]}</span>
        </div>
      </article>`;
    })
    .join('');
}

async function loadMembers() {
  const endpoint = 'data/members.json';
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const data = await response.json();
    const members = data.members || [];
    if (members.length === 0) {
      statusSummary.textContent = 'No members are available right now.';
      return;
    }
    renderMembers(members);
    statusSummary.textContent = `${members.length} members displayed.`;
  } catch (error) {
    statusSummary.textContent = 'Member directory is unavailable. Please try again later.';
    console.error(error);
  }
}

function initializePage() {
  if (!memberContainer || !statusSummary) return;

  updateView('grid');
  loadMembers();

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      updateView(button.dataset.view);
    });
  });

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }

  const currentYear = document.querySelector('#currentYear');
  const modifiedDate = document.querySelector('#lastModified');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (modifiedDate) {
    modifiedDate.textContent = `Last modified: ${document.lastModified}`;
  }
}

document.addEventListener('DOMContentLoaded', initializePage);
