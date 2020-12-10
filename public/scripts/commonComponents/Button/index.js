import {Button} from "./Button.js"


function render(from, query, block) {
  const root = from.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

const button = new Button({
  text: 'Click me',
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
