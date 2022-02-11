export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    return {
      button: document.querySelector(selector),
    };
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.button.textContent = 'Loading...';
  }
}
