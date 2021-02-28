import {validateEmail, validatePassword, errorMessages} from './validations.js';


export class FormValidation {
  constructor(form, invalidContainer, errorMessage) {
    this.form = form;
    this.button = form.querySelector('button');
    this.invalidContainerClass = invalidContainer;
    this.errorMessageClass = errorMessage;

    // this.form.addEventListener('input', (event) => {
    //   this.validate.bind(this)(event);
    //   this.hideCommonError();
    // });
    this.form.addEventListener('input', this.validate.bind(this));
    this.form.addEventListener('input', this.hideCommonError());
// debugger
    Array.from(this.form.elements).forEach(elem => {
      if (!elem.matches('button')) {
        elem.addEventListener('blur', this.validate.bind(this));
      }
    });
  }

  validate(event) {
    // debugger
    this.setSubmitButtonState(this.form, this.button);

    if (this.checkInputValidity(event.target)) {
      return this.activateError(event.target);
    }
    return this.resetError(event.target);
  }

  activateError(elem) {
    // elem.parentElement.classList.add('popup__input-container_invalid');
    elem.parentElement.classList.add(`${this.invalidContainerClass}_invalid`);
  }

  resetError(elem) {
    elem.parentElement.classList.remove(`${this.invalidContainerClass}_invalid`);
  }

  checkInputValidity(elem) {
    // const errorElem = this.form.querySelector(`.popup__error-message_${elem.name}`);
    const errorElem = this.form.querySelector(`.${this.errorMessageClass}_${elem.name}`);

    // console.dir(elem);
    // if (elem.validity.typeMismatch) {
    if (elem.validity.valueMissing) {
      return errorElem.textContent = errorMessages.must;
    }
    if (elem.name === 'email' && !validateEmail(elem.value)) {
      return errorElem.textContent = errorMessages.email;
    }
    if (elem.name === 'password' && !validatePassword(elem.value)) {
      return errorElem.textContent = errorMessages.password;
    }
    if ((elem.value.length < 2 || elem.value.length > 30)) {
      return errorElem.textContent = errorMessages.length;
    }
    return errorElem.textContent = errorMessages.ok;
  }

  setSubmitButtonState(form, button) {
    let isValid = true;

    Array.from(form.elements).forEach((item) => {
      if (!item.matches('.button')) {
        if (this.checkInputValidity(item)) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      return button.removeAttribute('disabled');
    }

    return button.setAttribute('disabled', '');
  }

  showCommonError(message) {
    if (!this.lastErrorSpan) {
      // const errorSpans = this.form.querySelectorAll('.popup__error-message');
      const errorSpans = this.form.querySelectorAll(`.${this.errorMessageClass}`);
      this.lastErrorSpan = errorSpans[errorSpans.length - 1];
    }
    this.lastErrorSpan.classList.add(`${this.errorMessageClass}_common`);
    this.lastErrorSpan.textContent = message;
  }

  hideCommonError() {
    if (this.lastErrorSpan) {
      // this.lastErrorSpan.classList.remove('popup__error-message_common');
      this.lastErrorSpan.classList.remove(`${this.errorMessageClass}_common`);
    }
  }

  removeEventListeners() {
    this.form.removeEventListener('input', this.validate.bind(this));
    this.form.removeEventListener('input', this.hideCommonError());
    this.form.elements.forEach(elem => {
      if (!elem.matches('button')) {
        elem.removeEventListener('blur', this.validate.bind(this));
      }
    });
  }

}
