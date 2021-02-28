import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../Freact/observe.js";
import {DialogsState} from "../../../states/DialogsState.js";
import {Dialog} from "./Dialog/Dialog.js";
import {ControlMenu} from "./ControlMenu/ControlMenu.js";
import {AttachMenu} from "./AttachMenu/AttachMenu.js";

export class DialogContainer extends Freact {
  constructor(props) {
    super({
      ...props,
      Dialog: new Dialog().getStringElement(),
      ControlMenu: new ControlMenu().getStringElement(),
      AttachMenu: new AttachMenu().getStringElement(),
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, DialogsState, 'activeDialogNumber');

    const toggleControl = (e) => {
      DialogsState.openControl = !DialogsState.openControl;
    };
    this.setListener('.dialogs__button', 'click', toggleControl);

    const toggleAttach = (e) => {
      DialogsState.openAttach = !DialogsState.openAttach;
    };
    this.setListener('.send-message__attach-img', 'click', toggleAttach);
  }


  render() {
    return `
      <section class="dialogs">
        <p class="dialogs__choose-one {{#ifCond activeDialogNumber '!==' null}}elem-hidden{{/ifCond}}">Выберите чат чтобы отправить сообщение</p>
    
    
        <div class="dialogs__main {{#ifCond activeDialogNumber '===' null}}elem-hidden{{/ifCond}}">
    
          <header class="dialogs__head">
            <div class="dialogs__info">
              <img class="dialogs__ava" src="./src/images/noavatar.png" alt="фото">
              <h1 class="dialogs__name">Андрей</h1>
            </div>
            <div class="dialogs__control">
              <button class="dialogs__button"></button>
              {{{ControlMenu}}}
            </div>
          </header>
          
          <div>
          {{{Dialog}}}
          </div>
    
          <div class="send-message">
            <div class="send-message__attach-container">
              <button class="send-message__attach-img"></button>
              {{{AttachMenu}}}
            </div>
    
            <form class="send-message__form" name="send-message" novalidate>
              <input class="send-message__input"
                     type="text" name="send-msg"
                     placeholder="Сообщение" required>
              <button class="send-message__button"></button>
            </form>
          </div>
    
        </div>
    
      </section>
    `;
  }
}
