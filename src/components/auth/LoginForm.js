import { BaseComponent, html, history } from 'framework';
import userSVG from '@/assets/user.svg'; // get the user SVG image
import lockClosedSVG from '@/assets/lock-closed.svg'; // get the padlock SVG image
import { loginMutation } from '@/api/auth/loginMutation';

export class LoginForm extends BaseComponent {
  constructor() {
    super();

    // create refs to access form and input elements
    this.formRef = this.ref('form');
    this.emailInputRef = this.ref('email');
    this.passwordInputRef = this.ref('password');

    // login mutation
    this.login = this.mutation(loginMutation());

    // error state slice
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100 center');

    return html`
      <x-form @submit=${() => this.handleSubmit()} class="login-form">
        <h2>Login</h2>
        <x-input id=${this.emailInputRef.id} type="email" label="Email" placeholder="Enter your email address" icon=${userSVG} />
        <x-input id=${this.passwordInputRef.id} type="password" label="Password" placeholder="Enter your password" icon=${lockClosedSVG} iconSize="18" />
        <button type="submit" class="login-form-submit-button btn btn-light w-100 text-primary fw-bold">Login</button>
        <x-link href="/register" class="login-form-register-link fw-semibold text-center">Don't have an account? Register</x-link>
      </x-form>
    `;
  }

  async handleSubmit() {
    const loginDetails = {
      email: this.emailInputRef.element.value,
      password: this.passwordInputRef.element.value,
    };

    if (!loginDetails.email || !loginDetails.password) {
      // if invalid login details, then show an error message using the error toast
      this.error.actions.setError('Invalid email or password');
      return;
    }

    // send login request
    await this.login.actions.mutate(loginDetails);

    if (this.login.state.status === 'success') {
      // if login is successful, redirect to dashboard page
      history.push('/dashboard/recent');
    } else if (this.login.state.status === 'error') {
      // if login fails, then show an error message using the error toast
      this.error.actions.setError('Invalid email or password');
    }
  }
}
