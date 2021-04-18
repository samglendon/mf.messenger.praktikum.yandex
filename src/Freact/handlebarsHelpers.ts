import Handlebars from 'handlebars';
// import Handlebars from 'handlebars/dist/handlebars.js'
import { getTimeInfo } from '../scripts/utils/timeHandler';

export const handlebarsHelpers = () => {
  Handlebars.registerHelper('ifCond', function ifCondition(this: Handlebars.HelperDelegate, v1: any, operator: string, v2: any, options: any) {
    switch (operator) {
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  Handlebars.registerHelper('prettifyDate', (timestamp: string) => getTimeInfo(timestamp)?.timeText);
};
