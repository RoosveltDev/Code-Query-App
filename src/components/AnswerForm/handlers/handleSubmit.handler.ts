import makeRequest from "../../../services/api.service";
import { Answer } from "../../../types/answer/answer.types";
import { UserLogged } from "../../../types/user.type";

interface SubmitAnswerParams {
  questionId: string;
  content: string;
  controllerRef:React.MutableRefObject<AbortController | null>;
  setAnswer:React.Dispatch<React.SetStateAction<Answer[] | null>>;
  classRoomId:string,
  user:UserLogged;
  image?:File
}

/* interface SubmitAnswerResult {
  success: boolean;
  answerId?: string;
  
}
 */
export const handleSubmitAnswer = async ({
  questionId,
  content,
  controllerRef,
  setAnswer,
  classRoomId,
  user,
  image
}: SubmitAnswerParams): Promise<void> => {
    const body:{question_id:string,body:string,classroom_id:string,image?:File} = {question_id:questionId,body:content,classroom_id:classRoomId} 
    if(image) body.image = image
    controllerRef.current= new AbortController()
    const signal=controllerRef.current.signal
    const {status,results} = await makeRequest(signal,'answers','POST',body,true,'form-data')
    if(status===201){
      setAnswer(prev => {
        if(!prev) return [{...results,user:{name:user.name,avatar:user.avatar}} ]
        return [...prev,{...results,user:{name:user.name,avatar:user.avatar}}]
      })
    }
};
