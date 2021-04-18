import { ProxyHandle } from './ProxyHandler';
import { Freact } from './Freact';
import { IObj } from './interfacesFreact';

export const createState = (state: IObj) => {
  const stateTmp = Object.entries(state)
    .reduce((result, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      result[`_${key}`] = {
        contexts: [] as Freact<IObj>[],
        value: value as unknown,
      };

      Object.defineProperties(result, {
        [key]: {
          get() {
            return this[`_${key}`].value;
          },
          set(newValue) {
            this[`_${key}`].value = newValue;

            const contextsReverse = [...this[`_${key}`].contexts].reverse();
            console.log('сработало на элементах:');
            contextsReverse.forEach((context: Freact<IObj>) => {
              console.dirxml(context._currentElement);
              context.setProps({ [key]: newValue });
            });
          },
        },
        [`${key}Contexts`]: {
          get() {
            return this[`_${key}`].contexts;
          },
          set(newValue) {
            this[`_${key}`].contexts = newValue;
          },
        },
      });

      return result;
    }, {} as IObj);

  return new Proxy(stateTmp, ProxyHandle());
};
