import {Freact} from "../../Freact/Freact.js";
import {ModalForm} from "../common/ModalForm/ModalForm.js";
import {Button} from "../common/Button/Button.js";
import {router} from "../../Freact/Routing/HashRouter.js";
import {IObj} from "../../Freact/interfacesFreact";

const contextRegister = {
  className: 'modal__content-registration',
  modalTitle: 'Регистрация',
  formName: 'registration',
  fields: [
    {
      labelText: 'Email',
      input: {
        id: 'email-reg',
        type: 'text',
        name: 'email',
        placeholder: 'Введите почту',
      },
    },
    {
      labelText: 'Логин',
      input: {
        id: 'login-reg',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
      },
    },
    {
      labelText: 'Имя',
      input: {
        id: 'name-reg',
        type: 'text',
        name: 'first_name',
        placeholder: 'Введите своё имя',
      },
    },
    {
      labelText: 'Фамилия',
      input: {
        id: 'second-name-reg',
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите свою фамилию',
      },
    },
    {
      labelText: 'Телефон',
      input: {
        id: 'tel-reg',
        type: 'tel',
        name: 'phone',
        placeholder: '+7-(999)-999-99-99',
      },
    },
    {
      labelText: 'Пароль',
      input: {
        id: 'password-reg',
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль',
      },
    },
    {
      labelText: 'Пароль',
      input: {
        id: 'password-again-reg',
        type: 'password',
        name: 'password-again',
        placeholder: 'Повторите пароль еще раз',
      },
    },

  ],
  button: new Button({
    className: 'modal__button modal__button_registration',
    text: 'Зарегистрироваться',
    disabled: true
  }).getStringElement(),
  linkOption: {
    className: 'login',
    text: 'Войти',
    func: () => {
      router.go('/login')
    }
  }
};


export class Register extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      ModalRegister: new ModalForm(contextRegister).getStringElement()
    });
  }

  componentDidMount(oldProps: IObj) {

  }


  render() {
    return `
    <div class="register">
      <div class="register__overlay"></div>
    
      <div class="register__modal">
          {{{ModalRegister}}}
      </div>
    </div>
    `;
  }
}
