import { BaseComponent, html } from 'framework';

export class AdminTopBar extends BaseComponent {
  constructor() {
    super();
    this.searchInputRef = this.ref('searchInput');
    this.admin = this.slice('admin');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <nav class="dashboard-nav navbar pb-2 px-3 mt-3 border-bottom border-secondary">
        <ul class="nav-links nav nav-pills gap-3">
          <li class=${`nav-item ${this.admin.state.activeTab === 'users' && 'active'}`}>
              <button @click=${() => this.admin.actions.activateUsersTab()} class="nav-link">Users</button>
          </li>
          <li class=${`nav-item ${this.admin.state.activeTab === 'groups' && 'active'}`}>
              <button @click=${() => this.admin.actions.activateGroupsTab()} class="nav-link">Groups</button>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <form @submit=${(event) => this.handleSearchSubmit(event)} class="dashboard-nav-search d-flex gap-2" role="search">
            <input id=${this.searchInputRef.id} class="form-control" type="search" placeholder="Search" aria-label="Search" value=${this.admin.state.searchText}>
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </ul>
      </nav>
    `;
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const text = this.searchInputRef.element.value;
    this.admin.actions.setSearchText(text);
  }

  cleanup() {
    this.admin.actions.setSearchText('');
  }
}

/*
<li class=${`nav-item ${this.admin.state.activeTab === 'messages' && 'active'}`}>
    <button @click=${() => this.admin.actions.activateMessagesTab()} class="nav-link">Messages</button>
</li>
<li class=${`nav-item ${this.admin.state.activeTab === 'profanity' && 'active'}`}>
    <button @click=${() => this.admin.actions.activateProfanityTab()} class="nav-link">Profanity</button>
</li>
*/
