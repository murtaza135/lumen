import { BaseComponent, html, history } from 'framework';
import { removeMemberFromGroupMutation } from '@/api/group-members/removeMemberFromGroupMutation';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';
import { navigateChat } from '@/utils/navigate';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';
import { getLoggedInUser } from '@/api/api.util';

export class GroupMembersTable extends BaseComponent {
  constructor() {
    super();
    this.id = history.data.params.id;
    this.groupManagement = this.slice('groupManagement');
    this.error = this.slice('error');
    this.group = this.query(singleGroupQuery(this.id));
    this.removeMember = this.mutation(removeMemberFromGroupMutation(this.id));
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.group.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.group.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load members.</p>`;
    }

    const members = this.group.state.data.members.filter((member) => {
      const memberName = `${member.first_name.toLowerCase()} ${member.last_name.toLowerCase()}`;
      const searchText = this.groupManagement.state.searchText.toLowerCase();
      return memberName.includes(searchText);
    });

    const user = getLoggedInUser();
    const isOwner = user.id === this.group.state.data.owner.user_id || user.user_role === 1;

    return html`
      <table class="table">
        <tbody>
          ${members.map((member) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user"></i></th>
              <td>${capitaliseWords(`${member.first_name} ${member.last_name}`)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  ${isOwner ? html`<i
                    @click=${() => this.handleDeleteMember(member.user_id)}
                    class="fa-solid fa-xmark fa-xl translate-y-3 text-danger cursor-pointer hover-opacity">
                  </i>` : null}
                  <button @click=${() => navigateChat({ id: member.user_id, name: capitaliseWords(`${member.first_name} ${member.last_name}`), type: 'friend' }, '/chat')} class="w-6 h-6">
                    <img src=${chatDotsFillImg} alt="Chat" width="24" />
                  </button>
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

  async handleDeleteMember(id) {
    await this.removeMember.actions.mutate(id);
    if (this.removeMember.state.status === 'error') {
      this.error.actions.setError('Could not delete member');
    }
  }
}
