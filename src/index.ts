import {Dialogs} from "./components/Dialogs/Dialogs.js";
import {router} from "./Freact/Routing/HashRouter.js";
import {Profile} from "./components/Profile/Profile.js";
import {Login} from "./components/Login/Login.js";
import {Register} from "./components/Register/Register.js";
import {ErrorPage} from "./components/ErrorPage/ErrorPage.js";


const error404Context = {
  title: '404',
  description: 'Не туда попали',
};

const error500Context = {
  title: '500',
  description: 'Мы уже фиксим',
};

router
  .use("/", Dialogs)
  .use("/profile", Profile)
  .use("/login", Login)
  .use("/register", Register)
  .use("/error404", ErrorPage, error404Context)
  .use("/error500", ErrorPage, error500Context)
  .start();
