import { BaseComponent, html } from 'framework';
import { joinedGroupsQuery } from '@/api/groups/joinedGroupsQuery';
import { createdGroupsQuery } from '@/api/groups-created/createdGroupsQuery';
import { leaveGroupMutation } from '@/api/groups/leaveGroupMutation';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';

export class GroupsTable extends BaseComponent {
  constructor() {
    super();
    this.groups = this.query(joinedGroupsQuery());
    this.createdGroups = this.query(createdGroupsQuery());
    this.leaveGroup = this.mutation(leaveGroupMutation());
    this.error = this.slice('error');
    this.searchDashboard = this.slice('searchDashboard');
    this.searchDashboard.actions.resetText();
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.groups.state.status === 'loading' || this.createdGroups.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.groups.state.status === 'error' || this.createdGroups.state.status === 'error') {
      return html`<error-text class="center mt-5">Could not retrieve groups</error-text>`;
    }

    const groups = this.groups.state.data.filter((group) => {
      const groupName = group.group_name.toLowerCase();
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return groupName.includes(searchText);
    });

    const createdGroups = this.createdGroups.state.data.filter((group) => {
      const groupName = group.group_name.toLowerCase();
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return groupName.includes(searchText);
    });

    return html`
      <h2 class="fs-4 mt-4.5">Your Groups</h2>
      <table class="table mt-1">
        <tbody>
          ${createdGroups.length === 0
        ? html`You have not created any groups.`
        : createdGroups.map((group) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-people-group"></i></th>
              <td>${capitaliseWords(group.group_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <x-link href=${`/manage-group/${group.group_id}`}>
                    <i class="fa-solid fa-gear fs-5 cursor-pointer hover-opacity text-primary"></i>
                  </x-link>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      <h2 class="fs-4 mt-4.5">Joined Groups</h2>
      <table class="table mt-1">
        <tbody>
          ${groups.length === 0
        ? html`You have not joined any groups.`
        : groups.map((group) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-people-group"></i></th>
              <td>${capitaliseWords(group.group_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i
                    @click=${() => this.handleLeaveGroup(group.group_id)} 
                    class="fa-solid fa-xmark fa-xl translate-y-3 text-danger hover-opacity cursor-pointer"
                  />
                  <x-link href="/chat" class="w-6 h-6 hover-opacity">
                    <img src=${chatDotsFillImg} alt="Chat" width="24" />
                  </x-link>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  async handleLeaveGroup(id) {
    await this.leaveGroup.actions.mutate(id);
    if (this.leaveGroup.state.status === 'error') {
      this.error.actions.setError('Could not leave group');
    }
  }
}
