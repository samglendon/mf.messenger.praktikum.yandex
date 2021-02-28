import {render} from "./utils/renderDom.js";

import {ErrorPage} from "../components/ErrorPage/ErrorPage.js";

const errorContext = {
  title: '500',
  description: 'Мы уже фиксим',
};

render(document, '.root', new ErrorPage(errorContext));




