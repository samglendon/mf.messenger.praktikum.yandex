import {IProxyObj} from "./interfaces";

export function observe(state: IProxyObj, key: string) {
  // @ts-ignore
  if (!state[`${key}Contexts`].includes(this)) state[`${key}Contexts`].push(this);

  // this.setProps({
  //   [key]: {
  //     _needUpdate: false,
  //     value: state[key]
  //   }
  // })

  // @ts-ignore
  this.setProps({
    [key]: state[key]
  })
}

