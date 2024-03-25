import { BaseComponent, html } from 'framework';
import { messagesQuery } from '@/api/chat/messagesQuery';

export class ChatMainContent extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.messages = null;

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
        <div class="chat-main-content position-relative d-flex flex-column flex-grow-1 gap-5">
          <div class="flex-grow-1 d-flex flex-column justify-content-end gap-4 align-items-center pb-5">
            <i class="fa-solid fa-hand-pointer text-primary chat-bubble-size"></i>
            <p class="text-primary fs-4 fw-semibold text-center">Please select a group or friend</p>
          </div>

          <div class="position-sticky bottom-0 pb-3 flex-shrink-0 bg-white mt-auto">
            <chat-box />
          </div>
        </div>
      `;
    }

    if (!this.messages) {
      return html`<x-spinner class="center" />`;
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

    if (this.messages.state.data.length === 0) {
      return html`
        <div class="chat-main-content position-relative d-flex flex-column flex-grow-1 gap-5">
          <div class="flex-grow-1 d-flex flex-column justify-content-end gap-4 align-items-center pb-5">
            <i class="fa-solid fa-comment-dots text-primary chat-bubble-size"></i>
            <p class="text-primary fs-4 fw-semibold text-center">Type something to start chatting!</p>
          </div>

          <div class="position-sticky bottom-0 pb-3 flex-shrink-0 bg-white mt-auto">
            <chat-box />
          </div>
        </div>
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
              fileId=${message.files?.[0]?.fileID}
              fileSrc=${message.files?.[0]?.fileSrc}
              fileName=${message.files?.[0]?.fileName}
              fileType=${message.files?.[0]?.mimeType}
            />
          `)}
        </div>

        <div class="position-sticky bottom-0 pb-3 flex-shrink-0 bg-white mt-auto">
          <chat-box />
        </div>
      </div>
    `;
  }
}
