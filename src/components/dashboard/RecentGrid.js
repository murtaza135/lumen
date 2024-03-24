import { BaseComponent, html } from 'framework';
import { recentQuery } from '@/api/recent/recentQuery';
import { capitalizeFirstLetter } from '@/utils/capitalise';
import { navigateChat } from '@/utils/navigate';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';

export class RecentGrid extends BaseComponent {
  constructor() {
    super();
    this.recent = this.query(recentQuery());
    this.searchDashboard = this.slice('searchDashboard');
    this.searchDashboard.actions.resetText();
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.recent.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.recent.state.status === 'error') {
      return html`<error-text class="center mt-5">Could not retrieve recent information</error-text>`;
    }

    if (this.recent.state.data.length === 0) {
      return html`<p class="text-black fs-6 mt-3 ms-3">You have no recent messages.</p>`;
    }

    const recent = this.recent.state.data.filter((recentItem) => {
      const username = recentItem.userName.toLowerCase();
      const content = recentItem.content.toLowerCase();
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return username.includes(searchText) || content.includes(searchText);
    });

    return html`
      <div class="row mt-4">
        ${recent.map((recentItem) => html`
          <div class="col-12 col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body d-flex flex-column align-items-start">
                  <h5 class="card-title">${capitalizeFirstLetter(recentItem.userName)}</h5>
                  <p class="card-text">${recentItem.content}</p>
                  <div class="mt-auto pt-2">
                    <button @click=${() => this.navigateToRecentChat(recentItem)} class="btn btn-primary">Chat</button>
                  </div>
                </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  async navigateToRecentChat({ isDirectMessage, userId, userName, groupId }) {
    if (isDirectMessage && !!userId && !!userName) {
      navigateChat({ id: userId, name: userName, type: 'person' }, '/chat');
    } else if (!isDirectMessage && !!groupId) {
      try {
        const { name } = await singleGroupQuery(groupId).queryFn();
        navigateChat({ id: groupId, name, type: 'group' }, '/chat');
      } catch {
        this.error.setError('Could not load chat');
      }
    } else {
      this.error.setError('Could not load chat');
    }
  }
}
