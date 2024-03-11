import { BaseComponent, html } from 'framework';
import closeImg from '@/assets/close.svg';

export class ChatSideNavTopBar extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.chatSideNav = this.slice('chatSideNav');
  }

  render() {
    this.rootCSSClasses('w-100 position-sticky top-0 bg-white z-1');

    return html`
      <div class="chat-side-nav-top-bar d-flex gap-3 justify-content-between border-bottom border-secondary px-3 text-primary fw-bold fs-5 bg-white">
        <div class="d-flex gap-3">
          <button
            class=${`chat-side-nav-top-bar-button px-1 pb-1 translate-y-1 ${this.chatFriendsGroups.state.activeTab === 'groups' ? 'border-primary' : 'border-transparent'}`}
            @click=${() => this.chatFriendsGroups.actions.activateGroups()}
          >
            Groups
          </button>
          <button
            class=${`chat-side-nav-top-bar-button px-1 pb-1 translate-y-1 ${this.chatFriendsGroups.state.activeTab === 'friends' ? 'border-primary' : 'border-transparent'}`}
            @click=${() => this.chatFriendsGroups.actions.activateFriends()}
          >
            Friends
          </button>
        </div>
        
        <button
          @click=${() => this.chatSideNav.actions.close()}
          class="chat-side-nav-top-bar-close-button hover-opacity -translate-y-2"
        >
          <img src=${closeImg} alt="close" width="32" />
        </button>
      </div>
    `;
  }
}
