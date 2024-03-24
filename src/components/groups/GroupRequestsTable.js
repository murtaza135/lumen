import { BaseComponent, html, history } from 'framework';
import { memberRequestsQuery } from '@/api/group-member-requests/memberRequestsQuery';
import { acceptMemberRequestMutation } from '@/api/group-member-requests/acceptMemberRequestMutation';
import { rejectMemberRequestMutation } from '@/api/group-member-requests/rejectMemberRequestMutation';
import { capitaliseWords } from '@/utils/capitalise';

// TEMP not implemented by backend API

export class GroupRequestsTable extends BaseComponent {
  constructor() {
    super();
    this.id = history.data.params.id;
    this.groupManagement = this.slice('groupManagement');
    this.memberRequests = this.query(memberRequestsQuery(this.id));
    this.acceptMember = this.mutation(acceptMemberRequestMutation(this.id));
    this.rejectMember = this.mutation(rejectMemberRequestMutation(this.id));
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.memberRequests.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.memberRequests.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load requests.</p>`;
    }

    const requests = this.memberRequests.state.data.filter((request) => {
      const requestName = `${request.first_name.toLowerCase()} ${request.last_name.toLowerCase()}`;
      const searchText = this.groupManagement.state.searchText.toLowerCase();
      return requestName.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${requests.map((request) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user"></i></th>
              <td>${capitaliseWords(request.first_name)} ${capitaliseWords(request.last_name)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i
                    @click=${() => this.acceptMember.actions.mutate(request.user_id)}
                    class="fa-solid fa-xmark fa-xl translate-y-3 text-danger cursor-pointer hover-opacity">
                  </i>
                  <i
                    @click=${() => this.rejectMember.actions.mutate(request.user_id)}
                    class="fa-solid fa-check fs-5 translate-y-2 text-primary cursor-pointer hover-opacity">
                  </i>
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
