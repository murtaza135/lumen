import { BaseComponent, html } from 'framework';

export class SuccessToast extends BaseComponent {
  constructor() {
    super();
    this.success = this.slice('success');
  }

  render() {
    this.rootCSSClasses('w-100 position-fixed bottom-0 d-block p-3 z-80');

    if (this.success.state.text) {
      return html`
        <div class="success-toast d-flex justify-content-between gap-4 text-bg-success py-3 px-4 rounded fw-semibold" role="alert">
          <p class="flex-grow-1">${this.success.state.text}</p>
          <button @click=${() => this.success.actions.clearSuccess()} class="transition-opacity-hover">✕</button>
        </div>
      `;
    }

    return html``;
  }
}
