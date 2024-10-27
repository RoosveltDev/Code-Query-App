import { useState } from "react";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import { createQuestion } from "./handlers/handleCreateQuestion.handler";
import "./CreateQuestion.css";

const CreateQuestion = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (title: string, body: string) => {
    setIsSubmitting(true);
    try {
      await createQuestion(title, body);
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='create-question-page'>
      <h1>Hacer una pregunta</h1>
      <QuestionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateQuestion;
