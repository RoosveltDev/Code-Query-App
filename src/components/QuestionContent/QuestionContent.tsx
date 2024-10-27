import "./QuestionContent.css";

interface QuestionContentProps {
  question: {
    title: string;
    body: string;
    votes: number;
    views: number;
    askedAt: string;
    author: string;
  };
}

const QuestionContent = ({ question }: QuestionContentProps) => {
  return (
    <div className='question-content'>
      <h1 className='question-title'>{question.title}</h1>
      <div className='question-subtitle'>
        Easy Learning with HTML "Try it Yourself"
      </div>

      <div className='question-body'>
        <div dangerouslySetInnerHTML={{ __html: question.body }} />
        <div className='question-meta'>
          <span>Preguntado {question.askedAt}</span>
          <span>Visto {question.views} veces</span>
          <span>Por {question.author}</span>
        </div>
      </div>

      <div className='example-section'>
        <h2>Example</h2>
        <pre className='code-block'>
          <code>
            {`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default QuestionContent;
