import { BaseComponent, html, history } from 'framework';
import { downloadFileQuery } from '@/api/files/downloadFileQuery';

// TODO filename replacement

export class FilePage extends BaseComponent {
  constructor() {
    super();
    this.fileId = history.data.params.id;
    this.downloadFile = this.query(downloadFileQuery(this.fileId, { type: 'text' }));
    this.chatFriendsGroups = this.slice('chatFriendsGroups');

    if (history.data.search.gid && history.data.search.gname) {
      this.chatFriendsGroups.actions.setActiveFriendOrGroup({ id: Number(history.data.search.gid), name: history.data.search.gname, type: 'group' });
      this.chatFriendsGroups.actions.activateGroups();
    }
  }

  render() {
    this.rootCSSClasses('min-vh-100 h-100 d-flex flex-column justify-content-center align-items-left');

    if (!this.downloadFile.state.data) {
      return html`
        <auth-guard />
        <setup-sockets />
        <error-toast />
        <success-toast />
        <chat-notification />
        <x-nav hasAdmin="true" hasHelpdesk="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

        <div class="container h-100 mb-auto pb-3 flex-grow-1 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap py-2 border-bottom border-gray mb-3">
            <h2 class="text-primary fs-4"></h2>

            <div class="d-flex justify-content-between align-items-center gap-3">
              <x-link href="/file-list" class="hover-opacity">
                <i class="fa-solid fa-xmark fs-3 text-danger translate-y-3"></i>
              </x-link>
            </div>
          </div>

          <div class="w-100 d-flex justify-content-center align-items-center">
            ${this.downloadFile.state.status === 'loading' ? html`<x-spinner />` : null}
            ${this.downloadFile.state.status === 'error' ? html`<p class="text-danger fs-5 fw-semibold">Could not load file</p>` : null}
          </div>
        </div>
      `;
    }

    if (this.downloadFile.state.data.ext !== 'trix' && this.downloadFile.state.data.ext !== 'pdf') {
      return html`
        <auth-guard />
        <error-toast />
        <x-nav hasAdmin="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

        <div class="container h-100 mb-auto pb-3 flex-grow-1 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap py-2 border-bottom border-gray mb-3">
            <h2 class="text-primary fs-4"></h2>

            <div class="d-flex justify-content-between align-items-center gap-3">
              <x-link href="/file-list" class="hover-opacity">
                <i class="fa-solid fa-xmark fs-3 text-danger translate-y-3"></i>
              </x-link>
            </div>
          </div>

          <div class="w-100 d-flex justify-content-center align-items-center">
            <p class="text-danger fs-5 fw-semibold">Invalid file format</p>
          </div>
        </div>
      `;
    }

    return html`
      <auth-guard />
      <error-toast />
      <x-nav hasAdmin="true" hasDashboard="true" hasLogout="true" hasUserProfile="true" />

      <div class="container h-100 mb-auto pb-3 flex-grow-1 d-flex flex-column">
        ${this.downloadFile.state.data.ext === 'trix' ? html`<file-text-editor />` : null}
        ${this.downloadFile.state.data.ext === 'pdf' ? html`<pdf-viewer />` : null}
      </div>
    `;
  }
}
