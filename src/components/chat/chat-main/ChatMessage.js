import { BaseComponent, converter, html } from 'framework';
import { extractInitials } from '@/utils/extractInitials';
import { capitaliseWords } from '@/utils/capitalise';
import { timeago } from '@/utils/timeago';
import { filterProfanity } from '@/utils/profanity';
import { downloadFileQuery } from '@/api/files/downloadFileQuery';
import { downloadSrc } from '@/utils/download';

export class ChatMessage extends BaseComponent {
  constructor() {
    super();
    this.error = this.slice('error');
    this.name = this.attr('name') ?? '';
    this.initials = extractInitials(this.name);
    this.timestamp = this.attr('timestamp') ?? '';
    this.message = this.attr('message') ?? '';
    this.fileName = this.attr('fileName') ?? null;
    this.fileType = this.attr('fileType') ?? null;
    this.fileSrc = this.attr('fileSrc') ?? null;
    this.fileId = this.attr('fileId', converter.number) ?? null;
    this.file = this.fileId ? this.query(downloadFileQuery(this.fileId, { type: 'text' })) : null;
    this.selectedFileSrc = null;
    this.selectedFileName = null;
    this.selectedFileType = null;
  }

  effectBefore() {
    if (this.fileSrc && this.fileName && this.fileType) {
      this.selectedFileSrc = this.fileSrc;
      this.selectedFileName = this.fileName;
      this.selectedFileType = this.fileType;
    } else if (this.file?.state.status === 'success') {
      this.selectedFileSrc = this.file.state.data.src;
      this.selectedFileName = this.file.state.data.fileName;
      this.selectedFileType = this.file.state.data.mimeType;
    } else {
      this.selectedFileSrc = null;
      this.selectedFileName = null;
      this.selectedFileType = null;
    }
  }

  render() {
    this.rootCSSClasses('w-100');

    const fileDisplay = this.selectedFileType?.startsWith('image/')
      ? html`<img src=${this.selectedFileSrc} alt="attached-image" class="chat-message-image" />`
      : html`
        <div class="chat-message-file-item rounded bg-primary text-light p-2 hide-scrollbar d-flex flex-column cursor-pointer">
          <div class="w-100 my-auto d-flex flex-column align-items-center gap-2 translate-y-2">
            <i class="fa-solid fa-file-lines fs-4"></i>
            <p class="fs-7 text-center text-break">${this.selectedFileName}</p>
          </div>
        </div>
      `;

    return html`
      <div class="d-flex align-items-start gap-3">
        <x-avatar initials=${this.initials} class="flex-shrink-0" />
        <div class="d-flex flex-column flex-grow-1 gap-2">
          <div class="d-flex gap-3 flex-wrap">
            <p class="text-primary fw-semibold">${capitaliseWords(this.name)}</p>
            <p class="chat-message-timestamp">${timeago(this.timestamp)}</p>
          </div>
          <div class=${`d-flex ${!this.selectedFileSrc || !this.selectedFileName || !this.selectedFileType ? 'd-none' : ''}`}>
            ${fileDisplay}
            <button type="button" class="chat-message-download-button text-primary hover-opacity" @click=${() => this.handleDownload()}>
              <i class="fa-solid fa-download fs-5"></i>
            </button>
          </div>
          <p>${filterProfanity(this.message)}</p>
        </div>
      </div>
    `;
  }

  handleDownload() {
    if (!this.selectedFileName || !this.selectedFileSrc || !this.selectedFileType) {
      this.error.actions.setError('Could not download file');
      return;
    }

    downloadSrc(this.selectedFileSrc, this.selectedFileName);
  }
}
