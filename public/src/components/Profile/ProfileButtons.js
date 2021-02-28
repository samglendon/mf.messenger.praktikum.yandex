import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";


const contextProfileButtons = {
  buttons: [
    {
      className: 'change',
      text: 'Изменить данные',
      id: 'changeData'
    },
    {
      className: 'change',
      text: 'Изменить пароль',
      id: 'changePassword'
    },
    {
      className: 'exit',
      text: 'Выйти',
      id: 'exit'
    },
  ]
};


export class ProfileButtons extends Freact {
  constructor(props = contextProfileButtons) {
    super(props);
  }


  componentDidMount(oldProps) {
    //FIXME: СРЕДНИЙ. edit и changePassword не используются в самой компоненте, но приходится их сюда прокидывать, чтобы они обновились.
    // Надо придумать, как одновлять компоненту извне
    observe.call(this, ProfileState, 'edit');
    observe.call(this, ProfileState, 'changePassword');

   const callback = (ind) => {
      return function click () {
        if (ind === 0) ProfileState.edit = !ProfileState.edit;
        if (ind === 1) ProfileState.changePassword = !ProfileState.changePassword;
      }
    };

    this.props.buttons.forEach((button, ind) => {
      this.setListener(`#${button.id}`, 'click', callback(ind));
    })
  }


  render() {
    return `
      <ul id="proButt" class="profile__list">
        {{#each buttons}}
        <li class="profile__item">
          <button id="{{this.id}}" class="profile__item-name profile__item-name_{{this.className}}">{{this.text}}</button>
        </li>
        {{/each}}
      </ul>
    `;
  }
}
