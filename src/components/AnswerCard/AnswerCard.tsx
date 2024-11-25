import { FaComment } from "react-icons/fa";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import Button from "../../atoms/button/Button";
import Badge from "../../atoms/badge/Badge";
import "./AnswerCard.css";
import { Answer } from "../../types/answer/answer.types";
import profile from "../../assets/avatar.svg";
import { updatedHtmlString } from "../../utils/updateSrc";

export default function AnswerCard({
  body,
  user,
  created_at,
  is_accepted,
  image,
  onComment,
  className = "",
}: Answer & { className?: string; onComment?: () => void }) {
  return (
    <div className={`answer-card ${className}`}>
      {is_accepted && (
        <div className='best-answer-header'>
          <Badge variant='success'>Best Answer</Badge>
          <span className='askers-choice'>Asker's Choice</span>
        </div>
      )}
      <div className='answer-content'>
        <AuthorInfo
          name={user.name}
          avatar={user.avatar ? user.avatar : profile}
          timeAgo={created_at}
        />
        <div className='answer-body'>
          
          <div
            className='answer-text'
            dangerouslySetInnerHTML={{ __html: image?updatedHtmlString(body,image):body }}
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
