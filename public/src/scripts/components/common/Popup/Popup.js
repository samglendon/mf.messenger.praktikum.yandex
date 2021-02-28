import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../Freact/observe.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {PopupProfileContent} from "./PopupProfileContent.js";
import {Button} from "../Button/Button.js";
import {PopupUser} from "./PopupUser.js";
import {DialogsState} from "../../../states/DialogsState.js";
import {AppState} from "../../../states/AppState.js";


const popupContentSet = new PopupProfileContent({
  condition: ProfileState.setAvatar,
  className: 'modal__content_upload-file',
  error: false,
  success: false,
  formName: 'add-file',
  input: {
    id: 'add-file',
  },
});
const popupContentErr = new PopupProfileContent({
  className: 'modal__content_error',
  error: true,
  success: false,
  formName: 'add-file',
  input: {
    id: 'add-file-again',
  },
});
const popupContentSuccess = new PopupProfileContent({
  className: 'modal__content_success',
  error: false,
  success: true,
  formName: 'success',
});


const popupUserAdd = new PopupUser({
  className: 'modal__content_add-user',
  modalTitle: 'Добавить пользователя',
  formName: 'addUser',
  labelText: 'Логин',
  input: {
    id: 'add-login',
    type: 'text',
    name: 'login',
    placeholder: 'Введите логин',
  },
  button: new Button({
    className: 'modal__button modal__button_popup modal__button_add-user',
    text: 'Добавить',
    disabled: true
  }).getStringElement(),
});


export class Popup extends Freact {
  constructor(props) {
    super({
      ...props,
      PopupSet: popupContentSet.getStringElement(),
      PopupError: popupContentErr.getStringElement(),
      PopupSuccess: popupContentSuccess.getStringElement(),
      PopupAddUser: popupUserAdd.getStringElement(),
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, AppState, 'shownOverlay');
    observe.call(this, ProfileState, 'setAvatar');
    observe.call(this, ProfileState, 'errorSetAvatar');
    observe.call(this, ProfileState, 'successSetAvatar');
    observe.call(this, DialogsState, 'addUser');

    const callback = () => {
      AppState.shownOverlay = false;
      ProfileState.setAvatar = false;
      console.log(ProfileState)
    };
    this.setListener('.modal__close', 'click', callback);
  }


  render() {
    return `
    <div id="popup" class="{{#unless shownOverlay}}elem-hidden{{/unless}} modal modal_popup">
      <img src="src/images/close.svg" alt="закрыть" class="modal__close">
      
      {{#if setAvatar}}
        {{{PopupSet}}}
      {{/if}}
      
      {{#if errorSetAvatar}}
        {{{PopupError}}}
      {{/if}}
      
      {{#if successSetAvatar}}
        {{{PopupSuccess}}}
      {{/if}}   
      
      {{#if addUser}}
        {{{PopupAddUser}}}
      {{/if}}      
      
    </div>`;
  }
}
