import { BaseComponent, html } from 'framework';

export class Spinner extends BaseComponent {
  constructor() {
    super();
    this.variant = this.attr('variant') ?? 'primary';
    this.size = this.attr('size') ?? '2rem';
  }

  render() {
    return html`
      <div 
        class=${`spinner-border text-${this.variant} spinner-negative-margin`} 
        style=${`width: ${this.size}; height: ${this.size};`}
        role="status" 
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
  }
}
