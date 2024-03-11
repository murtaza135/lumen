import { history } from './history';
import { BaseComponent } from '../dom/BaseComponent';
import { html } from '../dom/html';

export class Navigate extends BaseComponent {
  static observedAttributes = ["href"];
  private href?: string;

  constructor() {
    super();
    this.href = this.attr("href", String);
  }

  render() {
    return html``;
  }

  effect() {
    if (!this.href)
      throw new Error("Must provide the 'href' attribute to be able to navigate");
    history.replace(this.href);
  }
}

customElements.define('x-navigate', Navigate);
