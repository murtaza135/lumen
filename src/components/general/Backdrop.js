import { BaseComponent, html } from 'framework';

export class Backdrop extends BaseComponent {
  constructor() {
    super();
    this.stateSlice = this.attr('stateSlice');
    if (!this.stateSlice) throw new Error('Backdrop component requires a `stateSlice` attribute');
    this.backdrop = this.slice(this.stateSlice);
  }

  render() {
    return html`
      <div
        @click=${() => this.backdrop.actions.close()}
        class=${`backdrop ${this.backdrop.state.isOpen ? 'show' : ''}`}
      />
    `;
  }

  cleanup() {
    this.backdrop.actions.close();
  }
}
