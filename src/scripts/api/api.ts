import { HTTPTransport } from './xhrHttpRequest';
import { IChangeProfile, ISignin, ISignup } from '../interfacesAndTypeApp';

const xhrApi = new HTTPTransport();

const apiAuth = {
  signup(data: ISignup) {
    return xhrApi.post('/auth/signup', { data, headers: { credentials: false } });
  },
  signin(data: ISignin) {
    return xhrApi.post('/auth/signin', { data });
  },
  userInfo() {
    return xhrApi.get('/auth/user');
  },
  logout() {
    return xhrApi.post('/auth/logout');
  },
};

const apiUser = {
  changeProfile(data: IChangeProfile) {
    return xhrApi.put('/user/profile', { data });
  },
  changeAvatar(data: { avatar: FormData }) {
    return xhrApi.put('/user/profile/avatar', { data });
  },
  changePassword(data: { oldPassword: string, newPassword: string }) {
    return xhrApi.put('/user/password', { data });
  },
};

const apiChat = {
  get() {
    return xhrApi.get('/chats');
  },
  create(data: { title: string }) {
    return xhrApi.post('/chats', { data });
  },
  delete(data: { chatId: number }) {
    return xhrApi.delete('/chats', { data });
  },
  addUser(data: { users: number[], chatId: number }) {
    return xhrApi.put('/chats/users', { data });
  },
  getToken(chatId: number) {
    return xhrApi.post(`/chats/token/${chatId}`);
  },
};

export {
  apiAuth,
  apiUser,
  apiChat,
};
