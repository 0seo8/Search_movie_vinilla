import { state } from '../state/index.js'

class Header {
  constructor($container) {
    this.$container = $container;

    this.render();
    this.searchEvent();
  }

  render() {
    this.$container.innerHTML = `
      <div class="logo">Search Movie</div>
      <form action="/" class="searchForm" method="GET"  onsubmit="return false">
      <fieldset>
        <legend class="sr-only">검색폼</legend>
        <div class="searchForm__wrapper">
          <div class="formInput">
            <label for="searchKeyword" class="sr-only">검색어</label>
            <input type="search" class="formInput__input" id="searchKeyword" required>
          </div>
          <button type="button" class="button--search">
          </button>
        </div>
      </fieldset>
      </form>
    `
  }

  searchEvent() {
    this.$input = this.$container.querySelector('.formInput__input');

    this.$container.onclick = ({ target }) => {

      if(!target.matches('.button--search')) return 
      const title = this.$input.value

      state.title = title
      this.$input.value =''
    }

    this.$input.addEventListener('keyup', (e) => {
      if(e.keyCode !== 13) return
      const title = this.$input.value
      state.title = title
      this.$input.value =''
    })
  }
}

export default Header;

