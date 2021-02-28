import {createState} from "../Freact/createState.js";

const initialState = {
  activeDialogNumber: null,
  openControl: false,
  openAttach: false,
  dialogsList: [
    {
      dialogId: '',
      title: 'Андрей',
      lastMessage: {
        sender: 'incoming',
        text: 'Изображение',
        time: '11:30',
      },
      newMessageCount: 0,
    },
    {
      dialogId: '',
      title: 'Киноклуб',
      lastMessage: {
        sender: 'outgoing',
        text: 'стикер',
        time: '9:35',
      },
      newMessageCount: 1,
    },
    {
      dialogId: '',
      title: 'Илья',
      lastMessage: {
        sender: 'incoming',
        text: 'Друзья, у меня для вас особенный выпуск новостей! Много чего нужно расскзать',
        time: '15:12',
      },
      newMessageCount: 4,
    },
  ],
  currentMessages: [
    {
      first: true, // после уберу это
      sender: {
        id: 5
      },
      type: 'text',
      message: 'Привет, как дела? Расскажи, что у тебя нового. какой-то текст тестовый. еще текст ываываыва ываыва ываыва',
      date: '11:50',
      status: 'read'
    },
    {
      first: false, // после уберу это
      sender: {
        id: 1234
      },
      type: 'text',
      message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад \n' +
        'адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки ' +
        'этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой \n\n ' +
        'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было ' +
        'произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      date: '11:51',
      status: 'read'
    },
    {
      sender: {
        id: 1234
      },
      type: 'image',
      message: 'src/images/testImg.jpg',
      date: '11:51',
      status: 'read'
    },
  ],
  addUser: false,
  deleteUser: false,
};

export const DialogsState = createState(initialState);


window.DialogsStateW = DialogsState;

