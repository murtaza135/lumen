import { BaseComponent, html } from 'framework';
import { joinedGroupsQuery } from '@/api/groups/joinedGroupsQuery';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';
import { navigateChat } from '@/utils/navigate';

export class GroupsTable extends BaseComponent {
  constructor() {
    super();
    this.groups = this.query(joinedGroupsQuery());
    this.error = this.slice('error');
    this.searchDashboard = this.slice('searchDashboard');
    this.searchDashboard.actions.resetText();
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.groups.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.groups.state.status === 'error') {
      return html`<error-text class="center mt-5">Could not retrieve groups</error-text>`;
    }

    const groups = this.groups.state.data.filter((group) => {
      const groupName = group.group_name.toLowerCase();
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return groupName.includes(searchText);
    });

    return html`
      <table class="table mt-1">
        <tbody>
          ${groups.length === 0
        ? html`You have not joined or created any groups.`
        : groups.map((group) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-people-group"></i></th>
              <td>${capitaliseWords(group.group_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <x-link href=${`/manage-group/${group.group_id}`} class="translate-y-3">
                    <i class="fa-solid fa-arrow-up-right-from-square fs-6 cursor-pointer hover-opacity text-primary"></i>
                  </x-link>
                  <button @click=${() => navigateChat({ id: group.group_id, name: group.group_name, type: 'group' }, '/chat')} class="w-6 h-6 hover-opacity">
                    <img src=${chatDotsFillImg} alt="Chat" width="20" />
                  </button>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}
