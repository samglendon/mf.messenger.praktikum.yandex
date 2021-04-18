import { Freact } from '../../../Freact/Freact';
import { ContactsList } from './ContactsList/ContactsList';
import { router } from '../../../Freact/Routing/HashRouter';
import { IObj } from '../../../Freact/interfacesFreact';
import { AppState } from '../../../states/AppState';

export class Contacts extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
      ContactsList: new ContactsList().getStringElement(),
      inputValue: '',
    });
  }

  componentDidMount(oldProps: IObj) {
    const clickHandler = () => {
      router.go('/profile');
    };
    this.setListener('.contacts__profile-button', 'click', clickHandler);

    const openCreateDialogModal = (e: Event) => {
      AppState.shownOverlay = true;
      AppState.popupCreateDialog = true;
    };

    this.setListener('.contacts__create', 'click', openCreateDialogModal);
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
        
        <button class="contacts__create">+</button>
      </aside>
    `;
  }
}
