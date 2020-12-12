import {Freact} from "../../Freact/Freact.js";
import {FormValidation} from "../../formValidation.js";

export class AuthForm extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    // debugger
    const form = document.forms[this.props.formName];
    const validateAuthForm = new FormValidation(form, 'input-field', 'input-field__error-message');
  }

  render() {
    return `<div class="modal__content modal__content-enter">
      <h3 class="modal__title">{{modalTitle}}</h3>
      <form class="modal__form" name="{{formName}}" novalidate>
        {{#each fields}}
        <div class="input-field">
          <label for="{{this.label.for}}" class="input-field__label">{{this.label.text}}</label>
          <input id="{{this.input.id}}" type="{{this.input.type}}" name="{{this.input.name}}" class="input-field__input {{this.input.className}}"
                 placeholder="{{this.input.placeholder}}" required>
          <span class="input-field__error-message {{this.classNameError}}"/>
        </div>
        {{/each}}
        {{{button}}}
      </form>
      <button class="modal__option {{buttonOption.className}}">{{buttonOption.text}}</button>
    </div>`;
  }
}
