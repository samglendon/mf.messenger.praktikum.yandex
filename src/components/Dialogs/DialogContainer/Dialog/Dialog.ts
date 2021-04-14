import { Freact } from '../../../../Freact/Freact';
import { observe } from '../../../../Freact/observe';
import { DialogsState } from '../../../../states/DialogsState';
import { AuthState } from '../../../../states/AuthState';
import { IObj } from '../../../../Freact/interfacesFreact';

export class Dialog extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps: IObj) {
    // FIXME: ВЫСОКИЙ. Здесь тоже пришлось прокинуть activeDialogNumber, иначе не отображается
    observe.call(this, DialogsState, 'activeDialogNumber');
    observe.call(this, AuthState, 'id');
    observe.call(this, DialogsState, 'currentMessages');
  }

  render() {
    return `
      <main class="messages">

        <time class="message__date">19 июня</time>
        <p>myId {{id}}</p>
        <p>currentMessages {{currentMessages}}</p>
        <p>activeDialogNumber {{activeDialogNumber}}</p>
        
        {{#each currentMessages}}
        <div class="message__container {{#ifCond this.user_id '===' ../id}}message_out{{/ifCond}}{{#ifCond this.user_id '!==' ../id}}message_in{{/ifCond}} {{#if this.first}}message_first{{/if}}">
          <div class="message__box message__box_width">
            
            <span class="{{#ifCond this.user_id '===' ../id}}message__tail-out{{/ifCond}}{{#ifCond this.user_id '!==' ../id}}message__tail-in{{/ifCond}}"></span>
            
            <div class="message__wrapper messages__wrapper_shadow">
              <div class="message__core">
                {{#ifCond this.type '===' 'message'}}
                <div class="message__text-container">
                  <div class="message__text-inner-container">
                    <span class="message__text selectable-text">{{this.content}}</span>
                    <span class="message__space"></span>
                  </div>
                </div>
                {{/ifCond}}
                {{#ifCond this.type '===' 'file'}}
                <img src="{{this.content}}" class="message__img" alt="">
                {{/ifCond}}
                <div class="message__time-container {{#ifCond this.type '===' 'file'}}message__time-container_img {{/ifCond}}">
                  <div class="message__time-inner-container">
                    <time class="message__time">{{prettifyDate this.time}}</time>
                    {{#ifCond this.type '===' 'message'}}
                    <div class="message__status-container">
                      <div class="message__status {{#ifCond this.status '===' 'read'}}{{#ifCond this.user_id '===' ../id}}message__status_checked{{/ifCond}}{{/ifCond}}"></div>
                    </div>
                    {{/ifCond}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {{/each}}
     
      </main>
    `;
  }
}
