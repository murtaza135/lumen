import { StateSlice } from 'framework';

export class SuccessSlice extends StateSlice {
  constructor() {
    const state = {
      text: null,
    };

    super(state);

    this.timeoutID = null;
  }

  reset() {
    this.clearSuccess();
  }

  setSuccess(text) {
    this.state.text = text;

    // automatically clear the success text after 5 seconds
    this.timeoutID = setTimeout(() => {
      this.clearSuccess();
    }, 5000);
  }

  clearSuccess() {
    this.state.text = null;
    if (this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID = null;
  }
}
