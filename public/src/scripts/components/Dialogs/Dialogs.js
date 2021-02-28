import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";
import {Contacts} from "./Contacts/Contacts.js";
import {DialogContainer} from "./DialogContainer/DialogContainer.js";


export class Dialogs extends Freact {
  constructor(props) {
    super({
      ...props,
      // name: 'Иван',
      Contacts: new Contacts().getStringElement(),
      DialogContainer: new DialogContainer().getStringElement(),
      // ProfileChangePasswordForm: new ProfileChangePasswordForm().getStringElement(),
      // ProfileButtons: new ProfileButtons().getStringElement(),
    });
  }

  componentDidMount(oldProps) {
    // observe.call(this, ProfileState, 'edit');
    // observe.call(this, ProfileState, 'changePassword');

    // const callback = () => {
    //   ProfileState.shownOverlay = true;
    //   ProfileState.setAvatar = true;
    // };
    // this.setListener('.profile__ava', 'click', callback);
  }



  render() {
    return `
      <div class="dialogs-page">
    
          {{{Contacts}}}
          
          {{{DialogContainer}}}
        
        </div>
    `;
  }
}
