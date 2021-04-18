import { errorMessages, validateEmail, validatePassword } from './validations';

export class FormValidation {
  form: HTMLFormElement;
  button: Element | null;
  invalidContainerClass: string;
  errorMessageClass: string;
  lastErrorSpan: Element | null = null;

  constructor(form: HTMLFormElement, invalidContainer: string, errorMessage: string) {
    this.form = form;
    this.button = form.querySelector('button');
    this.invalidContainerClass = invalidContainer;
    this.errorMessageClass = errorMessage;

    // this.form.addEventListener('input', (event) => {
    //   this.validate.bind(this)(event);
    //   this.hideCommonError();
    // });
    this.form.addEventListener('input', this.validate.bind(this));
    this.form.addEventListener('input', this.hideCommonError);

    Array.from(this.form.elements).forEach((elem) => {
      if (!elem.matches('button')) {
        elem.addEventListener('blur', this.validate.bind(this));
      }
    });
  }

  validate(event: Event) {
    this.setSubmitButtonState(this.form, this.button);

    if (event.target) {
      if (this.checkInputValidity(<HTMLInputElement>event.target)) {
        this.activateError(<HTMLInputElement>event.target);
      } else {
        this.resetError(<HTMLInputElement>event.target);
      }
    }
  }

  activateError(elem: Element) {
    elem.parentElement!.classList.add(`${this.invalidContainerClass}_invalid`);
  }

  resetError(elem: Element) {
    elem.parentElement!.classList.remove(`${this.invalidContainerClass}_invalid`);
  }

  checkInputValidity(elem: HTMLInputElement) {
    const errorElem = this.form.querySelector(`.${this.errorMessageClass}_${elem.name}`);
    let isInvalid = 0;

    if (!errorElem) throw Error(`ошибка в formValidation: на найден элемент с классом ${this.errorMessageClass}! Этот элемент должен быть у каждого input`);
    // console.dir(elem);
    // if (elem.validity.typeMismatch) {
    if (elem.validity.valueMissing) {
      errorElem.textContent = errorMessages.must;
      isInvalid++;
    } else if (elem.name === 'email' && !validateEmail(elem.value)) {
      errorElem.textContent = errorMessages.email;
      isInvalid++;
    } else if (elem.name === 'password' && !validatePassword(elem.value)) {
      errorElem.textContent = errorMessages.password;
      isInvalid++;
    } else if ((elem.value.length < 2 || elem.value.length > 30)) {
      errorElem.textContent = errorMessages.length;
      isInvalid++;
    } else {
      errorElem.textContent = errorMessages.ok;
    }
    return !!isInvalid;
  }

  setSubmitButtonState(form: HTMLFormElement, button: Element | null) {
    let isValid = true;

    Array.from(form.elements).forEach((item) => {
      if (!item.matches('.button')) {
        if (this.checkInputValidity(item as HTMLInputElement)) {
          isValid = false;
        }
      }
    });

    if (button) {
      if (isValid) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', '');
      }
    }
  }

  showCommonError = (message: string) => {
    if (!this.lastErrorSpan) {
      // const errorSpans = this.form.querySelectorAll('.popup__error-message');
      const errorSpans = this.form.querySelectorAll(`.${this.errorMessageClass}`);
      this.lastErrorSpan = errorSpans[errorSpans.length - 1];
    }
    this.lastErrorSpan.classList.add(`${this.errorMessageClass}_common`);
    this.lastErrorSpan.textContent = message;
  };

  hideCommonError() {
    if (this.lastErrorSpan) {
      // this.lastErrorSpan.classList.remove('popup__error-message_common');
      this.lastErrorSpan.classList.remove(`${this.errorMessageClass}_common`);
    }
  }

  removeEventListeners() {
    this.form.removeEventListener('input', this.validate.bind(this));
    this.form.removeEventListener('input', this.hideCommonError);
    Array.from(this.form.elements).forEach((elem) => {
      if (!elem.matches('button')) {
        elem.removeEventListener('blur', this.validate.bind(this));
      }
    });
  }
}
