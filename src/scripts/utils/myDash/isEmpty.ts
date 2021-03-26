export const isEmpty = (val: unknown) => {

  // []        true, empty array
  // {}        true, empty object
  // null      true
  // undefined true
  // ""        true, empty string
  // ''        true, empty string
  // 0         false, number
  // true      false, boolean
  // false     false, boolean
  // Date      false
  // function  false

  if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
    return false;

  return val === undefined ||
    val == null ||
    Array.isArray(val) && val.length === 0 ||
    Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val as object).length === 0;
};
