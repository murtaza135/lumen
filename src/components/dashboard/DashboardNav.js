import { BaseComponent, html, history } from 'framework';

export class DashboardNav extends BaseComponent {
  constructor() {
    super();
    this.path = history.data.pathname;
    this.searchInputRef = this.ref('searchInput');
    this.searchDashboard = this.slice('searchDashboard');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <nav id="navbar-example2" class="dashboard-nav navbar pb-2 px-3 mt-3 border-bottom border-secondary">
        <ul class="nav-links nav nav-pills gap-3">
          <li class=${`nav-item ${this.path === '/dashboard/recent' && 'active'}`}>
              <x-link class="nav-link" aria-current="page" href="/dashboard/recent">Recent</x-link>
          </li>
          <li class=${`nav-item ${this.path === '/dashboard/groups' && 'active'}`}>
              <x-link class="nav-link" aria-current="page" href="/dashboard/groups">Groups</x-link>
          </li>
          <li class=${`nav-item ${this.path === '/dashboard/friends' && 'active'}`}>
              <x-link class="nav-link" aria-current="page" href="/dashboard/friends">Friends</x-link>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <form @submit=${(event) => this.handleSearchSubmit(event)} class="dashboard-nav-search d-flex gap-2" role="search">
            <input id=${this.searchInputRef.id} class="form-control" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </ul>
      </nav>
    `;
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const text = this.searchInputRef.element.value;
    this.searchDashboard.actions.setText(text);
  }
}
