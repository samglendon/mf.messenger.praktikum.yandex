import {Freact} from "../../../Freact/Freact.js";
import {getFormInfo} from "../../../scripts/utils/getFormInfo.js";
import {Button} from "../../common/Button/Button.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {observe} from "../../../Freact/observe.js";
import {IObj} from "../../../Freact/interfacesFreact";
import {FormValidation} from "../../../scripts/utils/formValidation.js";


const formButton = new Button({
  className: 'profile-form__button profile-form__button_edit',
  text: 'Сохранить',
  disabled: false,
});

const contextProfileForm = {
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


export class ProfileForm extends Freact<IObj> {
  constructor(props = contextProfileForm) {
    super({
      ...props
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, ProfileState, 'edit');

    const submitHandler = () => {
      const form = document.forms[this.props.formName];
      if (form) new FormValidation(form, 'profile-form__item', 'profile-form__item-error-message');

      const submitFunc = (e: Event) => {
        e.preventDefault();
        getFormInfo(e.target as HTMLFormElement);
        ProfileState.edit = !ProfileState.edit;
      };
      return submitFunc;
    };

    this.setListener(`[name="${this.props.formName}"]`, 'submit', submitHandler, true);
  }

  render() {
    return `
      <form id="proForm" class="{{#if edit}}profile-form_edit{{/if}} profile-form" name="{{formName}}" novalidate>
        <div class="profile-form__list">
          {{#each fields}}
          <div class="profile-form__item">
            <label class="profile-form__item-name" for="{{this.input.id}}">{{this.labelText}}</label>
            <p class="profile-form__item-value">{{this.input.value}}</p>
            <input class="profile-form__input profile-form__input_{{this.input.name}}"
                   type="{{this.input.type}}" name="{{this.input.name}}" id="{{this.input.id}}"
                   placeholder="{{this.input.placeholder}}"
                   value="{{this.input.value}}"
                   required>
             <span class="profile-form__item-error-message profile-form__item-error-message_{{this.input.name}}"/>

          </div>
          {{/each}}
        </div>
        {{#if edit}}
        {{{Button}}}
        {{/if}}
      </form>`;
  }
}
