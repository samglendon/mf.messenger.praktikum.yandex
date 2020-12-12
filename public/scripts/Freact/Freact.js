import {EventBus} from "./Event-bus.js";

export class Freact {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  _meta = null;
  _element = null;
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
  _stringElement = '';

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  // constructor(props = {}, tagName = "div") {
  constructor(props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      // tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Freact.EVENTS.INIT);
  }


  get element() {
    return this._element;
  }
  get stringElement() {
    // debugger
    // return `${this._element}`;
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

  _componentDidMount() {
    this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
    // debugger
    setTimeout(this.componentDidMount.bind(this), 0)
    // this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    const needUpdateCondition = (response && this._neededUpdateCount === this._currentUpdateCount && this._needUpdate);
    if (needUpdateCondition) {
      this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
      this._neededUpdateCount = 0;
      this._currentUpdateCount = 0;
      this._needUpdate = false;
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
    this._neededUpdateCount = Object.keys(nextProps).length;
    Object.assign(this.props, nextProps);
  };

  _render() {
    const tmplFromRender = this.render();
// debugger
    const templator = Handlebars.compile(tmplFromRender);
    const blockTemplate = templator(this.props);

    this._stringElement = blockTemplate;

    // первый вариант
    const parser = new DOMParser();
    const HTMLBlockParsed = parser.parseFromString(blockTemplate, "text/html");
    const HTMLBlockAll = HTMLBlockParsed.body.firstElementChild;
    // console.log('HTMLBlockAll');
    // console.log(HTMLBlockAll);
    if (!this._element) {
      this._element = HTMLBlockAll;
    } else {
      const HTMLBlockInner = document.createDocumentFragment();
      [].forEach.call(HTMLBlockAll.childNodes, function (elem) {
        HTMLBlockInner.appendChild(elem);
      });
      const attr = HTMLBlockAll.attributes;
      Array.from(attr).forEach(({name, value}) => {
        this._element.setAttribute(name, value);
      });
      this._element.innerHTML = '';
      this._element.appendChild(HTMLBlockInner);

      // запасной второй вариант
      // this._element.outerHTML = blockTemplate;

    }

    // console.log("this._element после вставки ")
    // console.log(this._element)
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
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      set: (target, prop, val, receiver) => {
        const oldValue = target[prop];
        if (prop === 'button') {
          target.__proto__.toString = function () {
            return this.__proto__.valueOf();
          }
        }
        debugger
        if (oldValue !== val) {
          target[prop] = val;
          this._needUpdate = true;
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
