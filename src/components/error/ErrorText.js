import { BaseComponent, html } from 'framework';

export class ErrorText extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <p class="error-text text-bg-danger py-2 px-4 rounded text-center fs-5">
        ${this.childrenHTML}
      </p>
    `;
  }
}
