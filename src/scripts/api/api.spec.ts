import chai from 'chai';
import spies from 'chai-spies';
import { HTTPTransport } from './xhrHttpRequest';

const { expect } = chai;
chai.use(spies);

const createXhr = () => new HTTPTransport();

describe('API Fetch', () => {
  it('Проверяем отработку запросов с количеством попыток', () => {
    const xhr = createXhr();

    const spyOnGet = chai.spy.on(xhr, 'get');

    xhr.xhrWithRetry(5, 0).get('https://trololo');

    setTimeout(() => {
      expect(spyOnGet).to.have.been.called.exactly(5);
    }, 1000);
  });
});
