import { BaseComponent, html } from 'framework';
import { zoom } from '@/utils/zoom/Zoom';

export class ZoomPanel extends BaseComponent {
  constructor() {
    super();
    this.video = this.state(false);
    this.audio = this.state(true);
  }

  render() {
    return html`
      <div class="zoom-panel fs-6 text-primary rounded px-3 py-2">
        <button @click=${() => this.toggleVideo()} class="rounded-circle bg-white w-8 h-8 center hover-opacity position-relative">
          <i class="fa-solid fa-video"></i>
          ${!this.video.state ? html`<div class="zoom-panel-strike"></div>` : null}
        </button>
        <button @click=${() => this.toggleAudio()} class="rounded-circle bg-white w-8 h-8 center hover-opacity">
          ${this.audio.state ? html`<i class="fa-solid fa-microphone"></i>` : html`<i class="fa-solid fa-microphone-slash"></i>`}
        </button>
        <button @click=${() => this.leave()} class="rounded-circle bg-white w-8 h-8 center hover-opacity text-danger">
          <i class="fa-solid fa-phone-slash"></i>
        </button>
      </div>
    `;
  }

  async toggleVideo() {
    if (this.video.state) {
      await zoom.stopVideo();
      this.video.state = false;
    } else {
      await zoom.startVideo();
      this.video.state = true;
    }
  }

  toggleAudio() {
    if (this.audio.state) {
      zoom.mute();
      this.audio.state = false;
    } else {
      zoom.unmute();
      this.audio.state = true;
    }
  }

  leave() {
    this.video.state = false;
    this.audio.state = true;
    zoom.leave();
  }
}
