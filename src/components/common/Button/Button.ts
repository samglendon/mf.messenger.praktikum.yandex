import {Freact} from "../../../Freact/Freact.js";
import {IObj} from "../../../Freact/interfacesFreact.js";


export class Button extends Freact<IObj> {
  constructor(props?: IObj) {
    super({...props});
  }

  componentDidMount(oldProps: IObj) {
  }

  render() {
    return `<button class="button {{className}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>`;
  }
}
