import {Freact} from "../../Freact/Freact.js";
import {ProfileState} from "../../states/ProfileState.js";
import {observe} from "../../Freact/observe.js";
import {Contacts} from "./Contacts/Contacts.js";
import {DialogContainer} from "./DialogContainer/DialogContainer.js";


export class Dialogs extends Freact {
  constructor(props) {
    super({
      ...props,
      Contacts: new Contacts().getStringElement(),
      DialogContainer: new DialogContainer().getStringElement(),
    });
  }

  componentDidMount(oldProps) {

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
