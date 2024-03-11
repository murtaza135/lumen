import { BaseComponent, html } from 'framework';

// reusable form component, fully styled
// look at @/components/login/LoginForm.js to see its usage
export class Form extends BaseComponent {
  constructor() {
    super();
    this.formRef = this.parentRef() ?? this.ref();
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <form
        @submit=${(event) => event.preventDefault()}
        id=${this.formRef.id}
        class="form w-100 bg-primary rounded py-4 center text-light gap-4"
      >
        ${this.childrenHTML}
      </form>
    `;
  }
}
