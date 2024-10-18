import './cardList.css'
import { CardListType } from '../../types/cardList.type';

const CardList = <T extends { id: string; [key: string]: string }>({ cardData, index, elementCard,customClass,clickFn }: CardListType<T>) => {
  const classText = customClass ? `classroom-card-container ${customClass}`: "classroom-card-container"

  return (
    <div onClick={clickFn} className={index % 2 ? `${classText}` :`${classText} classroom-card-container--odd`}>
      {elementCard.map((element,i) => <div key={`${cardData.id}${i}`} className='classroom-card-container__element'>{element}</div>)}
    </div>
  )
}

export default CardList;
