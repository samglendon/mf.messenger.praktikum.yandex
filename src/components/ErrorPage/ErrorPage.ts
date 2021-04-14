import { Freact } from '../../Freact/Freact';
import { router } from '../../Freact/Routing/HashRouter';
import { IObj } from '../../Freact/interfacesFreact';

export class ErrorPage extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
    });
  }

  componentDidMount(oldProps: IObj) {
    const clickHandler = (e: Event) => {
      router.go('/');
    };
    this.setListener('.error-page__link', 'click', clickHandler);
  }

  render() {
    return `
      <main class="error-page">
        <h1 class="error-page__title">{{title}}</h1>
        <h2 class="error-page__description">{{description}}</h2>
        <button class="error-page__link">Назад к чатам</button>
      </main>
    `;
  }
}
