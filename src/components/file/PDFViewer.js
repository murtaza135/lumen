/* eslint-disable class-methods-use-this */
import { BaseComponent, html, history } from 'framework';
// import * as pdfjs from '@/lib/pdfjs/build/pdf.mjs';
// import * as pdfWorker from '@/lib/pdfjs/build/pdf.worker.mjs';
import * as pdfjs from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';
import { download } from '@/utils/download';
import { fileApi } from '@/api/api';
import { downloadFileQuery } from '@/api/files/downloadFileQuery';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
const ROTATION_VALUES = [0, 90, 180, 270];

export class PDFViewer extends BaseComponent {
  constructor() {
    super();
    this.fileId = history.data.params.id;
    this.downloadFile = this.query(downloadFileQuery(this.fileId, { type: 'text' }));
    this.pdfDocState = this.state('loading');
    this.pdfValue = null;
    this.pdfDoc = this.state(null);
    this.pdfDocValue = null;
    this.pageNum = this.state(1);
    this.pageIsRendering = this.state(false);
    this.pageNumIsPending = this.state(null);
    this.scale = this.state(1.5);
    this.rotationIndex = this.state(0);

    this.canvasRef = this.ref('canvas');

    this.loadPDF();
  }

  async downloadPDF() {
    if (this.downloadFile.state.data) {
      return this.downloadFile.state.data;
    }

    return downloadFileQuery(this.fileId, { type: 'text' }).queryFn();
  }

  async loadPDF() {
    this.pdfDocState.state = 'loading';
    try {
      this.pdfValue = await this.downloadPDF();
      const pdfDoc = await pdfjs.getDocument(this.pdfValue.src).promise;
      this.pdfDocValue = pdfDoc;
      this.pdfDoc.state = pdfDoc;
      this.renderPage(this.pageNum.state);
      this.pdfDocState.state = 'success';
    } catch {
      this.pdfDocState.state = 'error';
    }
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.pdfDoc.state === null) {
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
          ${this.pdfDocState.state === 'loading' ? html`<x-spinner />` : null}
          ${this.pdfDocState.state === 'error' ? html`<p class="text-danger fs-5 fw-semibold">Could not load file</p>` : null}
        </div>
      `;
    }

    return html`
      <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap py-2 border-bottom border-gray mb-3">
        <h2 class="text-primary fs-4">${this.pdfValue.fileName}</h2>

        <div class="d-flex justify-content-between align-items-center gap-4">
          <div class="d-flex align-items-center gap-2">
            <button
              class="hover-opacity"
              @click=${() => this.showPrevPage()}
            >
              <i class="fa-solid fa-circle-chevron-left fs-3 text-primary translate-y-2"></i>
            </button>
            <span class="text-primary fw-semibold fs-5">
              ${this.pageNum.state ?? 0}/${this.pdfDocValue?.numPages ?? 0}
            </span>
            <button
              class="hover-opacity"
              @click=${() => this.showNextPage()}
            >
              <i class="fa-solid fa-circle-chevron-right fs-3 text-primary translate-y-2"></i>
            </button>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button
              class="hover-opacity"
              @click=${() => this.zoomOut()}
            >
              <i class="fa-solid fa-magnifying-glass-minus text-primary fs-3 translate-y-2"></i>
            </button>
            <span class="text-primary fw-semibold fs-5">
              ${(this.scale.state ?? 0) * 100}%
            </span>
            <button
              class="hover-opacity"
              @click=${() => this.zoomIn()}
            >
              <i class="fa-solid fa-magnifying-glass-plus text-primary fs-3 translate-y-2"></i>
            </button>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button
              class="hover-opacity"
              @click=${() => this.rotate()}
            >
              <i class="fa-solid fa-rotate-right text-primary fs-3 translate-y-2"></i>
            </button>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center gap-3">
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

      <div class="w-100 d-flex justify-content-center overflow-auto">
        <canvas id=${this.canvasRef.id}></canvas>
      </div>
    `;
  }

  showPrevPage() {
    if (this.pageNum.state > 1) {
      this.queueRenderPage(this.pageNum.state - 1);
    }
  }

  showNextPage() {
    if (this.pageNum.state < this.pdfDoc.state?.numPages) {
      this.queueRenderPage(this.pageNum.state + 1);
    }
  }

  zoomOut() {
    if (this.scale.state > 0.5) {
      this.scale.state -= 0.5;
    }
    this.queueRenderPage(this.pageNum.state);
  }

  zoomIn() {
    if (this.scale.state < 5) {
      this.scale.state += 0.5;
    }
    this.queueRenderPage(this.pageNum.state);
  }

  rotate() {
    const maxIndex = ROTATION_VALUES.length - 1;
    if (this.rotationIndex.state < maxIndex) {
      this.rotationIndex.state += 1;
    } else {
      this.rotationIndex.state = 0;
    }
    this.queueRenderPage(this.pageNum.state);
  }

  queueRenderPage(pageNum) {
    if (this.pageIsRendering.state) {
      this.pageNumIsPending.state = pageNum;
    } else {
      this.renderPage(pageNum);
    }
  }

  async renderPage(pageNum) {
    this.pageIsRendering.state = true;

    const page = await this.pdfDocValue.getPage(pageNum);
    const viewport = page.getViewport({
      scale: this.scale.state,
      rotation: ROTATION_VALUES[this.rotationIndex.state],
    });
    this.canvasRef.element.height = viewport.height;
    this.canvasRef.element.width = viewport.width;

    const renderCtx = {
      canvasContext: this.canvasRef.element.getContext('2d'),
      viewport,
    };

    await page.render(renderCtx).promise;

    this.pageIsRendering.state = false;

    if (this.pageNumIsPending.state !== null) {
      this.renderPage(this.pageNumIsPending.state);
      this.pageNumIsPending.state = null;
    }

    this.pageNum.state = pageNum;
  }

  async handleDownload() {
    const doc = await fileApi.get(this.pdfValue.src).blob();
    const file = new File([doc], this.pdfValue.fileName);
    download(file);
  }
}
