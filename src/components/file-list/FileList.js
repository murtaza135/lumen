import { BaseComponent, html } from 'framework';
import { groupFriendFilesQuery } from '@/api/files/groupFriendFilesQuery';
import { deleteFileMutation } from '@/api/files/deleteFileMutation';
import { timeago } from '@/utils/timeago';

export class FileList extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.id = this.chatFriendsGroups.state.activeFriendOrGroup.id;
    this.fileList = this.slice('fileList');
    this.files = this.query(groupFriendFilesQuery(this.id));
    this.deleteFile = this.mutation(deleteFileMutation());
  }

  render() {
    this.rootCSSClasses('w-100');

    if (!this.chatFriendsGroups.state.activeFriendOrGroup.id) {
      return html`
        <div class="chat-main-content position-relative d-flex flex-column flex-grow-1 gap-5">
          <div class="flex-grow-1 d-flex flex-column justify-content-end gap-4 align-items-center pb-5">
            <i class="fa-solid fa-hand-pointer text-primary chat-bubble-size"></i>
            <p class="text-primary fs-4 fw-semibold text-center">Please select a group</p>
          </div>
        </div>
      `;
    }

    if (this.files.state.status === 'loading') {
      return html`<x-spinner class="center mt-4" />`;
    }

    if (this.files.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-4 center">Could not load files.</p>`;
    }

    if (this.files.state.data.length === 0) {
      return html`<p class="text-primary fw-medium mt-3 center">This group has no files.</p>`;
    }

    const files = this.files.state.data.filter((file) => {
      const fileName = file.fileName.toLowerCase();
      const searchText = this.fileList.state.text.toLowerCase();
      return fileName.includes(searchText);
    });

    return html`
      <div class="d-flex flex-column gap-3">
        ${files.map((file) => html`
          <div class="d-flex align-items-center gap-4 border-bottom border-secondary pb-2">
            <div class="rounded-circle w-12 h-12 bg-primary center">
              <i class="fa-solid fa-file fs-4 text-light"></i>
            </div>
            <div class="d-flex flex-column align-items-start">
              <x-link href=${`/file/${file.fileID}`} class="text-primary fw-semibold hover-underline">${file.fileName}</x-link>
              <p class="file-list-item-timestamp">${timeago(this.timestamp)}</p>
            </div>
            <div class="d-flex align-items-center justify-content-end gap-3 px-2 ms-auto">
                <i
                  @click=${() => this.deleteFile.actions.mutate(file.fileID)}
                  class="fa-solid fa-trash fs-5 text-danger cursor-pointer hover-opacity -translate-x-1">
                </i>
                <x-link href=${`/file/${file.fileID}`} class="hover-opacity">
                  <i class="fa-solid fa-pen-to-square text-primary fs-5"></i>
                </x-link>
              </div>
          </div>
        `)}
      </div>
    `;
  }
}
