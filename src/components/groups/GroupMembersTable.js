import { BaseComponent, html, history } from 'framework';
import { groupMembersQuery } from '@/api/group-members/groupMembersQuery';
import { removeMemberFromGroupMutation } from '@/api/group-members/removeMemberFromGroupMutation';
import { timeago } from '@/utils/timeago';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';

// TODO <td>Last online ${timeago(member.timeLastSeen)}</td>

export class GroupMembersTable extends BaseComponent {
  constructor() {
    super();
    this.id = history.data.params.id;
    this.groupManagement = this.slice('groupManagement');
    this.groupMembers = this.query(groupMembersQuery(this.id));
    this.removeMember = this.mutation(removeMemberFromGroupMutation(this.id));
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.groupMembers.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.groupMembers.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load members.</p>`;
    }

    const members = this.groupMembers.state.data.filter((member) => {
      const memberName = `${member.first_name.toLowerCase()} ${member.last_name.toLowerCase()}`;
      const searchText = this.groupManagement.state.searchText.toLowerCase();
      return memberName.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${members.map((member) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user"></i></th>
              <td>${capitaliseWords(member.first_name)} ${capitaliseWords(member.last_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i
                    @click=${() => this.removeMember.actions.mutate(member.user_id)}
                    class="fa-solid fa-xmark fa-xl translate-y-3 text-danger cursor-pointer hover-opacity">
                  </i>
                  <x-link href="/chat" class="w-6 h-6">
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

  cleanup() {
    this.groupManagement.actions.resetSearchText();
  }
}
