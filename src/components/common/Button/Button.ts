import { Freact } from '../../../Freact/Freact';
import { IObj } from '../../../Freact/interfacesFreact';

export class Button extends Freact<IObj> {
  constructor(props?: IObj) {
    super({ ...props });
  }

  componentDidMount(oldProps: IObj) {
  }

  render() {
    return `
      <button class="button {{className}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>
    `;
  }
}
