import { StateSlice } from 'framework';

export class FileListSlice extends StateSlice {
  constructor() {
    const state = {
      text: '',
    };

    super(state);
  }

  reset() {
    this.state.text = '';
  }

  setText(text) {
    this.state.text = text;
  }

  resetText() {
    this.state.text = '';
  }
}
