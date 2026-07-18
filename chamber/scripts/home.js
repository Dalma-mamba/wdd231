const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.main-nav');
const weatherStatus = document.querySelector('#weatherStatus');
const currentTemp = document.querySelector('#currentTemp');
const weatherDescription = document.querySelector('#weatherDescription');
const forecastList = document.querySelector('#forecast');
const spotlightsContainer = document.querySelector('#spotlightGrid');
<head>
  ...
  <link rel="stylesheet" href="styles/large.css" /><head>
  ...
  <link rel="stylesheet" href="styles/large.css" /><head>
  ...
  <link rel="stylesheet" href="styles/large.css" /><head>
  ...
  <link rel="stylesheet" href="styles/large.css" /><head>
  ...
  <link rel="stylesheet" href="styles/large.css" /><head>
  ...
  <link rel="stylesheet" href="styles/large.css" />
  <script src="scripts/home.js" defer></script>
</head><script src="scripts/home.js" defer></script>const weatherApiKey = 'bYnGnI45tRfUPAZ5i03yX_I0JapYdxsSjjITxf6bN7P20R2gxPPeaY4Si34vfD';
const weatherCity = 'Rexburg,US';
const weatherBase = 'https://api.openweathermap.org/data/2.5';

function initializeNavigation() {
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }
}

function setFooterDetails() {
  const currentYear = document.querySelector('#currentYear');
  const modifiedDate = document.querySelector('#lastModified');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (modifiedDate) {
    modifiedDate.textContent = `Last modified: ${document.lastModified}`;
  }
}

function formatTemperature(value) {
  return Math.round(value);
}

function buildForecastItems(forecast) {
  const groupedByDate = forecast.list.reduce((days, entry) => {
    const dayLabel = entry.dt_txt.split(' ')[0];
    if (!days[dayLabel]) {
      days[dayLabel] = [];
    }
    days[dayLabel].push(entry);
    return days;
  }, {});

  return Object.entries(groupedByDate)
    .slice(0, 3)
    .map(([date, entries]) => {
      const high = Math.max(...entries.map((entry) => entry.main.temp_max));
      const low = Math.min(...entries.map((entry) => entry.main.temp_min));
      const label = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
      });

      return `
        <article class="forecast-item">
          <h3>${label}</h3>
          <p>High ${formatTemperature(high)}°F</p>
          <p>Low ${formatTemperature(low)}°F</p>
        </article>
      `;
    })
    .join('');
}

async function fetchWeather() {
  if (!weatherStatus || !weatherDescription || !forecastList) return;

  if (!weatherApiKey || weatherApiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    weatherStatus.textContent = 'Weather data is currently unavailable while the API key is being configured.';
    return;
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${weatherBase}/weather?q=${encodeURIComponent(weatherCity)}&units=imperial&appid=${weatherApiKey}`),
      fetch(`${weatherBase}/forecast?q=${encodeURIComponent(weatherCity)}&units=imperial&appid=${weatherApiKey}`),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Weather service could not load the requested forecast.');
    }

    const currentWeather = await currentResponse.json();
    const forecastWeather = await forecastResponse.json();

    currentTemp.textContent = formatTemperature(currentWeather.main.temp);
    weatherDescription.textContent = `${currentWeather.weather[0].description}. Humidity ${currentWeather.main.humidity}%`;
    forecastList.innerHTML = buildForecastItems(forecastWeather);
    weatherStatus.textContent = 'Current conditions';
  } catch (error) {
    weatherStatus.textContent = 'Weather is unavailable right now. Please try again later.';
    console.error(error);
  }
}

function uniqueSpotlights(members) {
  const eligible = members.filter((member) => member.membershipLevel >= 2);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function renderSpotlights(members) {
  if (!spotlightsContainer) return;

  const selectedMembers = uniqueSpotlights(members);

  spotlightsContainer.innerHTML = selectedMembers
    .map((member) => `
      <article class="spotlight-card">
        <div class="spotlight-logo">
          <img src="images/${member.image}" alt="${member.name} logo" />
        </div>
        <div class="spotlight-copy">
          <h3>${member.name}</h3>
          <p>${member.category}</p>
          <ul class="spotlight-meta">
            <li>${member.phone}</li>
            <li>${member.address}</li>
            <li><a href="${member.website}" target="_blank" rel="noreferrer">${member.website}</a></li>
          </ul>
          <span class="member-badge badge-${member.membershipLevel === 3 ? 'gold' : 'silver'}">${member.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</span>
        </div>
      </article>
    `)
    .join('');
}

async function loadSpotlights() {
  if (!spotlightsContainer) return;

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Could not load spotlight members (${response.status})`);
    }

    const data = await response.json();
    const members = data.members || [];

    if (members.length === 0) {
      spotlightsContainer.innerHTML = '<p class="status-summary">Spotlight members are not available right now.</p>';
      return;
    }

    renderSpotlights(members);
  } catch (error) {
    console.error(error);
    spotlightsContainer.innerHTML = '<p class="status-summary">Spotlight members could not be loaded.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  setFooterDetails();
  fetchWeather();
  loadSpotlights();
});
