import { BaseComponent, html } from 'framework';
import { recentQuery } from '@/api/recent/recentQuery';
import { capitalizeFirstLetter } from '@/utils/capitalise';

export class RecentGrid extends BaseComponent {
  constructor() {
    super();
    this.recent = this.query(recentQuery());
    this.searchDashboard = this.slice('searchDashboard');
    this.searchDashboard.actions.resetText();
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.recent.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.recent.state.status === 'error') {
      return html`<error-text class="center mt-5">Could not retrieve recent information</error-text>`;
    }

    const recent = this.recent.state.data.filter((recentItem) => {
      const recentItemTitle = recentItem.title.toLowerCase();
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return recentItemTitle.includes(searchText);
    });

    return html`
      <div class="row mt-4">
        ${recent.map((recentItem) => html`
          <div class="col-12 col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body d-flex flex-column align-items-start">
                  <h5 class="card-title">${capitalizeFirstLetter(recentItem.title)}</h5>
                  <p class="card-text">${recentItem.subtitle}</p>
                  <div class="mt-auto pt-2">
                    <x-link href="/chat" class="btn btn-primary">Chat</x-link>
                  </div>
                </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}
