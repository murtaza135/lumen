import { BaseComponent, html } from 'framework';

export class GroupTopBar extends BaseComponent {
  constructor() {
    super();
    this.searchInputRef = this.ref('searchInput');
    this.groupManagement = this.slice('groupManagement');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <nav class="dashboard-nav navbar pb-2 px-3 mt-3 border-bottom border-secondary">
        <ul class="nav-links nav nav-pills gap-3">
          <li class=${`nav-item ${this.groupManagement.state.activeTab === 'members' && 'active'}`}>
              <button @click=${() => this.groupManagement.actions.activateMembersTab()} class="nav-link">Members</button>
          </li>
          <li class=${`nav-item ${this.groupManagement.state.activeTab === 'requests' && 'active'}`}>
              <button @click=${() => this.groupManagement.actions.activateRequestsTab()} class="nav-link">Requests</button>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <form @submit=${(event) => this.handleSearchSubmit(event)} class="dashboard-nav-search d-flex gap-2" role="search">
            <input id=${this.searchInputRef.id} class="form-control" type="search" placeholder="Search" aria-label="Search" value=${this.groupManagement.state.searchText}>
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </ul>
      </nav>
    `;
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const text = this.searchInputRef.element.value;
    this.groupManagement.actions.setSearchText(text);
  }
}
