import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../Freact/ProfileState.js";
import {observe} from "../../helpers/observe.js";


export class Profile extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    observe.call(this, ProfileState, 'edit');

    const callback = () => {
      ProfileState.shownOverlay.value = true;
      ProfileState.setAvatar.value = true;
    };
    this.setListener('.profile__ava', 'click', callback);
  }



  render() {
    return `
      <div id="pfoPage" class="profile-page">

        <aside class="button-back">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="#3369F3"/>
            <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
            <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"/>
          </svg>
        </aside>

        <main class="profile">
          <div class="profile__container">
            <div class="profile__ava">
              <div class="profile__overlay"></div>
              <p class="profile__prompt">Поменять аватар</p>
            </div>
            <p class="profile__name {{#if edit}}elem-covered{{/if}}">{{name}}</p>

            {{{ProfileForm}}}

            {{{ProfileButtons}}}

          </div>
        </main>
      </div>
    `;
  }
}
