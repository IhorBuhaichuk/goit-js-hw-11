'use strict';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '41949985-8da78252305a4c2e980ced1f3';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');
loader.style.display = 'none';

searchForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const inputValue = searchInput.value.trim();

  if (!inputValue) {
    showWarning('Please enter image name!');
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await fetch(`https://pixabay.com/api/?${searchParams}`);
    loader.style.display = 'none';

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      showErrorMessage('No images found. Please try again!');
      return;
    }

    renderImages(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.error('Error fetching images:', error);
    showErrorMessage('Failed to fetch images. Please try again later.');
  }
}

function renderImages(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const imageCardElement = createImageCard(image);
    fragment.appendChild(imageCardElement);
  });

  gallery.appendChild(fragment);
}

function createImageCard(image) {
  const imageCardElement = document.createElement('div');
  imageCardElement.classList.add('card');

  imageCardElement.innerHTML = `
    <a class="gallery-link" href="${image.largeImageURL}">
        <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="card-info">
        <p class="card-text"><b>Likes:</b> ${image.likes}</p>
        <p class="card-text"><b>Views:</b> ${image.views}</p>
        <p class="card-text"><b>Comments:</b> ${image.comments}</p>
        <p class="card-text"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    `;

  return imageCardElement;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning!',
    message: message,
    position: 'topRight',
  });
}

function showErrorMessage(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
  });
}
