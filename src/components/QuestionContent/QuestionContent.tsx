import AuthorInfo from "../AuthorInfo/AuthorInfo";
import VoteButton from "../../atoms/voteButton/VoteButton";
import { Question } from "../../types/question/question.types";
import "./QuestionContent.css";

interface QuestionContentProps {
  question: Question;
  className?: string;
}

export default function QuestionContent({
  question,
  className = "",
}: QuestionContentProps) {
  return (
    <div className={`question-content ${className}`}>
      <div className='question-content-header'>
        <h1 className='question-content-title'>{question.title}</h1>
        <AuthorInfo
          name={question.author.name}
          avatar={question.author.avatar}
          timeAgo={question.author.timeAgo}
        />
      </div>
      <div className='question-content-body'>
        <div className='question-voting'>
          <VoteButton
            direction='up'
            count={question.votes}
            questionId={question.id}
          />
          <VoteButton direction='down' count={0} questionId={question.id} />
        </div>
        <div
          className='question-text'
          dangerouslySetInnerHTML={{ __html: question.content }}
        />
      </div>
    </div>
  );
}
