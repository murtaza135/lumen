import { StateSlice } from 'framework';

export class ErrorSlice extends StateSlice {
  constructor() {
    const state = {
      text: null,
    };

    super(state);

    this.timeoutID = null;
  }

  setError(text) {
    this.state.text = text;

    // automatically clear the error after 5 seconds
    this.timeoutID = setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  clearError() {
    this.state.text = null;
    if (this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID = null;
  }
}
