import {Route} from "./Route.js";
import {expect} from "chai";
import {HashRouter} from "./HashRouter.js";

import {JSDOM} from "jsdom";

// declare global {
//   interface Window {
//     addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//   }
// }

// FIXME: ВЫСОКИЙ. Тесты не работают, т.к. в ts файлах используется импорт .js файлов. Если убрать то сработает,
//  но при npm run compile файлы не будут найдены в браузере
describe('Проверка HashRouter', () => {
  describe('Проверка классов #sanity', () => {
    // it('Один экземпляр HashRouter на все приложение', function () {
    //   // const {window} = new JSDOM('<!doctype html><html><head></head><body></body></html>');
    //   // FIXME: ВЫСОКИЙ. Выкидывает ошибку ReferenceError: window is not defined
    //   const firstHashRouter = new HashRouter('');
    //   const secondHashRouter = new HashRouter('');
    //   expect(firstHashRouter).to.equal(secondHashRouter);
    // });

    it('Route содержит все необходимые методы #sanity', () => {
      const route = new Route('/', 123, '.app', {first: 1});
      expect(route).to.have.property('render');
      expect(route).to.have.property('match');
      expect(route).to.have.property('leave');
    });
  });
});


// describe('Typescript + Babel usage suite', () => { // the tests container
//   // it('should return string correctly', () => { // the single test
//   //   /* detect retina */
//   //   expect(hello("mocha")).to.equal('Hello'); // Do I need to explain anything? It's like writing in English!
//
//
//     /* fps limit */
//     // expect(options.fpsLimit).to.equal(30); // As I said 3 lines above
//     //
//     // expect(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
//     // expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear
//   // });
//
// });
