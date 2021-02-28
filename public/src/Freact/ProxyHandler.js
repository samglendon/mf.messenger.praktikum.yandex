export const ProxyHandler = (callback) => {
  return {
    get(target, prop) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на чтение приватного свойства');
      } else {
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      }
    },
    set(target, prop, value) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на изменение приватного свойства');
      } else {
        target[prop] = value;
        if (callback) callback();
        return true;
      }
    },
    deleteProperty(target, prop) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав на удаление приватного свойства');
      } else {
        delete target[prop];
        return true;
      }
    },
    ownKeys(target) {
      return Object.keys(target).filter((key) => !key.startsWith('_'));
    }
  };
};
