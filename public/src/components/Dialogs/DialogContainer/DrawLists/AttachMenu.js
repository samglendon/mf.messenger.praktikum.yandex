import {Freact} from "../../../../Freact/Freact.js";
import {observe} from "../../../../Freact/observe.js";
import {DialogsState} from "../../../../states/DialogsState.js";


export class AttachMenu extends Freact {
  constructor(props) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, DialogsState, 'openAttach');
  }


  render() {
    return `
        <ul class="{{#unless openAttach}}elem-hidden{{/unless}} draw-list send-message__draw-list">
          <li class="draw-list__item">
            <div class="draw-list__img draw-list__img_photo-video"></div>
            <form class="draw-list__form" name="addCommon">
              <label for="add-common" class="input-field__label input-field__label_attach">
                Фото или Видео</label>
              <input class="input-field__input input-field__input_type_add-common elem-hidden"
                     id="add-common" type="file" name="photoVideo"
                     placeholder="" required>
            </form>
          </li>
          <li class="draw-list__item">
            <div class="draw-list__img draw-list__img_photo"></div>
            <form class="draw-list__form" name="addPhoto">
              <label for="add-photo" class="input-field__label input-field__label_attach">Фото</label>
              <input class="input-field__input input-field__input_type_add-photo elem-hidden"
                     id="add-photo" type="file" name="photo"
                     placeholder="" required>
            </form>
          </li>
          <li class="draw-list__item">
            <div class="draw-list__img draw-list__img_location"></div>
            <form class="draw-list__form" name="addLocation">
              <label for="add-location" class="input-field__label input-field__label_attach">Локация</label>
              <input class="input-field__input input-field__input_type_add-location elem-hidden"
                     id="add-location" type="file" name="photo"
                     placeholder="" required>
            </form>
          </li>
        </ul>
    `;
  }
}
