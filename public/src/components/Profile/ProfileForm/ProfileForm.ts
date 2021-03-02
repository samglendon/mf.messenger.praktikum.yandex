import {Freact} from "../../../Freact/Freact.js";
import {getFormInfo} from "../../../scripts/utils/getFormInfo.js";
import {Button} from "../../common/Button/Button.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {observe} from "../../../Freact/observe.js";
import {IObj} from "../../../Freact/interfaces";


const formButton = new Button({
  className: 'profile__button profile__button_edit',
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


export class ProfileForm extends Freact {
  constructor(props = contextProfileForm) {
    super(props);
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, ProfileState, 'edit');

    const callback = (e: Event) => {
      e.preventDefault();
      getFormInfo(e.target as HTMLFormElement);
      ProfileState.edit = !ProfileState.edit;
    };
    this.setListener(`[name="${this.props.formName}"]`, 'submit', callback);
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
