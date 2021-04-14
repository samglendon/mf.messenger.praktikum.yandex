interface IProxyObj {
  [key: string]: any
}

export const ProxyHandle = (callback?: Function) => ({
  get(target: IProxyObj, prop: string) {
    if (prop.startsWith('_')) {
      throw new Error('Нет прав на чтение приватного свойства');
    } else {
      const value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value;
    }
  },
  set(target: IProxyObj, prop: string, value: any) {
    if (prop.startsWith('_')) {
      throw new Error('Нет прав на изменение приватного свойства');
    } else {
      // eslint-disable-next-line no-param-reassign
      target[prop] = value;
      if (callback) callback();
      return true;
    }
  },
  deleteProperty(target: IProxyObj, prop: string) {
    if (prop.startsWith('_')) {
      throw new Error('Нет прав на удаление приватного свойства');
    } else {
      // eslint-disable-next-line no-param-reassign
      delete target[prop];
      return true;
    }
  },
  ownKeys(target: IProxyObj): string[] {
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});
