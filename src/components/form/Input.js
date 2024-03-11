import { BaseComponent, html } from 'framework';

// reusable input component, fully styled
// look at @/components/login/LoginForm.js to see its usage
export class Input extends BaseComponent {
  constructor() {
    super();
    this.inputRef = this.parentRef() ?? this.ref();
    this.type = this.attr('type') ?? 'text';
    this.label = this.attr('label');
    this.placeholder = this.attr('placeholder');
    this.icon = this.attr('icon');
    this.iconSize = this.attr('iconSize');
  }

  render() {
    this.rootCSSClasses('w-100');

    return html`
      <div class='d-flex flex-column gap-2 text-light'>
        <!-- Input label -->
        <label for=${this.inputRef.id} class='fw-semibold'>${this.label}</label>

        <div class='d-flex gap-3 px-2 pb-2 border-bottom border-light'>
          <!-- Input icon -->
          ${this.icon ? html`<img class='center text-light' src=${this.icon} width=${this.iconSize} />` : null}

          <!-- Input itself -->
          <input
            id=${this.inputRef.id}
            type=${this.type}
            placeholder=${this.placeholder}
            class="input bg-transparent outline-none shadow-none w-100"
          />
        </div>
    </div>
    `;
  }
}
