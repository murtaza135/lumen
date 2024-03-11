import { BaseComponent, html } from 'framework';

export class FileListMain extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 file-list-page-height d-flex flex-column chat-main-scrollbar');

    return html`
      <div class="chat-main d-flex flex-column gap-4 position-relative flex-grow-1">
        <chat-main-top-bar />
        <div class="file-list-main-content d-flex flex-column gap-4">
          <file-list-top-bar />
          <file-list />
        </div>
      </div>
    `;
  }
}
