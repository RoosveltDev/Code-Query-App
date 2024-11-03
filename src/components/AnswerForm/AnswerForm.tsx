import { useState } from "react";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import Button from "../../atoms/button/Button";
import { handleSubmitAnswer } from "./handlers/handleSubmit.handler";
import "./AnswerForm.css";

interface AnswerFormProps {
  questionId: string;
  onAnswerSubmitted?: () => void;
  className?: string;
}

export default function AnswerForm({
  questionId,
  onAnswerSubmitted,
  className = "",
}: AnswerFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleSubmitAnswer({
        questionId,
        content,
      });

      setContent("");
      onAnswerSubmitted?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`answer-form ${className}`} onSubmit={handleSubmit}>
      <h3 className='answer-form-title'>Your Answer</h3>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder='Write your answer here...'
      />
      <div className='answer-form-actions'>
        <Button type='submit' disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Posting..." : "Post Your Answer"}
        </Button>
      </div>
    </form>
  );
}
