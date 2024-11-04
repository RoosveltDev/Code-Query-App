import React, { useState } from "react";
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

  const handleImageUpload = async (file: File): Promise<string> => {
    // This is a placeholder function. In a real application, you would
    // implement the actual image upload logic here, possibly using
    // a service like AWS S3 or your own server's file upload endpoint.
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          // For demonstration purposes, we're returning a data URL.
          // In a real app, you'd return the URL of the uploaded image.
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <form className={`answer-form ${className}`} onSubmit={handleSubmit}>
      <h3 className='answer-form-title'>Your Answer</h3>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder='Write your answer here...'
        onImageUpload={handleImageUpload}
      />
      <div className='answer-form-actions'>
        <Button type='submit' disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Posting..." : "Post Your Answer"}
        </Button>
      </div>
    </form>
  );
}
