import './style.css';

import { Dialogs } from './components/Dialogs/Dialogs';
import { router } from './Freact/Routing/HashRouter';
import { Profile } from './components/Profile/Profile';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

import { apiAuth } from './scripts/api/api';
import { userInfoTC } from './states/AuthState';

const error404Context = {
  title: '404',
  description: 'Не туда попали',
};

const error500Context = {
  title: '500',
  description: 'Мы уже фиксим',
};

router
  .use('/', Dialogs)
  .use('/profile', Profile)
  .use('/login', Login)
  .use('/register', Register)
  .use('/error404', ErrorPage, error404Context)
  .use('/error500', ErrorPage, error500Context)
  .start();

// apiAuth.userInfo()
//   .then((userInfo) => {
//     console.dir(userInfo);
//   })
//   .catch((reason) => {
//     // debugger
//     console.error(reason);
//     router.go('/login');
//   });
userInfoTC();
