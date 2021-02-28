import {Freact} from "../../Freact/Freact.js";



export class ErrorPage extends Freact {
  constructor(props) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps) {
  }



  render() {
    return `
      <main class="error-page">
        <h1 class="error-page__title">{{title}}</h1>
        <h2 class="error-page__description">{{description}}</h2>
        <a href="./dialogs.html" class="error-page__link">Назад к чатам</a>
      </main>
    `;
  }
}
