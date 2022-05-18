import {fetchMovieDetail} from './api.js'

class MovieDetails {
  constructor($container) {
    this.$container = $container
    this.$movieDetail = $container.querySelector('.movies-detail');

    this.clickMovie()
  }

  clickMovie() {
    this.$container.addEventListener('click', (e) => {
      if(e.target.className !== 'movie') return
      const id = e.target.getAttribute('dataset-id')

      this.render(id)
    })
  }

  async render(id) {
    const Search = await fetchMovieDetail(id)
    const $template = document.createElement('div');
    $template.classList.add('wrapper')
    const {Poster, Title, Released, Runtime, Country,Plot, ratings, Actors, Director, Production, Genre } = Search

    $template.innerHTML =    `
    <div class="close-btn">X</div>
    <div class="poster">
    <img src="${Poster !== 'N/A' ? Poster.replace('SX300', `SX700`) : './nopic.jpg'}" alt="">
    </div>
    <div class="specs">
      <h1 class="title">${Title}</h1>
      <div class="spec"
        <span>${Released}</span>
        <span>${Runtime}</span>
        <span>${Country}</span>
      </div>
      <div class="plot">${Plot}</div>
      <div class="actors"><h3>Actors:</h3> ${Actors}</div>
      <div class="etc"><h3>Director:</h3> ${Director}</div>
      <div class="etc"><h3>Genre:</h3> ${Genre}</div>
    </div>
    `
    console.log(' this.$movieDetail', this.$movieDetail)
    this.$movieDetail.appendChild($template)
    this.$movieDetail.classList.add('active')

    this.bindEvents();


  return this.$movieDetail;
  }

  bindEvents() {
    const $closeBtn = this.$container.querySelector('.close-btn')
    $closeBtn.addEventListener('click', () => {
      this.$movieDetail.innerHTML ='';
      this.$movieDetail.classList.remove('active')
    })
  }
}

export default MovieDetails;
