import { BaseComponent, html } from 'framework';
import { extractInitials } from '@/utils/extractInitials';
import { capitaliseWords } from '@/utils/capitalise';

const variants = {
  primary: 'text-white bg-primary',
  light: 'text-primary bg-white',
};

export class ZoomAvatar extends BaseComponent {
  constructor() {
    super();
    this.name = this.attr('name') ?? '';
    this.initials = extractInitials(this.name);
    this.variant = this.attr('variant') ?? 'primary';
  }

  render() {
    return html`
      <div class="d-flex flex-column justify-content-center align-items-center gap-2">
        <span class=${`zoom-avatar rounded-circle overflow-hidden center fw-bold ${variants[this.variant]}`}>
          <p>${this.initials}</p>
        </span>
        <p class=${`zoom-avatar-name text-center fw-semibold fs-5 ${this.variant === 'primary' ? 'text-primary' : 'text-light'}`}>${capitaliseWords(this.name)}</p>
      </div>
    `;
  }
}
