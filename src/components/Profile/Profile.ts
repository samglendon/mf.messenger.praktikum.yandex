import { Freact } from '../../Freact/Freact';
import { AppState } from '../../states/AppState';
import { ProfileState } from '../../states/ProfileState';
import { observe } from '../../Freact/observe';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileChangePasswordForm } from './ProfileForm/ProfileChangePasswordForm';
import { ProfileButtons } from './ProfileButtons';
import { router } from '../../Freact/Routing/HashRouter';
import { Overlay } from '../common/Overlay/Overlay';
import { Popup } from '../common/Popup/Popup';
import { IObj } from '../../Freact/interfacesFreact';
import { AuthState } from '../../states/AuthState';

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
      observe: [
        { state: ProfileState, key: 'edit' },
        { state: ProfileState, key: 'changePassword' },
        { state: AuthState, key: 'first_name' },
      ],
    });
  }

  componentDidMount(oldProps: IObj) {
    const callback = () => {
      AppState.shownOverlay = true;
      ProfileState.setAvatar = true;
    };
    this.setListener('.profile__ava', 'click', callback);

    const clickHandler = () => {
      ProfileState.edit = false;
      ProfileState.changePassword = false;
      router.go('/');
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
            <p class="profile__name {{#ifCond edit '||' changePassword}}elem-covered{{/ifCond}}">{{first_name}}</p>
            
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
