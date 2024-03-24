import { BaseComponent, html } from 'framework';
import { socket } from '@/ws/ws';
import { messagesQuery } from '@/api/chat/messagesQuery';

export class ChatMainContent extends BaseComponent {
  constructor() {
    super();
    // this.chatSocket = socket('global');
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.messages = null;
  }

  effectBefore() {
    if (this.chatFriendsGroups.state.activeFriendOrGroup.id) {
      this.messages = this.query(messagesQuery(
        this.chatFriendsGroups.state.activeFriendOrGroup.id,
        this.chatFriendsGroups.state.activeFriendOrGroup.type,
      ));
    } else {
      this.messages = null;
    }
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 d-flex flex-column');

    if (!this.chatFriendsGroups.state.activeFriendOrGroup.id) {
      return html`
        <x-spinner class="center" />
      `;
    }

    if (this.messages.state.status === 'loading') {
      return html`
        <x-spinner class="center" />
      `;
    }

    if (this.messages.state.status === 'error') {
      return html`
        <p class="text-danger text-center">Could not load chat</p>
      `;
    }

    return html`
      <div class="chat-main-content position-relative d-flex flex-column flex-grow-1 gap-4">
        <div class="flex-grow-1 d-flex flex-column justify-content-end gap-4">
          ${this.messages.state.data.map((message) => html`
            <chat-message
              name=${message.userName}
              timestamp=${message.timestamp}
              message=${message.content}
              fileId=${message.files[0].fileID}
            />
          `)}
        </div>

        <div class="position-sticky bottom-0 pb-3 flex-shrink-0 bg-white mt-auto">
          <chat-box />
        </div>
      </div>
    `;
  }

  effect() {
    // const listener = (data) => {
    //   console.log(data);
    //   this.messages.actions.refetch();
    // };

    // socket('global').on('receive_message', listener);

    // return () => {
    //   socket('global').off('receive_message', listener);
    // };
  }
}
