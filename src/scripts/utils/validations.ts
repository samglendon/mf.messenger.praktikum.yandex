const validatePassword = (value: string) => {
  const regExp = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/;
  return regExp.test(value);
};

const validateEmail = (value: string) => {
  const regExp = /\w+((-|.)\w+)*@\w+(-\w+)*\.\w{2,}/;
  return regExp.test(value);
};

const validateUrl = (str: string) => {
  const regExp = /https?:\/\/(www\.)?(\w+(-\w+)*(\.\w+(-\w+)*)*\.[a-z]{2,}|(\d\d?|1\d\d|2[0-5][0-5])(\.(\d\d?|1\d\d|2[0-5][0-5])){3})(:\d{2,5})?([0-9a-z\/]+)?#?/
  return regExp.test(str);
};

const sanitize = (string: string) => {
  const map: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match) => (map[match]));
};

const errorMessages = {
  must: 'Это обязательное поле',
  password: 'Минимальная длина 8 символов. Пароль должен содержать цифру, прописную и заглавную буквы.',
  length: 'Должно быть от 2 до 30 символов',
  email: 'Неправильный формат email',
  ok: '',
};


export {validatePassword, validateEmail, validateUrl, sanitize, errorMessages};
