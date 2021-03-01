import Handlebars from 'handlebars';

export const handlebarsHelpers = () => {

  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

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
