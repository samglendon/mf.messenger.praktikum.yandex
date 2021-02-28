import {Freact} from "../../../../Freact/Freact.js";
import {observe} from "../../../../Freact/observe.js";
import {DialogsState} from "../../../../states/DialogsState.js";
import {AuthState} from "../../../../states/AuthState.js";


export class Dialog extends Freact {
  constructor(props) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, AuthState, 'myId');
    observe.call(this, DialogsState, 'currentMessages');
    observe.call(this, DialogsState, 'activeDialogNumber'); // FIXME: ВЫСОКИЙ. Здесь тоже пришлось прокинуть activeDialogNumber, иначе не отображается
  }

  // messageStr() {
  //   return `
  //       <div class="message__container {{#ifCond this.sender.id '===' ../myId}}message-out{{/ifCond}}{{#ifCond this.sender.id '!==' ../myId}}message-in{{/ifCond}} {{#if this.first}}message-first{{/if}}">
  //         <div class="message__box message__box_width">
  //           <!-- первое сообщение-->
  //           <span class="{{#ifCond this.sender.id '===' ../myId}}message__tail-out{{/ifCond}}{{#ifCond this.sender.id '!==' ../myId}}message__tail-in{{/ifCond}}"></span>
  //
  //           <div class="message__wrapper messages__wrapper_shadow">
  //             <div class="message__core">
  //               {{#ifCond this.type '===' 'text'}}
  //               <div class="message__text-container">
  //                 <div class="message__text-inner-container">
  //                   <span class="message__text selectable-text">{{this.message}}</span>
  //                   <span class="message__space"></span>
  //                 </div>
  //               </div>
  //               {{/ifCond}}
  //               {{#ifCond this.type '===' 'image'}}
  //               <img src="{{this.message}}" class="message__img" alt="">
  //               {{/ifCond}}
  //               <div class="message__time-container {{#ifCond this.type '===' 'image'}}message__time-container_img{{/ifCond}}">
  //                 <div class="message__time-inner-container">
  //                   <time class="message__time">{{this.date}}</time>
  //                   {{#ifCond this.type '===' 'text'}}
  //                   <div class="message__status-container">
  //                     <div class="message__status {{#ifCond this.status '===' 'read'}}{{#ifCond this.sender.id '===' ../myId}}message__status_checked{{/ifCond}}{{/ifCond}}"></div>
  //                   </div>
  //                   {{/ifCond}}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
  // }

  render() {
    return `
      <main class="messages">

        <time class="message__date">19 июня</time>
<!--        <p>myId {{myId}}</p>-->
<!--        <p>currentMessages {{currentMessages}}</p>-->
<!--        <p>activeDialogNumber {{activeDialogNumber}}</p>-->
        
        {{#each currentMessages}}
        <div class="message__container {{#ifCond this.sender.id '===' ../myId}}message-out{{/ifCond}}{{#ifCond this.sender.id '!==' ../myId}}message-in{{/ifCond}} {{#if this.first}}message-first{{/if}}">
          <div class="message__box message__box_width">
            
            <span class="{{#ifCond this.sender.id '===' ../myId}}message__tail-out{{/ifCond}}{{#ifCond this.sender.id '!==' ../myId}}message__tail-in{{/ifCond}}"></span>
            
            <div class="message__wrapper messages__wrapper_shadow">
              <div class="message__core">
                {{#ifCond this.type '===' 'text'}}
                <div class="message__text-container">
                  <div class="message__text-inner-container">
                    <span class="message__text selectable-text">{{this.message}}</span>
                    <span class="message__space"></span>
                  </div>
                </div>
                {{/ifCond}}
                {{#ifCond this.type '===' 'image'}}
                <img src="{{this.message}}" class="message__img" alt="">
                {{/ifCond}}
                <div class="message__time-container {{#ifCond this.type '===' 'image'}}message__time-container_img {{/ifCond}}">
                  <div class="message__time-inner-container">
                    <time class="message__time">{{this.date}}</time>
                    {{#ifCond this.type '===' 'text'}}
                    <div class="message__status-container">
                      <div class="message__status {{#ifCond this.status '===' 'read'}}{{#ifCond this.sender.id '===' ../myId}}message__status_checked{{/ifCond}}{{/ifCond}}"></div>
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
