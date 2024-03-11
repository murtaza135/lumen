/* eslint-disable prefer-destructuring */
import { BaseComponent, html, history } from 'framework';
import { download } from '@/utils/download';
import { uploadFileMutation } from '@/api/files/uploadFileMutation';
import { downloadFileQuery } from '@/api/files/downloadFileQuery';
import 'trix';
import 'trix/dist/trix.css';
import '@/styles/trix.css';

// TODO update/replace file
// TODO filename replacement

export class FileTextEditor extends BaseComponent {
  constructor() {
    super();
    this.fileId = history.data.params.id;
    this.trixRef = this.ref('trix');
    this.downloadFile = this.query(downloadFileQuery(this.fileId, { type: 'text' }));
    this.uploadFile = this.mutation(uploadFileMutation());
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100 h-100 flex-grow-1 d-flex flex-column');

    if (!this.downloadFile.state.data) {
      return html`
        <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap py-2 border-bottom border-gray mb-3">
          <h2 class="text-primary fs-4">File Name</h2>

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
          <h2 class="text-primary fs-4">File Name</h2>

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
          <h2 class="text-primary fs-4">File Name</h2>
          <div class="d-flex justify-content-between align-items-center gap-3">
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
    const filename = this.downloadFile.state.data?.filename;
    if (!filename) {
      this.error.actions.setError('Invalid file name');
      return;
    }

    const trix = this.trixRef.element;
    const filenameWithoutExt = filename.split('.').slice(0, filename.split('.').length - 1).join('');
    const file = new File([trix.editor.getDocument().toString()], `${filenameWithoutExt}.txt`);
    download(file);
  }

  async handleSave() {
    const filename = this.downloadFile.state.data?.filename;
    if (!filename) {
      this.error.actions.setError('Invalid file name');
      return;
    }

    const trix = this.trixRef.element;
    const file = new File([JSON.stringify(trix.editor)], filename, { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);

    await this.uploadFile.actions.mutate(formData);

    if (this.uploadFile.state.status === 'error') {
      this.error.actions.setError('Could not save file, please try again later');
    }
  }
}
