import {EventBus} from "./Event-bus.js";
import {EventsCollection} from "./EventsCollection.js";
import {handlebarsHelpers} from "./handlebarsHelpers.js";
handlebarsHelpers();
import {IObj} from "./interfaces";

// FIXME: ВЫСОКИЙ. Без понятия как подключить handlebars
// @ts-ignore
// import Handlebars from 'handlebars';


export class Freact {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _nextPropsLength = 0;
  private _checkedNumberOfProperties = 0;
  private _needUpdate = false;
  private _display = {
    block: 'block',
    flex: 'flex',
    grid: 'grid',
    inline: 'inline',
    inlineBlock: 'inline-block'
  };
  private _newElement: Element | null = null;
  private _currentElement: Element | null = null;
  private _stringElement = '';

  eventBus: EventBus;
  eventsCollection: EventsCollection;
  props: IObj;


  constructor(props: object) {
    this.props = this._makePropsProxy(props);

    this.eventBus = new EventBus();
    this.eventsCollection = new EventsCollection();

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Freact.EVENTS.INIT);

    // return new Proxy(this, ProxyHandle());
  }

  // вставляю именно этот элемент в DOM
  get element() {
    return this._newElement || document.createElement('div');
  }


  get stringElement() {
    return this._stringElement;
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


  setListener(elemSelector: string, eventName: string, callback: EventListener) {
    this.eventsCollection.set(elemSelector, eventName, callback);
  }

  _componentDidMount() {
    this.eventBus.emit(Freact.EVENTS.FLOW_RENDER);
    setTimeout(() => {this.componentDidMount(this.props)}, 0)
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: object) {
  }

   _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);

    let needUpdateCondition = (response && this._nextPropsLength === this._checkedNumberOfProperties && this._needUpdate);
    if (needUpdateCondition) {
      this.eventBus.emit(Freact.EVENTS.FLOW_RENDER);
      this._nextPropsLength = 0;
      this._checkedNumberOfProperties = 0;
      this._needUpdate = false;

      // нужно опять навесить слушатели
      // FIXME: ВЫСОКИЙ. Очень странно, ведь elem.append синхронный метод, но почему-то не срабатывает resetEvents
      setTimeout(() => {this.eventsCollection.resetEvents()}, 0)
      // this.eventsCollection.resetEvents();

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
    // debugger
    this._nextPropsLength = Object.keys(nextProps).length;
    Object.assign(this.props, nextProps);
  };

  _render() {
    // debugger
    const tmplFromRender: string = this.render();
    const template = window.Handlebars.compile(tmplFromRender);
    // const template = Handlebars.compile(tmplFromRender);
    this._stringElement = template(this.props);

    // первый вариант. Не хотел делать обертку, хотелось сразу получить элементы, которые прописаны в render()
    const parser = new DOMParser();
    const htmlBlockParsed = parser.parseFromString(this._stringElement, "text/html");
    const htmlBlock = htmlBlockParsed.body.firstElementChild!; // ! говорим, что не будет равнятся null

    if (!this._newElement) {
      this._newElement = htmlBlock;
    } else {
      // поиск по последнему классу, наверное не очень корректо
      const searchSelector = `.${this._newElement.classList[this._newElement.classList.length - 1]}`;
      const searchValue = this._newElement.id ? `#${this._newElement.id}`: searchSelector;

      this._currentElement = document.querySelector(searchValue); // компонент в DOM'e
      if (!this._currentElement) this._currentElement = htmlBlock;

      const htmlBlockInner = document.createDocumentFragment();
      const children = Array.from(htmlBlock.childNodes);
      children.forEach((elem) => {
        htmlBlockInner.append(elem);
      });

      const attr = htmlBlock.attributes;

      Array.from(attr).forEach(({name, value}) => {
        if (this._currentElement) this._currentElement.setAttribute(name, value);
      });
      this._currentElement.innerHTML = '';
      this._currentElement.append(htmlBlockInner);


      // запасной второй вариант
      // this._element.outerHTML = blockTemplate;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return '';
  }


  getContent() {
    return this.element;
  }

  getStringElement() {
    return this.stringElement;
  }

  _makePropsProxy = (props: { [key: string]: any }) => {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop: string, val) => {
        // if (typeof val === 'object' && val.hasOwnProperty('_needUpdate')) {
        //   if (val._needUpdate === false) {
        //     target[prop] = val.value;
        //     return true;
        //   }
        // }
        if (target[prop] !== val) {
          this._needUpdate = true;
          target[prop] = val;

          // ------ для теста --------
          // if (prop === 'addUser') {
          //   console.dir('установил addUser ' + val + ' для ' );
          //   console.dirxml(this.currentBlock);
          //   console.log('_needUpdate = ' + this._needUpdate);
          //   console.log('-----------------------')
          // }
          // -------------------------
        }
        this._checkedNumberOfProperties++;
        this.eventBus.emit(Freact.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Отказано в доступе");
      }
    });
  };


  // show(display) {
  //   this.getContent().style.display = `${this._display[display]}`;
  // }
  //
  // hide() {
  //   this.getContent().style.display = "none";
  // }
}
