
import avatar from '../../assets/avatar.svg'
import { AvatarType } from '../../types/avatar.type'
import './avatar.css'
const Avatar = ({isActive}:AvatarType) => {
  return (
    <figure className="avatar-container">
        <img className="avatar-container__image" src={avatar} alt="avatar profile" />

        <div className={!isActive ? 'avatar-container__status': 'avatar-container__status avatar-container__status--active'}></div> 
    </figure>
  )
}

export default Avatar
