import { BaseComponent, html } from 'framework';

export class ChatLoadingMain extends BaseComponent {
  constructor() {
    super();
    this.tab = this.attr('tab') ?? '';
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 chat-page-height d-flex flex-column chat-main-scrollbar');

    return html`
      <div class="chat-main d-flex flex-column gap-4 position-relative flex-grow-1">
        <chat-main-top-bar tab=${this.tab} />
        <x-spinner class="center" />
      </div>
    `;
  }
}
