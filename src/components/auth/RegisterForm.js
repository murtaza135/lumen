import { BaseComponent, html, history } from 'framework';
import userSVG from '@/assets/user.svg'; // Assuming you have a user SVG image for the input icon
import lockClosedSVG from '@/assets/lock-closed.svg'; // Assuming you have a padlock SVG image for the input icon
import { registerMutation } from '@/api/auth/registerMutation'; // This should be the registration mutation

export class RegisterForm extends BaseComponent {
  constructor() {
    super();

    // Create refs to access form and input elements
    this.formRef = this.ref('form');
    this.emailInputRef = this.ref('email');
    this.firstNameInputRef = this.ref('firstName');
    this.lastNameInputRef = this.ref('lastName');
    this.passwordInputRef = this.ref('password');
    this.confirmPasswordInputRef = this.ref('confirmPassword');

    // Registration mutation
    this.register = this.mutation(registerMutation());

    // Error state slice
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100 center');

    return html`
      <x-form @submit=${() => this.handleSubmit()} class="register-form">
        <h2>Register</h2>
        <x-input id=${this.emailInputRef.id} type="email" label="Email" placeholder="Enter your email" icon=${userSVG} />
        <x-input id=${this.firstNameInputRef.id} type="text" label="First Name" placeholder="Enter your first name" />
        <x-input id=${this.lastNameInputRef.id} type="text" label="Last Name" placeholder="Enter your last name" />
        <x-input id=${this.passwordInputRef.id} type="password" label="Password" placeholder="Enter your password" icon=${lockClosedSVG} iconSize="18" />
        <x-input id=${this.confirmPasswordInputRef.id} type="password" label="Confirm Password" placeholder="Confirm your password" icon=${lockClosedSVG} iconSize="18" />
        <button type="submit" class="register-form-submit-button btn btn-light w-100 text-primary fw-bold">Register</button>
        <x-link href="/login" class="register-form-login-link fw-semibold text-center">Already have an account? Login</x-link>
      </x-form>
    `;
  }

  async handleSubmit() {
    const registrationDetails = {
      email: this.emailInputRef.element.value,
      first_name: this.firstNameInputRef.element.value,
      last_name: this.lastNameInputRef.element.value,
      password: this.passwordInputRef.element.value,
      confirmPassword: this.confirmPasswordInputRef.element.value,
    };

    // Check if passwords match
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      this.error.actions.setError('Passwords do not match.');
      return;
    }

    // Remove confirmPassword field from registrationDetails before sending the request
    delete registrationDetails.confirmPassword;

    // Send register request with the adjusted registrationDetails
    await this.register.actions.mutate(registrationDetails);

    if (this.register.state.status === 'success') {
      // if registration is successful, redirect to dashboard page
      history.push('/dashboard/recent');
    } else if (this.register.state.status === 'error') {
      // if registration fails, then show an error message using the error toast
      this.error.actions.setError(this.register.state.errorMessage);
    }
  }
}
