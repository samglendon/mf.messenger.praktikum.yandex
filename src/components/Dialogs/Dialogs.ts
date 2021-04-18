import { Freact } from '../../Freact/Freact';
import { Contacts } from './Contacts/Contacts';
import { DialogContainer } from './DialogContainer/DialogContainer';
import { Overlay } from '../common/Overlay/Overlay';
import { Popup } from '../common/Popup/Popup';
import { IObj } from '../../Freact/interfacesFreact';

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
