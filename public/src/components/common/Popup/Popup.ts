import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../Freact/observe.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {PopupProfileContent} from "./PopupUpload/PopupProfileContent.js";
import {Button} from "../Button/Button.js";
import {AppState} from "../../../states/AppState.js";
import {ModalForm} from "../ModalForm/ModalForm.js";
import {IObj} from "../../../Freact/interfaces";


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


const popupUserAdd = new ModalForm({
  className: 'modal__content_add-user',
  classNameTitle: 'modal__title_popup',
  modalTitle: 'Добавить пользователя',
  formName: 'addUser',
  fields: [
    {
      labelText: 'Логин',
      input: {
        id: 'add-login',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
      },
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_popup modal__button_add-user',
    text: 'Добавить',
    disabled: false
  }).getStringElement(),
});

const popupUserDelete = new ModalForm({
  className: 'modal__content_remove-user',
  classNameTitle: 'modal__title_popup',
  modalTitle: 'Удалить пользователя',
  formName: 'deleteUser',
  fields: [
    {
      labelText: 'Логин',
      input: {
        id: 'remove-login',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
      },
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_popup modal__button_remove-user',
    text: 'Удалить',
    disabled: true
  }).getStringElement(),
});


export class Popup extends Freact {
  constructor(props?: IObj) {
    super({
      ...props,
      PopupSet: popupContentSet.getStringElement(),
      PopupError: popupContentErr.getStringElement(),
      PopupSuccess: popupContentSuccess.getStringElement(),
      PopupAddUser: popupUserAdd.getStringElement(),
      PopupDeleteUser: popupUserDelete.getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, AppState, 'shownOverlay');
    observe.call(this, ProfileState, 'setAvatar');
    observe.call(this, ProfileState, 'errorSetAvatar');
    observe.call(this, ProfileState, 'successSetAvatar');
    observe.call(this, AppState, 'popupAddUser');
    observe.call(this, AppState, 'popupDeleteUser');

    const callback = () => {
      if (AppState.shownOverlay) AppState.shownOverlay = false;
      if (ProfileState.setAvatar) ProfileState.setAvatar = false;
      if (AppState.popupAddUser) AppState.popupAddUser = false;
      if (AppState.popupDeleteUser) AppState.popupDeleteUser = false;
    };
    this.setListener('.modal__close', 'click', callback);
  }


  render() {
    return `
    <div id="popup" class="{{#unless shownOverlay}}elem-hidden{{/unless}} modal modal_popup">
      <img src="src/assets/images/close.svg" alt="закрыть" class="modal__close">
      
      {{#if setAvatar}}
        {{{PopupSet}}}
      {{/if}}
      
      {{#if errorSetAvatar}}
        {{{PopupError}}}
      {{/if}}
      
      {{#if successSetAvatar}}
        {{{PopupSuccess}}}
      {{/if}}   
      
      {{#if popupAddUser}}
        {{{PopupAddUser}}}
      {{/if}}    
      
      {{#if popupDeleteUser}}
        {{{PopupDeleteUser}}}
      {{/if}}      
      
    </div>`;
  }
}
