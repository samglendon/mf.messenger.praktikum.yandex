import { Freact } from '../../../Freact/Freact';
import { observe } from '../../../Freact/observe';

import { ProfileState } from '../../../states/ProfileState';
import { AppState } from '../../../states/AppState';

import { PopupProfileContent } from './PopupUpload/PopupProfileContent';
import { Button } from '../Button/Button';
import { ModalForm } from '../ModalForm/ModalForm';
import { IObj } from '../../../Freact/interfacesFreact';

import closeSVG from '../../../assets/images/close.svg';
import { addUserTC, createDialogTC } from '../../../states/DialogsState';

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
      labelText: 'Для теста введите UserId',
      input: {
        id: 'userId',
        type: 'number',
        name: 'userId',
        placeholder: 'Введите UserId',
      },
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_popup modal__button_add-user',
    text: 'Добавить',
    disabled: true,
  }).getStringElement(),
  formFunc(form: HTMLFormElement, callbackError: Function) {
    const formData = new FormData(form);
    const userIdData = formData.get('userId');

    console.log(`данные из формы ${form.name}`);
    console.dir(userIdData);
    console.log(form);

    addUserTC([Number(userIdData)], callbackError);
  },
  observe: [
    { state: AppState, key: 'popupAddUser' },
  ],
});

const popupCreateDialog = new ModalForm({
  className: 'modal__content_create-dialog',
  classNameTitle: 'modal__title_popup',
  modalTitle: 'Создать чат',
  formName: 'createDialog',
  fields: [
    {
      labelText: 'Заголовок',
      input: {
        id: 'create-dialog',
        type: 'text',
        name: 'title',
        placeholder: 'Введите название диалога',
      },
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_popup modal__button_create-dialog',
    text: 'Создать',
    disabled: true,
  }).getStringElement(),
  formFunc(form: HTMLFormElement, callbackError: Function) {
    const formData = new FormData(form);
    const createDialogData = Object.fromEntries(formData.entries());

    console.log(`данные из формы ${form.name}`);
    console.dir(createDialogData);
    console.log(form);

    createDialogTC({ title: String(formData.get('title')) }, callbackError);
  },
  observe: [
    { state: AppState, key: 'popupCreateDialog' },
  ],
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
    disabled: true,
  }).getStringElement(),
});

export class Popup extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      PopupSet: popupContentSet.getStringElement(),
      PopupError: popupContentErr.getStringElement(),
      PopupSuccess: popupContentSuccess.getStringElement(),
      PopupAddUser: popupUserAdd.getStringElement(),
      PopupDeleteUser: popupUserDelete.getStringElement(),
      PopupCreateDialog: popupCreateDialog.getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, AppState, 'shownOverlay');
    observe.call(this, ProfileState, 'setAvatar');
    observe.call(this, ProfileState, 'errorSetAvatar');
    observe.call(this, ProfileState, 'successSetAvatar');
    observe.call(this, AppState, 'popupAddUser');
    observe.call(this, AppState, 'popupDeleteUser');
    observe.call(this, AppState, 'popupCreateDialog');

    const callback = () => {
      if (AppState.shownOverlay) AppState.shownOverlay = false;
      if (ProfileState.setAvatar) ProfileState.setAvatar = false;
      if (AppState.popupAddUser) AppState.popupAddUser = false;
      if (AppState.popupDeleteUser) AppState.popupDeleteUser = false;
      if (AppState.popupCreateDialog) AppState.popupCreateDialog = false;
    };
    this.setListener('.popup__close', 'click', callback);
  }

  render() {
    return `
    <div id="popup" class="{{#unless shownOverlay}}elem-hidden{{/unless}} popup popup_modal">
      <img src="${closeSVG}" alt="закрыть" class="popup__close">
      
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
        
      {{#if popupCreateDialog}}
        {{{PopupCreateDialog}}}
      {{/if}}      
      
    </div>`;
  }
}
