import { BaseComponent, html } from 'framework';

export class CreateGroupPage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <auth-guard />
      <setup-sockets />
      <error-toast />
      <success-toast />
      <x-nav hasAdmin="true" hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 center my-auto">
        <create-group-form />
      </div>
    `;
  }
}
