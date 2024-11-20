import React, { useEffect, useRef, useState } from "react";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import Button from "../../atoms/button/Button";
import { handleSubmitAnswer } from "./handlers/handleSubmit.handler";
import "./AnswerForm.css";
import { Answer } from "../../types/answer/answer.types";
import useUser from "../../hook/useUser";

interface AnswerFormProps {
  questionId: string;
  classRoomId:string;
  setAnswer: React.Dispatch<React.SetStateAction<Answer[] | null>>;
  className?: string;
}

export default function AnswerForm({
  questionId,
  classRoomId,
  setAnswer,
  className = "",
}: AnswerFormProps) {
  console.log(classRoomId)
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controllerRef = useRef<AbortController | null>(null)
  const {user} = useUser()
  useEffect(()=>{
    return controllerRef.current?.abort()
  },[])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleSubmitAnswer({
        questionId,
        content,
        controllerRef,
        setAnswer,
        classRoomId,
        user
      });

      setContent("");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
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
