import { PlainObject } from '../../interfacesAndTypeApp';

const inProps = (key: string, props: string[]): boolean => props.some((omitKey) => omitKey === key);

const omit = (obj: PlainObject, props: string[]) => {
  const newObj: PlainObject = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export { omit };
