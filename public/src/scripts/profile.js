import {render} from "./utils/renderDom.js";
import {Profile} from "../components/Profile/Profile.js";
import {Overlay} from "../components/common/Overlay/Overlay.js";
import {Popup} from "../components/common/Popup/Popup.js";


render(document, '.root', new Profile());
render(document, '.root', new Overlay());
render(document, '.root', new Popup());


