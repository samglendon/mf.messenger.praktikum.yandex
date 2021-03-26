interface IProxyObj {
  [key: string]: any
}

export const ProxyHandle = (callback?: Function) => {
  return {
    get(target: IProxyObj, prop: string) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на чтение приватного свойства');
      } else {
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      }
    },
    set(target: IProxyObj, prop: string, value: any) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на изменение приватного свойства');
      } else {
        target[prop] = value;
        if (callback) callback();
        return true;
      }
    },
    deleteProperty(target: IProxyObj, prop: string) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на удаление приватного свойства');
      } else {
        delete target[prop];
        return true;
      }
    },
    ownKeys(target: IProxyObj): string[] {
      return Object.keys(target).filter((key) => !key.startsWith('_'));
    }
  };
};
