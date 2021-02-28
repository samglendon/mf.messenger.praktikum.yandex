import {Freact} from "../../../../Freact/Freact.js";
import {observe} from "../../../../Freact/observe.js";
import {DialogsState} from "../../../../states/DialogsState.js";
import {AppState} from "../../../../states/AppState.js";


export class ControlMenu extends Freact {
  constructor(props) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, DialogsState, 'openControl');

    const doSomething = (e) => {
      const controlButtons = Array.from(e.currentTarget.children);
      const neededElem = e.target.closest('.draw-list__item');
      controlButtons.forEach((dialog, ind) => {
        if (neededElem === dialog) {
          if (ind === 0) {
            AppState.shownOverlay = true;
            AppState.popupAddUser = true;
          }
          if (ind === 1) {
            AppState.shownOverlay = true;
            AppState.popupDeleteUser = true;
          }
        }
      });
    };

    this.setListener(`.dialogs__draw-list`, 'click', doSomething);
  }


  render() {
    return `
        <ul class="{{#unless openControl}}elem-hidden{{/unless}} draw-list dialogs__draw-list">
          <li class="draw-list__item">
            <div class="draw-list__img draw-list__img_add"></div>
            <p class="draw-list__text">Добавить пользователя</p>
          </li>
          <li class="draw-list__item">
            <div class="draw-list__img draw-list__img_remove"></div>
            <p class="draw-list__text">Удалить пользователя</p>
          </li>
          <li class="draw-list__item draw-list__item_remove">
            <div class="draw-list__img draw-list__img_remove"> </div>
            <p class="draw-list__text">Удалить диалог</p>
          </li>
        </ul>
    `;
  }
}
