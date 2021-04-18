import { SEND_ACTIONS, SUBSCRIBE_ACTIONS } from '../interfacesAndTypeApp';
import { WSS_URL_PROD } from '../../config';
import { DialogsState } from '../../states/DialogsState';

class WebSocketService {
  private static __instance: WebSocketService;
  private readonly _baseUrl: string = WSS_URL_PROD;
  private socket: WebSocket | null = null;
  private intervalID: NodeJS.Timeout | null = null;

  constructor() {
    if (WebSocketService.__instance) {
      return WebSocketService.__instance;
    }
    WebSocketService.__instance = this;
  }

  connect = (userId: number, chatId: number, token: string) => {
    if (!this.socket) {
      this.socket = new WebSocket(`${this._baseUrl}/${userId}/${chatId}/${token}`);
    }

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      if (this.intervalID) clearInterval(this.intervalID);

      if (this.socket) {
        this.socket.send(JSON.stringify({ content: 'Моё первое сообщение миру!', type: 'message' }));
      }
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
        this.intervalID = setInterval(() => { this.connect(userId, chatId, token); }, 5000);
      }
      console.log(`Websocket закрыт. Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка');
      console.dir(event);
    });

    this.subscribe(SUBSCRIBE_ACTIONS.MESSAGES, (event: any) => {
      console.log('Получены данные');
      console.dir(event.data);
      DialogsState.currentMessages = [...DialogsState.currentMessages, JSON.parse(event.data)];
    });
  };

  send = (action: SEND_ACTIONS, payload: { content: string }) => {
    if (this.socket) {
      if (action === SEND_ACTIONS.SEND_TEXT) this.socket.send(JSON.stringify({ ...payload, type: 'message' }));
      else if (action === SEND_ACTIONS.SEND_FILE) this.socket.send(JSON.stringify({ ...payload, type: 'file' }));
    }
  };

  subscribe = (action: SUBSCRIBE_ACTIONS, listener: EventListenerOrEventListenerObject) => {
    if (this.socket) {
      if (action === SUBSCRIBE_ACTIONS.MESSAGES) this.socket.addEventListener('message', listener);
    }
  };
}

export const webSocketService = new WebSocketService();
