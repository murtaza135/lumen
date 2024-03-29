import { BaseComponent, html, history } from 'framework';

export class FileListPage extends BaseComponent {
  constructor() {
    super();
    this.chatSideNav = this.slice('chatSideNav');
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    if (!this.chatFriendsGroups.state.activeFriendOrGroup.id) {
      history.replace('/chat');
    }
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-left');

    return html`
    <chat-backdrop />
      <auth-guard />
      <setup-sockets />
      <error-toast />
      <success-toast />
      <chat-notification />

      <x-backdrop stateSlice="addFileModal" />
      <add-file-modal />

      <x-nav hasAdmin="true" hasHelpdesk="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

      <div class="container position-relative h-100 mb-auto pt-2 pb-4 d-flex flex-grow-1">
        <chat-side-nav class=${`chat-side-nav ${!this.chatSideNav.state.isOpen ? 'hide-small' : ''}`} />
        <file-list-main />
      </div>
    `;
  }

  effect() {
    this.scrollTo({ behavior: 'instant', top: this.scrollHeight });
  }
}
