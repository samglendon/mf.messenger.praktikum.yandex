import {render} from "./utils/renderDom.js";
import {Dialogs} from "./components/Dialogs/Dialogs.js";
import {Popup} from "./components/common/Popup/Popup.js";


render(document, '.root', new Dialogs());
render(document, '.root', new Popup());



