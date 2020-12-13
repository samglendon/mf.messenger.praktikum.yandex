Object.prototype.initKey = function (key, value) {
  this[key] = {
    contexts: [],
    _value: value,
    get value() {
      return this._value;
    },
    set value(val) {
      // debugger
      this._value = val;
      this.contexts.reverse().forEach(context => context.setProps({[key]: this.value}))
    },
  }
};

export const ProfileState = {};
ProfileState.initKey('edit', false);
ProfileState.initKey('shownOverlay', false);
ProfileState.initKey('setAvatar', false);
ProfileState.initKey('errorSetAvatar', false);
ProfileState.initKey('successSetAvatar', false);


// function doPath(val, callbackPath) {
//   if (!callbackPath) return {[key]: this.value};
//
//   return callbackPath.split('.').reduce((result, key, ind, arr) => {
//     if (ind === arr.length - 1) {
//       result[key] = val;
//       return result;
//     }
//     result[key] = []
//
//   }, {})
// }


window.ProfileStateW = ProfileState;


// export const ProfileState = {
//   edit: {
//     contexts: [],
//     _value: true,
//     get value() {
//       return this._value;
//     },
//     set value(val) {
//       this._value = val;
//       this.contexts.reverse().forEach(context => context.setProps({edit: this.value}))
//     },
//   },
// };


