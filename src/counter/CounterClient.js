import { BaseComponent, html } from 'framework';

export class CounterClient extends BaseComponent {
  constructor() {
    super();
    this.counter = this.slice('counter');
  }

  render() {
    this.rootCSSClasses('');

    return html`
      <div class="border border-primary rounded p-3 d-flex gap-5">
        <p class="fs-5">${this.counter.state.counterValue}</p>
        <button class="btn btn-primary" @click=${() => this.counter.actions.increment()}>+</button>
      </div>
    `;
  }
}
