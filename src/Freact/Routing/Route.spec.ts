import chai from 'chai';
import spies from 'chai-spies';
import { JSDOM } from 'jsdom';
import JSDOMGlob from 'jsdom-global';

import { Freact } from '../Freact';
import { Route } from './Route';
import { IObj } from '../interfacesFreact';

const { expect } = chai;
chai.use(spies);

// в Freact используется new DOMParser, пришлось добавить jsdom-global, чтобы в коде ничего не менять
JSDOMGlob();
global.DOMParser = window.DOMParser;

class TestBlock extends Freact<IObj> {
  constructor(props?: IObj) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="test-page">
      </div>
    `;
  }
}

const blockProps = { className: 'my-class' };
const rootQuery = '.app';
const pathname = '/testPath';

const createRoute = () => {
  return new Route(pathname, TestBlock, rootQuery, blockProps);
};

const createDocument = () => {
  const dom = new JSDOM(
    `<html>
        <body>
          <div class="app"></div>
        </body>
      </html>`,
    { url: 'http://localhost' },
  );

  // global.window = dom.window;
  global.document = dom.window.document;
};

describe('Route class basic functions', () => {

  it('Создание экземпляра Route для TestBlock', () => {
    const route = createRoute();
    expect(route.getPathname()).to.equal(pathname);
    expect(route._blockClass).to.equal(TestBlock);
    expect(route._block).to.equal(null);
    expect(route._props).to.equal(blockProps);
  });

  it('соответсвие пути', () => {
    const route = createRoute();
    expect(route.match(pathname)).to.be.true;
    expect(route.match('/someOtherPath')).to.be.false;
  });

  it('navigates to its pathname', () => {
    const route = createRoute();

    const spyOnMatch = chai.spy.on(route, 'match');
    const spyOnRender = chai.spy.on(route, 'render');

    route.navigate(pathname);

    expect(spyOnMatch).to.have.been.called.once;
    expect(spyOnRender).to.have.been.called.exactly(1);
  });

  it('Размонтирование компоненты, когда вызывается leave()', () => {
    const route = createRoute();
    route.render();
    route.leave();

    expect(
      route._block.getContent().style.display,
    ).to.equal('');
  });

  it('render компоненты первый раз', () => {
    createDocument();
    const route = createRoute();
    route.render();

    expect(route._block).to.be.an.instanceof(TestBlock);
    expect(document?.querySelector(rootQuery)?.innerHTML).to.be.ok;
  });

  it('Блок отображен, если сработал render()', () => {
    const route = createRoute();
    route.render();

    expect(route._block.getContent().style.display).to.equal('');
  });
});
