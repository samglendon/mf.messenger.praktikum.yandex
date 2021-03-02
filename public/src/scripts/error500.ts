import {render} from "./utils/renderDom.js";
import {ErrorPage} from "../components/ErrorPage/ErrorPage.js";

const errorContext = {
  title: '500',
  description: 'Мы уже фиксим',
};

render(document.body, '.root', new ErrorPage(errorContext).getContent());




