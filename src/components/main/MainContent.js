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
            <p>
              Lorem ipsum dolor sit amet. Rem fugit inventore sit exercitationem impedit eum voluptate molestiae et cupiditate deleniti ut voluptatibus
              consequatur At itaque quos! Eum fuga consequatur sed impedit ducimus hic voluptatem soluta sit rerum error et consequatur quidem et voluptatem facilis.
              Sed quos assumenda eum nulla maiores aut consequatur earum. Est soluta illo non rerum labore et aliquid nobis hic quia reprehenderit qui quia
              eaque aut accusantium laudantium qui ipsa reprehenderit.
            </p>
              <br>
            <p>
              Lorem ipsum dolor sit amet. Rem fugit inventore sit exercitationem impedit eum voluptate molestiae et cupiditate deleniti ut voluptatibus
              consequatur At itaque quos! Eum fuga consequatur sed impedit ducimus hic voluptatem soluta sit rerum error et consequatur quidem et voluptatem facilis.
              Sed quos assumenda eum nulla maiores aut consequatur earum. Est soluta illo non rerum labore et aliquid nobis hic quia reprehenderit qui quia
              eaque aut accusantium laudantium qui ipsa reprehenderit.
            </p>
            <div class = "LogoFlex">
              <img src= ${youtubeImg} alt="Youtube">
              <img src= ${twitterImg} alt="Twitter">
              <img src= ${facebookImg} alt="Facebook">
              <img src= ${instagramImg} alt="Instagram">
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
