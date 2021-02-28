import {createState} from "../Freact/createState.js";

const initialState = {
  edit: false,
  changePassword: false,
  setAvatar: false,
  errorSetAvatar: false,
  successSetAvatar: false
};

export const ProfileState = createState(initialState);



window.ProfileStateW = ProfileState;

