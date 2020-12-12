import {Button} from "./Button.js"
import {render} from "../../../helpers/renderDom.js";

const button = new Button({
  text: 'Click me',
  clickHandler: ''
});

// app — это id дива в корне DOM
render(document, ".modal", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    text: 'Click me, please',
    className: 'button_active'
  });
}, 1000);
