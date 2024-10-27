import { useState, useEffect } from "react";
import QuestionContent from "../../components/QuestionContent/QuestionContent";
import AnswerList from "../../components/AnswerList/AnswerList";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import { fetchQuestion, fetchAnswers } from "./handlers/handleQuestion.handler";
import { submitAnswer } from "./handlers/handleAnswer.handler";
import "./QuestionDetail.css";

interface Question {
  id: string;
  title: string;
  body: string;
  votes: number;
  views: number;
  askedAt: string;
  author: string;
}

interface Answer {
  id: number;
  body: string;
  votes: number;
  author: string;
  answeredAt: string;
}

const QuestionDetail = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestionAndAnswers = async () => {
      try {
        const questionData = await fetchQuestion();
        setQuestion(questionData as Question);
        const answersData = await fetchAnswers();
        setAnswers(answersData as Answer[]);
      } catch (error) {
        console.error("Error fetching question and answers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestionAndAnswers();
  }, []);

  const handleNewAnswer = async (newAnswerBody: string) => {
    if (question) {
      try {
        const submittedAnswer = await submitAnswer(question.id, newAnswerBody);
        setAnswers([...answers, submittedAnswer as Answer]);
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  if (isLoading) {
    return <div className='loading'>Cargando...</div>;
  }

  if (!question) {
    return <div className='error'>No se pudo cargar la pregunta.</div>;
  }

  return (
    <div className='question-detail-page'>
      <QuestionContent question={question} />
      <AnswerList answers={answers} />
      <AnswerForm onSubmit={handleNewAnswer} />
    </div>
  );
};

export default QuestionDetail;
