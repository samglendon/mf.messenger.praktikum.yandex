import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../Freact/ProfileState.js";
import {observe} from "../../helpers/observe.js";


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
    observe.call(this, ProfileState, 'edit');

    this.props.buttons.forEach((button, ind) => {
      document.getElementById(button.id).addEventListener('click', () => {
        if (ind === 0) ProfileState.edit.value = !ProfileState.edit.value;
        if (ind === 1) ProfileState.shownOverlay.value = !ProfileState.shownOverlay.value;
      })
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
