const forms = document.forms;
Object.keys(forms).forEach((form) => {
  // если у кнопки type="button"
  // forms[form].btn.addEventListener('click', (e) => {
  forms[form].addEventListener('submit', (e) => {
    e.preventDefault();
    getFormInfo(forms[form])
  })
});


// зачем формам добавлять метод POST, если все запросы будут из js и мы напишем свое API с нужным методом отправки?

function getFormInfo(form) {
  const formData = new FormData(form);
  // const data = {};
  // for (let key of formData.keys()) {
  //   data[key] = formData.get(key);
  //   console.log(`${key}: ${formData.get(key)}`);
  // }
  const data = Object.fromEntries(formData.entries());

  console.log(`данные из формы ${form.name}`);
  console.dir(data);
}






// const authForm = document.forms.enter;
// const registrationForm = document.forms.registration;
//
// function getFormInfo(formElements) {
//   const dataTmpl = Array.from(formElements);
//   return dataTmpl.reduce((result, elem) => {
//     // потестил и переставлял кнопку в разные места, все работает
//     if (elem.tagName === 'BUTTON') {
//       return result;
//     }
//     result[elem.name] = elem.value;
//     return result;
//   }, {});
// }
//
// function registration(e) {
//   e.preventDefault();
//   const data = getFormInfo(registrationForm.elements);
//
//   console.dir(data);
// }
//
// function login(e) {
//   e.preventDefault();
//   const data = getFormInfo(authForm.elements);
//
//   console.dir(data);
// }
//
// registrationForm.addEventListener('submit', registration);
// authForm.addEventListener('submit', login);
