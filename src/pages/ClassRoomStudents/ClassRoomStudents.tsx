import Button from "../../atoms/button/Button"
import useFetch from "../../hook/useFetch"
import { useParams } from 'react-router-dom';
import { FetchedStudent, Student } from "../../types/user.type";
import CardList from "../../components/CardList/CardList";
import avatar from '../../assets/avatar.svg'
import './classroomStudent.css'
import More from "../../atoms/more/More";
import deleteIcon from '../../assets/Delete.svg'
import { useEffect, useRef, useState } from "react";
import { handlerActionDelete } from "./handlers/handlerActionDelete.handler";
import PopUp from "../../components/PopUp/PopUp";
import { handleSubmiAddStudentCurrying } from "./handlers/handleSubmitAddStudent";
import { handlerClickPopUp } from "./handlers/handlerClickPopUp";
import CardProfile from "../../components/CardProfile/CardProfile";
import useResize from "../../hook/useResize";
import { handleClickCardProfile, handleClickCardProfileMobile } from "./handlers/handleClickCardProfile.handler";

const ClassRoomStudents = () => {
  const { id } = useParams();
  const controllerRef = useRef<AbortController|null>(null)
  const [isPopped,setIsPopped] = useState<boolean>(false)
  const [isClickedInformation,setIsClickedInformation] = useState<boolean>(false)
  const [isMobile,containerRef] = useResize(setIsClickedInformation)
  const [userClicked,setUserClicked] = useState<Student|null>(null)
  const [data,setData] = useFetch<FetchedStudent[]>({fetchOptions:{
    context: `classrooms/${id}/students`,
    method: "GET",
    data: {},
    hasCredentials: true,
    bodyFormat: "row" ,
  }})
  const clickHandler= isMobile? handleClickCardProfileMobile : handleClickCardProfile
  useEffect(()=>{
    
    if(data && data.length>0) setUserClicked(data[0].user)
    return()=>{
      controllerRef.current?.abort()
    }
  },[data])
  return (
    <div ref={containerRef} className="classroom-students-main-container">
      {!isClickedInformation &&
         <div className="classroom-students-container">
         <div className="classroom-students-container__header header-classroom-students">
   
         <h1 className="header-classroom-students__h1">Student List</h1>
         <div onClick={()=>handlerClickPopUp(setIsPopped)}>
         <Button buttonText="Add Student"></Button>
         </div>
         </div>
         <div className="courses-list-dashboard__header header-courses-list-dashboard classroom-students-container__header">
                           <h3 className="header-courses-list-dashboard__h3 header-courses-list-dashboard__start">Name</h3>
                           <h3 className="header-courses-list-dashboard__h3">Email</h3>
                           <h3 className="header-courses-list-dashboard__h3">Status</h3>
                           <h3 className="header-courses-list-dashboard__h3"></h3>
         </div>
         <div className="courses-list-dashboard__courses">
              {data && data.map((element,index) =>{
                               return <CardList<Student> clickFn={()=>clickHandler(element.user,setUserClicked,setIsClickedInformation)}  customClass={"student-container-main-classroom"} key={element.user.id} cardData = {element.user} index= {index} elementCard={[
                                   <div className="student-container-classroom"><img className="student-container-classroom__avatar" src={element.user.avatar?element.user.avatar:avatar} alt="Avatar Logo" /> <p>{`${element.user.name} ${element.user.last_name}`}</p></div>,
                                   <p className="classroom-card-container__name"> {element.user.email}</p>,
                                   element.status==="PENDING"?<p className="student-container-status">Unactive </p> : <p className="student-container-status student-container-status--active">Active </p>,
                                   <More elementMore={[
                                     <div onClick={()=>{handlerActionDelete(controllerRef,String(id),element.user.id,setData)}} className="more-actions-container"><img className="more-actions-container__image" src={deleteIcon} alt="Delete" /> <p className="more-actions-container__text">Delete</p></div>
                                   ]}></More>
                                    
                               ]}></CardList>
               })}
         </div>
         {isPopped && <PopUp text="Add student" submit={handleSubmiAddStudentCurrying(setData,String(id))} setIsCreatedChat={setIsPopped} inputs={[{type:"email",label:"Email"}]}></PopUp>}
       </div>
      }
        {
              (!isMobile || (isClickedInformation && isMobile) ) && <div className="container-card-profile-students">
               {userClicked  ? <CardProfile classroom_id={id!} userData={userClicked!} ></CardProfile>: 
                  <div className="classroom-empty-container">
                    <p className="classroom-empty-container__text">No hay estudiantes</p>  
                </div>}
            </div>
        }
          
            
    </div>
    

  )
}

export default ClassRoomStudents
