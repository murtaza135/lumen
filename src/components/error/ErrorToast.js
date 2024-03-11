import { BaseComponent, html } from 'framework';

export class ErrorToast extends BaseComponent {
  constructor() {
    super();
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100 position-fixed bottom-0 d-block p-3 z-80');

    if (this.error.state.text) {
      return html`
        <div class="error-toast d-flex justify-content-between gap-4 text-bg-danger py-3 px-4 rounded fw-semibold" role="alert">
          <p class="flex-grow-1">${this.error.state.text}</p>
          <button @click=${() => this.error.actions.clearError()} class="transition-opacity-hover">✕</button>
        </div>
      `;
    }

    return html``;
  }
}
