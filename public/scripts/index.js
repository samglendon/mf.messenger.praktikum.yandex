const authForm = document.forms.enter;
const registrationForm = document.forms.registration;


function getFormInfo(formElements) {
  const dataTmpl = Array.from(formElements);
  return dataTmpl.reduce((result, elem) => {
    if (elem.tagName === 'BUTTON') {
      return result;
    }
    result[elem.name] = elem.value;
    return result;
  }, {});
}

function registration(e) {
  e.preventDefault();
  const data = getFormInfo(registrationForm.elements);

  console.dir(data);
}

function login(e) {
  e.preventDefault();
  const data = getFormInfo(authForm.elements);

  console.dir(data);
}

registrationForm.addEventListener('submit', registration);
authForm.addEventListener('submit', login);
