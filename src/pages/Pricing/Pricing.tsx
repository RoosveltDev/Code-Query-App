import './pricing.css'
import PricingCard from '../../components/PricingCard/PricingCard'
import useFetch from '../../hook/useFetch'
import { PricingPlansType } from '../../types/pricing/pricingCard.type'
import { useState } from 'react'
import { handleClickPlanToggle } from './handlers/handleClickPlanToggle.handler'

const Pricing = () => {
    const [data] = useFetch<Omit<PricingPlansType,'features'>[]>({fetchOptions:{
        context: "subscriptions",
        method: "GET",
        data: {},
        hasCredentials: true,
        bodyFormat: "row" ,
    }})
    const [isYearly , setIsYearly] = useState<boolean>(false)
    const classPeriodMonthly = isYearly ? 'pricing-actions-container__text' :'pricing-actions-container__text pricing-actions-container__text--active'
    const classPeriodYearly = !isYearly ? 'pricing-actions-container__text' :'pricing-actions-container__text pricing-actions-container__text--active'
    const features = [["40 students per classrooms",'20 active classrooms','ilimited code executions'],["20 students per classroom","10 classrooms","40 code executions per user"],["Up to 5 Classrooms","Up to 10 students","20 Execution codes"] ]
  return (
    <div className='pricing-main-container'>
        <div className='pricing-main-container__header header-pricing-container'>
            <h1 className='header-pricing-container__h1'>Plan & Pricing</h1>
            <div className='header-pricing-container__text-container text-actions-pricing-container'>
            <p className='text-actions-pricing-container__paragraph'>Whether your time-saving automation needs are large or small, we’re here to help you scale.</p>
            <div onClick={()=>handleClickPlanToggle(setIsYearly,isYearly)} className='text-actions-pricing-container__actions pricing-actions-container'>
                <p className={classPeriodMonthly}>MONTHLY</p>
                <p className={classPeriodYearly}>YEARLY</p>
                <div className='pricing-actions-container__chip'></div>
            </div>
            </div>
        </div>

        <div className='pricing-main-container__card-container'>
            {data && [...data!,{name:"Free",price:0}].map((elementData,index:number)=> ({...elementData,features:features[index]})).reverse().map((element,index)=> <PricingCard key={`price${index}`} elementCard={element} period = {isYearly}></PricingCard>)}
        </div>
      
    </div>
  )
}

export default Pricing
