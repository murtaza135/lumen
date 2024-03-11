import { BaseComponent, html } from 'framework';

export class ChatBackdrop extends BaseComponent {
  constructor() {
    super();
    this.chatSideNav = this.slice('chatSideNav');
  }

  render() {
    return html`
      <div
        @click=${() => this.chatSideNav.actions.close()}
        class=${`chat-backdrop ${this.chatSideNav.state.isOpen ? 'show' : ''}`}
      />
    `;
  }
}
