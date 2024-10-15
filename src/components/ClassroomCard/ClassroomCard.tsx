import './classroomCard.css'
import { Link } from "react-router-dom"
import position from '../../assets/Position.svg'
import { ClassroomCardType } from "../../types/classroom/classroomCard.type"
const ClassroomCard = ({classroom,index}:ClassroomCardType) => {
  return (
    <div className={index%2 ? "classroom-card-container " : "classroom-card-container classroom-card-container--odd"}>
        {(index === 0 || index === 1 || index ===2) ? <img className='classroom-card-container__element classroom-card-container__image' src={position} alt='Top Logo'></img>: <p className="classroom-card-container__element classroom-card-container__description">{index+1}</p>}
        <p className="classroom-card-container__element classroom-card-container__name">{classroom.classroom_name} </p>
        <p className="classroom-card-container__element classroom-card-container__description">{classroom.description}</p>
        <div className='classroom-card-container__element'> <Link className=' classroom-card-container__link' to={`/classroom/`}>Enter</Link></div>
       
    </div>
  )
}

export default ClassroomCard
