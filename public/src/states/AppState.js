import {createState} from "../Freact/createState.js";

const initialState = {
  shownOverlay: false,
  popupAddUser: false,
  popupDeleteUser: false,
};

export const AppState = createState(initialState);



window.AppStateW = AppState;

