// import dependencies

import { fetchImages } from "./fetch-images";
import { galleryMarkup } from "./gallery-markup";
import Notiflix from 'notiflix';

//  refs

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
let query = '';
let page = 1;
let perPage = 40;

// add eventlisteners

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// fn for events

function onSearchFormSubmit(e) {
    e.preventDefault();

    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden')

    if (query === '') {
        alertNoEmptySearch();
        return;
    }

    fetchImages(query, page, perPage)
    .then(({ data }) => {
        if (data.totalHits === 0) {
            alertNoImagesFound();
        } else {
            galleryMarkup(data.hits);
            alertImagesFound(data);
        }
        if (data.totalHits > perPage) {
            loadMoreBtn.classList.remove('is-hidden');
        }

    })
    .catch(error => console.log(error))
    .finally(() => {
    searchForm.reset();
    });
}

function onLoadMoreBtnClick(e) {
    page += 1;
  
    fetchImages(query, page, perPage)
      .then(({ data }) => {
        galleryMarkup(data.hits);  
        const totalPages = Math.ceil(data.totalHits / perPage);
  
        if (page > totalPages) {
          loadMoreBtn.classList.add('is-hidden');
          alertEndOfSearch();
        }
      })
      .catch(error => console.log(error));
}

// fn for alerts

function alertImagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoImagesFound() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function alertNoEmptySearch() {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
}

function alertEndOfSearch() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}