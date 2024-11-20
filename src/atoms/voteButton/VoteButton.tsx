import { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { handleVote } from "./handlers/handleVote.handler";
import "./VoteButton.css";

interface VoteButtonProps {
  direction: "up" | "down";
  count: number;
  isActive: boolean;
  questionId: string;
  answerId?: string;
  className?: string;
  onVote: (direction: "up" | "down", isActive: boolean) => void;
}

export default function VoteButton({
  direction,
  count,
  isActive,
  questionId,
  answerId,
  className = "",
  onVote,
}: VoteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleClick = async () => {
    setIsAnimating(true);
    onVote(direction, !isActive);

    await handleVote({
      direction,
      questionId,
      answerId,
      isVoted: !isActive,
    });
  };

  return (
    <button
      className={`vote-button ${isActive ? "voted" : ""} ${
        isAnimating ? "animating" : ""
      } ${direction} ${className}`}
      onClick={handleClick}
      aria-label={`Vote ${direction}`}
      aria-pressed={isActive}
    >
      {direction === "up" ? <FaCaretUp /> : <FaCaretDown />}
      <span className='vote-count'>{count}</span>
    </button>
  );
}
