import {Freact} from "../../../Freact/Freact.js";
import {FormValidation} from "../../../scripts/utils/formValidation.js";
import {getFormInfo} from "../../../scripts/utils/getFormInfo.js";
import {DialogsState} from "../../../states/DialogsState.js";
import {observe} from "../../../Freact/observe.js";
import {AppState} from "../../../states/AppState.js";
import {IObj} from "../../../Freact/interfaces";


export class ModalForm extends Freact {
   constructor(props?: IObj) {
    super({...props});
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, AppState, 'popupAddUser');
    observe.call(this, AppState, 'popupDeleteUser');
    observe.call(this, DialogsState, 'activeDialogNumber');


    const setHandler = () => {
      const form = document.forms[this.props.formName];
      if (form) new FormValidation(form, 'input-field', 'input-field__error-message');

      return function submitFunc(e: Event) {
        e.preventDefault();
        getFormInfo(form)
      }
    };

    this.setListener(`[name="${this.props.formName}"]`, 'submit', setHandler());

  }


  render() {
    return `<div class="modal__content {{className}}">
      <h3 class="modal__title {{classNameTitle}}">{{modalTitle}}</h3>
      <form class="modal__form" name="{{formName}}" novalidate>
        {{#each fields}}
        <div class="input-field">
          <label for="{{this.input.id}}" class="input-field__label">{{this.labelText}}</label>
          <input id="{{this.input.id}}" type="{{this.input.type}}" name="{{this.input.name}}" 
                 class="input-field__input input-field__input_type_{{this.input.name}}"
                 placeholder="{{this.input.placeholder}}" required>
          <span class="input-field__error-message input-field__error-message_{{this.input.name}}"/>
        </div>
        {{/each}}
        {{{button}}}
      </form>
      {{#ifCond linkOption '!==' 'undefined'}}
      <a class="modal__option modal__option_{{linkOption.className}}" href="{{linkOption.href}}">{{linkOption.text}}</a>
      {{/ifCond}}
    </div>`;
  }
}
