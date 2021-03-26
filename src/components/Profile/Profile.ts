import {Freact} from "../../Freact/Freact.js";
import {AppState} from "../../states/AppState.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";
import {ProfileForm} from "./ProfileForm/ProfileForm.js";
import {ProfileChangePasswordForm} from "./ProfileForm/ProfileChangePasswordForm.js";
import {ProfileButtons} from "./ProfileButtons.js";
import {router} from "../../Freact/Routing/HashRouter.js";
import {Overlay} from "../common/Overlay/Overlay.js";
import {Popup} from "../common/Popup/Popup.js";
import {IObj} from "../../Freact/interfacesFreact";


export class Profile extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      name: 'Иван',
      ProfileForm: new ProfileForm().getStringElement(),
      ProfileChangePasswordForm: new ProfileChangePasswordForm().getStringElement(),
      ProfileButtons: new ProfileButtons().getStringElement(),
      Overlay: new Overlay().getStringElement(),
      Popup: new Popup().getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, ProfileState, 'edit');
    observe.call(this, ProfileState, 'changePassword');

    const callback = () => {
      AppState.shownOverlay = true;
      ProfileState.setAvatar = true;
    };
    this.setListener('.profile__ava', 'click', callback);

    const clickHandler = () => {
      router.go('/')
    };
    this.setListener('.button-back', 'click', clickHandler);
  }



  render() {
    return `
      <div id="pfoPage" class="profile-page">

        <button class="button-back">
          <div class="button-back__inner"></div>
        </button>

        <main class="profile">
          <div class="profile__container">
          
<!--          <p>edit {{edit}}</p>-->
<!--          <p>changePassword {{changePassword}}</p>-->
          
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
        
        {{{Overlay}}}
        {{{Popup}}}
      </div>
    `;
  }
}
