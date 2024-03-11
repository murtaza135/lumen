import { StateSlice } from 'framework';

export class SearchDashboardSlice extends StateSlice {
  constructor() {
    const state = {
      text: '',
    };

    super(state);
  }

  setText(text) {
    this.state.text = text;
  }

  resetText() {
    this.state.text = '';
  }
}
