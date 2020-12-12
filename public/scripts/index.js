import {render} from "./helpers/renderDom.js";
import {Button} from "./components/common/Button/Button.js";
import {AuthForm} from "./components/AuthForm/AuthForm.js";


const contextLogin = {
  modalTitle: 'Вход',
  formName: 'enter',
  fields: [
    {
      label: {
        for: 'login',
        text: 'Логин',
      },
      input: {
        id: 'login',
        type: 'text',
        name: 'login',
        className: 'input-field__input_type_login',
        placeholder: 'Введите логин',
      },
      classNameError: 'input-field__error-message_login'
    },
    {
      label: {
        for: 'password',
        text: 'Пароль',
      },
      input: {
        id: 'password',
        type: 'password',
        name: 'password',
        className: 'input-field__input_type_password',
        placeholder: 'Введите пароль',
      },
      classNameError: 'input-field__error-message_password'
    },
  ],
  button: new Button({
    className: 'modal__button modal__button_enter',
    text: 'Авторизоваться'
  }).getStringElement(),
  buttonOption: {
    className: 'modal__option_registration',
    text: 'Нет аккаунта?',
  }
};



const LoginForm = new AuthForm(contextLogin);

render(document, ".modal", LoginForm);
