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
    setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 100000 }), 800);
    setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 100000 }), 1000);
    setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 100000 }), 1250);

    const chatscrollListener = () => {
      this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 1000 });
      setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 1000 }), 500);
      setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 1000 }), 800);
      setTimeout(() => this.scrollTo({ behavior: 'smooth', top: this.scrollHeight + 1000 }), 1200);
    };

    this.addEventListener('chatscroll', chatscrollListener);
    return () => this.removeEventListener('chatscroll', chatscrollListener);
  }
}
