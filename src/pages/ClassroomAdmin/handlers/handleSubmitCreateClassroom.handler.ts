import makeRequest from "../../../services/api.service";
import { FetchedClassroomsAdmin } from "../../../types/classroom/fetchedClassroomsAdmin";

export const handleSubmitCreateClassroom = async (
  e: React.FormEvent<HTMLFormElement>,
  controlSignal: AbortController,
  owner_id: number,
  setData: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin[] | null>
  >,
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setEditingClassroom: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin | null>
  >
) => {
  e.preventDefault();
  const signal = controlSignal.signal;
  const classroomNameInput =
    document.querySelector<HTMLInputElement>("#textClassroom");
  const descriptionInput =
    document.querySelector<HTMLInputElement>("#textDescription");

  if (!classroomNameInput || !descriptionInput) {
    console.error("Inputs not found");
    return;
  }

  const { status, results } = await makeRequest(
    signal,
    "classrooms",
    "POST",
    {
      classroom_name: classroomNameInput.value.trim(),
      description: descriptionInput.value.trim(),
      owner_id: owner_id,
    },
    true
  );

  if (status === 201) {
    // Agregar la nueva clase a la lista de clases
    setData((prev) => {
      if (prev) return [...prev, results];
      else return [results];
    });

    // Limpiar los inputs después de agregar la clase
    classroomNameInput.value = "";
    descriptionInput.value = "";

    // Cerrar el popup y resetear la clase en edición
    setIsPopupVisible(false);
    setEditingClassroom(null);
  }
};

export const handleSubmitCreateClassroomCurrying = (
  owner_id: number,
  setData: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin[] | null>
  >,
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setEditingClassroom: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin | null>
  >
) => {
  return (
    e: React.FormEvent<HTMLFormElement>,
    controlSignal: AbortController
  ) => {
    return handleSubmitCreateClassroom(
      e,
      controlSignal,
      owner_id,
      setData,
      setIsPopupVisible,
      setEditingClassroom
    );
  };
};
