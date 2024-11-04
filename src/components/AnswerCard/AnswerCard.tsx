import { useState } from "react";
import { FaComment } from "react-icons/fa";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import VoteButton from "../../atoms/voteButton/VoteButton";
import Button from "../../atoms/button/Button";
import Badge from "../../atoms/badge/Badge";
import "./AnswerCard.css";

interface AnswerCardProps {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    timeAgo: string;
  };
  votes: number;
  isBestAnswer?: boolean;
  onComment?: () => void;
  questionId: string;
  className?: string;
}

export default function AnswerCard({
  id,
  content,
  author,
  votes: initialVotes,
  isBestAnswer,
  onComment,
  questionId,
  className = "",
}: AnswerCardProps) {
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null);

  const handleVote = (direction: "up" | "down", isActive: boolean) => {
    if (isActive) {
      setVoteStatus(direction);
      setVoteCount((prevCount) => prevCount + (direction === "up" ? 1 : -1));
    } else {
      setVoteStatus(null);
      setVoteCount((prevCount) => prevCount + (direction === "up" ? -1 : 1));
    }
  };

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
        <div className='answer-body'>
          <div className='vote-buttons'>
            <VoteButton
              direction='up'
              count={voteCount}
              isActive={voteStatus === "up"}
              questionId={questionId}
              answerId={id}
              onVote={handleVote}
            />
            <VoteButton
              direction='down'
              count={voteCount}
              isActive={voteStatus === "down"}
              questionId={questionId}
              answerId={id}
              onVote={handleVote}
            />
          </div>
          <div
            className='answer-text'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className='answer-actions'>
          <Button variant='ghost' size='small' onClick={onComment}>
            <FaComment />
            Add a Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
