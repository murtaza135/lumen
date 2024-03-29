import { StateSlice } from 'framework';

export class ChatNotificationSlice extends StateSlice {
  constructor() {
    const state = {
      id: null,
      name: null,
      type: null,
      text: null,
    };

    super(state);
    this.timeoutID = null;
    this.blockNotification = false;
  }

  reset() {
    this.clearNotification();
  }

  setNotification(id, name, type, text, timeout = 20000) {
    if (!this.blockNotification) {
      this.state.id = id;
      this.state.name = name;
      this.state.type = type;
      this.state.text = text;
      this.blockNotification = true;

      setTimeout(() => {
        this.blockNotification = false;
      }, timeout);

      // automatically clear the notification after 5 seconds
      this.timeoutID = setTimeout(() => {
        this.clearNotification();
      }, 5000);
    }
  }

  clearNotification() {
    this.state.id = null;
    this.state.name = null;
    this.state.type = null;
    this.state.text = null;
    if (this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID = null;
  }
}
