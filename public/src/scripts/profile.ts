import {render} from "./utils/renderDom.js";
import {Profile} from "../components/Profile/Profile.js";
import {Overlay} from "../components/common/Overlay/Overlay.js";
import {Popup} from "../components/common/Popup/Popup.js";


render(document.body, '.root', new Profile().getContent());
render(document.body, '.root', new Overlay().getContent());
render(document.body, '.root', new Popup().getContent());


