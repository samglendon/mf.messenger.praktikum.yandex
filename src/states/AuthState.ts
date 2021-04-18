import { createState } from '../Freact/createState';
import { apiAuth, apiUser } from '../scripts/api/api';
import { router } from '../Freact/Routing/HashRouter';
import { TFromForm } from '../scripts/interfacesAndTypeApp';
import { ProfileState } from './ProfileState';

const initialState = {
  id: null as number | null,
  login: null as string | null,
  display_name: null as string | null,
  first_name: null as string | null,
  second_name: null as string | null,
  email: 'trololo@yandex.ru' as string | null,
  avatar: null as string | null,
  phone: null as string | null,
};

export const AuthState = createState(initialState);
window.AuthStateW = AuthState;

export const userInfoTC = () => {
  setTimeout(() => {
    apiAuth.userInfo()
      .then((userInfo) => {
        // webSocketService.connect();
        Object.entries(userInfo).forEach(([key, value]) => {
          AuthState[key] = value;
        });
      })
      .catch((reason) => {
        console.error(reason);
        router.go('/login');
      });
  }, 0);
};

export const loginTC = (loginData: TFromForm, callbackError: Function) => {
  const { login, password } = loginData;

  apiAuth.signin({ login: String(login), password: String(password) })
    .then((data: any) => {
      console.log(data);
      return apiAuth.userInfo();
    })
    .then((userInfo) => {
      // webSocketService.connect();
      Object.entries(userInfo).forEach(([key, value]) => {
        AuthState[key] = value;
      });
      router.go('/');
    })
    .catch(({ reason }) => {
      console.error(reason);
      callbackError(reason);
    });
};

export const registerTC = (registerData: TFromForm, callbackError: Function) => {
  const { email, login, first_name, second_name, password, phone } = registerData;

  apiAuth.signup({
    email: String(email),
    login: String(login),
    first_name: String(first_name),
    second_name: String(second_name),
    password: String(password),
    phone: String(phone),
  })
    .then((data: any) => {
      console.log(data);
      router.go('/login');
    })
    .catch((err: unknown) => {
      console.error(err);
      callbackError(err);
    });
};

export const logoutTC = () => {
  apiAuth.logout()
    .then((data: any) => {
      console.log(data);
      router.go('/login');
    })
    .catch((err: unknown) => {
      console.error(err);
    });
};

export const changeProfileTC = (changeData: TFromForm, callbackError: Function) => {
  const { email, login, first_name, second_name, phone, display_name } = changeData;

  apiUser.changeProfile({
    email: String(email),
    login: String(login),
    first_name: String(first_name),
    second_name: String(second_name),
    phone: String(phone),
    display_name: String(display_name),
  })
    .then((changedProfile: any) => {
      console.log(changedProfile);
      // FIXME: ВЫСОКИЙ. Обновляется много раз и не срабатывает ProfileState.edit = false;
      ProfileState.edit = false;
      Object.entries(changedProfile).forEach(([key, value]) => {
        if (key === 'status' || key === 'id') return;
        AuthState[key] = value;
      });
    })
    .catch((err: unknown) => {
      console.error(err);
      callbackError(err);
    });
};

// export const changeAvatarTC = (avatarData: TFromForm, callbackError: Function) => {
//   const { avatar } = avatarData;
//
//   apiUser.changeAvatar({ avatar })
//     .then((changedAvatar: any) => {
//       console.log(changedAvatar);
//       ProfileState.edit = false;
//     })
//     .catch((err: unknown) => {
//       console.error(err);
//       callbackError(err);
//     });
// };
