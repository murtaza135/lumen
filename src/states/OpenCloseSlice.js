import { StateSlice } from 'framework';

export class OpenCloseSlice extends StateSlice {
  constructor() {
    const state = {
      isOpen: false,
    };

    super(state);
  }

  open() {
    this.state.isOpen = true;
  }

  close() {
    this.state.isOpen = false;
  }

  toggle() {
    this.state.isOpen = !this.state.isOpen;
  }
}
