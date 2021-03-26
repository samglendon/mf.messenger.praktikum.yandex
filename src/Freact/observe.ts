import {IProxyObj} from "./interfacesFreact";

export function observe(state: IProxyObj, key: string) {
  // if (key === 'activeDialogNumber') debugger
  // @ts-ignore
  if (!state[`${key}Contexts`].includes(this)) setTimeout(() => {state[`${key}Contexts`].push(this)}, 0);

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

