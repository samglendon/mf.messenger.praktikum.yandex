import { IProxyObj } from './interfacesFreact';
import { Freact } from './Freact';

export function observe(this: Freact<any>, state: IProxyObj, key: string) {
  if (!state[`${key}Contexts`].includes(this)) setTimeout(() => { state[`${key}Contexts`].push(this); }, 0);

  this.setProps({
    [key]: state[key],
  });
}
