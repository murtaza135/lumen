/* eslint-disable camelcase */
import { BaseComponent, html } from 'framework';
import { joinedGroupsQuery } from '@/api/groups/joinedGroupsQuery';
import { friendsQuery } from '@/api/friends/friendsQuery';
import { navigateChat } from '@/utils/navigate';
import { capitaliseWords } from '@/utils/capitalise';
import { extractInitials } from '@/utils/extractInitials';

export class ChatSideNav extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.joinedGroups = this.query(joinedGroupsQuery());
    this.friends = this.query(friendsQuery());
  }

  render() {
    this.rootCSSClasses('chat-side-nav');

    const data = (() => {
      if (this.chatFriendsGroups.state.activeTab === 'groups') {
        if (this.joinedGroups.state.status === 'loading' || this.joinedGroups.state.status === 'error') {
          return html`<div class="center"><x-spinner /></div>`;
        }

        return html`
          <div class="pe-2 d-flex flex-column gap-3">
            ${this.joinedGroups.state.data.map(({ group_id, group_name }) => html`
              <div class="chat-side-nav-group">
                <button
                  class="group-name d-flex align-items-center gap-3 hover-opacity cursor-pointer"
                  @click=${() => navigateChat({ id: group_id, name: group_name, type: 'group' }, '/chat')}
                >
                  <span class="border rounded-circle border-primary h-8 w-8 center">
                    <i class="fa-solid fa-user-group fs-7 text-primary"></i>
                  </span>
                  <p class=${`fs-5 text-primary ${this.chatFriendsGroups.state.activeFriendOrGroup?.name?.toLowerCase() === group_name.toLowerCase() ? 'fw-bold' : 'fw-medium'}`}>${capitaliseWords(group_name)}</p>
                </button>
              </div>
            `)}
          </div>
        `;
      }

      if (this.friends.state.status === 'loading' || this.friends.state.status === 'error') {
        return html`<div class="center"><x-spinner /></div>`;
      }

      return html`
        <div class="pe-2 d-flex flex-column gap-3">
          ${this.friends.state.data.map(({ user_id, first_name, last_name }) => html`
            <button
              class="chat-side-nav-person d-flex align-items-center gap-3 cursor-pointer hover-opacity"
              @click=${() => navigateChat({ id: user_id, name: `${first_name} ${last_name}`, type: 'friend' }, '/chat')}
            >
              <x-avatar size="sm" initials=${extractInitials(`${first_name} ${last_name}`)} />
              <p class=${`fs-5 text-primary ${this.chatFriendsGroups.state.activeFriendOrGroup?.name?.toLowerCase() === `${first_name} ${last_name}`.toLowerCase() ? 'fw-bold' : 'fw-medium'}`}>${capitaliseWords(`${first_name} ${last_name}`)}</p>
            </button>
          `)}
        </div>
      `;
    })();

    return html`
      <div class="chat-side-nav-scrollbar chat-side-nav-inner h-100 d-flex flex-column gap-4 position-relative">
        <chat-side-nav-top-bar />
        ${data}
      </div>
    `;
  }
}
