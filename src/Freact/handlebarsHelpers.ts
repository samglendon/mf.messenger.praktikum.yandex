// declare global {
//   // eslint-disable-next-line no-unused-vars
//   interface Window {
//     Handlebars: {
//       registerHelper: Function;
//       compile: Function;
//     };
//   }
// }

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars from 'handlebars/dist/handlebars.js';
import { getTimeInfo } from '../scripts/utils/timeHandler';

export const handlebarsHelpers = () => {
  Handlebars.registerHelper('ifCond', function (v1: any, operator: string, v2: any, options: any) {
    switch (operator) {
      case '===':
        // @ts-ignore
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
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

  Handlebars.registerHelper('prettifyDate', (timestamp: string) => getTimeInfo(timestamp)?.timeText);
};
