export function observe(state, key) {
  if (!state[key].contexts.includes(this)) state[key].contexts.push(this);
}

// export function getValue(state, key) {
//
// }
