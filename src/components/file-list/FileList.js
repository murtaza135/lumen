import { BaseComponent, html } from 'framework';
import { groupFriendFilesQuery } from '@/api/files/groupFriendFilesQuery';
import { deleteFileMutation } from '@/api/files/deleteFileMutation';
import { timeago } from '@/utils/timeago';

const id = 1;

export class FileList extends BaseComponent {
  constructor() {
    super();
    this.fileList = this.slice('fileList');
    this.files = this.query(groupFriendFilesQuery(id));
    this.deleteFile = this.mutation(deleteFileMutation());
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.files.state.status === 'loading') {
      return html`<x-spinner class="center mt-4" />`;
    }

    if (this.files.state.status === 'error') {
      return html`<p class="text-danger fs-5 fw-medium mt-4 center">Could not load files.</p>`;
    }

    const files = this.files.state.data.filter((file) => {
      const fileName = file.file_name.toLowerCase();
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
              <x-link href=${`/file/${file.file_id}`} class="text-primary fw-semibold hover-underline">${file.file_name}</x-link>
              <p class="file-list-item-timestamp">${timeago(this.timestamp)}</p>
            </div>
            <div class="d-flex align-items-center justify-content-end gap-3 px-2 ms-auto">
                <i
                  @click=${() => this.deleteFile.actions.mutate(file.file_id)}
                  class="fa-solid fa-xmark fa-xl text-danger cursor-pointer hover-opacity">
                </i>
                <x-link href=${`/file/${file.file_id}`} class="hover-opacity">
                  <i class="fa-solid fa-pen-to-square text-primary fs-5"></i>
                </x-link>
              </div>
          </div>
        `)}
      </div>
    `;
  }
}
