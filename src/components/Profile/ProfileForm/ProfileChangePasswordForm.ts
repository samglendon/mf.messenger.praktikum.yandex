import {Freact} from "../../../Freact/Freact.js";
import {FormValidation} from "../../../scripts/utils/formValidation.js";
import {getFormInfo} from "../../../scripts/utils/getFormInfo.js";
import {Button} from "../../common/Button/Button.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {observe} from "../../../Freact/observe.js";
import {IObj} from "../../../Freact/interfacesFreact";


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
    className: 'profile-form__button profile-form__button_edit',
    text: 'Сохранить',
    disabled: true,
  }).getStringElement(),
};


export class ProfileChangePasswordForm extends Freact<IObj> {
  constructor(props = contextProfileForm) {
    super({
      ...props,
      observe: [
        {state: ProfileState, key: 'changePassword'}
      ]
    });
  }

  componentDidMount(oldProps: IObj) {
    // observe.call(this, ProfileState, 'changePassword');


    const submitHandler = () => {
      const form = document.forms[this.props.formName];
      if (form) new FormValidation(form, 'profile-form__item', 'profile-form__item-error-message');

      const submitFunc = (e: Event) => {
        e.preventDefault();
        getFormInfo(e.target as HTMLFormElement);
        ProfileState.changePassword = !ProfileState.changePassword;
      };
      return submitFunc;
    };

    this.setListener(`[name="${this.props.formName}"]`, 'submit', submitHandler, true);
  }

  render() {
    return `
      <form id="proPass" class="{{#if changePassword}}profile-form_edit{{/if}} profile-form profile-form_change" name="{{formName}}" novalidate>
        <div class="profile-form__list">
          {{#each fields}}
          <div class="profile-form__item">
            <label class="profile-form__item-name" for="{{this.input.id}}">{{this.labelText}}</label>
            <input class="profile-form__input profile-form__input_{{this.input.name}}"
                   type="{{this.input.type}}" name="{{this.input.name}}" id="{{this.input.id}}"
                   placeholder="{{this.input.placeholder}}"
                   value="{{this.input.value}}"
                   required>
            <span class="profile-form__item-error-message profile-form__item-error-message_{{this.input.name}}"/>
          </div>
          {{/each}}
        </div>
    
        {{{Button}}}
  
      </form>`;
  }
}
