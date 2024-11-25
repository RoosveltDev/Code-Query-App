import { FaComment } from "react-icons/fa";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import Button from "../../atoms/button/Button";
import Badge from "../../atoms/badge/Badge";
import "./AnswerCard.css";
import { Answer } from "../../types/answer/answer.types";
import profile from "../../assets/avatar.svg";
import { updatedHtmlString } from "../../utils/updateSrc";
import { Link } from "react-router-dom";
import useUser from "../../hook/useUser";

export default function AnswerCard({
  id,
  body,
  user,
  created_at,
  is_accepted,
  image,
  questionId,
  onComment,
  className = "",
}: Answer & { className?: string; onComment?: () => void ,questionId?:string}) {
  const {user:userLogged} = useUser()
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
        {questionId && <div className='answer-actions'>
          <Button variant='ghost' size='small' onClick={onComment}>
            <FaComment />
            Add a Comment
          </Button>
          {userLogged.id === user.id &&  <div className="answer-actions__live live-container-answer">
          <Link to={`/question/${questionId}/answer/${id}/live`} className="live-container-answer__live-text">Go Live</Link>
          <svg className="live-container-answer__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M64 96c0-35.3 28.7-64 64-64l384 0c35.3 0 64 28.7 64 64l0 256-64 0 0-256L128 96l0 256-64 0L64 96zM0 403.2C0 392.6 8.6 384 19.2 384l601.6 0c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8L76.8 480C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
          </div>
          }
          
        </div>}
        
      </div>
    </div>
  );
}
