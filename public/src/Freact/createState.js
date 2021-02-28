import {ProxyHandler} from "./ProxyHandler.js";

export const createState = (state = {}) => {
  const stateTmp = Object.entries(state)
    .reduce((result, [key, value]) => {
      result[`_${key}`] = {
        contexts: [],
        value: value,
      };

      Object.defineProperties(result, {
          [key]: {
            get() {
              return this[`_${key}`].value;
            },
            set(newValue) {
              this[`_${key}`].value = newValue;
              this[`_${key}`].contexts.reverse().forEach(context => context.setProps({[key]: newValue}))
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
    }, {});

  return new Proxy(stateTmp, ProxyHandler())
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
