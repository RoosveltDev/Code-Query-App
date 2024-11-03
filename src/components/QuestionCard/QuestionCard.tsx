import { FaShare } from "react-icons/fa";
import Button from "../../atoms/button/Button";
import "./QuestionCard.css";

interface QuestionCardProps {
  title: string;
  content: string;
  category: string;
  subcategory: string;
  onShare?: () => void;
  onAnswer?: () => void;
  className?: string;
}

export default function QuestionCard({
  title,
  content,
  category,
  subcategory,
  onShare,
  onAnswer,
  className = "",
}: QuestionCardProps) {
  return (
    <div className={`question-card ${className}`}>
      <div className='question-category'>
        IN {category}, {subcategory}
      </div>
      <h1 className='question-title'>{title}</h1>
      <p className='question-content'>{content}</p>
      <div className='question-actions'>
        <Button variant='ghost' size='small' onClick={onShare}>
          <FaShare />
          Share
        </Button>
        <Button variant='primary' size='small' onClick={onAnswer}>
          Answer It
        </Button>
      </div>
    </div>
  );
}
