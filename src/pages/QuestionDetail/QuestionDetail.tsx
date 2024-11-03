import { useState, useEffect } from "react";
import QuestionContent from "../../components/QuestionContent/QuestionContent";
import QuestionStats from "../../components/QuestionStats/QuestionStats";
import AnswerList from "../../components/AnswerList/AnswerList";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import {
  handleFetchQuestion,
  handleUpdateViews,
} from "./handlers/handleQuestion.handler";
import { handleFetchRelated } from "./handlers/handleRelated.handler";
import { fetchAnswers } from "../../components/AnswerList/handlers/handleAnswers.handler";
import { Question } from "../../types/question/question.types";
import { Answer } from "../../types/answer/answer.types";
import { RelatedQuestion } from "../../types/question/relatedQuestion.types";
import "./QuestionDetail.css";

interface QuestionDetailProps {
  questionId: string;
}

export default function QuestionDetail({ questionId }: QuestionDetailProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<RelatedQuestion[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        setIsLoading(true);
        const [questionData, answersData, relatedData] = await Promise.all([
          handleFetchQuestion(questionId),
          fetchAnswers(questionId),
          handleFetchRelated(questionId),
        ]);

        setQuestion(questionData);
        setAnswers(answersData);
        setRelatedQuestions(relatedData);
        await handleUpdateViews(questionId);
      } catch (err) {
        setError("Error loading question data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionData();
  }, [questionId]);

  if (isLoading) {
    return <div className='loading-state'>Loading...</div>;
  }

  if (error || !question) {
    return <div className='error-state'>{error || "Question not found"}</div>;
  }

  return (
    <div className='question-detail'>
      <main className='main-content'>
        <div className='content-container'>
          <QuestionStats
            answers={question.stats.answers}
            votes={question.stats.votes}
            views={question.stats.views}
            favorites={question.stats.favorites}
          />

          <QuestionContent question={question} />

          <AnswerList answers={answers} />

          <AnswerForm
            questionId={questionId}
            onAnswerSubmitted={async () => {
              const updatedAnswers = await fetchAnswers(questionId);
              setAnswers(updatedAnswers);
            }}
          />
        </div>

        <aside className='sidebar'>
          <div className='related-questions'>
            <h3 className='related-title'>Related Questions</h3>
            <div className='related-list'>
              {relatedQuestions.map((related) => (
                <div key={related.id} className='related-item'>
                  <a href={`/question/${related.id}`} className='related-link'>
                    {related.title}
                  </a>
                  <div className='related-author'>
                    Asked by {related.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
