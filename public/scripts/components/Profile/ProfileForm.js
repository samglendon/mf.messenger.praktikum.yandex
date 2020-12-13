import {Freact} from "../../Freact/Freact.js";
import {FormValidation} from "../../helpers/formValidation.js";
import {getFormInfo} from "../../helpers/getFormInfo.js";
import {Button} from "../common/Button/Button.js";
import {ProfileState} from "../../Freact/ProfileState.js";


const formButton = new Button({
  className: 'profile__button profile__button_edit',
  text: 'Сохранить',
  disabled: false,
});

const contextProfileForm = {
  edit: ProfileState.edit.value,
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
  Button: formButton.getStringElement(),
};


export class ProfileForm extends Freact {
  constructor(props = contextProfileForm) {
    // debugger
    super(props);
  }

  componentDidMount(oldProps) {
    if (!ProfileState.edit.contexts.includes(this)) ProfileState.edit.contexts.push(this);


    const form = document.forms[this.props.formName];
    // const validateAuthForm = new FormValidation(form, 'input-field', 'input-field__error-message');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      getFormInfo(form);
      ProfileState.edit.value = !ProfileState.edit.value;
    })
  }

  render() {
    return `
      <form id="proForm" class="profile__form {{#if edit}}profile__form_edit{{/if}}" name="{{formName}}" novalidate>
        <div class="profile__list">
          {{#each fields}}
          <div class="profile__item">
            <label class="profile__item-name" for="{{this.input.id}}">{{this.labelText}}</label>
            <p class="profile__item-value">{{this.input.value}}</p>
            <input class="profile__input profile__input_{{this.input.name}}"
                   type="{{this.input.type}}" name="{{this.input.name}}" id="{{this.input.id}}"
                   placeholder="{{this.input.placeholder}}"
                   value="{{this.input.value}}"
                   required>
          </div>
          {{/each}}
        </div>
        {{#if edit}}
        {{{Button}}}
        {{/if}}
      </form>`;
  }
}
