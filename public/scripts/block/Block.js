import {EventBus} from "./Event-bus.js";

export class Block {
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

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props = {}, tagName = "div") {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _element = null;

  get element() {
    return this._element;
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const {tagName} = this._meta;
    // this._element = this._createDocumentElement(tagName);
    // this._element = document.createDocumentFragment();
    // debugger
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    const needUpdateCondition = (response && this._neededUpdateCount === this._currentUpdateCount && this._needUpdate);
    if (needUpdateCondition) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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

    const templator = Handlebars.compile(tmplFromRender);
    const blockTemplate = templator(this.props);

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
      })
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
    return this.element;
  }

  _makePropsProxy = (props) => {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      set: (target, prop, val, receiver) => {
        const oldValue = target[prop];
        if (oldValue !== val) {
          target[prop] = val;
          this._needUpdate = true;
        }
        this._currentUpdateCount++;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
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

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
