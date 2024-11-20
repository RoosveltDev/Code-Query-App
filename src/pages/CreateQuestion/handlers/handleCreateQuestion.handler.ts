import makeRequest from "../../../services/api.service";




export const handleSubmit= async (
  e: React.FormEvent,
  setIsSubmitting:React.Dispatch<React.SetStateAction<boolean>>,
  setError:React.Dispatch<React.SetStateAction<string | null>>,
  body:{classroom_id:string,title:string,body:string,tags:number[]},
  controllerRef: React.MutableRefObject<AbortController | null>,
  
) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    //Logica de la api
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const {status} = await makeRequest(signal,'questions','POST',body,true,"form-data")
    console.log(status)

  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Error al crear la pregunta"
    );
  } finally {
    setIsSubmitting(false);
  }
};