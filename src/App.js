import "./style/style.scss";
import { Header, Nav, MovieList, MovieDetails } from './components/index.js';
import { createState } from './state/index.js';
import imgSrc from './assets/ball-triangle.svg'

const App = $container => {
  $container.innerHTML = `
  
    <header class="header"></header>
    <nav class="type-list"></nav>
    <div class="movies-list-container">
      <div class="movies-list"></div>
      <div class="movies-detail"></div>
      <div class="scroll-observer">
        <img src="${imgSrc}" alt="Loading..." />
      </div>
    </div>`;

  createState({ type: 'all', title: 'frozen' })

  new Header($container.querySelector('.header'))
  new Nav($container.querySelector('.type-list'));
  new MovieList($container.querySelector('.movies-list-container'));
  new MovieDetails($container.querySelector('.movies-list-container'));
};

App(document.getElementById('root'));





