import "./QuestionItem.css";

interface QuestionItemProps {
  question: {
    id: string;
    title: string;
    body: string;
    votes: number;
    views: number;
    askedAt: string;
    author: string;
  };
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <div className='question-item'>
      <div className='question-summary'>
        <h3>
          <a href={`/question/${question.id}`}>{question.title}</a>
        </h3>
        <p>{question.body.substring(0, 200)}...</p>
        <div className='question-meta'>
          <span>Preguntado por {question.author}</span>
          <span>{question.askedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
