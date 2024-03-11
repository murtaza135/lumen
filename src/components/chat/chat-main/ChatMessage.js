import { BaseComponent, html } from 'framework';
import { extractInitials } from '@/utils/extractInitials';
import { timeago } from '@/utils/timeago';
import { filterProfanity } from '@/utils/profanity';

export class ChatMessage extends BaseComponent {
  constructor() {
    super();
    this.name = this.attr('name') ?? '';
    this.initials = extractInitials(this.name);
    this.timestamp = this.attr('timestamp') ?? '';
    this.message = this.attr('message') ?? '';
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class="d-flex align-items-start gap-3">
        <x-avatar initials=${this.initials} class="flex-shrink-0" />
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex gap-3 flex-wrap">
            <p class="text-primary fw-semibold">${this.name}</p>
            <p class="chat-message-timestamp">${timeago(this.timestamp)}</p>
          </div>
          <p>${filterProfanity(this.message)}</p>
        </div>
      </div>
    `;
  }
}
