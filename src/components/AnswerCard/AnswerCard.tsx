import { FaThumbsUp, FaComment } from "react-icons/fa";
import AuthorInfo from "../authorInfo/AuthorInfo";
import Button from "../../atoms/button/Button";
import Badge from "../../atoms/badge/Badge";
import "./AnswerCard.css";

interface AnswerCardProps {
  content: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    timeAgo: string;
  };
  votes: number;
  isBestAnswer?: boolean;
  onVote?: () => void;
  onComment?: () => void;
  className?: string;
}

export default function AnswerCard({
  content,
  author,
  votes,
  isBestAnswer,
  onVote,
  onComment,
  className = "",
}: AnswerCardProps) {
  return (
    <div className={`answer-card ${className}`}>
      {isBestAnswer && (
        <div className='best-answer-header'>
          <Badge variant='success'>Best Answer</Badge>
          <span className='askers-choice'>Asker's Choice</span>
        </div>
      )}
      <div className='answer-content'>
        <AuthorInfo
          name={author.name}
          avatar={author.avatar}
          location={author.location}
          timeAgo={author.timeAgo}
        />
        <p className='answer-text'>{content}</p>
        <div className='answer-actions'>
          <Button variant='ghost' size='small' onClick={onVote}>
            <FaThumbsUp />
            {votes}
          </Button>
          <Button variant='ghost' size='small' onClick={onComment}>
            <FaComment />
            Add a Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
