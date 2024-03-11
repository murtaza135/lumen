import { BaseComponent, html } from 'framework';

export class AddButton extends BaseComponent {
  constructor() {
    super();
    this.addModal = this.slice('addModal');
  }

  render() {
    this.rootCSSClasses('dashboard-add-button z-1');

    return html`
      <button
        class="rounded-circle bg-primary w-12 h-12 center text-white cursor-pointer hover-opacity"
        @click=${() => this.addModal.actions.open()}
      >
        <i class="fa-solid fa-plus fs-4 translate-y-1"></i>
      </button>
    `;
  }
}
