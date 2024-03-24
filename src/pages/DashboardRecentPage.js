import { BaseComponent, html } from 'framework';

export class DashboardRecentPage extends BaseComponent {
  constructor() {
    super();
    this.addModal = this.slice('addModal');
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <auth-guard />
      <setup-sockets />
      <error-toast />

      <x-backdrop stateSlice="addModal" />
      ${this.addModal.state.isOpen ? html`<add-modal />` : null}
      <add-button />
      
      <x-nav hasAdmin="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 mb-auto">
        <dashboard-nav />
        <recent-grid />
      </div>
    `;
  }
}
