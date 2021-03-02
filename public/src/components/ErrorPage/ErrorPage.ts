import {Freact} from "../../Freact/Freact.js";
import {IObj} from "../../Freact/interfaces";



export class ErrorPage extends Freact {
  constructor(props?: IObj) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps: IObj) {
  }



  render() {
    return `
      <main class="error-page">
        <h1 class="error-page__title">{{title}}</h1>
        <h2 class="error-page__description">{{description}}</h2>
        <a href="./index.html" class="error-page__link">Назад к чатам</a>
      </main>
    `;
  }
}
