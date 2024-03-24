/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { extractInitials } from '../extractInitials';

export class ZoomUserDOM {
  constructor(zoom, userId) {
    this.zoom = zoom;
    this._zoomEl = document.querySelector('video-player-container');
    this.userId = userId;
    this._containerEl = null;
    this._avatarEl = null;
    this._nameEl = null;
    this._videoEl = null;

    this._createContainer();
    this._createAvatar();
  }

  element() {
    return this._containerEl;
  }

  async showVideo(quality) {
    this._destroyAvatar();
    await this._createVideo(quality);
    this._createName();
  }

  async hideVideo() {
    await this._destroyVideo();
    this._destroyName();
    this._createAvatar();
  }

  async destruct() {
    await this._destroyContainer();
  }

  _createContainer() {
    if (!this._containerEl) {
      this._containerEl = document.createElement('div');
      this._containerEl.classList.add('zoom-user-container');
      this._zoomEl.appendChild(this._containerEl);
    }
  }

  async _destroyContainer() {
    try {
      await this._destroyVideo();
      this._destroyName();
      this._destroyAvatar();
      this._zoomEl.removeChild(this._containerEl);
    } catch {
      console.log('warning: could not destroy zoom user container');
    }
  }

  _createAvatar() {
    if (!this._avatarEl && this._containerEl) {
      this._avatarEl = document.createElement('zoom-avatar');
      this._avatarEl.name = this._getUserInfo().displayName;
      this._avatarEl.initials = extractInitials(this._getUserInfo().displayName);
      this._containerEl.appendChild(this._avatarEl);
    }
  }

  _destroyAvatar() {
    try {
      this._containerEl.removeChild(this._avatarEl);
      this._avatarEl = null;
    } catch {
      console.log('warning: could not destroy zoom user avatar');
    }
  }

  _createName() {
    if (!this._nameEl && this._containerEl) {
      this._nameEl = document.createElement('p');
      this._nameEl.innerText = this._getUserInfo().displayName;
      this._nameEl.classList.add('video-player-display-name');
      this._containerEl.appendChild(this._nameEl);
    }
  }

  _destroyName() {
    try {
      this._containerEl.removeChild(this._nameEl);
      this._nameEl = null;
    } catch {
      console.log('warning: could not destroy zoom user name tag');
    }
  }

  async _createVideo(quality) {
    if (!this._videoEl && this._containerEl) {
      this._videoEl = await this.zoom.stream?.attachVideo(this.userId, quality);
      this._containerEl.appendChild(this._videoEl);
    }
  }

  async _destroyVideo() {
    try {
      await this.zoom.stream?.detachVideo(this.userId, this._videoEl);
      this._containerEl.removeChild(this._videoEl);
      this._videoEl = null;
    } catch {
      console.log('warning: could not destroy zoom user video frame');
    }
  }

  _getUserInfo() {
    return this.zoom.client.getUser(this.userId);
  }
}
