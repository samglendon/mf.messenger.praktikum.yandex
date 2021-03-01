import {render} from "./utils/renderDom.js";

import {ErrorPage} from "../components/ErrorPage/ErrorPage.js";

const errorContext = {
  title: '404',
  description: 'Не туда попали',
};

render(document.body, '.root', new ErrorPage(errorContext).getContent());




