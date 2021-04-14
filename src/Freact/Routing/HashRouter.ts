import { Route } from './Route';
import { PlainObject } from '../../scripts/interfacesAndTypeApp';

class HashRouter {
  private static __instance: HashRouter | null = null;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private readonly _rootQuery: string;

  // constructor(private _rootQuery: string) {
  constructor(rootQuery: string) {
    this._rootQuery = rootQuery;

    if (HashRouter.__instance) {
      return HashRouter.__instance;
    }

    HashRouter.__instance = this;
  }

  use(pathname: string, block: any, props: PlainObject = {}) {
    const route = new Route(`#${pathname}`, block, this._rootQuery, props);
    this.routes.push(route);
    return this;
  }

  start() {
    const { location } = window;

    window.addEventListener('hashchange', (e: HashChangeEvent) => {
      const newHash = location.hash;
      this._onRoute(newHash);
    });

    // window.onpopstate = (event: Event) => {
    //   debugger
    //   const currentTarget: EventTarget = event.currentTarget!;
    //   //FIXME: ВЫСОКИЙ. Проблемы с location и TS
    //   // @ts-ignore
    //   this._onRoute(currentTarget.location.pathname);
    // };
    const pathStartTmp = location.hash ? location.hash : '/';
    const pathStart = pathStartTmp.replace('#', '');

    this.go(pathStart);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      // route.render(route, pathname);
      route.render();
    } else {
      this.go('/error404');
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', `#${pathname}`);
    this._onRoute(`#${pathname}`);
  }

  back() {
    const currentRouteInd = this.routes.findIndex((route) => {
      if (this._currentRoute) return route.match(this._currentRoute.getPathname());
      return false;
    });
    if (currentRouteInd === 0 || currentRouteInd === -1) return;

    const router = this.routes[currentRouteInd - 1];
    this._onRoute(router.getPathname());
  }

  forward() {
    const currentRouteInd = this.routes.findIndex((route) => {
      if (this._currentRoute) return route.match(this._currentRoute.getPathname());
      return false;
    });
    if (currentRouteInd === this.history.length - 1 || currentRouteInd === -1) return;

    const router = this.routes[currentRouteInd + 1];
    this._onRoute(router.getPathname());
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new HashRouter('.app');

export {
  HashRouter,
  router,
};
