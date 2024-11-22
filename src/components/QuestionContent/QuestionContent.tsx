import AuthorInfo from "../AuthorInfo/AuthorInfo";
import "./QuestionContent.css";
import { fetchedQuestions } from "../../types/question/fetchedQuestions.type";
import profile from "../../assets/avatar.svg";

interface QuestionContentProps {
  question: fetchedQuestions;
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
          name={question.user.name}
          avatar={question.user.avatar ? question.user.avatar : profile}
          timeAgo={question.created_at}
        />
      </div>
      <div className='question-content-body'>
        <div
          className='question-text'
          dangerouslySetInnerHTML={{ __html: question.body }}
        />
        {
          <img
            className='question-image'
            src={question.image}
            alt='question-img'
          />
        }
      </div>
    </div>
  );
}
