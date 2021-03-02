import {render} from "../../scripts/utils/renderDom.js";
import {Dialogs} from "../../components/Dialogs/Dialogs.js";
import {Overlay} from "../../components/common/Overlay/Overlay.js";
import {Popup} from "../../components/common/Popup/Popup.js";


render(document.body, '.root', new Dialogs().getContent());
render(document.body, '.root', new Overlay().getContent());
render(document.body, '.root', new Popup().getContent());



