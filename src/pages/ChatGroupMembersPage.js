/* eslint-disable class-methods-use-this */
import { BaseComponent, html, history } from 'framework';
import { socket } from '@/ws/ws';
import { zoom } from '@/utils/zoom/Zoom';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';

export class ChatGroupMembersPage extends BaseComponent {
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
      <x-nav hasAdmin="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

      <div class="container position-relative h-100 mb-auto pt-2 pb-4 d-flex flex-grow-1">
        <chat-side-nav class=${`chat-side-nav ${!this.chatSideNav.state.isOpen ? 'hide-small' : ''}`} />
        <chat-members-main />
      </div>
    `;
  }
}
