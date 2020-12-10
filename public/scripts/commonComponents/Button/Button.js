import {Block} from "../../block/Block.js";


export class Button extends Block {
  constructor(props) {
    // Создаём враппер дом-элемент button
    super(props);
  }

  render() {
    // В проекте должен быть ваш собственный шаблонизатор
    return `<button class="button {{className}}" data-id="тест">{{text}}</button>`;
  }
}
