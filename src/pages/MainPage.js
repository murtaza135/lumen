import { BaseComponent, html } from 'framework';
import { meQuery } from '@/api/auth/meQuery';
import { getLoggedInUser, getToken, getUserId } from '@/api/api.util';

export class MainPage extends BaseComponent {
  constructor() {
    super();
    this.me = this.query(meQuery());
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <error-toast />
      <success-toast />

      ${getLoggedInUser() && getUserId() && getToken()
        ? html`
          <setup-sockets />
          <x-nav hasAdmin="true" hasHelpdesk="true" hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />
        `
        : html`<x-nav hasLogin="true" hasRegister="true" />`
      }

      <div class = "container h-100 center my-auto">
        <main-content />
      </div>
    `;
  }
}
