import { Header, Nav, MovieList } from './components/index.js';
import { createState } from './state/index.js';

const App = $container => {
  $container.innerHTML = `
  
    <header class="header"></header>
    <nav class="type-list"></nav>
    <div class="movies-list-container">
      <div class="movies-list"></div>
      <div class="movies-detail"></div>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>`;

  // 전역 상태 생성
  createState({ type: 'all', title: 'frozen' })

  new Header($container.querySelector('.header'))
  new Nav($container.querySelector('.type-list'));
  new MovieList($container.querySelector('.movies-list-container'));
};

App(document.getElementById('root'));

const movie = document.querySelector('.movies-list')

movie.addEventListener('click', (e) =>{
  if(e.target.className !== 'movie') return 
  const $ID = e.target.querySelector('.imdbID').innerText
  console.log($ID)
  new DetailEl(movie, $ID)
  movie.classList.add('active')
})
