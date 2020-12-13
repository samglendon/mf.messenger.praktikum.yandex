import {Freact} from "../../../Freact/Freact.js";
import {ProfileState} from "../../../Freact/ProfileState.js";
import {observe} from "../../../helpers/observe.js";


export class Overlay extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    observe.call(this, ProfileState, 'shownOverlay');

    const callback = () => {
      ProfileState.shownOverlay.value = !ProfileState.shownOverlay.value;
    };
    this.setListener('#over', 'click', callback);
  }


  render() {
    return `<div id="over" class="overlay overlay_modal {{#unless shownOverlay}}elem-hidden{{/unless}}"></div>`;
  }
}
