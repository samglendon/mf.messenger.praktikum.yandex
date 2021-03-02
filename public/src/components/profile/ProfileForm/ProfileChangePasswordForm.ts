import {Freact} from "../../../Freact/Freact.js";
import {FormValidation} from "../../../scripts/utils/formValidation.js";
import {getFormInfo} from "../../../scripts/utils/getFormInfo.js";
import {Button} from "../../common/Button/Button.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {observe} from "../../../Freact/observe.js";
import {IObj} from "../../../Freact/interfaces";


const contextProfileForm = {
  formName: 'changePassword',
  fields: [
    {
      labelText: 'Старый пароль',
      input: {
        id: 'oldPassword',
        type: 'password',
        name: 'oldPassword',
        value: '1234567',
      },
    },
    {
      labelText: 'Новый пароль',
      input: {
        id: 'newPassword',
        type: 'password',
        name: 'newPassword',
        value: '',
        placeholder: 'Введите новый пароль',
      },
    },
    {
      labelText: 'Повторите новый пароль',
      input: {
        id: 'newPassword-again',
        type: 'password',
        name: 'newPassword-again',
        value: '',
        placeholder: 'Введите новый пароль',
      },
    },
  ],
  Button: new Button({
    className: 'profile__button profile__button_edit',
    text: 'Сохранить',
    disabled: false,
  }).getStringElement(),
};


export class ProfileChangePasswordForm extends Freact {
  constructor(props = contextProfileForm) {
    super(props);
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, ProfileState, 'changePassword');

    const callback = (e: Event) => {
      e.preventDefault();
      getFormInfo(e.target as HTMLFormElement);
      ProfileState.changePassword = !ProfileState.changePassword;
    };
    this.setListener(`[name="${this.props.formName}"]`, 'submit', callback);
  }

  render() {
    return `
      <form id="proForm" class="profile__form {{#if changePassword}}profile__form_edit{{/if}}" name="{{formName}}" novalidate>
        <div class="profile__list">
          {{#each fields}}
          <div class="profile__item">
            <label class="profile__item-name" for="{{this.input.id}}">{{this.labelText}}</label>
            <input class="profile__input profile__input_{{this.input.name}}"
                   type="{{this.input.type}}" name="{{this.input.name}}" id="{{this.input.id}}"
                   placeholder="{{this.input.placeholder}}"
                   value="{{this.input.value}}"
                   required>
          </div>
          {{/each}}
        </div>
    
        {{{Button}}}
  
      </form>`;
  }
}
