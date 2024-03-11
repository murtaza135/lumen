import { BaseComponent, html } from 'framework';

export class ManageGroupPage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-center');

    return html`
      <auth-guard />
      <error-toast />
      <x-backdrop stateSlice="addModal" />
      <add-modal />
      <x-nav hasAdmin="true" hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 mb-auto pb-5">
        <group-content />
      </div>
    `;
  }
}
