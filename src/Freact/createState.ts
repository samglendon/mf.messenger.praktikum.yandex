import {ProxyHandle} from "./ProxyHandler.js";
import {Freact} from "./Freact.js";
import {IObj} from "./interfacesFreact";

export const createState = (state: IObj) => {
  const stateTmp = Object.entries(state)
    .reduce((result, [key, value]) => {
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
              // for (let i = this[`_${key}`].contexts.length - 1; i > -1; i--) {
              //   this[`_${key}`].contexts[i].setProps({[key]: newValue});
              // }
              const contextsReverse = [...this[`_${key}`].contexts].reverse();
              console.log('сработало на элементах:');
              contextsReverse.forEach((context: Freact<IObj>) => {
                console.dirxml(context._currentElement);
                context.setProps({[key]: newValue});
                // debugger
              })
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
        }
      );

      return result;
    }, {} as IObj);

  return new Proxy(stateTmp, ProxyHandle())
};


// TODO: возможно нужно сделать эту функцию, чтобы можно было добавлять state в любое место контекста и
//  при этом компонент обновлялся
// function doPath(val, callbackPath) {
//   if (!callbackPath) return {[key]: this.value};
//
//   return callbackPath.split('.').reduce((result, key, ind, arr) => {
//     if (ind === arr.length - 1) {
//       result[key] = val;
//       return result;
//     }
//     result[key] = []
//
//   }, {})
// }
