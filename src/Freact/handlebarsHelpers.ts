import Handlebars from 'handlebars';
// import Handlebars from 'handlebars/dist/handlebars.js'
import { getTimeInfo } from '../scripts/utils/timeHandler';

type Conditions = {
  '===': boolean,
  '!==': boolean,
  '<': boolean,
  '<=': boolean,
  '>': boolean,
  '>=': boolean,
  '&&': boolean,
  '||': boolean,
}

export const handlebarsHelpers = () => {
  Handlebars.registerHelper('ifCond', function ifCondition(this: Handlebars.HelperDelegate, v1: any, operator: keyof Conditions, v2: any, options: any) {
    const condition: Conditions = {
      '===': v1 === v2,
      '!==': v1 !== v2,
      '<': v1 < v2,
      '<=': v1 <= v2,
      '>': v1 > v2,
      '>=': v1 >= v2,
      '&&': v1 && v2,
      '||': v1 || v2,
    };
    return condition[operator] ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('prettifyDate', (timestamp: string) => getTimeInfo(timestamp)?.timeText);
};
