import { BaseComponent, html } from 'framework';
import { allUsersQuery } from '@/api/users/allUsersQuery';
import { deleteUserMutation } from '@/api/users/deleteUserMutation';
import { timeago } from '@/utils/timeago';
import { capitaliseWords, capitalizeFirstLetter } from '@/utils/capitalise';

// TODO <td>Last online ${timeago(user.timeLastSeen)}</td>

export class AdminUsersTable extends BaseComponent {
  constructor() {
    super();
    this.admin = this.slice('admin');
    this.users = this.query(allUsersQuery());
    this.deleteUser = this.mutation(deleteUserMutation());
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.users.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.users.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load users.</p>`;
    }

    const users = this.users.state.data.filter((user) => {
      const userName = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
      const searchText = this.admin.state.searchText.toLowerCase();
      return userName.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${users.map((user) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user text-primary translate-y-3"></i></th>
              <td>${capitaliseWords(user.first_name)} ${capitalizeFirstLetter(user.last_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i 
                    @click=${() => this.deleteUser.actions.mutate(user.user_id)}
                    class="fa-solid fa-ban fs-5 translate-y-3 text-danger cursor-pointer hover-opacity"
                  />
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
