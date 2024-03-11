import { BaseComponent, html, converter } from 'framework';
import arrowRightImg from '@/assets/arrow-right.svg';

export class ChatSideNavGroup extends BaseComponent {
  constructor() {
    super();
    this.name = this.attr('name');
    this.active = this.attr('active', converter.boolean);
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
  }

  render() {
    this.rootCSSClasses('w-100');

    const isActive = this.chatFriendsGroups.state.activeFriendOrGroup === this.name;

    return html`
      <div class="chat-side-nav-group">
        <!-- group name -->
        <button 
          class="group-name d-flex align-items-center gap-1 hover-opacity cursor-pointer"
          @click=${() => this.chatFriendsGroups.actions.setActiveFriendOrGroup(this.name)}
        >
          <img src=${arrowRightImg} alt="group-arrow" width="35" />
          <p class=${`fs-5 text-primary ${isActive ? 'fw-bold' : 'fw-medium'}`}>${this.name}</p>
        </button>

        <!-- people in group -->
        <div class="group-list d-flex flex-column gap-2">
          ${this.childrenHTML}
        </div>
      </div>
    `;
  }
}
