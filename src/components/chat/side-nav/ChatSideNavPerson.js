import { BaseComponent, converter, html } from 'framework';
import { extractInitials } from '@/utils/extractInitials';

export class ChatSideNavPerson extends BaseComponent {
  constructor() {
    super();
    this.userId = this.attr('userId', converter.number);
    this.name = this.attr('name');
    this.initials = extractInitials(this.name);
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <button
        class="chat-side-nav-person d-flex align-items-center gap-2 cursor-pointer hover-opacity"
        @click=${() => this.chatFriendsGroups.actions.setActiveFriendOrGroup({ id: this.userId, name: this.name })}
      >
        <x-avatar size="sm" initials=${this.initials} />
        <p class="fw-medium text-primary">${this.name}</p>
      </button>
    `;
  }
}
