import AnswerCard from "../AnswerCard/AnswerCard";
import { sortAnswers } from "./handlers/handleAnswers.handler";
import { Answer } from "../../types/answer/answer.types";
import "./AnswerList.css";

interface AnswerListProps {
  answers: Answer[];
  className?: string;
}

export default function AnswerList({
  answers,
  className = "",
}: AnswerListProps) {
  const sortedAnswers = sortAnswers(answers);

  return (
    <div className={`answer-list ${className}`}>
      <h2 className='answer-list-title'>
        {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
      </h2>
      <div className='answer-list-content'>
        {sortedAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            content={answer.content}
            author={answer.author}
            votes={answer.votes}
            isBestAnswer={answer.isBestAnswer}
          />
        ))}
      </div>
    </div>
  );
}
