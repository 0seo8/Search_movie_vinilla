class DetailEl {
  constructor($container, $imdbID)
  async fetchMovieDetail(imdbID) {
    const apiKey = '7035c60c'
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
    try {
      const { data } = await axios.get(url);
      console.log('here', data)
      return createMovieDetails(data)
    } catch (error) {
      alert(data.Error)
    }      
  }
  searchEvents() {
    this.$container.onclick = ({ target }) => {

      if(!target.matches('.button--search')) return 
      const title = this.$container.querySelector('.formInput__input').value

      state.title = title
    }
  }

  async render() {
    this.$container.onclick = ({ target }) => {
      if(!target.matches('.button--search')) return 
      const $ID = e.target.querySelector('.imdbID').innerText
      const response = await this.fetchMovieDetail($ID);
      return response
    }
    const detailEl = this.createMovieDetails(response)
  }
  
  createMovieDetails(response) {
    const $template = document.createElement('template');
    $template.innerHTML = Search
      .map(
        ({Released, Title, Runtime, Country, name,  score, Actors, Director,Production,Genre}) => 
        `      
        <div class="title">${Title}</div>
        <div class="labels">
          <span>${Released}</span>
          <span>${Runtime}</span>
          <span>${Country}</span>
        </div>
        <div class="plot">${Plot}</div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <img src="https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png" alt="name" />
            <span>${score}</span>
          </div>
        </div>
        <div><h3>Actors</h3>${Actors}</div>
        <div><h3>Director</h3>${Director}</div>
        <div><h3>Production</h3>${Production}</div>
        <div><h3>Genre</h3>${Genre}</div>`
      )
  
  
   this.$container.appendChild($template);

   return $container
  }
  
}