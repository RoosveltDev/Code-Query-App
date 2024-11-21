import "./AnswerItem.css";

interface AnswerItemProps {
  answer: {
    id: number;
    body: string;
    votes: number;
    author: string;
    answeredAt: string;
  };
}

const AnswerItem = ({ answer }: AnswerItemProps) => {
  return (
    <div className='answer-item'>
      <div className='answer-content'>
        <div dangerouslySetInnerHTML={{ __html: answer.body }} />
        <div className='answer-meta'>
          Respondido por <span>{answer.author}</span> {answer.answeredAt}
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;
