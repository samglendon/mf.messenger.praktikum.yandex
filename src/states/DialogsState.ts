import { createState } from '../Freact/createState';

import { AppState } from './AppState';

import { apiChat } from '../scripts/api/api';
import { webSocketService } from '../scripts/api/WebSocketService';

import { AuthState } from './AuthState';

const initialState = {
  activeDialogNumber: null as number | null,
  inputValue: '',
  openControl: false,
  openAttach: false,
  dialogsList: [
    {
      id: 1,
      avatar: null,
      created_by: 1,
      title: 'Андрей',
      last_message: {
        user: {
          first_name: 'Petya',
          second_name: 'Pupkin',
          avatar: null,
          email: 'two@gmail.com',
          login: 'userLogin',
          phone: '8(911)-222-33-22',
        },
        time: '22:22',
        content: 'this is message content',
      },
      unread_count: 5,
    },
  ],
  currentMessages: [
    {
      id: 1,
      user_id: 12836,
      content: 'ТЕСТ!!',
      type: 'message',
      time: '2021-04-14T12:50:12+00:00',
    },
  ],
  TOKEN_VALUE: null as string | null,
};

export const DialogsState = createState(initialState);
window.DialogsStateW = DialogsState;

export const getChatsTC = () => {
  apiChat.get()
    .then((data: any) => {
      console.log(data);
      DialogsState.dialogsList = [...data];
    })
    .catch((err: unknown) => {
      console.error(err);
    });
};

export const createDialogTC = (data: { title: string }, callbackError: Function) => {
  apiChat.create(data)
    .then((data: any) => {
      console.log(data);
      AppState.popupCreateDialog = false;
      AppState.shownOverlay = false;
      getChatsTC();
    })
    .catch((err: unknown) => {
      console.error(err);
      callbackError(err);
    });
};

export const addUserTC = (usersId: number[], callbackError: Function) => {
  // debugger;
  const data = {
    users: [...usersId],
    chatId: DialogsState.dialogsList[DialogsState.activeDialogNumber].id,
  };
  // debugger;
  apiChat.addUser(data)
    .then((data: any) => {
      console.log(data);
      // debugger;
      AppState.popupAddUser = false;
      AppState.shownOverlay = false;
    })
    .catch((err: unknown) => {
      // debugger;
      console.error(err);
      callbackError(err);
    });
};

export const prepareAndConnectWSTC = (chatId: number) => {
  // debugger
  DialogsState.currentMessages = [];
  apiChat.getToken(chatId)
    .then((data: any) => {
      const { token } = data;
      console.log('Токен');
      console.log(token);
      // debugger
      webSocketService.connect(AuthState.id, chatId, token);
    })
    .catch((err: unknown) => {
      // debugger
      console.error(err);
    });
};
