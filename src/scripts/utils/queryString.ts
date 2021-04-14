import { PlainObject } from '../interfacesAndTypeApp';
import { isPlainObject, isArrayOrObject } from './isSomething';

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  });

  // for (const [key, value] of Object.entries(data)) {
  //   //   if (isArrayOrObject(value)) {
  //   //     result.push(...getParams(value, getKey(key, parentKey)));
  //   //   } else {
  //   //     result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
  //   //   }
  //   // }

  return result;
}

function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map((arr) => arr.join('=')).join('&');
}

export {
  queryString,
};
