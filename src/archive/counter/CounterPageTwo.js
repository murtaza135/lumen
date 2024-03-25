import { BaseComponent, html } from 'framework';

export class CounterPageTwo extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class="container d-flex justify-content-center align-items-center gap-3 py-4">
        <counter-client />
        <x-link href="/counter1">counter1</x-link>
      </div>
    `;
  }
}
