import { useState } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import VoteButton from "../../atoms/voteButton/VoteButton";
import { Question } from "../../types/question/question.types";
import "./QuestionContent.css";
import { fetchedQuestions } from "../../types/question/fetchedQuestions.type";
import profile from '../../assets/avatar.svg'

interface QuestionContentProps {
  question: fetchedQuestions;
  className?: string;
}

export default function QuestionContent({
  question,
  className = "",
}: QuestionContentProps) {
  /* const [voteCount, setVoteCount] = useState(question.votes); */
  /* const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null);

  const handleVote = (direction: "up" | "down", isActive: boolean) => {
    if (isActive) {
      setVoteStatus(direction);
      setVoteCount((prevCount) => prevCount + (direction === "up" ? 1 : -1));
    } else {
      setVoteStatus(null);
      setVoteCount((prevCount) => prevCount + (direction === "up" ? -1 : 1));
    }
  }; */

  return (
    <div className={`question-content ${className}`}>
      <div className='question-content-header'>
        <h1 className='question-content-title'>{question.title}</h1>
        <AuthorInfo
          name={question.user.name}
          avatar={question.user.avatar?question.user.avatar:profile}
          /* timeAgo={question.user.timeAgo} */
        />
      </div>
      <div className='question-content-body'>
        <div className='question-voting'>
         {/*  <VoteButton
            direction='up'
            count={voteCount}
            isActive={voteStatus === "up"}
            questionId={question.id}
            onVote={handleVote}
          />
          <VoteButton
            direction='down'
            count={voteCount}
            isActive={voteStatus === "down"}
            questionId={question.id}
            onVote={handleVote}
          /> */}
        </div>
        <div
          className='question-text'
          dangerouslySetInnerHTML={{ __html: question.body }}
        />
      </div>
    </div>
  );
}
