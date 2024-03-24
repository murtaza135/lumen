/* eslint-disable class-methods-use-this */
import ZoomVideo, { VideoQuality } from '@zoom/videosdk';
import { ZoomUserDOM } from './ZoomUserDOM';

export class Zoom {
  constructor() {
    this.client = ZoomVideo.createClient();
    this.stream = null;
    this.containerEl = document.querySelector('video-player-container');
    this.visible = false;
    this.zoomUser = null;
    this.zoomUsers = {};
  }

  async init() {
    await this.client.init('en-US', 'Global', { patchJsMedia: true });
  }

  show() {
    this.visible = true;
    document.body.classList.add('overflow-hidden');
    this.containerEl.classList.add('show');
    this.containerEl.style.display = 'flex';
    document.querySelector('zoom-panel').classList.add('show');
    document.querySelector('zoom-panel').style.display = 'block';
  }

  hide() {
    this.visible = false;
    document.body.classList.remove('overflow-hidden');
    this.containerEl.classList.remove('show');
    this.containerEl.style.display = 'none';
    document.querySelector('zoom-panel').classList.remove('show');
    document.querySelector('zoom-panel').style.display = 'none';
  }

  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  async join(token, tpc, username) {
    await this.client.join(tpc, token, username);
    this.stream = this.client.getMediaStream();
  }

  async leave() {
    this.stopAudio();
    this.stopVideo();
    await Promise.all(Object.values(this.zoomUsers).map((user) => user.destruct()));
    this.zoomUsers = {};
    this.zoomUser = null;
    this.client.leave();
    this.hide();
  }

  async startVideo() {
    await this.stream?.startVideo();
    await this.zoomUser?.showVideo(VideoQuality.Video_720P);
  }

  async stopVideo() {
    await this.stream?.stopVideo();
    await this.zoomUser.hideVideo();
  }

  startAudio() {
    this.stream?.startAudio();
  }

  stopAudio() {
    this.stream?.stopAudio();
  }

  mute() {
    this.stream?.muteAudio();
  }

  unmute() {
    this.stream?.unmuteAudio();
  }
}

export const zoom = new Zoom();

zoom.client.on('user-added', (users) => {
  users.forEach((user) => {
    if (!(user.userId in zoom.zoomUsers)) {
      zoom.zoomUsers[user.userId] = new ZoomUserDOM(zoom, user.userId);
      if (user.userId === zoom.client.getCurrentUserInfo().userId) {
        zoom.zoomUser = zoom.zoomUsers[user.userId];
      }
    }
  });
});

zoom.client.on('user-removed', (users) => {
  users.forEach(async (user) => {
    if (user.userId in zoom.zoomUsers) {
      await zoom.zoomUsers[user.userId].destruct();
      delete zoom.zoomUsers[user.userId];
    }
  });
});

zoom.client.on('video-active-change', async ({ state, userId }) => {
  try {
    if (state === 'Active') {
      zoom.zoomUsers[userId].showVideo(VideoQuality.Video_360P);
    } else {
      zoom.zoomUsers[userId].hideVideo(VideoQuality.Video_360P);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('warning: could not toggle video');
  }
});

await zoom.init();
