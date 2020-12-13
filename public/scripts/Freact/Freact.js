import {EventBus} from "./Event-bus.js";
import {EventsCollection} from "./EventsCollection.js";

export class Freact {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  _meta = null;
  _neededUpdateCount = 0;
  _currentUpdateCount = 0;
  _needUpdate = false;
  _display = {
    block: 'block',
    flex: 'flex',
    grid: 'grid',
    inline: 'inline',
    inlineBlock: 'inline-block'
  };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  // constructor(props = {}, tagName = "div") {
  constructor(props = {}) {
    const eventBus = new EventBus();
    const eventsCollection = new EventsCollection();

    this._meta = {
      // tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.eventsCollection = () => eventsCollection;

    this._registerEvents(eventBus);
    eventBus.emit(Freact.EVENTS.INIT);
  }

  _element = null;

  get element() {
    return this._element;
  }

  _stringElement = '';

  get stringElement() {
    return this._stringElement;
  }

  _registerEvents(eventBus) {
    eventBus.on(Freact.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Freact.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // _createResources() {
  //   const {tagName} = this._meta;
  //   // this._element = this._createDocumentElement(tagName);
  //   // this._element = document.createDocumentFragment();
  //   // debugger
  // }

  init() {
    // this._createResources();
    this.eventBus().emit(Freact.EVENTS.FLOW_CDM);
  }


  setListener(elemSelector, eventName, callback) {
    this.eventsCollection().set(elemSelector, eventName, callback);
  }

  _componentDidMount() {
    this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
    setTimeout(() => {this.componentDidMount.call(this, this.props)}, 0)
    // setTimeout(() => {this._saveListeners()}, 0)
    // this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    let needUpdateCondition = (response && this._neededUpdateCount === this._currentUpdateCount && this._needUpdate);
    if (needUpdateCondition) {
      this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
      this._neededUpdateCount = 0;
      this._currentUpdateCount = 0;
      this._needUpdate = false;
      needUpdateCondition = false;

      // нужно опять навесить слушатели
      this.eventsCollection().resetEvents();

    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
// debugger
    this._neededUpdateCount = Object.keys(nextProps).length;
    Object.assign(this.props, nextProps);
  };

  _render() {
    const tmplFromRender = this.render();
    const template = Handlebars.compile(tmplFromRender);
    const blockTemplate = template(this.props);

    this._stringElement = blockTemplate;

    // первый вариант
    const parser = new DOMParser();
    const htmlBlockParsed = parser.parseFromString(blockTemplate, "text/html");
    const htmlBlock = htmlBlockParsed.body.firstElementChild;

    if (!this._element) {
      this._element = htmlBlock;
    } else {
      const searchSelector = `.${this._element.classList[this._element.classList.length - 1]}`;
      const searchValue = this._element.id ? `#${this._element.id}`: searchSelector;
      // debugger

      this.currentBlock = document.querySelector(searchValue);
      if (!this.currentBlock) this.currentBlock = htmlBlock;

      const htmlBlockInner = document.createDocumentFragment();
      const children = Array.from(htmlBlock.childNodes);
      children.forEach((elem) => {
        htmlBlockInner.appendChild(elem);
      });

      const attr = htmlBlock.attributes;
      // debugger
      Array.from(attr).forEach(({name, value}) => {
        this.currentBlock.setAttribute(name, value);
      });
      this.currentBlock.innerHTML = '';
      this.currentBlock.appendChild(htmlBlockInner);


      // запасной второй вариант
      // this._element.outerHTML = blockTemplate;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
  }


  getContent() {
    // debugger
    return this.element;
  }

  getStringElement() {
    return this.stringElement;
  }

  _makePropsProxy = (props) => {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, val, receiver) => {
        if (prop === 'setActive') {
          target.Options[0]
        }
        const oldValue = target[prop];
        if (oldValue !== val) {
          this._needUpdate = true;
          target[prop] = val;
        }
        this._currentUpdateCount++;
        this.eventBus().emit(Freact.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Отказано в доступе");
      }
    });
  };


  // _createDocumentElement(tagName) {
  //   // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
  //   // return document.createElement(tagName);
  //   // this._elementFragment = document.createDocumentFragment();
  //   // return this._elementFragment;
  // }

  show(display) {
    this.getContent().style.display = `${this._display[display]}`;
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
