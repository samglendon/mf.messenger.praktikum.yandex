import {Freact} from "../../../Freact/Freact.js";
import {ProfileState} from "../../../states/ProfileState.js";
import {observe} from "../../../Freact/observe.js";
import {AppState} from "../../../states/AppState.js";
import {DialogsState} from "../../../states/DialogsState.js";


export class Overlay extends Freact {
  constructor(props) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps) {
    observe.call(this, AppState, 'shownOverlay');

    const callback = () => {
      if (AppState.shownOverlay) AppState.shownOverlay = false;
      if (ProfileState.setAvatar) ProfileState.setAvatar = false;
      if (AppState.popupAddUser) AppState.popupAddUser = false;
      if (AppState.popupDeleteUser) AppState.popupDeleteUser = false;
    };
    this.setListener('#over', 'click', callback);
  }


  render() {
    return `<div id="over" class="{{#unless shownOverlay}}elem-hidden{{/unless}} overlay overlay_modal"></div>`;
  }
}
