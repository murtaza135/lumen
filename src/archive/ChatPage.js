import { BaseComponent, html } from 'framework';

export class ChatPage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('min-vh-100 d-flex flex-column justify-content-center align-items-left');

    return html`
      <auth-guard />
      <error-toast />
      <x-nav hasDashboard="true" hasUserProfile="true" />

      <div class="container h-100  my-auto">
      <div class="d-flex bd-highlight">
        <div class="p-2 w-50 bd-highlight d-flex flex-column align-items-center ">
          <a style="font-size: 24px; font-weight: bold;">Lumen</a>
        </div>

        <div class="p-2 w-100 bd-highlight d-flex flex-column align-items-left">
        <a style="font-size: 24px; font-weight: bold;">Chat</a>
          <chat-top-nav />
        </div>

      </div>
 
          <div class="d-flex bd-highlight h-100">
              <div class="p-2 w-50 bd-highlight">
              <div class="list-group">
  <!--  -->
  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Lumen</h5>
      <small>Today</small>
    </div>
    <p class="mb-1">Group Members:</p>
    <small>Cameron, Harris, Sebastian</small>
  </a>
  <!--  -->
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Facebook</h5>
      <small class="text-body-secondary">2 days ago</small>
    </div>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Heriot-Watt</h5>
      <small class="text-body-secondary">3 days ago</small>
    </div>
  </a>
  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Jamie</h5>
      <small>4 days ago</small>
    </div>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Hamish</h5>
      <small class="text-body-secondary">1 week ago</small>
    </div>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Year 2 Groupchat</h5>
      <small class="text-body-secondary">8 months ago</small>
    </div>
    <p class="mb-1">Group Members:</p>
    <small class="text-body-secondary">John, Smith, Jesus</small>
  </a>
</div>
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">Year 1 Groupchat</h5>
      <small class="text-body-secondary">1 year ago</small>
    </div>
    <p class="mb-1">Group Members:</p>
    <small class="text-body-secondary">Java, HTML, CSS, JS, Python</small>
  </a>
    </div>
  </div>
              <div class="p-2 w-100 bd-highlight">
                  <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
                      class="scrollspy-example-2" tabindex="0">
                      <div id="item-1">
                          <div class="chat-history">
                              <ul class="m-b-0">
                                  <li class="clearfix">
                                      <div class="message-data">
                                          <span class="message-data-time">10:12 AM, Today</span>
                                      </div>
                                      <div class="message my-message">Are we meeting today?</div>
                                  </li>
                                  <li class="clearfix">
                                      <div class="message-data">
                                          <span class="message-data-time">10:15 AM, Today</span>
                                      </div>
                                      <div class="message my-message">Project has been already finished and I have results to show
                                          you.
                                        </div>
                                  </li>
                              </ul>
                          </div>
                          <div class="chat-message">
                              <div class="input-group">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text"> </span>
                                  </div>
                                  <input type="text" class="form-control" placeholder="Enter text here...">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    `;
  }

  hydrate() {
    document.addEventListener('DOMContentLoaded', () => {
      const listItems = document.querySelectorAll('.list-group-item');

      listItems.forEach((item) => {
        item.addEventListener('click', () => {
          listItems.forEach((otherItem) => {
            otherItem.classList.remove('active');
          });

          item.classList.add('active');
        });
      });
    });
  }
}
