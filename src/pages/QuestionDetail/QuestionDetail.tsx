import { useState } from "react";
import QuestionContent from "../../components/QuestionContent/QuestionContent";
import AnswerList from "../../components/AnswerList/AnswerList";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import { Answer } from "../../types/answer/answer.types";
import "./QuestionDetail.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { fetchedQuestions } from "../../types/question/fetchedQuestions.type";


export const QuestionDetail = () => {
  const {questionId,id} = useParams()
  console.log(id)
  const [relatedQuestions] =useFetch<fetchedQuestions[]>({fetchOptions:{
    context: `questions/classroom/${id}?per_page=5&page=1`,
    method: "GET",
    data: {},
    hasCredentials: true,
    bodyFormat: "row" ,
  }})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questionDataFetch] = useFetch<fetchedQuestions>({fetchOptions:{
    context: `questions/${questionId}`,
    method: "GET",
    data: {},
    hasCredentials: true,
    bodyFormat: "row" ,
  }})
  const [answerDataFetch,setAnswerDataFetch] = useFetch<Answer[]>({fetchOptions:{
    context: `answers/question/${questionId}`,
    method: "GET",
    data: {},
    hasCredentials: true,
    bodyFormat: "row" ,
  }})
/*   useEffect(() => {
    const loadQuestionData = async () => {
      try {
        setIsLoading(true);
        const [questionData, answersData, relatedData] = await Promise.all([
          handleFetchQuestion(questionId!),
          fetchAnswers(questionId!),
          handleFetchRelated(questionId!),
        ]);

        setQuestion(questionData);
        setAnswers(answersData);
        setRelatedQuestions(relatedData);
        await handleUpdateViews(questionId!);
      } catch (err) {
        setError("Error loading question data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionData();
  }, [questionId]); */

  if (isLoading) {
    return <div className='loading-state'>Loading...</div>;
  }

  if (error || !questionDataFetch) {
    return <div className='error-state'>{error || "Question not found"}</div>;
  }

  return (
    <div className='question-detail'>
      <main className='main-content'>
        <div className='content-container'>
          {/* <QuestionStats
            answers={question.stats.answers}
            votes={question.stats.votes}
            views={question.stats.views}
            favorites={question.stats.favorites}
          /> */}

          {questionDataFetch && <QuestionContent question={questionDataFetch} />}

          {answerDataFetch && <AnswerList answers={answerDataFetch} />}

          <AnswerForm
            questionId={questionId!}
            classRoomId={id!}
            setAnswer={setAnswerDataFetch}
          />
        </div>

        <aside className='sidebar'>
          <div className='related-questions'>
            <h3 className='related-title'>Related Questions</h3>
            <div className='related-list'>
              {relatedQuestions && relatedQuestions.length>0 &&  relatedQuestions.filter(element=> element.id !== Number(questionId)).map((related) => (
                <div key={related.id} className='related-item'>
                  <a href={`/classroom/${id}/question/${related.id}/answers`} className='related-link'>
                    {related.title}
                  </a>
                  <div className='related-author'>
                    Asked by {related.user.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default QuestionDetail;
