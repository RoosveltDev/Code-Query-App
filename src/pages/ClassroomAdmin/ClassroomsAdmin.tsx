import "./ClassroomsAdmin.css";
import useFetch from "../../hook/useFetch";
import { FetchedClassroomsAdmin } from "../../types/classroom/fetchedClassroomsAdmin";
import { useRef, useState } from "react";
import editIcon from "../../assets/edit.svg"; // Asegúrate de tener este ícono
import deleteIcon from "../../assets/Delete.svg"; // Asegúrate de tener este ícono
import { handleClickMore } from "./handlers/handleClickMore.handler";
import CardList from "../../components/CardList/CardList";
import PopUp from "../../components/PopUp/PopUp";
import { handleSubmitCreateClassroomCurrying } from "./handlers/handleSubmitCreateClassroom.handler";
import useUser from "../../hook/useUser";
import { handleDeleteClassroom } from "./handlers/handleDeleteClassroom.handler";
import { handleSubmitUpdateClassroomCurrying } from "./handlers/handleSubmitUpdateClassroom.handler";

const ClassroomsAdmin = () => {
  const { user } = useUser();
  const controllerRef = useRef<AbortController | null>(null);
  const [data, setData] = useFetch<FetchedClassroomsAdmin[]>({
    fetchOptions: {
      context: "classrooms/admin",
      method: "GET",
      data: {},
      hasCredentials: true,
      bodyFormat: "row",
    },
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [editingClassroom, setEditingClassroom] =
    useState<FetchedClassroomsAdmin | null>(null);

  const handleOpenPopup = (classroom?: FetchedClassroomsAdmin) => {
    
    if (classroom) {
      setEditingClassroom(classroom);
    } else {
      setEditingClassroom(null);
    }
    setIsPopupVisible(true);
  };

  // const handleClosePopup = () => setIsPopupVisible(false);

  const handleEdit = (classroom: FetchedClassroomsAdmin) => {
    handleOpenPopup(classroom);
  };

  const handleDelete = async (id: string) => {
    await handleDeleteClassroom(id, setData);
  };

  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-main-container__h1">Classrooms</h1>
      <div className="dashboard-main-container__courses dashboard-courses-container">
        <div className="dashboard-courses-container__header">
          <h2 className="dashboard-courses-container__h2">List Classrooms</h2>
          <button
            className="btn-submit dashboard-header-container__button"
            onClick={() => handleOpenPopup()}
          >
            Add Classroom
          </button>
        </div>
        <div className="dashboard-courses-container__list courses-list-dashboard">
          <div className="courses-list-dashboard__header header-courses-list-dashboard">
            <h3 className="header-courses-list-dashboard__h3 header-courses-list-dashboard__start">
              N
            </h3>
            <h3 className="header-courses-list-dashboard__h3">Name</h3>
            <h3 className="header-courses-list-dashboard__h3">Desciption</h3>
            <h3 className="header-courses-list-dashboard__h3">Actions</h3>
          </div>
          <div className="courses-list-dashboard__courses">
            {data &&
              data.map((element, index) => {
                return (
                  <CardList<FetchedClassroomsAdmin>
                    key={element.id}
                    cardData={element}
                    index={index}
                    elementCard={[
                      <p className="classroom-card-container__description">
                        {index + 1}
                      </p>,
                      <p className="classroom-card-container__name">
                        {" "}
                        {element.classroom_name}
                      </p>,
                      <p className="classroom-card-container__description">
                        {element.description}
                      </p>,
                      <div className="classroom-card-container__actions">
                        {/* <img
                          src={editIcon}
                          alt="Edit"
                          className="action-icon"
                          onClick={() => handleEdit(element)}
                        /> */}
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="action-icon"
                          onClick={() => handleDelete(element.id)}
                        />
                      </div>,
                    ]}
                  ></CardList>
                );
              })}
          </div>
        </div>
        <button
          onClick={() => handleClickMore(controllerRef, setData, data!.length)}
          className="dashboard-courses-link"
        >
          See more
        </button>
      </div>
      {isPopupVisible && (
        <PopUp
          inputs={[
            {
              label: "Classroom",
              type: "text",
              value: editingClassroom?.classroom_name || "",
            },
            {
              label: "Description",
              type: "text",
              value: editingClassroom?.description || "",
            },
          ]}
          submit={
            editingClassroom
              ? handleSubmitUpdateClassroomCurrying(
                  setData,
                  editingClassroom.id
                )
              : handleSubmitCreateClassroomCurrying(user.id, setData, setIsPopupVisible, setEditingClassroom)
          }
          setIsCreatedChat={setIsPopupVisible}
          text={editingClassroom ? "Edit Classroom" : "Add Classroom"}
        />
      )}
    </div>
  );
};

export default ClassroomsAdmin;
