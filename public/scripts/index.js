import {registerTmpl} from "./templates/templates.js";

const template = Handlebars.compile(registerTmpl);

const context = {
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
        className: 'input-field__input_type_email',
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
  buttonForm: {
    className: 'modal__button_enter',
    name: 'btn',
    text: 'Авторизоваться',
  },
  buttonOption: {
    className: 'modal__option_registration',
    text: 'Нет аккаунта?',
  }
};

const registerForm = template(context);


const parser = new DOMParser();
const registerFormHTMLDoc = parser.parseFromString(registerForm, "text/html");


document.querySelector('.modal').appendChild(registerFormHTMLDoc.body.firstElementChild);
// document.querySelector('.modal').innerHTML = registerForm;
