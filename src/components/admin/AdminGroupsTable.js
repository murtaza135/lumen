import { BaseComponent, html } from 'framework';
import { allGroupsQuery } from '@/api/groups/allGroupsQuery';
import { capitaliseWords } from '@/utils/capitalise';

export class AdminGroupsTable extends BaseComponent {
  constructor() {
    super();
    this.admin = this.slice('admin');
    this.groups = this.query(allGroupsQuery());
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.groups.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.groups.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load groups.</p>`;
    }

    const groups = this.groups.state.data.filter((group) => {
      const groupName = group.group_name.toLowerCase();
      const searchText = this.admin.state.searchText.toLowerCase();
      return groupName.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${groups.map((group) => html`
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
    `;
  }

  cleanup() {
    this.admin.actions.resetSearchText();
  }
}
