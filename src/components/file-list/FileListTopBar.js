import { BaseComponent, html, history } from 'framework';
import { uploadFileMutation } from '@/api/files/uploadFileMutation';
import { groupFriendFilesQuery } from '@/api/files/groupFriendFilesQuery';
import { textToTrix } from '@/utils/trix.util';

export class FileListTopBar extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.id = this.chatFriendsGroups.state.activeFriendOrGroup.id;
    this.searchInputRef = this.ref('searchInput');
    this.fileInputRef = this.ref('file');
    this.addFileModal = this.slice('addFileModal');
    this.fileList = this.slice('fileList');
    this.uploadFile = this.mutation(uploadFileMutation());
    this.listFiles = this.query(groupFriendFilesQuery(this.id));
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class="d-flex justify-content-between gap-3 border-bottom border-secondary pb-2">
        <div class="d-flex gap-2 align-items-center">
          <button
            class="bg-primary rounded-circle w-8 h-8 center text-white cursor-pointer hover-opacity"
            @click=${() => this.addFileModal.actions.open()}
          >
            <i class="fa-solid fa-plus fs-6"></i>
          </button>
          <label>
            <input id=${this.fileInputRef.id} type="file" class="d-none" accept=".pdf, .txt" @change=${(event) => this.changeFile(event)}>
            <span class="bg-primary rounded-circle w-8 h-8 center text-white cursor-pointer hover-opacity">
              <i class="fa-solid fa-cloud-arrow-up fs-6 -translate-y-1"></i>
            </span>
          </label>
          <button
            class="bg-primary rounded-circle w-8 h-8 center text-white cursor-pointer hover-opacity"
            @click=${() => this.listFiles.actions.refetch()}
          >
            <i class="fa-solid fa-arrows-rotate fs-6"></i>
          </button>
        </div>
        <div>
          <form @submit=${(event) => this.handleSearchSubmit(event)} class="d-flex gap-2 align-items-center" role="search">
            <input id=${this.searchInputRef.id} class="form-control fs-6" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-primary fs-6" type="submit">Search</button>
          </form>
        </div>
      </div>
    `;
  }

  async changeFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const fileExt = file?.name?.split('.')[file.name.split('.').length - 1];
    const isFileValid = fileExt === 'txt' || fileExt === 'trix' || fileExt === 'pdf';

    if (isFileValid) {
      const fileNameWithoutExt = file.name.split('.').slice(0, file.name.split('.').length - 1).join('');
      const parsedFile = fileExt === 'txt' ? new File([textToTrix(await file.text())], `${fileNameWithoutExt}.trix`, { type: 'text/plain' }) : file;
      const formData = new FormData();
      formData.append('file', parsedFile);
      formData.append('group_id', this.chatFriendsGroups.state.activeFriendOrGroup.id);

      await this.uploadFile.actions.mutate(formData);

      if (this.uploadFile.state.status === 'success') {
        const fileId = this.uploadFile.state.data.file_id;
        history.push(`/file/${fileId}`);
      } else if (this.uploadFile.state.status === 'error') {
        this.error.actions.setError('Invalid file name');
      }
    } else {
      this.error.actions.setError('Invalid file');
    }

    this.fileInputRef.element.value = '';
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const text = this.searchInputRef.element.value;
    this.fileList.actions.setText('');
    this.fileList.actions.setText(text);
  }

  cleanup() {
    this.fileList.actions.setText('');
  }
}
