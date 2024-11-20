import makeRequest from "../../../services/api.service";
import { FetchedClassroomsAdmin } from "../../../types/classroom/fetchedClassroomsAdmin";

// Función para eliminar un aula
export const handleDeleteClassroom = async (
  id: string,
  setData: React.Dispatch<React.SetStateAction<FetchedClassroomsAdmin[] | null>>
) => {
  try {
    const { status } = await makeRequest(
      new AbortController().signal,
      `classrooms/${id}`,
      "DELETE",
      {},
      true
    );

    if (status === 200) {
      setData((prev) => prev?.filter((classroom) => classroom.id !== id) || []);
    } else {
      console.error("Failed to delete classroom");
    }
  } catch (error) {
    console.error("Error deleting classroom:", error);
  }
};