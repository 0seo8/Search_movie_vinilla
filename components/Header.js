import { state } from '../state/index.js'
const imgSrc = './img/image__header-search.png'

class Header {
  constructor($container) {
    this.$container = $container;

    this.render();
    this.searchEvents();
  }

  render() {
    this.$container.innerHTML = `
      <div class="logo">Search Movie</div>
      <form action="/" class="searchForm" method="GET">
      <fieldset>
        <legend class="sr-only">검색폼</legend>
        <div class="searchForm__wrapper">
          <div class="formInput">
            <label for="searchKeyword" class="sr-only">검색어</label>
            <input type="search" class="formInput__input" id="searchKeyword" required>
          </div>
          <button type="button">
            <img src="${imgSrc}" class="button--search" >
          </button>
        </div>
      </fieldset>
      </form>
    `
  }

  searchEvents() {
    this.$container.onclick = ({ target }) => {

      if(!target.matches('.button--search')) return 
      const title = this.$container.querySelector('.formInput__input').value

      state.title = title
    }
  }
  
}

export default Header;

