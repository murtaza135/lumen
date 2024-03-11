import { BaseComponent, html } from 'framework';
import hamburgerMenuImg from '@/assets/hamburger-menu.svg';

export class ChatSideNavToggleButton extends BaseComponent {
  constructor() {
    super();
    this.chatSideNav = this.slice('chatSideNav');
  }

  render() {
    return html`
      <button
        @click=${() => this.chatSideNav.actions.toggle()}
        class="chat-side-nav-toggle-button hover-opacity cursor-pointer -translate-x-3"
      >
        <img src=${hamburgerMenuImg} alt="menu" />
      </button>
    `;
  }
}
