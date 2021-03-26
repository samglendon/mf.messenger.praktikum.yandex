import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";
import {IObj} from "../../Freact/interfacesFreact";


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


export class ProfileButtons extends Freact<IObj> {
  constructor(props = contextProfileButtons) {
    super(props);
  }


  componentDidMount(oldProps: IObj) {
    //FIXME: СРЕДНИЙ. edit и changePassword не используются в самой компоненте, но приходится их сюда прокидывать, чтобы они обновились.
    // Надо придумать, как одновлять компоненту извне
    observe.call(this, ProfileState, 'edit');
    observe.call(this, ProfileState, 'changePassword');

   const callback = (ind: number) => {
      return function click () {
        if (ind === 0) ProfileState.edit = !ProfileState.edit;
        if (ind === 1) ProfileState.changePassword = !ProfileState.changePassword;
      }
    };

    this.props.buttons.forEach((button: IObj , ind: number) => {
      this.setListener(`#${button.id}`, 'click', callback(ind));
    })
  }


  render() {
    return `
      <ul id="proButt" class="profile-form__list">
        {{#each buttons}}
        <li class="profile-form__item">
          <button id="{{this.id}}" class="profile-form__item-name profile-form__item-name_{{this.className}}">{{this.text}}</button>
        </li>
        {{/each}}
      </ul>
    `;
  }
}
