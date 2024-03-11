import { BaseComponent, history, html } from 'framework';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';
import { deleteGroupMutation } from '@/api/groups-created/deleteGroupMutation';
import { extractInitials } from '@/utils/extractInitials';
import { capitaliseWords } from '@/utils/capitalise';

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

    return html`
      <div class="group-details rounded border border-primary px-4 py-3 mt-4">
        <x-avatar size="xl" initials=${extractInitials(this.group.state.data.group_name)} />
        <div>
          <h2 class="fs-5 mb-0 text-primary">${capitaliseWords(this.group.state.data.group_name)}</h2>
          <p class="text-dark opacity-75 fs-7">Group ID: ${this.id}</p>
        </div>
        <div class="group-details-buttons">
          <i
            @click=${() => this.handleDeleteGroup()}
            class="fa-solid fa-xmark fs-3 text-danger cursor-pointer hover-opacity">
          </i>
          <x-link href="/chat" class="hover-opacity">
            <i class="fa-regular fa-comment-dots fs-3 text-primary"></i>
          </x-link>
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
