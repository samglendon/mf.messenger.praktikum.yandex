import {PlainObject} from "../../interfacesAndTypeApp";

const inProps = (key: string, props: string[]): boolean => {
  return props.some((omitKey) => {
    return omitKey === key;
  });
};

const omit = (obj: PlainObject, props: string[]) => {
  let newObj: PlainObject = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj
};

export {omit};
