import './confirmStudent.css'
import avatar from  '../../assets/avatar.svg'
import plus from '../../assets/Plus.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import useUser from '../../hook/useUser'
import { handleClickAccept } from './handlers/handleClickAccept.handler'
import { handleClickDecline } from './handlers/handleClickDecline.handler'
const ConfirmStudent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = useUser()
    const queryParams = new URLSearchParams(location.search)
    const name = queryParams.get('name') as string
    const classroomId = queryParams.get('classroom_id') as string
    const token = queryParams.get('token') as string
    const teacher_avatar = queryParams.get('avatar') as string
    const controllerRef=useRef<AbortController|null>(null)
    useEffect(()=>{
        if(!name || !token || !user ) navigate('/login')
    },[])
  return (
    <div className='confirm-student-main-container'>
        <div className='confirm-student-main-container__invitation invitation-student-container'>
            <div className='invitation-student-container__header header-invitation-container'>
                <img className="header-invitation-container__image" src={user.avatar?user.avatar:avatar} alt="teacher logo" />
                <img className="header-invitation-container__plus" src={plus} alt="plus logo" />
                <img className="header-invitation-container__image" src={teacher_avatar?teacher_avatar:avatar} alt="student logo" />
            </div>
            <h2 className='invitation-student-container__h2'><span className='invitation-student-container__name'>{name}</span> invited you to its classroom</h2>
            <div className='invitation-student-container__actions actions-invitation-container'>
                <button onClick={()=>handleClickAccept(token,controllerRef,navigate,classroomId)} className='actions-invitation-container__button invitation-button-confirm--accept'>Accept Invitation</button>
                <button onClick={()=>handleClickDecline(controllerRef,navigate,classroomId,String(user.id))} className='actions-invitation-container__button invitation-button-confirm--decline'> Decline</button>

            </div>
            <div className='invitation-student-container__disclaimer disclaimer-invitation-container'>
                <div className='disclaimer-invitation-container__header header-disclaimer-confirm-container'>
                    <svg className='disclaimer-invitation-container__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                    <h3 className='header-disclaimer-confirm-container__h3'>Students are allowed to</h3>
                </div>
                <ul className='disclaimer-invitation-container__list list-confirm-container'>
                    <li className='list-confirm-container__element'>Post Question</li>
                    <li className='list-confirm-container__element'>Post Answers</li>
                    <li className='list-confirm-container__element'>Chat with other users</li>
                </ul>

            </div>

        </div>
      
    </div>
  )
}

export default ConfirmStudent
