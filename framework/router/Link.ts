import { history } from './history';
import { BaseComponent } from '../dom/BaseComponent';
import { html } from '../dom/html';

export class Link extends BaseComponent {
  static observedAttributes = ["href"];
  private href?: string;

  constructor() {
    super();
    this.setAttribute("style", "cursor: pointer");
    this.href = this.attr("href");
  }

  render() {
    return html`
      <a @click=${this.navigate.bind(this)}>${this.childrenHTML}</a>
    `;
  }

  navigate(event: Event) {
    event.preventDefault();
    if (this.href) history.push(this.href);
  }
}

customElements.define('x-link', Link);