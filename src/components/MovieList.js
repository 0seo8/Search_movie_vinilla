import { state, subscribe } from '../state/index.js';
import {fetchMovieItem} from '../components/api.js'
class MovieList {
  constructor($container) {
    this.$moviesList = $container.querySelector('.movies-list');
    this.$scrollObserver = $container.querySelector('.scroll-observer');
    this.$title = $container.querySelector('.formInput__input')
    
    /**
     * 내부 상태
     * 현재 페이지를 나타내며 intersectionObserver에 의해 증가된다.
     * page가 변경되면 render 메서드를 호출해 리렌더링한다.
     */
    this.page = 1;
    this.currenttype = null;
    this.title = null;
    this.totalMoviesCount = 0;
    this.id = null;
    this.intersectionObserver = this.createIntersectionObserver();

    this.render().then(() => {
      this.intersectionObserver.observe(this.$scrollObserver);
      subscribe(this);
    });
  }

  createIntersectionObserver() {
    return new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {

        if (!isIntersecting || target !== this.$scrollObserver) return;

        if (this.totalMoviesCount <= this.page) {
          alert('NO MORE MOVIES!');

          this.$scrollObserver.style.visibility = 'hidden';
          return;
        }

        this.$scrollObserver.style.visibility = 'visible';
        this.page += 1;
        this.render();
      });
    });
  }

  async render() {
    const isChangedtype = this.currenttype !== state.type;
    const isChangedtitle = this.title !== state.title;

    if (isChangedtype) {
      this.page = 1;
      this.currenttype = state.type;
    } 

    if(isChangedtitle) {
      this.page = 1;
      this.title = state.title;
    }

    const { Search, totalResults } = await fetchMovieItem(state.type, state.title, this.page);
    this.totalMoviesCount = Math.ceil(parseInt(totalResults, 10) / 10);
    if(Search === undefined) return alert('찾는 자료가 없습니다')
    const $movieItem = this.createMovieElements(Search);

    if (isChangedtype || isChangedtitle) {
      this.$moviesList.replaceChildren($movieItem);
    } else  {
      this.$moviesList.appendChild($movieItem);
    }

  }

  createMovieElements(Search) {
    const $template = document.createElement('template');
    $template.innerHTML = Search
      .map(
        ({Poster, Title, Year, imdbID}) => 
      `<div href="/" class="movie" dataset-id =${imdbID}>
        <img src="${Poster !== 'N/A' ? Poster.replace('SX300', `SX700`) : './nopic.jpg'}" alt="">
        <div class="info">
          <div class="year">${Year}</div>
          <div class="title">${Title} </div>
        </div>
      </div>`
      )
      .join('');
    return $template.content;
  }
  
}

export default MovieList;
