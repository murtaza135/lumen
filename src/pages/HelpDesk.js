import { BaseComponent, html } from 'framework';

export class HelpdeskPage extends BaseComponent {
  // Constructor if you need to initialise state or bind methods
  constructor() {
    super();
    // Any initialisation can go here
  }

  // A helper method to render a single FAQ entry
  renderFAQ(question, answer) {
      return html`
      <div class="faq-item">
        <h4 class="faq-question">${question}</h4>
        <p class="faq-answer">${answer}</p>
      </div>
    `;
  }

  // The main render method for the page
  render() {
      return html`
        <auth-guard />
        <setup-sockets />
        <error-toast/>
        <success-toast />

      <style>
        .helpdesk-container {
          padding: 20px;
          max-width: 800px;
          margin: 40px auto;
          background: #ffffff; /* Assuming white background */
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .faq-item {
          border-bottom: 1px solid #eee;
          padding: 15px 0;
        }

        .faq-question {
          color: #007bff; /* Lumen blue */
          margin-bottom: 5px;
        }

        .faq-answer {
          color: #333; /* Dark gray text for answers */
        }
      </style>

    <div>
        <x-nav hasAdmin="true" hasHelpdesk="true" hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />  

      <div class="helpdesk-container">
        <h2>Frequently Asked Questions (FAQs)</h2>
        ${this.renderFAQ('How do I change my password?', 'To reset your password, go to the profile page and click on "Change Password".')}
        ${this.renderFAQ('How can I contact support?', 'You can reach out to our support team via the private chat link available on the bottom of this page.')}
        <!-- Add more FAQs here -->
      </div>
    </div>
    `;
  }
}
