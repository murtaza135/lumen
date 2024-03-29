import { BaseComponent, html, history } from 'framework';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';
import folderOpenImg from '@/assets/folder-open.svg';
import { capitaliseWords } from '@/utils/capitalise';
import { socket } from '@/ws/ws';
import { getToken } from '@/api/api.util';
import { zoom } from '@/utils/zoom/Zoom';

export class ChatMainTopBar extends BaseComponent {
  constructor() {
    super();
    this.tab = this.attr('tab') ?? '';
    this.path = history.data.pathname;
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100 position-sticky top-0 z-1');

    return html`
      <div class="chat-main-top-bar d-flex align-items-center flex-wrap border-bottom border-secondary bg-white">
        <div class="d-flex align-items-center">
          <chat-side-nav-toggle-button class="show-small-block" />
          <h2 class="title-heading text-primary fw-semibold -translate-y-2">
            ${capitaliseWords(this.chatFriendsGroups.state.activeFriendOrGroup?.name ?? '')}
          </h2>
        </div>
        
        <div class="chat-main-top-bar-icons d-flex align-items-center h-100 flex-grow-1">
          ${this.chatFriendsGroups.state.activeFriendOrGroup.id ? html`<x-link href="/chat" class=${`hover-opacity w-10 h-100 center px-1 pb-2 translate-y-2 ${this.path === '/chat' || this.tab === 'chat' ? 'active' : ''}`}>
            <img src=${chatDotsFillImg} alt="chat" class="w-6 h-6"  />
          </x-link>` : null}
          ${this.chatFriendsGroups.state.activeFriendOrGroup?.type === 'group' ? html`<x-link href="/file-list" class=${`hover-opacity w-9 h-100 center px-1 pb-2 translate-y-2 ${this.path === '/file-list' || this.tab === 'file-list' ? 'active' : ''}`}>
            <img src=${folderOpenImg} alt="files" class="w-6 h-6" />
          </x-link>` : null}
          ${this.chatFriendsGroups.state.activeFriendOrGroup?.type === 'group' ? html`<x-link href=${`/chat/members/${this.chatFriendsGroups.state.activeFriendOrGroup.id}`} class=${`hover-opacity w-9 h-100 center px-1 pb-2 translate-y-3 ${this.path?.includes('chat/members') || this.tab?.includes('chat/members') ? 'active' : ''}`}>
            <i class="fa-solid fa-user-group text-primary fs-5 translate-y-1"></i>
          </x-link>` : null}
          ${this.chatFriendsGroups.state.activeFriendOrGroup?.type === 'friend' ? html`<button @click=${() => this.startCall()} class="hover-opacity fs-5 text-primary -translate-y-3 ms-auto">
            <i class="fa-solid fa-phone"></i>
          </button>` : null}
        </div>
      </div>
    `;
  }

  startCall() {
    const { id, name } = this.chatFriendsGroups.state.activeFriendOrGroup;
    if (id) {
      socket('global')?.emit('startcall', {
        token: getToken(),
        recipient: id,
      });
    }

    setTimeout(() => {
      if (!zoom.visible) {
        this.error.actions.setError(`${capitaliseWords(name)} is not online.`);
      }
    }, 5000);
  }
}
