import { StateSlice } from 'framework';

export class SearchDashboardSlice extends StateSlice {
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
