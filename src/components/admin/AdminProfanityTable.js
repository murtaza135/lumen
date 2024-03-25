import { BaseComponent, html } from 'framework';
import { allProfaneMessagesQuery } from '@/api/chat/allProfaneMessagesQuery';

// TODO server
// TODO accept and reject profane messages

export class AdminProfanityTable extends BaseComponent {
  constructor() {
    super();
    this.admin = this.slice('admin');
    this.profaneMessages = this.query(allProfaneMessagesQuery());
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.profaneMessages.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.profaneMessages.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-5 center">Could not load chat messages.</p>`;
    }

    const profanity = this.profaneMessages.state.data.filter((message) => {
      const profaneMessage = message.message.toLowerCase();
      const searchText = this.admin.state.searchText.toLowerCase();
      return profaneMessage.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${profanity.map((message) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user"></i></th>
              <td>${message.message}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i class="fa-solid fa-xmark fa-xl translate-y-3 text-danger cursor-pointer hover-opacity"></i>
                  <i class="fa-solid fa-check fs-5 translate-y-2 text-primary cursor-pointer hover-opacity"></i>
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
