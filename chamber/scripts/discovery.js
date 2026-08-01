import { discoverItems } from "../data/discover-items.mjs";

const gallery = document.querySelector("#discover-gallery");
const visitMessage = document.querySelector("#visit-message");
const year = document.querySelector("#year");

if (gallery) {
  renderCards(gallery);
}

if (visitMessage) {
  renderVisitMessage(visitMessage);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

function renderCards(container) {
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  discoverItems.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = `discover-card card-${index + 1}`;

    article.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" width="300" height="200" />
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn more</button>
    `;

    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}

function renderVisitMessage(element) {
  const storageKey = "northshore-last-visit";
  const now = Date.now();
  const previousVisit = Number(window.localStorage.getItem(storageKey) || 0);

  let message = "Welcome! Let us know if you have any questions.";

  if (previousVisit) {
    const elapsedDays = Math.floor((now - previousVisit) / 86400000);

    if (elapsedDays < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${elapsedDays} ${
        elapsedDays === 1 ? "day" : "days"
      } ago.`;
    }
  }

  element.textContent = message;
  window.localStorage.setItem(storageKey, now.toString());
}