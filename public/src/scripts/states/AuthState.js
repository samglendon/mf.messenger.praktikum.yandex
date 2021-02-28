import {createState} from "../Freact/createState.js";

const initialState = {
  myId: 5
};

export const AuthState = createState(initialState);


window.AuthStateW = AuthState;

