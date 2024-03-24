/* eslint-disable class-methods-use-this */
import { BaseComponent, html, history } from 'framework';

export class ChatLoadingPage extends BaseComponent {
  constructor() {
    super();
    this.chatSideNav = this.slice('chatSideNav');
    this.redirect = history.data.search.redirect ?? '';
    this.timeoutID = setTimeout(() => {
      if (this.redirect) {
        history.replace(`/${history.data.search.redirect}`);
      }
    }, 1000);
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
        <chat-loading-main tab=${this.redirect} />
      </div>
    `;
  }

  cleanup() {
    if (this.timeoutID) clearTimeout(this.timeoutID);
  }
}
