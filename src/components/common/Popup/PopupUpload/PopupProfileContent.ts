import {Freact} from "../../../../Freact/Freact.js";
import {observe} from "../../../../Freact/observe.js";
import {ProfileState} from "../../../../states/ProfileState.js";
import {IObj} from "../../../../Freact/interfacesFreact";


export class PopupProfileContent extends Freact<IObj> {
  constructor(props?: IObj) {
    super({...props});
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, ProfileState, 'setAvatar');
    observe.call(this, ProfileState, 'errorSetAvatar');
    observe.call(this, ProfileState, 'successSetAvatar');
  }


  render() {
    return `
      <div class="modal__content {{this.className}}">
        {{#unless this.error}}{{#unless this.success}}<h3 class="modal__title modal__title_popup">Загрузите файл</h3>{{/unless}}{{/unless}}
        {{#if this.error}}<h3 class="modal__title modal__title_popup modal__title_error">Ошибка, попробуйте ещё раз</h3>{{/if}}
        {{#if this.success}}<h3 class="modal__title modal__title_popup">Файл загружен</h3>{{/if}}
        <form class="modal__form" name="{{this.formName}}" novalidate>
          <div class="input-field">
            {{#if this.success}}<p  class="input-field__label input-field__label_success">pic.jpg</p>{{/if}}
            {{#unless this.success}}
            <label class="input-field__label input-field__label_add" for="{{this.input.id}}">Выбрать файл на компьютере</label>
            <input class="input-field__input input-field__input_type_add-file elem-hidden"
                   type="file" name="file" id="{{this.input.id}}"
                   placeholder=""
                   required>
            {{/unless}}
          </div>
          <button class="button modal__button modal__button_popup modal__button_add" name='btn' disabled>Поменять</button>
        </form>
      </div>
    `;
  }
}
