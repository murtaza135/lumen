import { BaseComponent, html } from 'framework';

export class ChatMembersMain extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 chat-page-height d-flex flex-column chat-main-scrollbar');

    return html`
      <div class="chat-main d-flex flex-column gap-0 position-relative flex-grow-1">
        <chat-main-top-bar />
        <group-top-bar class="group-top-bar-for-chat" />
        <group-members-table class="ps-2" />
      </div>
    `;
  }
}
