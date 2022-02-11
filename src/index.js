import './sass/main.scss';
import notice from './javascripts/notifications';
import FetchImages from './javascripts/apiService';
import LoadMoreBtn from './javascripts/load-more-btn';
import imagesCardsTpl from './templates/images-cards.hbs';

const apiService = new FetchImages();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesList: document.querySelector('.gallery'),
};
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.query.value;

  if (inputValue) {
    apiService.query(inputValue);
    apiService.resetPage();

    clearGallery();
    fetchImages();

    loadMoreBtn.show();
  } else notice('info');
}

async function fetchImages() {
  try {
    loadMoreBtn.disable();
    const response = await apiService.fetchImages();

    if (!response.length) {
      loadMoreBtn.hide();
      notice('no result');
    } else {
      renderImages(response);
      scrollIntoView();
      notice('success', response);
    }

    loadMoreBtn.enable();
  } catch {
    notice('error');
    loadMoreBtn.hide();
  }
}

function renderImages(response) {
  refs.imagesList.insertAdjacentHTML('beforeend', imagesCardsTpl(response));
}

function clearGallery() {
  refs.imagesList.innerHTML = '';
}

function scrollIntoView() {
  setTimeout(() => {
    loadMoreBtn.refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }, 350);
}
