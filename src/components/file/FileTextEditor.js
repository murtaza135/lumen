/* eslint-disable prefer-destructuring */
import { BaseComponent, html, history } from 'framework';
import { download } from '@/utils/download';
import { uploadFileMutation } from '@/api/files/uploadFileMutation';
import { replaceFileMutation } from '@/api/files/replaceFileMutation';
import { downloadFileQuery } from '@/api/files/downloadFileQuery';
import { deleteFileMutation } from '@/api/files/deleteFileMutation';
import 'trix';
import 'trix/dist/trix.css';
import '@/styles/trix.css';

export class FileTextEditor extends BaseComponent {
  constructor() {
    super();
    this.fileId = history.data.params.id;
    this.trixRef = this.ref('trix');
    this.downloadFile = this.query(downloadFileQuery(this.fileId, { type: 'text' }));
    this.replaceFile = this.mutation(replaceFileMutation(this.fileId));
    this.uploadFile = this.mutation(uploadFileMutation());
    this.error = this.slice('error');
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.deleteFile = this.mutation(deleteFileMutation());
  }

  render() {
    this.rootCSSClasses('w-100 h-100 flex-grow-1 d-flex flex-column');

    if (!this.downloadFile.state.data) {
      return html`
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
      `;
    }

    if (this.downloadFile.state.data.ext !== 'trix') {
      return html`
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
      `;
    }

    return html`
      <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap py-2 border-bottom border-gray mb-3">
          <h2 class="text-primary fs-4">${this.downloadFile.state.data.fileName}</h2>
          <div class="d-flex justify-content-between align-items-center gap-3">
            ${this.replaceFile.state.isFetching ? html`<p class="fs-7 text-gray translate-y-2">Saving...</p>` : null}
            <button
              class="hover-opacity"
              @click=${() => this.handleSave()}  
            >
              <i class="fa-solid fa-floppy-disk fs-4 text-primary translate-y-3"></i>
            </button>
            <button
              class="hover-opacity"
              @click=${() => this.handleDownload()}
            >
              <i class="fa-solid fa-download fs-4 text-primary translate-y-1"></i>
            </button>
            <button
              class="hover-opacity"
              @click=${() => this.handleDelete()}
            >
              <i class="fa-solid fa-trash fs-5 text-danger translate-y-2"></i>
            </button>
            <x-link href="/file-list" class="hover-opacity">
              <i class="fa-solid fa-xmark fs-3 text-danger translate-y-3"></i>
            </x-link>
          </div>
        </div>
        
        <trix-editor id=${this.trixRef.id} input="x" class="trix-content flex-grow-1" autofocus></trix-editor>
      </div>
    `;
  }

  effect() {
    if (!!this.downloadFile.state.data && this.downloadFile.state.data.ext === 'trix') {
      const trix = this.trixRef.element;
      trix.editor.loadJSON(JSON.parse(this.downloadFile.state.data.file));
    }
  }

  handleDownload() {
    const filename = this.downloadFile.state.data?.fileName;
    if (!filename) {
      this.error.actions.setError('Invalid file name');
      return;
    }

    const trix = this.trixRef.element;
    const filenameWithoutExt = filename.split('.').slice(0, filename.split('.').length - 1).join('');
    const file = new File([trix.editor.getDocument().toString()], `${filenameWithoutExt}.txt`);
    download(file);
  }

  async handleDelete() {
    await this.deleteFile.actions.mutate(this.fileId);

    if (this.deleteFile.state.status === 'success') {
      history.replace('/file-list');
    } else if (this.deleteFile.state.status === 'error') {
      this.error.actions.setError('Could not delete file');
    }
  }

  async handleSave() {
    const filename = this.downloadFile.state.data?.fileName;
    if (!filename) {
      this.error.actions.setError('Invalid file name');
      return;
    }

    const trix = this.trixRef.element;
    const trixJSON = JSON.stringify(trix.editor);
    const file = new File([trixJSON], filename, { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('group_id', this.downloadFile.state.data.groupId);

    // trix editor resets to initial file contents when the component rerenders
    // therefore as a temporary band aid, reload the new data back into the trix editor
    // before and after the promise resolves
    const promise = this.replaceFile.actions.mutate(formData);
    trix.editor.loadJSON(JSON.parse(trixJSON));
    await promise;
    trix.editor.loadJSON(JSON.parse(trixJSON));

    if (this.replaceFile.state.status === 'success') {
      const fileId = this.replaceFile.state.data.new_file_id;
      const groupId = this.chatFriendsGroups.state?.activeFriendOrGroup?.type === 'group' ? this.chatFriendsGroups.state?.activeFriendOrGroup?.id : null;
      const groupName = this.chatFriendsGroups.state?.activeFriendOrGroup?.type === 'group' ? this.chatFriendsGroups.state?.activeFriendOrGroup?.name : null;
      history.push(`/file/${fileId}?gid=${groupId}&gname=${groupName}`);
      window.location.reload(); // temporary band aid
    } else if (this.replaceFile.state.status === 'error') {
      this.error.actions.setError('Could not save file, please try again later');
    }
  }
}
