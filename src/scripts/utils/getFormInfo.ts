function getFormInfo(form: HTMLFormElement) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log(`данные из формы ${form.name}`);
  console.dir(data);
}

export { getFormInfo };
