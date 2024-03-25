import { BaseComponent, html } from 'framework';

export class CounterPageOne extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class="container d-flex justify-content-center align-items-center gap-3 py-4">
        <counter-client />
      </div>
    `;
  }
}
