import {Freact} from "../../../Freact/Freact";
import {IObj} from "../../../Freact/interfaces";


export class Button extends Freact {
  constructor(props?: IObj) {
    super({...props});
  }

  componentDidMount(oldProps: IObj) {
  }

  render() {
    return `<button class="button {{className}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>`;
  }
}
