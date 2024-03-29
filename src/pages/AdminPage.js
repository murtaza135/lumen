import { BaseComponent, html } from 'framework';

// TODO handle logic that only allows admins to enter this page, otherwise redirect to dashboard if authed and login page if not authed

export class AdminPage extends BaseComponent {
  constructor() {
    super();
    this.admin = this.slice('admin');
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <auth-guard />
      <setup-sockets />
      <error-toast />
      <success-toast />
      <chat-notification />
      
      <x-nav hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 mb-auto pb-5">
        <admin-top-bar />
        ${this.admin.state.activeTab === 'messages' ? html`<admin-messages-table />` : null}
        ${this.admin.state.activeTab === 'profanity' ? html`<admin-profanity-table />` : null}
        ${this.admin.state.activeTab === 'users' ? html`<admin-users-table />` : null}
        ${this.admin.state.activeTab === 'groups' ? html`<admin-groups-table />` : null}
      </div>
    `;
  }
}
