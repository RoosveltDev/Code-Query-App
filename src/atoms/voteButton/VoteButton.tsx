import { vote } from "./handlers/handleVoteButton.handler";
import "./VoteButton.css";

interface VoteButtonProps {
  votes: number;
}

const VoteButton = ({ votes }: VoteButtonProps) => {
  const handleUpvote = () => vote("up");
  const handleDownvote = () => vote("down");

  return (
    <div className='vote-button'>
      <button onClick={handleUpvote} className='vote-up'>
        <img src='/src/assets/arrowUp.svg' alt='Upvote' />
      </button>
      <span className='vote-count'>{votes}</span>
      <button onClick={handleDownvote} className='vote-down'>
        <img src='/src/assets/arrowDown.svg' alt='Downvote' />
      </button>
    </div>
  );
};

export default VoteButton;
