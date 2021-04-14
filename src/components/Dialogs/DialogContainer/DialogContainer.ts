import { Freact } from '../../../Freact/Freact';
import { observe } from '../../../Freact/observe';
import { DialogsState } from '../../../states/DialogsState';
import { Dialog } from './Dialog/Dialog';
import { ControlMenu } from './DrawLists/ControlMenu';
import { AttachMenu } from './DrawLists/AttachMenu';
import { IObj } from '../../../Freact/interfacesFreact';

import noAvatarImg from '../../../assets/images/noavatar.png';
import { FormValidation } from '../../../scripts/utils/formValidation';

import { webSocketService } from '../../../scripts/api/WebSocketService';
import { SEND_ACTIONS } from '../../../scripts/interfacesAndTypeApp';

export class DialogContainer extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      Dialog: new Dialog().getStringElement(),
      ControlMenu: new ControlMenu().getStringElement(),
      AttachMenu: new AttachMenu().getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, DialogsState, 'activeDialogNumber');

    const toggleControl = (e: Event) => {
      DialogsState.openControl = !DialogsState.openControl;
    };
    this.setListener('.dialogs__button', 'click', toggleControl);

    const toggleAttach = (e: Event) => {
      DialogsState.openAttach = !DialogsState.openAttach;
    };
    this.setListener('.send-message__attach-img', 'click', toggleAttach);

    const sendMessage = () => {
      const form = document.forms.namedItem('sendMessage')!;
      // let formValidation: FormValidation;
      // if (form) formValidation = new FormValidation(form, 'input-field', 'input-field__error-message');

      const submitFunc = (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const content = formData.get('content');
        webSocketService.send(SEND_ACTIONS.SEND_TEXT, { content: String(content) });
        form.reset();
        // this.props.formFunc(form, formValidation.showCommonError);
      };
      return submitFunc;
    };

    this.setListener('[name="sendMessage"]', 'submit', sendMessage, true);
  }

  render() {
    return `
      <section class="dialogs">
        <p class="dialogs__choose-one {{#ifCond activeDialogNumber '!==' null}}elem-hidden{{/ifCond}}">
            Выберите чат чтобы отправить сообщение</p>
    
        <div class="dialogs__main {{#ifCond activeDialogNumber '===' null}}elem-hidden{{/ifCond}}">
    
          <header class="dialogs__head">
            <div class="dialogs__info">
              <img class="dialogs__ava" src="${noAvatarImg}" alt="фото">
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
    
            <form class="send-message__form" name="sendMessage" novalidate>
              <input class="send-message__input"
                     type="text" name="content"
                     placeholder="Сообщение" required>
              <button class="send-message__button"></button>
            </form>
          </div>
    
        </div>
    
      </section>
    `;
  }
}
