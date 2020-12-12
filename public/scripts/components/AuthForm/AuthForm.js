import {Freact} from "../../Freact/Freact.js";
import {FormValidation} from "../../helpers/formValidation.js";
import {getFormInfo} from "../../helpers/getFormInfo.js";

export class AuthForm extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    // debugger
    const form = document.forms[this.props.formName];
    const validateAuthForm = new FormValidation(form, 'input-field', 'input-field__error-message');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      getFormInfo(form)
    })
  }


  render() {
    return `<div class="modal__content {{className}}">
      <h3 class="modal__title">{{modalTitle}}</h3>
      <form class="modal__form" name="{{formName}}" novalidate>
        {{#each fields}}
        <div class="input-field">
          <label for="{{this.input.id}}" class="input-field__label">{{this.labelText}}</label>
          <input id="{{this.input.id}}" type="{{this.input.type}}" name="{{this.input.name}}" class="input-field__input input-field__input_type_{{this.input.name}}"
                 placeholder="{{this.input.placeholder}}" required>
          <span class="input-field__error-message input-field__error-message_{{this.input.name}}"/>
        </div>
        {{/each}}
        {{{button}}}
      </form>
      <a class="modal__option modal__option_{{linkOption.className}}" href="{{linkOption.href}}">{{linkOption.text}}</a>
    </div>`;
  }
}
