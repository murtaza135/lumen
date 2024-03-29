import { navigateChat } from '@/utils/navigate';
import { BaseComponent, html } from 'framework';

export class ChatNotification extends BaseComponent {
  constructor() {
    super();
    this.chatNotification = this.slice('chatNotification');
  }

  render() {
    this.rootCSSClasses('w-100 position-fixed bottom-0 d-block p-3 z-80');

    const { id, name, type, text } = this.chatNotification.state;

    if (id) {
      return html`
        <div class="error-toast d-flex justify-content-between gap-4 text-bg-primary py-3 px-4 rounded fw-semibold" role="alert">
          <div class="flex-grow-1">
            <p class="fw-bold">${name}</p>
            <p class="fw-normal">${text}</p>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-3">
            <button @click=${() => this.navigateToChat(id, name, type)} class="transition-opacity-hover fs-5"><i class="fa-regular fa-comment-dots"></i></button>
            <button @click=${() => this.chatNotification.actions.clearNotification()} class="transition-opacity-hover fs-5">✕</button>
          </div>
        </div>
      `;
    }

    return html``;
  }

  navigateToChat(id, name, type) {
    navigateChat({ id, name, type }, '/chat');
    this.chatNotification.actions.clearNotification();
  }
}
