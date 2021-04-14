import { Freact } from '../../../Freact/Freact';

import { ProfileState } from '../../../states/ProfileState';
import { AuthState, changeProfileTC } from '../../../states/AuthState';

import { Button } from '../../common/Button/Button';
import { FormValidation } from '../../../scripts/utils/formValidation';
import { IObj } from '../../../Freact/interfacesFreact';

const formButton = new Button({
  className: 'profile-form__button profile-form__button_edit',
  text: 'Сохранить',
  disabled: false,
});

const contextProfileForm = {
  formName: 'profile',
  // fields: [
  //   {
  //     labelText: 'Почта',
  //     input: {
  //       id: 'email',
  //       type: 'email',
  //       name: 'email',
  //       value: 'pochta@yandex.ru',
  //       placeholder: 'Введите почту',
  //     },
  //   },
  //   {
  //     labelText: 'Логин',
  //     input: {
  //       id: 'login',
  //       type: 'text',
  //       name: 'login',
  //       value: 'ivanIvanov',
  //       placeholder: 'Введите логин',
  //     },
  //   },
  //   {
  //     labelText: 'Имя',
  //     input: {
  //       id: 'first_name',
  //       type: 'text',
  //       name: 'first_name',
  //       value: 'Иван',
  //       placeholder: 'Введите имя',
  //     },
  //   },
  //   {
  //     labelText: 'Фамилия',
  //     input: {
  //       id: 'second_name',
  //       type: 'text',
  //       name: 'second_name',
  //       value: 'Иванов',
  //       placeholder: 'Введите фамилию',
  //     },
  //   },
  //   {
  //     labelText: 'Имя в чате',
  //     input: {
  //       id: 'display_name',
  //       type: 'text',
  //       name: 'display_name',
  //       value: 'Иван',
  //       placeholder: 'Введите имя в чате',
  //     },
  //   },
  //   {
  //     labelText: 'Телефон',
  //     input: {
  //       id: 'phone',
  //       type: 'tel',
  //       name: 'phone',
  //       value: '+7 (909) 967 30 30',
  //       placeholder: '+7 (ХХХ) ХХХ ХХ ХХ',
  //     },
  //   },
  //
  // ],
  Button: formButton.getStringElement(),
  observe: [
    { state: AuthState, key: 'email' },
    { state: AuthState, key: 'login' },
    { state: AuthState, key: 'first_name' },
    { state: AuthState, key: 'second_name' },
    { state: AuthState, key: 'display_name' },
    { state: AuthState, key: 'phone' },
    { state: ProfileState, key: 'edit' },
  ],
};

export class ProfileForm extends Freact<IObj> {
  constructor(props = contextProfileForm) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps: IObj) {
    const submitHandler = () => {
      const form = document.forms[this.props.formName];
      let formValidation: FormValidation;
      if (form) formValidation = new FormValidation(form, 'profile-form__item', 'profile-form__item-error-message');

      const submitFunc = (e: Event) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const changeData = Object.fromEntries(formData.entries());

        console.log(`данные из формы ${form.name}`);
        console.dir(changeData);

        // getFormInfo(e.target as HTMLFormElement);
        changeProfileTC(changeData, formValidation.showCommonError);
        // ProfileState.edit = false;
      };
      return submitFunc;
    };

    this.setListener(`[name="${this.props.formName}"]`, 'submit', submitHandler, true);
  }

  render() {
    return `
      <form id="proForm" class="{{#if edit}}profile-form_edit{{/if}} profile-form" name="{{formName}}" novalidate>
        <div class="profile-form__list">
    
          <div class="profile-form__item">
            <label class="profile-form__item-name" for="email">Почта</label>
            <p class="profile-form__item-value">{{email}}</p>
            <input class="profile-form__input profile-form__input_email"
                   type="email" name="email" id="email"
                   placeholder="Введите почту"
                   value="{{email}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_email"/>
          </div>

          <div class="profile-form__item">
            <label class="profile-form__item-name" for="login">Логин</label>
            <p class="profile-form__item-value">{{login}}</p>
            <input class="profile-form__input profile-form__input_login"
                   type="text" name="login" id="login"
                   placeholder="Введите логин"
                   value="{{login}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_login"/>
          </div>

          <div class="profile-form__item">
            <label class="profile-form__item-name" for="first_name">Имя</label>
            <p class="profile-form__item-value">{{first_name}}</p>
            <input class="profile-form__input profile-form__input_first_name"
                   type="text" name="first_name" id="first_name"
                   placeholder="Введите имя"
                   value="{{first_name}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_first_name"/>
          </div>

          <div class="profile-form__item">
            <label class="profile-form__item-name" for="second_name">Фамилия</label>
            <p class="profile-form__item-value">{{second_name}}</p>
            <input class="profile-form__input profile-form__input_second_name"
                   type="text" name="second_name" id="second_name"
                   placeholder="Введите фамилию"
                   value="{{second_name}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_second_name"/>
          </div>

          <div class="profile-form__item">
            <label class="profile-form__item-name" for="display_name">Имя в чате</label>
            <p class="profile-form__item-value">{{display_name}}</p>
            <input class="profile-form__input profile-form__input_display_name"
                   type="text" name="display_name" id="display_name"
                   placeholder="Введите имя в чате"
                   value="{{display_name}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_display_name"/>
          </div>

          <div class="profile-form__item">
            <label class="profile-form__item-name" for="phone">Телефон</label>
            <p class="profile-form__item-value">{{phone}}</p>
            <input class="profile-form__input profile-form__input_phone"
                   type="tel" name="phone" id="phone"
                   placeholder="+7 (ХХХ) ХХХ ХХ ХХ"
                   value="{{phone}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_phone"/>
          </div>
       
        </div>
        {{#if edit}}
        {{{Button}}}
        {{/if}}
      </form>`;
  }
}
