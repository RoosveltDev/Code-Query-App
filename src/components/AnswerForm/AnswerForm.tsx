import React, { useState } from "react";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import "./AnswerForm.css";

interface AnswerFormProps {
  onSubmit: (answerBody: string) => Promise<void>;
}

const AnswerForm = ({ onSubmit }: AnswerFormProps) => {
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnswer.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(newAnswer);
        setNewAnswer("");
      } catch (error) {
        console.error("Error submitting answer:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className='new-answer-form'>
      <h3>Tu Respuesta</h3>
      <form onSubmit={handleSubmit}>
        <RichTextEditor value={newAnswer} onChange={setNewAnswer} />
        <button type='submit' disabled={isSubmitting || !newAnswer.trim()}>
          {isSubmitting ? "Enviando..." : "Publicar tu respuesta"}
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
