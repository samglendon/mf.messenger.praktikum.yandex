import {Freact} from "../../Freact/Freact.js";
import {ModalForm} from "../common/ModalForm/ModalForm.js";
import {Button} from "../common/Button/Button.js";
import {router} from "../../Freact/Routing/HashRouter.js";
import {IObj} from "../../Freact/interfacesFreact";
import {apiAuth} from "../../scripts/api/api.js";

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
    func: () => {
      router.go('/register')
    }
  },
  formFunc(form: HTMLFormElement) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(`данные из формы ${form.name}`);
    console.dir(data);

    const {login, password} = data;

    apiAuth.signin({login: String(login), password: String(password)})
      .then((data: any) => {
        console.log(data)
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }
};


export class Login extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      ModalLogin: new ModalForm(contextLogin).getStringElement()
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
