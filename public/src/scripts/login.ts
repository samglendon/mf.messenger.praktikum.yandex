import {render} from "./utils/renderDom.js";
import {Button} from "../components/common/Button/Button.js";
import {ModalForm} from "../components/common/ModalForm/ModalForm.js";


const contextLogin = {
  className: 'modal__content-enter',
  modalTitle: 'Вход',
  formName: 'enter',
  fields: [
    {
      labelText: 'Логин',
      input: {
        id: 'login',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
      },
    },
    {
      labelText: 'Пароль',
      input: {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль',
      },
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_enter',
    text: 'Авторизоваться',
    disabled: true
  }).getStringElement(),
  linkOption: {
    className: 'registration',
    text: 'Нет аккаунта?',
    href: 'register.html',
  }
};



render(document.body, ".modal", new ModalForm(contextLogin).getContent());
