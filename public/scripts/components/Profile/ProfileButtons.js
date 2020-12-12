import {Freact} from "../../Freact/Freact.js";

export class ProfileButtons extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    // debugger

    // const validateAuthForm = new FormValidation(form, 'input-field', 'input-field__error-message');
    // Array.from(this.element.querySelectorAll('.profile__item-name')).forEach((button, ind) => {
    //
    //   button.addEventListener('click', this.props.buttons[ind].clickHandler)
    // });
    // if (oldProps.clickHandler) {
    //   debugger
    //   this.element.addEventListener('click', oldProps.clickHandler);
    // }
    console.log(this.props.buttons)
  }

  render() {
    return `
      <ul class="profile__list">
        {{#each buttons}}
        <li class="profile__item">
          <button class="profile__item-name profile__item-name_{{this.className}}">{{this.text}}</button>
        </li>
        {{/each}}
      </ul>
    `;
  }
}
