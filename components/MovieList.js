import { state, subscribe } from '../state/index.js';
class MovieList {
  constructor($container) {
    this.$moviesList = $container.querySelector('.movies-list');
    this.$scrollObserver = $container.querySelector('.scroll-observer');
    this.$title = $container.querySelector('.formInput__input')
    this.$moviesDetail =  $container.querySelector('.movies-detail'); 

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

    const { Search, totalResults } = await this.fetchMovieItem(state.type, state.title);
    this.totalMoviesCount = Math.ceil(parseInt(totalResults, 10) / 10);
    if(Search === undefined) return alert('찾는 자료가 없습니다')
    const $movieItem = this.createMovieElements(Search);

    if (isChangedtype || isChangedtitle) {
      this.$moviesList.replaceChildren($movieItem);
    } else  {
      this.$moviesList.appendChild($movieItem);
    }

  }

  async fetchMovieItem(type, title) {
    const apiKey = '7035c60c'
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title === '' ? 'frozen' : title}&type=${type === 'all' ? '' : type}&page=${this.page}`;
    console.log('url', url)
    try {
      const { data } = await axios.get(url);
      console.log(data)
      return data
    } catch (error) {
      alert(data.Error)
    }
  }

  createMovieElements(Search) {
    const $template = document.createElement('template');
    $template.innerHTML = Search
      .map(
        ({Poster, Title, Year}) => 
      `<div href="/" class="movie">
        <img src="${Poster=== 'N/A' ? './img/nopic.jpg' : Poster}" alt="">
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
