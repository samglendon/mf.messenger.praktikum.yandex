import { createState } from '../Freact/createState';

const initialState = {
  shownOverlay: false,
  popupAddUser: false,
  popupDeleteUser: false,
  popupCreateDialog: false,
};

export const AppState = createState(initialState);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    AppStateW: any;
    AuthStateW: any;
    DialogsStateW: any;
    ProfileStateW: any;
  }
}

window.AppStateW = AppState;
