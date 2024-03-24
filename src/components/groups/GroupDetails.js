import { BaseComponent, history, html } from 'framework';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';
import { deleteGroupMutation } from '@/api/groups-created/deleteGroupMutation';
import { extractInitials } from '@/utils/extractInitials';
import { capitaliseWords } from '@/utils/capitalise';
import { navigateChat } from '@/utils/navigate';
import { getUserId, getLoggedInUser } from '@/api/api.util';

export class GroupDetails extends BaseComponent {
  constructor() {
    super();
    this.id = history.data.params.id;
    this.group = this.query(singleGroupQuery(this.id));
    this.deleteGroup = this.mutation(deleteGroupMutation());
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.group.state.status === 'loading' || this.group.state.status === 'error') {
      return html``;
    }

    const user = getLoggedInUser();
    const isOwner = user.id === this.group.state.data.owner.user_id || user.user_role === 1;
    const ownerName = capitaliseWords(`${this.group.state.data.owner.first_name} ${this.group.state.data.owner.last_name}`);

    return html`
      <div class="group-details rounded border border-primary px-4 py-3 mt-4">
        <x-avatar size="xl" initials=${extractInitials(this.group.state.data.name)} />
        <div class="group-details-header">
          <h2 class="fs-5 mb-0 text-primary">${capitaliseWords(this.group.state.data.name)}</h2>
          <p class="text-dark opacity-75 fs-7">Created by ${ownerName}</p>
        </div>
        <div class="group-details-buttons gap-4">
          ${isOwner ? html`<i
              @click=${() => this.handleDeleteGroup()}
              class="fa-solid fa-trash fs-5 text-danger cursor-pointer hover-opacity">
            </i>` : null}
          <button @click=${() => navigateChat({ id: this.id, name: this.group.state.data.name, type: 'group' }, '/chat')} class="hover-opacity translate-y-1">
            <i class="fa-regular fa-comment-dots fs-3 text-primary"></i>
          </button>
        </div>
      </div>
    `;
  }

  async handleDeleteGroup() {
    await this.deleteGroup.actions.mutate(this.id);
    if (this.deleteGroup.state.status === 'success') {
      history.push('/dashboard/groups');
    } else if (this.deleteGroup.state.status === 'error') {
      this.error.actions.setError('Could not delete group');
    }
  }
}
