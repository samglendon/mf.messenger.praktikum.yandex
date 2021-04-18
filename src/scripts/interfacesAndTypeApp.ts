export type PlainObject<T = unknown> = {
  // eslint-disable-next-line no-unused-vars
  [k in string]: T;
};

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
}

export type PathDescription = {
  pathname: string;
  exactly: boolean;
}
// FIXME: из formData получаю {[k in string]: FormDataEntryValue}, несостыковочка
// export type TFromForm<T, A> = {
//   [key in keyof T]: A;
// }
export type TFromForm = {
  [key in string]: FormDataEntryValue;
}

export interface ISignin {
  login: string;
  password: string;
}

export interface ISignup {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface IChangeProfile {
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  email?: string,
  phone?: string
}

export enum SEND_ACTIONS {
  SEND_TEXT = 'SEND_TEXT',
  SEND_FILE = 'SEND_FILE',
}

export enum SUBSCRIBE_ACTIONS {
  MESSAGES = 'MESSAGES'
}
