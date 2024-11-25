import AnswerCard from "../AnswerCard/AnswerCard";
import { Answer } from "../../types/answer/answer.types";
import "./AnswerList.css";

interface AnswerListProps {
  answers: Answer[];
  className?: string;
  questionId:string
}

export default function AnswerList({
  questionId,
  answers,
  className = "",
}: AnswerListProps) {
  answers = answers ? answers : [];
  const sortedAnswers = answers;

  return (
    <div className={`answer-list ${className}`}>
      <h2 className='answer-list-title'>
        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
      </h2>
      <div className='answer-list-content'>
        {sortedAnswers.map((answer) => (
          <AnswerCard
      
            id={answer.id}
            body={answer.body}
            user={answer.user}
            image = {answer.image}
            is_accepted={answer.is_accepted}
            classroom_id={answer.classroom_id}
            created_at={answer.created_at}
            questionId = {questionId}
          />
        ))}
      </div>
    </div>
  );
}
