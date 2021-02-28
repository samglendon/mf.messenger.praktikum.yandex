import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../Freact/observe.js";
import {DialogsState} from "../../../states/DialogsState.js";


export class PopupUser extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    observe.call(this, DialogsState, 'addUser');
    observe.call(this, DialogsState, 'deleteUser');

  }


  render() {
    return `
      <div class="modal__content {{className}}">
        <h3 class="modal__title modal__title_popup">{{modalTitle}}</h3>
        <form class="modal__form" name="{{formName}}" novalidate>
          <div class="input-field">
            <label for="{{input.id}}" class="input-field__label">Логин</label>
            <input id="{{input.id}}" class="input-field__input input-field__input_type_{{input.name}}"
                   type="{{input.type}}" name="{{input.name}}"
                   placeholder="{{input.placeholder}}"
                   required>
            <span class="input-field__error-message input-field_error-message_{{input.name}}"></span>
          </div>
          {{{button}}}
        </form>
      </div>
    `;
  }
}
