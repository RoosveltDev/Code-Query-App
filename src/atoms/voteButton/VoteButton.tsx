import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { handleVote } from "./handlers/handleVote.handler";
import "./VoteButton.css";

interface VoteButtonProps {
  direction: "up" | "down";
  count: number;
  isActive?: boolean;
  questionId: string;
  answerId?: string;
  className?: string;
}

export default function VoteButton({
  direction,
  count,
  isActive = false,
  questionId,
  answerId,
  className = "",
}: VoteButtonProps) {
  const [isVoted, setIsVoted] = useState(isActive);
  const [voteCount, setVoteCount] = useState(count);

  const onClick = async () => {
    const result = await handleVote({
      direction,
      questionId,
      answerId,
      isVoted,
    });

    if (result.success) {
      setIsVoted(!isVoted);
      setVoteCount(result.newCount);
    }
  };

  return (
    <button
      className={`vote-button ${isVoted ? "voted" : ""} ${className}`}
      onClick={onClick}
    >
      {direction === "up" ? <FaCaretUp /> : <FaCaretDown />}
      <span className='vote-count'>{voteCount}</span>
    </button>
  );
}
