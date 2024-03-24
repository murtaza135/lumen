/* eslint-disable class-methods-use-this */
import { BaseComponent, html } from 'framework';
import { socket } from '@/ws/ws';
import { zoom } from '@/utils/zoom/Zoom';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';

export class ChatPage extends BaseComponent {
  constructor() {
    super();
    this.chatSideNav = this.slice('chatSideNav');
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-left');

    return html`
      <chat-backdrop />
      <auth-guard />
      <chat-loader />
      <setup-sockets />
      <error-toast />
      <x-nav hasAdmin="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

      <div class="container position-relative h-100 mb-auto pt-2 pb-4 d-flex flex-grow-1">
        <chat-side-nav class=${`chat-side-nav ${!this.chatSideNav.state.isOpen ? 'hide-small' : ''}`} />
        <chat-main />
      </div>
    `;
  }

  // effectBefore() {
  //   const name = capitaliseWords(getLoggedInUser().first_name);

  //   const startCall = async ({ zoomToken, tpc }) => {
  //     await zoom.join(zoomToken, tpc, name);
  //     zoom.startAudio();
  //     zoom.show();
  //   };

  //   socket('global').on('start_call', startCall);

  //   return () => {
  //     socket('global').off('start_call', startCall);
  //   };
  // }
}

// <zoom-accept-reject-panel />
