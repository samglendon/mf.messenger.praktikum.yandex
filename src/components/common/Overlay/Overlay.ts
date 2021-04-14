import { Freact } from '../../../Freact/Freact';
import { ProfileState } from '../../../states/ProfileState';
import { observe } from '../../../Freact/observe';
import { AppState } from '../../../states/AppState';
import { IObj } from '../../../Freact/interfacesFreact';

export class Overlay extends Freact<IObj> {
  constructor(props? : IObj) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps: IObj) {
    observe.call(this, AppState, 'shownOverlay');

    const callback = () => {
      if (AppState.shownOverlay) AppState.shownOverlay = false;
      if (ProfileState.setAvatar) ProfileState.setAvatar = false;
      if (AppState.popupAddUser) AppState.popupAddUser = false;
      if (AppState.popupDeleteUser) AppState.popupDeleteUser = false;
      if (AppState.popupCreateDialog) AppState.popupCreateDialog = false;
    };
    this.setListener('#over', 'click', callback);
  }

  render() {
    return `
        <div id="over" class="{{#unless shownOverlay}}elem-hidden{{/unless}} overlay overlay_modal"></div>
    `;
  }
}
