import React, { useState } from "react";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import { validateQuestion } from "./handlers/handleQuestionForm.handler";
import "./QuestionForm.css";

interface QuestionFormProps {
  onSubmit: (title: string, body: string) => void;
  isSubmitting: boolean;
}

const QuestionForm = ({ onSubmit, isSubmitting }: QuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ title: "", body: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuestion(title, body);
    if (validationErrors.title || validationErrors.body) {
      setErrors(validationErrors);
    } else {
      onSubmit(title, body);
    }
  };

  return (
    <form className='question-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='question-title'>Título</label>
        <input
          id='question-title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='¿Cuál es tu pregunta?'
        />
        {errors.title && <span className='error'>{errors.title}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='question-body'>Cuerpo</label>
        <RichTextEditor value={body} onChange={setBody} />
        {errors.body && <span className='error'>{errors.body}</span>}
      </div>
      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Publicar tu pregunta"}
      </button>
    </form>
  );
};

export default QuestionForm;
