import './pricingCard.css'
import check from '../../assets/Check.svg'
import { PricingCardType } from '../../types/pricing/pricingCard.type'
import { handleClickPlan } from './handlers/handleClickPlan.handler'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const PricingCard = ({elementCard,period}:PricingCardType) => {
    const classContainer = elementCard.name === "Premium" ? `pricing-card-main-container pricing-card-main-container--popular`:'pricing-card-main-container'
    const classPrice = elementCard.name === "Premium" ? 'text-pricing-card-container__price text-pricing-card-container__price--popular' :'text-pricing-card-container__price'
    const classSubscription = elementCard.name === "Premium" ? 'information-card-pricing-container__h1 information-card-pricing-container__h1--popular' :'information-card-pricing-container__h1'
    const controllerRef = useRef<AbortController|null>(null)
    const navigator = useNavigate()
    useEffect(()=>{
        return ()=>{
            controllerRef.current?.abort()
        }
    })
  return (
    <div className={classContainer}>
        {elementCard.name === "Premium" && <div className='pricing-card-main-container__tag-popular'>
            MOST POPULAR
        </div>}
        <div className='pricing-card-main-container__price-text text-pricing-card-container'>
            <p className={classPrice}>{period?`$${elementCard.price*12}`:`$${elementCard.price}`}</p>
            <p className='text-pricing-card-container__plan'>{period?"/ year":"/ month"}</p>
        </div>   
        <div className='pricing-card-main-container__information-container information-card-pricing-container'>
            <h1 className={classSubscription}>{elementCard.name}</h1>
            <p className='information-card-pricing-container__text'>Unleash the power of automation.</p>
            <ul className='information-card-pricing-container__lists card-pricing-info-container'>
                {elementCard.features && elementCard.features.map((element,index)=>{
                    return   <li key={`pricingCard${elementCard.name}${index}`} className='card-pricing-info-container__element element-card-pricing-container'>
                    <div className='element-card-pricing-container__check-container check-pricing-container'>
                        <img className='check-pricing-container__image' src={check} alt="check logo" />
                    </div>
                    <p className='element-card-pricing-container__paragraph'>{element}</p>
                </li>
                })
                  
                }
                
               
            </ul>
        </div>
        <button onClick={()=>handleClickPlan(elementCard.name,controllerRef,navigator)} className='pricing-card-main-container__button'>Choose Plan</button>
       
        
    </div>
  )
}

export default PricingCard
