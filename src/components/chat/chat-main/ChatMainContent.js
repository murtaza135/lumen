import { BaseComponent, html } from 'framework';
import { socket } from '@/ws/ws';
import { messagesQuery } from '@/api/chat/messagesQuery';

export class ChatMainContent extends BaseComponent {
  constructor() {
    super();
    this.chatSocket = socket('chat');
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.messages = this.query(messagesQuery(this.chatFriendsGroups.state.activeFriendOrGroup.id));
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 d-flex flex-column');

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
              name=${message.name}
              timestamp=${message.date}
              message=${message.content}
              fileName=${message.fileName}
              fileType=${message.fileType}
              fileSrc=${message.fileSrc}
              fileId=${message.fileId}
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
    this.chatSocket.on('receive_message', (data) => {
      console.log(data);
      this.messages.actions.refetch();
    });

    return () => {
      this.chatSocket.off('receive_message');
    };
  }
}
