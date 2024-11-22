export const validateQuestion = (title: string, body: string) => {
  const errors = { title: "", body: "" };

  if (title.trim().length < 15) {
    errors.title = "El título debe tener al menos 15 caracteres";
  }

  if (body.trim().length < 30) {
    errors.body = "El cuerpo de la pregunta debe tener al menos 30 caracteres";
  }

  return errors;
};
