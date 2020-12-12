import {render} from "./helpers/renderDom.js";
import {Profile} from "./components/Profile/Profile.js";
import {ProfileButtons} from "./components/Profile/ProfileButtons.js";
import {ProfileForm} from "./components/Profile/ProfileForm.js";
import {Button} from "./components/common/Button/Button.js";

export const ProfileState = {
  contexts: {},
  edit: true
}


const contextProfileForm = {
  edit: ProfileState.edit,
  formName: 'profile',
  fields: [
    {
      labelText: 'Почта',
      input: {
        id: 'email',
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
        placeholder: 'Введите почту',
      },
    },
    {
      labelText: 'Логин',
      input: {
        id: 'login',
        type: 'text',
        name: 'login',
        value: 'ivanIvanov',
        placeholder: 'Введите логин',
      },
    },
    {
      labelText: 'Имя',
      input: {
        id: 'first-name"',
        type: 'text',
        name: 'first_name',
        value: 'Иван',
        placeholder: 'Введите имя',
      },
    },
    {
      labelText: 'Фамилия',
      input: {
        id: 'second-name',
        type: 'text',
        name: 'second-name',
        value: 'Иванов',
        placeholder: 'Введите фамилию',
      },
    },
    {
      labelText: 'Имя в чате',
      input: {
        id: 'display-name',
        type: 'text',
        name: 'display_name',
        value: 'Иван',
        placeholder: 'Введите имя в чате',
      },
    },
    {
      labelText: 'Телефон',
      input: {
        id: 'phone',
        type: 'tel',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        placeholder: '+7 (ХХХ) ХХХ ХХ ХХ',
      },
    },

  ],
  Button: new Button({
    className: 'profile__button profile__button_edit',
    text: 'Сохранить',
    disabled: false,
    clickHandler: (e, context) => {
      e.preventDefault();
      ProfileState.contexts.submitButton = context;
      ProfileState.contexts.profile.setProps({
        edit: ProfileState.edit,
      })
      ProfileState.contexts.profileForm.setProps({
        edit: ProfileState.edit,
      })
    }
  }).getStringElement(),
};

const contextProfileButtons = {
  buttons: [
    {
      className: 'change',
      text: 'Изменить данные',
      clickHandler:  () => {
        console.log('сработала кнопка changeData!!!');
        console.log('this')
        console.log(this);
      }
    },
    {
      className: 'change',
      text: 'Изменить пароль',
      clickHandler: function () {
        console.log('сработала кнопка changePassword!!!');
      }
    },
    {
      className: 'exit',
      text: 'Выйти',
      clickHandler: function () {
        console.log('сработала кнопка goodbye!!!');
      }
    },
  ]
};



const contextProfile = {
  edit: ProfileState.edit,
  name: 'Иван',
  ProfileForm: new ProfileForm(contextProfileForm).getStringElement(),
  ProfileButtons: new ProfileButtons(contextProfileButtons).getStringElement()
}




const profile = new Profile(contextProfile);
render(document, '.root', profile);


