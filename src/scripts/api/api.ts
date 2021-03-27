import {HTTPTransport} from "./xhrHttpRequest.js";

const xhrApi = new HTTPTransport(true);
// xhrApi.xhrWithRetry(5).get('https://trololo');

interface ISignup {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

interface IChangeProfile {
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  email?: string,
  phone?: string
}




const apiAuth = {
  signup(data: ISignup) {
    return xhrApi.post('/auth/signup', {data, headers: {credentials: false}});
  },
  signin(data: { login: string, password: string }) {
    return xhrApi.post('/auth/signin', {data,  headers: {credentials: false}});
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
    return xhrApi.put('/user/profile', {data});
  },
  changeAvatar(data: { avatar: FormData }) {
    return xhrApi.put('/user/profile/avatar', {data});
  },
  changePassword(data: { oldPassword: string, newPassword: string }) {
    return xhrApi.put('/user/password', {data});
  }
};


const apiChat = {
  get() {
    return xhrApi.get('/chats');
  },
  create(data: { title: string }) {
    return xhrApi.post('/chats', {data});
  },
  delete(data: { chatId: number }) {
    return xhrApi.delete('/chats', {data});
  },
  addUser(data: { users: number[], chatId: number }) {
    return xhrApi.put('/chats/users', {data});
  }
};


export {
  apiAuth,
  apiUser,
  apiChat
}

