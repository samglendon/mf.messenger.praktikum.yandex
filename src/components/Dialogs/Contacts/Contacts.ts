import {Freact} from "../../../Freact/Freact.js";
import {ContactsList} from "./ContactsList/ContactsList.js";
import {router} from "../../../Freact/Routing/HashRouter.js";
import {IObj} from "../../../Freact/interfacesFreact";


export class Contacts extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      ContactsList: new ContactsList().getStringElement(),
      inputValue: ''
    });
  }

  componentDidMount(oldProps: IObj) {
    const clickHandler = () => {
      router.go('/profile')
    };
    this.setListener('.contacts__profile-button', 'click', clickHandler);
  }

  render() {
    return `
      <aside class="contacts">
        <button class="contacts__profile-button">Профиль ></button>
        <form class="contacts__search-container">
          <input id="contactsSearch" class="search contacts__search" type="text" name="search"
                value="{{inputValue}}"
                 placeholder="   Поиск">
        </form>
        
        {{{ContactsList}}}
      </aside>
    `;
  }
}
