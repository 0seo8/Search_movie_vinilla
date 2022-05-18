import { state } from '../state/index.js';
class Nav {
  constructor($container) {
    this.$container = $container;

    this.types = [
      { name: 'all', text: '전체보기' },
      { name: 'movie', text: 'movie' },
      { name: 'series', text: 'series' },
      { name: 'episode', text: 'episode' },
    ];

    this.render();
    this.bindEvents();
  }

  render() {
    this.$container.innerHTML = `

      <ul>
      ${this.types
        .map(
          ({ name, text }) =>
            `<li id="${name}" class="type-item ${state.type === name ? 'active' : ''}">${text}</li>`
        )
        .join('')}
      </ul>`;
  }

  bindEvents() {
    this.$container.onclick = ({ target }) => {
      // 현재 활성화된 type를 클릭하면 무시한다.
      if (!target.matches('.type-item:not(.active)')) return;

      this.$container.querySelector('.active').classList.remove('active');
      target.classList.add('active');

      // 전역 상태를 변경한다. 전역 상태가 변경되면 전역 상태를 구독하고 있는 컴포넌트의 render 메서드가 호출되어 리렌더링된다.
      state.type = target.id;
    };
  }


}

export default Nav;
