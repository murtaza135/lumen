import { BaseComponent, html } from 'framework';

const sizes = {
  sm: 'fs-7 w-8 h-8',
  md: 'fs-7 w-9 h-9',
  lg: 'fs-6 w-12 h-12',
  xl: 'fs-5 w-16 h-16',
};

export class Avatar extends BaseComponent {
  constructor() {
    super();
    this.size = this.attr('size') ?? 'md';
    this.initials = this.attr('initials');
    this.src = this.attr('src') ?? '';
  }

  render() {
    return html`
      <span class=${`rounded-circle overflow-hidden border border-primary text-primary center bg-white fw-bold ${sizes[this.size]}`}>
        ${!this.src
        ? html`<p>${this.initials}</p>`
        : html`<img src=${this.src} alt="avatar" />`
      }
      </span>
    `;
  }
}
