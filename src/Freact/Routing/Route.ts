import {render} from "../../scripts/utils/renderDom.js";
import {PlainObject} from "../../scripts/interfacesAndTypeApp";
import {isEqual} from "../../scripts/utils/myDash/isEqual.js";


export class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: any;
  private _rootQuery: string;
  private _props: PlainObject;

  //FIXME: ВЫСОКИЙ. Как делать проверку что view наследуется от Freact?
  constructor(pathname: string, view: any, rootQuery: string, props: PlainObject) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
    // const regExp = new RegExp(this._pathname, 'i');
    // return pathname.match(regExp);
  }

  render() {
    //FIXME: СРЕДНИЙ. Если убрать проверку, то при создании нового блока в contexts записывается еще один экземпляр, нужно его от туда удалить
    // оставлю так пока
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      // render(document.body, this._rootQuery, this._block.getContent());
      // return;
    }
    render(document.body, this._rootQuery, this._block.getContent());
  }

  getPathname() {
    return this._pathname;
  }
}
