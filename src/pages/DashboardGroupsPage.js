import { BaseComponent, html } from 'framework';

export class DashboardGroupsPage extends BaseComponent {
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

      <x-backdrop stateSlice="addModal" />
      <add-modal />
      <add-button />
      
      <x-nav hasAdmin="true" hasHelpdesk="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 mb-auto pb-5">
        <dashboard-nav />
        <groups-table />
      </div>
    `;
  }
}
