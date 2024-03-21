import { BaseComponent, html } from 'framework';

export class ChatMain extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 chat-page-height d-flex flex-column chat-main-scrollbar');

    return html`
      <div class="chat-main d-flex flex-column gap-4 position-relative flex-grow-1">
        <chat-main-top-bar />
        <chat-main-content />
      </div>
    `;
  }

  effect() {
    this.scrollTo({ behavior: 'instant', top: this.scrollHeight });
  }
}
