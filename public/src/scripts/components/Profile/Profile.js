import {Freact} from "../../Freact/Freact.js";
import {AppState} from "../../states/AppState.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";
import {ProfileForm} from "./ProfileForm.js";
import {ProfileChangePasswordForm} from "./ProfileChangePasswordForm.js";
import {ProfileButtons} from "./ProfileButtons.js";



export class Profile extends Freact {
  constructor(props) {
    super({
      ...props,
      name: 'Иван',
      ProfileForm: new ProfileForm().getStringElement(),
      ProfileChangePasswordForm: new ProfileChangePasswordForm().getStringElement(),
      ProfileButtons: new ProfileButtons().getStringElement(),
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, ProfileState, 'edit');
    observe.call(this, ProfileState, 'changePassword');

    const callback = () => {
      AppState.shownOverlay = true;
      ProfileState.setAvatar = true;
    };
    this.setListener('.profile__ava', 'click', callback);
  }



  render() {
    return `
      <div id="pfoPage" class="profile-page">

        <a class="button-back" href="./dialogs.html">
          <div class="button-back__inner"></div>
        </a>

        <main class="profile">
          <div class="profile__container">
            <div class="profile__ava">
              <div class="profile__overlay"></div>
              <p class="profile__prompt">Поменять аватар</p>
            </div>
            <p class="profile__name {{#ifCond edit '||' changePassword}}elem-covered{{/ifCond}}">{{name}}</p>
            
            {{#unless changePassword}}
            {{{ProfileForm}}}
            {{/unless}}
            
            {{#if changePassword}}
            {{{ProfileChangePasswordForm}}}
            {{/if}}
            
            {{#unless edit}}{{#unless changePassword}}
            {{{ProfileButtons}}}
            {{/unless}}{{/unless}}
          </div>
        </main>
      </div>
    `;
  }
}
