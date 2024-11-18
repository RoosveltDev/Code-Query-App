import makeRequest from "../../../services/api.service";
import { FetchedClassroomsAdmin } from "../../../types/classroom/fetchedClassroomsAdmin";

export const handleSubmitUpdateClassroom = async (
  e: React.FormEvent<HTMLFormElement>,
  controlSignal: AbortController,
  setData: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin[] | null>
  >,
  classroom_id: string
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
    `classrooms/${classroom_id}`,
    "PATCH",
    {
      classroom_name: classroomNameInput.value.trim(),
      description: descriptionInput.value.trim(),
    },
    true
  );

  if (status === 200) {
    setData((prev) => {
      if (prev) {
        return prev.map((classroom) =>
          classroom.id === classroom_id ? results : classroom
        );
      } else {
        return [results];
      }
    });
  }
};

export const handleSubmitUpdateClassroomCurrying = (
  setData: React.Dispatch<
    React.SetStateAction<FetchedClassroomsAdmin[] | null>
  >,
  classroom_id: string
) => {
  return (
    e: React.FormEvent<HTMLFormElement>,
    controlSignal: AbortController
  ) => {
    return handleSubmitUpdateClassroom(
      e,
      controlSignal,
      setData,
      classroom_id
    );
  };
};
