import {Freact} from "../../Freact/Freact";
import {Contacts} from "./Contacts/Contacts";
import {DialogContainer} from "./DialogContainer/DialogContainer";
import {IObj} from "../../Freact/interfaces";


export class Dialogs extends Freact {
  constructor(props?: IObj) {
    super({
      ...props,
      Contacts: new Contacts().getStringElement(),
      DialogContainer: new DialogContainer().getStringElement(),
    });
  }

  componentDidMount(oldProps: IObj) {

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
