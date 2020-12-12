import {Freact} from "../../../Freact/Freact.js";


export class Button extends Freact {
  constructor(props) {
    super(props);
  }

  componentDidMount(oldProps) {
    if (oldProps.clickHandler) {
      const neededClass = this.props.className.split(' ').pop();
      const button = document.querySelector(`.${neededClass}`);

      button.addEventListener('click', (e) => { debugger; oldProps.clickHandler(e, this)});
    }
  }

  render() {
    return `<button class="button {{className}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>`;
  }
}
