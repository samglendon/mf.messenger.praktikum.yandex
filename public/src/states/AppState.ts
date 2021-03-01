import {createState} from "../Freact/createState.js";

const initialState = {
  shownOverlay: false,
  popupAddUser: false,
  popupDeleteUser: false,
};

export const AppState = createState(initialState);



declare global {
  interface Window {
    AppStateW: any;
    AuthStateW: any;
    DialogsStateW: any;
    ProfileStateW: any;
  }
}


window.AppStateW = AppState;

