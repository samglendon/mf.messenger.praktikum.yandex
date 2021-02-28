import {EventBus} from "./Event-bus.js";
import {EventsCollection} from "./EventsCollection.js";
import {ProxyHandler} from "./ProxyHandler.js";
import {handlebarsHelpers} from "./handlebarsHelpers.js";
handlebarsHelpers();


export class Freact {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  _meta = null;
  _nextPropsLength = 0;
  _checkedNumberOfProperties = 0;
  _needUpdate = false;
  _display = {
    block: 'block',
    flex: 'flex',
    grid: 'grid',
    inline: 'inline',
    inlineBlock: 'inline-block'
  };

  // /** JSDoc
  //  * @param {Object} props
  //  *
  //  * @returns {void}
  //  */
  constructor(props = {}) {
    const eventBus = new EventBus();
    const eventsCollection = new EventsCollection();

    this._meta = {
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.eventsCollection = () => eventsCollection;

    this._registerEvents(eventBus);
    eventBus.emit(Freact.EVENTS.INIT);

    return new Proxy(this, ProxyHandler());
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


  init() {
    this.eventBus().emit(Freact.EVENTS.FLOW_CDM);
  }


  setListener(elemSelector, eventName, callback) {
    this.eventsCollection().set(elemSelector, eventName, callback);
  }

  _componentDidMount() {
    this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
    setTimeout(() => {this.componentDidMount(this.props)}, 0)
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
  }

   _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    let needUpdateCondition = (response && this._nextPropsLength === this._checkedNumberOfProperties && this._needUpdate);
    if (needUpdateCondition) {
      this.eventBus().emit(Freact.EVENTS.FLOW_RENDER);
      this._nextPropsLength = 0;
      this._checkedNumberOfProperties = 0;
      this._needUpdate = false;

      // нужно опять навесить слушатели
      // FIXME: ВЫСОКИЙ. Очень странно, ведь elem.append синхронный метод, но почему-то не срабатывает resetEvents
      setTimeout(() => {this.eventsCollection().resetEvents()}, 0)
      // this.eventsCollection().resetEvents();

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
    this._nextPropsLength = Object.keys(nextProps).length;
    Object.assign(this.props, nextProps);
  };

  _render() {
    const tmplFromRender = this.render();
    const template = Handlebars.compile(tmplFromRender);
    const blockTemplate = template(this.props);

    this._stringElement = blockTemplate;

    // первый вариант. Не хотел делать обертку, хотелось сразу получить элементы, которые прописаны в render()
    const parser = new DOMParser();
    const htmlBlockParsed = parser.parseFromString(blockTemplate, "text/html");
    const htmlBlock = htmlBlockParsed.body.firstElementChild;

    if (!this._element) {
      this._element = htmlBlock;
    } else {
      const searchSelector = `.${this._element.classList[this._element.classList.length - 1]}`;
      const searchValue = this._element.id ? `#${this._element.id}`: searchSelector;

      this.currentBlock = document.querySelector(searchValue); // компонент в DOM'e
      if (!this.currentBlock) this.currentBlock = htmlBlock;

      const htmlBlockInner = document.createDocumentFragment();
      const children = Array.from(htmlBlock.childNodes);
      children.forEach((elem) => {
        htmlBlockInner.append(elem);
      });

      const attr = htmlBlock.attributes;

      Array.from(attr).forEach(({name, value}) => {
        this.currentBlock.setAttribute(name, value);
      });
      this.currentBlock.innerHTML = '';
      this.currentBlock.append(htmlBlockInner);


      // запасной второй вариант
      // this._element.outerHTML = blockTemplate;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
  }


  getContent() {
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
      set: (target, prop, val) => {
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
        this.eventBus().emit(Freact.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Отказано в доступе");
      }
    });
  };


  show(display) {
    this.getContent().style.display = `${this._display[display]}`;
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
