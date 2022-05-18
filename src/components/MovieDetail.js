import {fetchMovieDetail} from './api.js'

class MovieDetails {
  constructor($container) {
    this.$container = $container

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
    console.log(Search)
  //   const $template = document.createElement('template');
  //   $template.innerHTML = Search
  //   .map(
  //     ({Poster, Title, Year, imdbID}) => 
  //   `<div href="/" class="movie" dataset-id =${imdbID}>
  //     <img src="${Poster !== 'N/A' ? Poster : './nopic.jpg'}" alt="">
  //     <div class="info">
  //       <div class="year">${Year}</div>
  //       <div class="title">${Title} </div>
  //     </div>
  //   </div>`
  //   )
  //   .join('');
  // return $template.content;
  }
}

export default MovieDetails;
