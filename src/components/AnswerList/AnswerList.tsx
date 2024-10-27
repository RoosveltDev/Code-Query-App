import "./AnswerList.css";

interface Answer {
  id: number;
  body: string;
  votes: number;
  author: string;
  answeredAt: string;
}

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  return (
    <div className='answer-list'>
      <h2 className='answers-title'>Respuestas ({answers.length})</h2>
      {answers.map((answer) => (
        <div key={answer.id} className='answer-item'>
          <div
            className='answer-content'
            dangerouslySetInnerHTML={{ __html: answer.body }}
          />
          <div className='answer-meta'>
            <span>Respondido por {answer.author}</span>
            <span>{answer.answeredAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
