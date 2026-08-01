// This file contains the JavaScript functionality for the website.

const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data'); // Replace with your data source
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        generateContent(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

const generateContent = (data) => {
    const contentContainer = document.getElementById('content'); // Ensure this ID exists in your HTML
    contentContainer.innerHTML = ''; // Clear existing content

    data.slice(0, 15).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        `;
        contentContainer.appendChild(itemElement);
    });
};

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const showModal = (message) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-button').onclick = () => {
        modal.remove();
    };
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    const form = document.getElementById('contact-form'); // Ensure this ID exists in your HTML
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            saveToLocalStorage('contactData', data);
            showModal('Your data has been saved!');
        });
    }
});