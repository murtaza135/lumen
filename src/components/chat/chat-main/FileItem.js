import { BaseComponent, html } from 'framework';

export class FileItem extends BaseComponent {
  constructor() {
    super();
    this.name = this.attr('name');
  }

  render() {
    return html`
      <div class="chat-box-file-item rounded bg-light text-primary d-flex flex-column justify-content-center align-items-center gap-2 p-2 hide-scrollbar">
        <i class="fa-solid fa-file-lines fs-1"></i>
        <p class="fs-6 text-center text-break">${this.name}</p>
      </div>
    `;
  }
}
