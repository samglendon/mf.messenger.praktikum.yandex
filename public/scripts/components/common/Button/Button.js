import {Freact} from "../../../Freact/Freact.js";


export class Button extends Freact {
  constructor(props) {
    super(props);
  }

  render() {
    return `<button class="button {{className}}">{{text}}</button>`;
  }
}
