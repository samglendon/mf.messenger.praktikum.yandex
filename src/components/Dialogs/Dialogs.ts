import {Freact} from "../../Freact/Freact.js";
import {Contacts} from "./Contacts/Contacts.js";
import {DialogContainer} from "./DialogContainer/DialogContainer.js";
import {IObj} from "../../Freact/interfacesFreact";
import { Overlay } from "../common/Overlay/Overlay.js";
import {Popup} from "../common/Popup/Popup.js";


export class Dialogs extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      Contacts: new Contacts().getStringElement(),
      DialogContainer: new DialogContainer().getStringElement(),
      Overlay: new Overlay().getStringElement(),
      Popup: new Popup().getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {

  }


  render() {
    return `
      <div class="dialogs-page">
    
          {{{Contacts}}}
          
          {{{DialogContainer}}}
          
          {{{Overlay}}}
          {{{Popup}}}
      </div>
    `;
  }
}
