/* eslint-disable class-methods-use-this */
import { BaseComponent, html, history } from 'framework';
import youtubeImg from '@/assets/youtube.svg';
import twitterImg from '@/assets/x-twitter.svg';
import facebookImg from '@/assets/facebook.svg';
import instagramImg from '@/assets/instagram.svg';
import lumenLogoImg from '@/assets/Lumen-logo-removebg.png';

export class MainContent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100 center');

    return html`

      <div class = "mainFlex">
          <div class = "leftFlex">
            <h2 style="text-align: center; font-size: 32px; font-weight: bold;">Welcome to Lumen</h2>
              <br>
              <p class="fw-medium">
                It is time to brighten the world one message at the time. We are thrilled to have you as a user for our first project!
                <br><br>
                LUMEN is not just a chat application, it is a platform developed to brighten your day, fostering worthwhile conversations and helping you to connect with others. Whether you are here to chat with friends or families, or collaborating with your organisation, LUMEN will suit your needs.
                <br><br>
                With LUMEN’s user-friendly design, we are dedicated to providing you with an explicit messenger application. LUMEN could be used to have one-to-one conversations, group chats, share and receive pictures, or collaborate on different files. LUMEN offers everything you would need to stay up to date with other users. 
                <br><br>
                However, LUMEN is not just a tool – it is a way to connect! Welcome to LUMEN – where every conversation brightens your day! 
                <br><br>
                Best regards,  
                <br><br>
                The team of LUMEN
            </p>
            <div class = "LogoFlex">
              <a href="https://www.youtube.com/channel/UC6mUV5VwBfFV5uij1z2hmGQ" target="_blank" class="text-primary hover-opacity">
                <img src= ${youtubeImg} alt="Youtube">
              </a>
              <a href="https://twitter.com/?lang=en" target="_blank" class="text-primary hover-opacity">
                <img src= ${twitterImg} alt="Twitter">
              </a>
              <a href="https://en-gb.facebook.com/" target="_blank" class="text-primary hover-opacity">
                <img src= ${facebookImg} alt="Facebook">
              </a>
              <a href="https://www.instagram.com/lumen_hw" target="_blank" class="text-primary hover-opacity">
                <img src= ${instagramImg} alt="Instagram">
              </a>
            </div>
          </div>

        <div class = "rightFlex">
            <img src= ${lumenLogoImg} alt="Logo">
          <button class = "get-started bg-primary" @click=${() => this.navToRegister()}>Get Started!</button>
        </div>
      </div>
    `;
  }

  navToRegister() {
    history.push('/register');
  }
}
