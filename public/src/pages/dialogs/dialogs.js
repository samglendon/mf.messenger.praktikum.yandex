import {render} from "../../scripts/utils/renderDom.js";
import {Dialogs} from "../../components/Dialogs/Dialogs.js";
import {Popup} from "../../components/common/Popup/Popup.js";
import {Overlay} from "../../components/common/Overlay/Overlay.js";


render(document, '.root', new Dialogs());
render(document, '.root', new Overlay());
render(document, '.root', new Popup());



