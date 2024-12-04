import { NavigateFunction } from "react-router-dom";
import makeRequest from "../../../services/api.service";

type FormBodyType = {classroom_id:string,title:string,body:string,tags:number[],image?:File|undefined}


export const handleSubmit= async (
  e: React.FormEvent,
  setIsSubmitting:React.Dispatch<React.SetStateAction<boolean>>,
  setError:React.Dispatch<React.SetStateAction<string | null>>,
  body:FormBodyType,
  controllerRef: React.MutableRefObject<AbortController | null>,
  navigate: NavigateFunction
  
) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {

    if(!body.image) delete body.image
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const {status} = await makeRequest(signal,'questions','POST',body,true,"form-data")
    if (status!== 201) throw new Error()
    else navigate(`/classroom/${body.classroom_id}`)

  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Error al crear la pregunta"
    );
  } finally {
    setIsSubmitting(false);
  }
};