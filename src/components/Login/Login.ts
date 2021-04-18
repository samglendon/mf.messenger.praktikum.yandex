import { Freact } from '../../Freact/Freact';
import { ModalForm } from '../common/ModalForm/ModalForm';
import { Button } from '../common/Button/Button';
import { router } from '../../Freact/Routing/HashRouter';
import { IObj } from '../../Freact/interfacesFreact';
import { loginTC } from '../../states/AuthState';

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
    disabled: true,
  }).getStringElement(),
  linkOption: {
    className: 'registration',
    text: 'Нет аккаунта?',
    func: () => {
      router.go('/register');
    },
  },
  formFunc(form: HTMLFormElement, callbackError: Function) {
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData.entries());

    console.log(`данные из формы ${form.name}`);
    console.dir(loginData);
    console.log(form);

    loginTC(loginData, callbackError);
  },
};

export class Login extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      ModalLogin: new ModalForm(contextLogin).getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {

  }

  render() {
    return `
    <div class="login">
      <div class="login__overlay"></div>
    
      <div class="login__modal">
          {{{ModalLogin}}}
      </div>
    </div>
    `;
  }
}
