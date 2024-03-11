import { BaseComponent, html } from 'framework';
import { timeago } from '@/utils/timeago';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';

const data = {
  members: [
    {
      id: 1,
      name: 'John Doe',
      timeLastSeen: '2024/01/01',
    },
    {
      id: 2,
      name: 'Mary Wilson',
      timeLastSeen: '2024/01/01',
    },
  ],
};

export class AdminMessagesTable extends BaseComponent {
  constructor() {
    super();
    this.admin = this.slice('admin');
  }

  render() {
    this.rootCSSClasses('w-100');

    const messages = data.members.filter((member) => {
      const memberName = member.name.toLowerCase();
      const searchText = this.admin.state.searchText.toLowerCase();
      return memberName.includes(searchText);
    });

    return html`
      <table class="table">
        <tbody>
          ${messages.map((friend) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user"></i></th>
              <td>${capitaliseWords(friend.name)}</td>
              <td>Last online ${timeago(friend.timeLastSeen)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i 
                    @click=${() => this.finishConversation()}
                    class="fa-solid fa-check fs-5 translate-y-4 text-primary cursor-pointer hover-opacity"
                  />
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
    this.admin.actions.resetSearchText();
  }

  finishConversation() {

  }
}
