import { useState } from 'react'
import more from '../../assets/Menu.svg'
import { MoreType } from '../../types/more.type'
import { handleClickMore } from './handlers/handleClickMore'
import './more.css'
const More = ({elementMore}:MoreType) => {
  const [visible,setVisible] = useState<boolean>(false)
  return (
    <div onClick={()=>{handleClickMore(setVisible)}} className='more-container'>
      <img className='more-container__image' src={more} alt="more logo" />
      {visible && <div className='more-container__select more-select-container'>
      {elementMore.map((element,i) => <div key={`more${i}`} className='more-select-container__options'>{element}</div>)}
      </div>}
    </div>
  )
}

export default More
