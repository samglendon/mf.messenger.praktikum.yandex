import {Freact} from "../../../Freact/Freact.js";


export class Button extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
  }

  render() {
    return `<button class="button {{className}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>`;
  }
}
