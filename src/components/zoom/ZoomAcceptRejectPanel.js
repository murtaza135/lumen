/* eslint-disable prefer-destructuring */
import { BaseComponent, html } from 'framework';
import { socket } from '@/ws/ws';
import { zoom } from '@/utils/zoom/Zoom';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';
import { userQuery } from '@/api/users/userQuery';
import { ringtone } from '@/utils/zoom/ringtone';

export class ZoomAcceptRejectPanel extends BaseComponent {
  constructor() {
    super();
    this.show = this.state(false);
    this.from = this.state('');
    this.zoomToken = null;
    this.tpc = null;
  }

  render() {
    if (this.show.state) {
      return html`
      <div class="zoom-accept-reject-panel">
        <div class="zoom-accept-reject-panel-container d-flex flex-column gap-4">
          <zoom-avatar name=${this.from.state} variant="light" />
          <div class="d-flex justify-content-around">
            <button @click=${() => this.accept()} class="bg-light w-12 h-12 rounded-circle center text-success fs-5 hover-opacity">
              <i class="fa-solid fa-phone translate-y-1"></i>
            </button>
            <button @click=${() => this.reject()} class="bg-danger w-12 h-12 rounded-circle center text-light fs-5 hover-opacity">
              <i class="fa-solid fa-phone-slash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    }

    return html``;
  }

  effectBefore() {
    const incomingCall = async ({ from, zoomToken, tpc }) => {
      this.zoomToken = zoomToken;
      this.tpc = tpc;
      const data = await userQuery(from).queryFn();
      this.from.state = data.first_name;
      this.show.state = true;
      ringtone.load();
      ringtone.play();
    };

    socket('global')?.on('incoming_call', incomingCall);

    return () => {
      socket('global')?.off('incoming_call', incomingCall);
    };
  }

  async accept() {
    const zoomToken = this.zoomToken;
    const tpc = this.tpc;
    const name = capitaliseWords(getLoggedInUser().first_name);
    this.reset();
    ringtone.pause();
    await zoom.join(zoomToken, tpc, name);
    zoom.startAudio();
    zoom.show();
  }

  reject() {
    this.reset();
    ringtone.pause();
  }

  reset() {
    this.show.state = false;
    this.from.state = '';
    this.zoomToken = null;
    this.tpc = null;
  }
}
