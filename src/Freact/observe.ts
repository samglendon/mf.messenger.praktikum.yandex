import { IProxyObj } from './interfacesFreact';

export function observe(state: IProxyObj, key: string) {
  // @ts-ignore
  if (!state[`${key}Contexts`].includes(this)) setTimeout(() => { state[`${key}Contexts`].push(this); }, 0);

  // @ts-ignore
  this.setProps({
    [key]: state[key],
  });
}
