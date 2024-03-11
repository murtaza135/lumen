import { BaseComponent, history, html } from 'framework';
import { createGroupMutation } from '@/api/groups-created/createGroupMutation';
import userSVG from '@/assets/user.svg';

export class CreateGroupForm extends BaseComponent {
  constructor() {
    super();
    this.formRef = this.ref('form');
    this.nameRef = this.ref('name');

    this.error = this.slice('error');
    this.createGroup = this.mutation(createGroupMutation());
  }

  render() {
    this.rootCSSClasses('w-100 center');

    return html`
      <x-form @submit=${() => this.handleSubmit()} class="login-form py-5 bg-primary rounded">
        <h2>Create New Group</h2>
        <x-input id=${this.nameRef.id} type="text" label="Name" placeholder="Enter new group name" icon=${userSVG} />
        <button type="submit" class="login-form-submit-button btn btn-light w-100 text-primary fw-bold">Create New Group</button>
      </x-form>
    `;
  }

  async handleSubmit() {
    const newGroupDetails = {
      group_name: this.nameRef.element.value,
    };

    if (!newGroupDetails.group_name) {
      this.error.actions.setError('Invalid or missing group details');
      return;
    }

    await this.createGroup.actions.mutate(newGroupDetails);

    if (this.createGroup.state.status === 'success') {
      history.push(`manage-group/${this.createGroup.state.data.group_id}`);
    } else if (this.createGroup.state.status === 'error') {
      this.error.actions.setError('Could not create group');
    }
  }
}
