import {Freact} from "../../../../Freact/Freact.js";
import {observe} from "../../../../Freact/observe.js";
import {DialogsState} from "../../../../states/DialogsState.js";
import {IObj} from "../../../../Freact/interfacesFreact";


export class ContactsList extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      inputValue: ''
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, DialogsState, 'dialogsList');
    observe.call(this, DialogsState, 'activeDialogNumber');

    const inputHandler = () => {
    const dialogsListInitial = DialogsState.dialogsList;
    console.log(this.eventsCollection.collectionEvents);

      const handler = (e: Event) => {
        e.preventDefault();
        const inputElement = e.target as HTMLInputElement;
        const {value: inputValue} = inputElement;
        this.setProps({inputValue});
        if (inputValue) {
          const resExp = new RegExp(inputValue, 'i');
          DialogsState.dialogsList = dialogsListInitial.filter((dialog: IObj) => resExp.test(dialog.title));
          console.log(inputValue);
        } else {
          DialogsState.dialogsList = dialogsListInitial;
          console.log('значение обнулилось')
        }
      };
      return handler;
    };

    this.setListener(`.contacts__search`, 'input', inputHandler());

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
      <ul class="contacts__list">
        {{#each dialogsList}}
        <li class="{{#ifCond @index '===' ../activeDialogNumber}}active{{/ifCond}} contacts__item">
          <div class="contacts__item-wrapper">
            <img class="contacts__ava" src="../assets/images/noavatar.png" alt="фото">
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
    `;
  }
}
