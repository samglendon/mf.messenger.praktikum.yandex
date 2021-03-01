import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../Freact/observe.js";
import {DialogsState} from "../../../states/DialogsState.js";
import {IObj} from "../../../Freact/interfaces";


export class Contacts extends Freact {
  constructor(props?: IObj) {
    super({
      ...props,
      inputValue: ''
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, DialogsState, 'dialogsList');
    observe.call(this, DialogsState, 'activeDialogNumber');

    // const callbackInput = () => {
    //   const dialogsListInitial = DialogsState.dialogsList;
    //   // FIXME: ВЫСОКИЙ. При вводе идет перерисовка и теряется фокус у input'a
    //   return (e) => {
    //     const {value: inputValue} = e.target;
    //     this.setProps({inputValue});
    //     if (inputValue) {
    //       const resExp = new RegExp(inputValue, 'i');
    //       DialogsState.dialogsList = dialogsListInitial.filter((dialog) => resExp.test(dialog.title));
    //       console.log(inputValue);
    //     } else {
    //       DialogsState.dialogsList = dialogsListInitial;
    //       console.log('значение обнулилось')
    //     }
    //   };
    // };
    //
    // this.setListener(`.contacts__search`, 'input', callbackInput());

    const selectDialog = (e: Event) => {
      const currentTarget = e.currentTarget as Element;
      const elemTmp = e.target as Element;
      const neededElem = elemTmp.closest('.contacts__item');

      const dialogs = Array.from(currentTarget.children);
      dialogs.forEach((dialog, ind) => {
        if (neededElem === dialog) {
          if (DialogsState.activeDialogNumber !== ind) DialogsState.activeDialogNumber = ind;
        }
      });
    };

    this.setListener(`.contacts__list`, 'click', selectDialog);

  }

  render() {
    return `
      <aside class="contacts">
        <a class="contacts__profile-button" href="./profile.html">Профиль ></a>
        <form class="contacts__search-container">
          <input id="contactsSearch" class="search contacts__search" type="text" name="search"
                value="{{inputValue}}"
                 placeholder="   Поиск">
        </form>
    
        <ul class="contacts__list">
          {{#each dialogsList}}
          <li class="{{#ifCond @index '===' ../activeDialogNumber}}active{{/ifCond}} contacts__item">
            <div class="contacts__item-wrapper">
              <img class="contacts__ava" src="./src/assets/images/noavatar.png" alt="фото">
              <div class="contacts__content">
                <h2 class="contacts__name">{{this.title}}</h2>
                <p class="contacts__last-message">
                    {{#ifCond this.lastMessage.sender '===' 'outgoing'}}<span class="contacts__message-owner">Вы: </span>{{/ifCond}}
                    {{this.lastMessage.text}}
                </p>
              </div>
              <div class="contacts__info">
                <time class="contacts__time">{{this.lastMessage.time}}</time>
                <p class="contacts__new-messages {{#ifCond this.newMessageCount '===' 0}}elem-hidden{{/ifCond}}">
                  <mark class="contacts__count">{{this.newMessageCount}}</mark>
                </p>
              </div>
            </div>
          </li>
          {{/each}}
    
        </ul>
      </aside>
    `;
  }
}
