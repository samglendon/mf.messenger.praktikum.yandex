// @ts-ignore
// import Handlebars from '../handlebars/dist/cjs/handlebars.js';

declare global {
  interface Window {
    Handlebars: Object;
  }
}


export const handlebarsHelpers = () => {

  window.Handlebars.registerHelper('ifCond', function (v1: any, operator: string, v2: any, options: any) {

    switch (operator) {
      case '==':
        // @ts-ignore
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        // @ts-ignore
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        // @ts-ignore
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        // @ts-ignore
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        // @ts-ignore
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        // @ts-ignore
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        // @ts-ignore
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        // @ts-ignore
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        // @ts-ignore
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        // @ts-ignore
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        // @ts-ignore
        return options.inverse(this);
    }
  });
};
