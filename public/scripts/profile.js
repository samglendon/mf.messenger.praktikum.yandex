import {ProfileState} from "./Freact/ProfileState.js";

import {render} from "./helpers/renderDom.js";
import {Profile} from "./components/Profile/Profile.js";
import {ProfileButtons} from "./components/Profile/ProfileButtons.js";
import {ProfileForm} from "./components/Profile/ProfileForm.js";
import {Overlay} from "./components/common/Overlay/Overlay.js";
import {Popup} from "./components/common/Popup/Popup.js";
import {PopupProfileContent} from "./components/common/Popup/PopupProfileContent.js";


const profileForm = new ProfileForm();
const profileButtons = new ProfileButtons();
const popupContentSet = new PopupProfileContent({
  condition: ProfileState.setAvatar.value,
  className: 'modal__content_upload-file',
  error: false,
  success: false,
  formName: 'add-file',
  input: {
    id: 'add-file',
  },
});
const popupContentErr = new PopupProfileContent({
  className: 'modal__content_error',
  error: true,
  success: false,
  formName: 'add-file',
  input: {
    id: 'add-file-again',
  },
});
const popupContentSuccess = new PopupProfileContent({
  className: 'modal__content_success',
  error: false,
  success: true,
  formName: 'success',
});


const contextProfile = {
  edit: ProfileState.edit.value,
  name: 'Иван',
  ProfileForm: profileForm.getStringElement(),
  ProfileButtons: profileButtons.getStringElement(),
};


const profile = new Profile(contextProfile);
const overlay = new Overlay({shownOverlay: ProfileState.shownOverlay.value});
const popup = new Popup({
  shownOverlay: ProfileState.shownOverlay.value,
  setAvatar: ProfileState.setAvatar.value,
  errorSetAvatar: ProfileState.errorSetAvatar.value,
  successSetAvatar: ProfileState.successSetAvatar.value,
  PopupSet: popupContentSet.getStringElement(),
  PopupError: popupContentErr.getStringElement(),
  PopupSuccess: popupContentSuccess.getStringElement(),
});

render(document, '.root', profile);
render(document, '.root', overlay);
render(document, '.root', popup);


