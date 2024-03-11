import { StateSlice } from 'framework';

export class CounterState extends StateSlice {
  constructor() {
    const state = {
      counterValue: 5,
    };

    super(state);
  }

  /* create methods below to act upon the state */
  increment() {
    this.state.counterValue += 1;
  }
}
