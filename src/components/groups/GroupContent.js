import { BaseComponent, html, history } from 'framework';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';

export class GroupContent extends BaseComponent {
  constructor() {
    super();
    this.id = history.data.params.id;
    this.groupManagement = this.slice('groupManagement');
    this.group = this.query(singleGroupQuery(this.id));
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.group.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.group.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load group details.</p>`;
    }

    return html`
      <group-details />
      <group-top-bar />
      <group-members-table />
    `;
  }
}

// ${this.groupManagement.state.activeTab === 'members' ? html`<group-members-table />` : html`<group-requests-table />`}
