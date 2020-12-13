import {Freact} from "../../../Freact/Freact.js";
import {observe} from "../../../helpers/observe.js";
import {ProfileState} from "../../../Freact/ProfileState.js";


export class Popup extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    observe.call(this, ProfileState, 'shownOverlay');
    observe.call(this, ProfileState, 'setAvatar');
    observe.call(this, ProfileState, 'errorSetAvatar');
    observe.call(this, ProfileState, 'successSetAvatar');

    const callback = () => {
      ProfileState.shownOverlay.value = !ProfileState.shownOverlay.value;
    };
    this.setListener('.modal__close', 'click', callback);
  }


  render() {
    // debugger
    return `
    <div id="popup" class="modal modal_popup {{#unless shownOverlay}}elem-hidden{{/unless}}">
      <img src="src/images/close.svg" alt="закрыть" class="modal__close">
      {{#if setAvatar}}
      {{{PopupSet}}}
      {{/if}}
      {{#if errorSetAvatar}}
      {{{PopupError}}}
      {{/if}}
      {{#if successSetAvatar}}
      {{{PopupSuccess}}}
      {{/if}}      
    </div>`;
  }
}
