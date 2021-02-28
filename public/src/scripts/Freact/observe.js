export function observe(state, key) {
  if (!state[`${key}Contexts`].includes(this)) state[`${key}Contexts`].push(this);

  // this.setProps({
  //   [key]: {
  //     _needUpdate: false,
  //     value: state[key]
  //   }
  // })
  this.setProps({
    [key]: state[key]
  })
}

