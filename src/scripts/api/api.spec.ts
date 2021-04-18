// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import { apiAuth } from './api';

// FIXME: ВЫСОКИЙ. Тесты не работают, т.к. в ts файлах используется импорт .js файлов. Если убрать то сработает,
//  но при npm run compile файлы не будут найдены в браузере
describe('Авторизация', () => {
  it('Проверяем корректный logout', () => {
    apiAuth.logout()
      .catch((err) => expect(err).to.any);
  });

  describe('Проверка авторизации через форму', () => {
    it('Проверяем валидные данные в signin', () => {
    });

    it('Проверяем валидные данные в signup', () => {
    });
  });

  describe('Дополнительный функционал при авторизации', () => {
    it('Что-то дополнительно связанное с авторизацией', () => {
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
//     // emitters property is an array and for this test must be empty, this syntax works with strings too
//     // expect(options.interactivity.modes.emitters).to.be.empty;
//     // this is a little more complex, but still really clear
//     // expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff");
//   // });
//
// });
