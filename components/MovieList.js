import { state, subscribe } from '../state/index.js';
class MovieList {
  constructor($container) {
    this.$moviesList = $container.querySelector('.movies-list');
    this.$scrollObserver = $container.querySelector('.scroll-observer');
    this.$title = $container.querySelector('.formInput__input')
    this.$moviesDetail =  $container.querySelector('.movies-detail'); 
    /**
     * 내부 상태
     * 현재 페이지를 나타내며 intersectionObserver에 의해 증가된다.
     * page가 변경되면 render 메서드를 호출해 리렌더링한다.
     */
    this.page = 1;

    /**
     * 현재 카테고리
     * 전역 상태 type과 비교해 카테고리가 변경되었는지 확인하기 위해 사용한다.
     * Nav 컴포넌트가 전역 상태 type를 변경하면 render가 호출된다. 이때 현재 카테고리도 변경된다.
     */
    this.currenttype = null;
    this.title = null;
    /**
     * 카테고리 내 리스트의 총 갯수
     * 더 불러들일리스트가 존재하는지 확인하기 위해 사용한다.
     * 뉴스를 fetch한 이후 변경된다.
     */
    this.totalMoviesCount = 0;
    /**
     * 지금까지 불러들인 리스트의 총 갯수
     * 더 불러들일 리스트가 존재하는지 확인하기 위해 사용한다. this.totalMoviesCount와 같다면 더이상 불러들일 리스트가 없다는 것을 의미한다.
     * 렌더링 이후 변경된다.
     */

    // intersectionObserver 인스턴스. 렌더링 이후 observe된다.
    this.intersectionObserver = this.createIntersectionObserver();

    // 첫 렌더링 이후 $scrollObserver 요소가 뷰포트와 교차하는지 관측하기 시작한다.
    this.render().then(() => {
      // $scrollObserver 요소가 뷰포트와 교차하면 intersectionObserver의 observer가 호출된다.
      this.intersectionObserver.observe(this.$scrollObserver);
      // 전역 상태 구독. 전역 상태가 변경되면 전역 상태를 구독하고 있는 컴포넌트의 render 메서드가 호출되어 리렌더링된다.
      subscribe(this);
    });
  }

  createIntersectionObserver() {
    return new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {

        if (!isIntersecting || target !== this.$scrollObserver) return;

        // 더이상 불러들일 뉴스가 없다면
        if (this.totalMoviesCount <= this.page) {
          alert('NO MORE MOVIES!');

          /* 박스 영역을 유지하도록 display: none; 대신 visibility: hidden;을 사용한다. */
          this.$scrollObserver.style.visibility = 'hidden';
          return;
        }

        this.$scrollObserver.style.visibility = 'visible';
        this.page += 1;
        this.render();
      });
    });
  }

  /**
   * render 메서드는 다음과 같은 경우 다시 호출되어 리렌더링한다.
   *  - 전역 상태 type 변경
   *  - 내부 상태 page 변경
   */
  async render() {
    // 전역 상태 type가 변경되어 render가 호출된 경우 isChangedtype는 true다.
    const isChangedtype = this.currenttype !== state.type;
    const isChangedtitle = this.title !== state.title;


    // 전역 상태 type가 변경된 경우
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
    /**
     * 전역 상태 type가 변경된 경우: 페이지를 새롭게 시작
     * 내부 상태 page가 변경된 경우: 기존 페이지에 articles를 추가
     */

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
        ({imdbID, Poster, Title, Year}) => 
      `<div href="/" class="movie">
        <img src="${Poster=== 'N/A' ? './img/nopic.jpg' : Poster}" alt="">
        <div class="info">
          <div class="year">${Year}</div>
          <div class="title">${Title} </div>
          <div class="sr-only imdbID">${imdbID}</div>
        </div>
      </div>`
      )
      .join('');
    return $template.content;
  }

}

export default MovieList;
