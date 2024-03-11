import { BaseComponent, html, history } from 'framework';
import { uploadFileMutation } from '@/api/files/uploadFileMutation';
import { trixInitialJSON } from '@/utils/trix.util';

export class AddFileModal extends BaseComponent {
  constructor() {
    super();
    this.nameInputRef = this.ref('name');
    this.addFileModal = this.slice('addFileModal');
    this.uploadFile = this.mutation(uploadFileMutation());
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class=${`dashboard-add-modal h-auto px-3 py-5 ${this.addFileModal.state.isOpen ? 'show' : ''}`}>
        <div class="dashboard-add-modal-content hide-scrollbar text-light bg-primary p-5">
          <button
            class="dashboard-add-modal-close-button hover-opacity"
            @click=${() => this.addFileModal.actions.close()}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          
          <h2 class="mb-3 fs-4">Create File</h2>

          <form
            @submit=${(event) => this.handleSubmit(event)}
            class="d-flex flex-column align-items-start gap-3"  
          >
            <div class="w-100 d-flex gap-2">
              <x-input id=${this.nameInputRef.id} type="text" placeholder="Enter new file name" />
              <p class="align-self-end">.trix</p>
            </div>
            <button type="submit" class="btn btn-light text-primary fw-semibold hover-opacity">
              Create
            </button>
          </form>

          ${this.uploadFile.state.isFetching ? html`<x-spinner class="pt-3 d-block text-center" variant="light" />` : null}
        </div>
      </div>
    `;
  }

  async handleSubmit(event) {
    event.preventDefault();

    const fileName = this.nameInputRef.element.value;
    if (!fileName) {
      this.error.actions.setError('Invalid file name');
      return;
    }

    const file = new File([trixInitialJSON], `${fileName}.trix`, { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);

    await this.uploadFile.actions.mutate(formData);

    if (this.uploadFile.state.status === 'success') {
      const fileId = this.uploadFile.state.data.file_id;
      history.push(`/file/${fileId}`);
    } else if (this.uploadFile.state.status === 'error') {
      this.error.actions.setError('Could not create file');
    }
  }

  cleanup() {
    this.addFileModal.actions.close();
  }
}
