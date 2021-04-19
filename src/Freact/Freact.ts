import Handlebars from 'handlebars';

import { EventBus } from './Event-bus';
import { EventsCollection } from './EventsCollection';
import { handlebarsHelpers } from './handlebarsHelpers';
import { observe } from './observe';
import { IObj, IProxyObj } from './interfacesFreact';

handlebarsHelpers();

export class Freact<Props extends IObj> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _nextPropsLength = 0;
  private _checkedNumberOfProperties = 0;
  private _needUpdate = false;

  private _newElement: HTMLElement | null = null;
  // private _currentElement: Element | null = null;
  public _currentElement: HTMLElement | null = null;
  private _stringElement = '';

  eventBus: EventBus;
  eventsCollection: EventsCollection;
  props: Props;

  constructor(props: Props) {
    this.props = this._makePropsProxy(props);
    this.eventBus = new EventBus();
    this.eventsCollection = new EventsCollection();
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Freact.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Freact.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus.emit(Freact.EVENTS.FLOW_CDM);
  }

  // FIXME: СРЕДНЕ. Либо используем needRun для обновления eventListeners, либо можно переиспользовать
  //  componentDidMount весь
  setListener(elemSelector: string, eventName: string, callback: Function, needRun: boolean = false) {
    this.eventsCollection.set(elemSelector, eventName, callback, needRun);
  }

  _componentDidMount() {
    this.eventBus.emit(Freact.EVENTS.FLOW_RENDER);
    setTimeout(() => {
      if (this.props.observe) {
        this.props.observe.forEach(({ state, key }: { state: IProxyObj; key: string }) => {
          observe.call(this, state, key);
        });
      }
      this.componentDidMount(this.props);
    }, 0);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: object) {
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);

    const needUpdateCondition = response && this._nextPropsLength === this._checkedNumberOfProperties && this._needUpdate;
    if (needUpdateCondition) {
      this.eventBus.emit(Freact.EVENTS.FLOW_RENDER);
      this._nextPropsLength = 0;
      this._checkedNumberOfProperties = 0;
      this._needUpdate = false;

      // нужно опять навесить слушатели
      // FIXME: ВЫСОКИЙ. Очень странно, ведь elem.append синхронный метод, но почему-то не срабатывает resetEvents
      setTimeout(() => {
        this.eventsCollection.resetEvents();
      }, 0);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: object, newProps: object) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    this._nextPropsLength = Object.keys(nextProps).length;
    Object.assign(this.props, nextProps);
  };

  _render() {
    const tmplFromRender: string = this.render();
    const template = Handlebars.compile(tmplFromRender);
    this._stringElement = template(this.props);

    // первый вариант. Не хотел делать обертку, хотелось сразу получить элементы, которые прописаны в render()
    const parser = new DOMParser();
    const htmlBlockParsed = parser.parseFromString(this._stringElement, 'text/html');
    const htmlBlock = htmlBlockParsed.body.firstElementChild! as HTMLElement; // ! говорим, что не будет равнятся null

    if (!this._newElement) {
      this._newElement = htmlBlock;
    } else {
      // поиск по id или последнему классу
      const searchSelector = `.${this._newElement.classList[this._newElement.classList.length - 1]}`;
      const searchValue = this._newElement.id ? `#${this._newElement.id}` : searchSelector;

      this._currentElement = document.querySelector(searchValue); // компонент в DOM'e
      if (!this._currentElement) this._currentElement = htmlBlock;

      const htmlBlockInner = document.createDocumentFragment();
      const children = Array.from(htmlBlock.childNodes);
      children.forEach((elem) => {
        htmlBlockInner.append(elem);
      });

      const attr = htmlBlock.attributes;

      Array.from(attr).forEach(({ name, value }) => {
        if (this._currentElement) this._currentElement.setAttribute(name, value);
      });
      this._currentElement.innerHTML = '';
      this._currentElement.append(htmlBlockInner);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return '';
  }

  // вставляю именно этот элемент в DOM
  getContent(): HTMLElement {
    return this._newElement || document.createElement('div');
  }

  getStringElement() {
    return this._stringElement;
  }

  _makePropsProxy = (props: Props) => new Proxy(props, {
    get(target, prop: string) {
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set: (target, prop: string, val: unknown) => {
      if (target[prop] !== val) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        target[prop] = val;
        this._needUpdate = true;
      }
      this._checkedNumberOfProperties++;
      this.eventBus.emit(Freact.EVENTS.FLOW_CDU);
      return true;
    },
    // eslint-disable-next-line no-unused-vars
    deleteProperty(target, prop) {
      throw new Error('Отказано в доступе');
    },
  });

  hide = () => {
    console.log('скрыл элемент');
    console.dirxml(this._currentElement);
    this.getContent().remove();
    // this._newElement = null;
  }
}
