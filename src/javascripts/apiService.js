const API_KEY = '25648559-9cac4d1311f1c323ef3f81d16';
const BASE_URL = 'https://pixabay.com/api/';

export default class FetchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);
    const parseResponse = await response.json();
    this.incrementPage();
    return parseResponse.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  query(newSearch) {
    this.searchQuery = newSearch;
  }
}
