import { BaseComponent, html } from 'framework';

export class RegisterPage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <error-toast />
      <x-nav hasLogin="true" hasRegister="true" />

      <div class="container h-100 center my-auto">
        <register-form />
      </div>
    `;
  }
}
