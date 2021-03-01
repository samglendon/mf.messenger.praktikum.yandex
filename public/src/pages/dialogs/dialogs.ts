import {render} from "../../scripts/utils/renderDom";
import {Dialogs} from "../../components/Dialogs/Dialogs";
import {Overlay} from "../../components/common/Overlay/Overlay";
import {Popup} from "../../components/common/Popup/Popup";


render(document.body, '.root', new Dialogs().getContent());
render(document.body, '.root', new Overlay().getContent());
render(document.body, '.root', new Popup().getContent());



