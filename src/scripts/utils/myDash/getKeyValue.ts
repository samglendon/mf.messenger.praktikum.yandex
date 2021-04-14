export function getKeyValue(obj: { [key: string]: any }, path: string, defaultValue: unknown) {
  const keys = path.split('.');
  let result = obj;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    result = result[key];
    if (result === undefined || result === null) return defaultValue;
  }
  // "??" — [оператор нулевого слияния]
  // (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  // (не поддерживается старыми браузерами, для них нужен полифилл)
  //   return result ?? defaultValue;
  return result;
}
