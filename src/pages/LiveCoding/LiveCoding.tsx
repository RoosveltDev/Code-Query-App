
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import codequery from '../../assets/CodeQuery.svg'
import './liveCoding.css'
import { handleRunCode } from './handlers/handleRunCode.handler';
import LiveCodingPanel from '../../components/LiveCodingPanel/LiveCodingPanel';

const LiveCoding = () => {
    const { questionId,answerId } = useParams();
    const navigate = useNavigate()
    const [ running, setIsRunning] = useState<boolean>(false)
    useEffect(()=>{
        if((!questionId || Number.isNaN(Number(questionId))) ||(!answerId || Number.isNaN(Number(answerId))) ) navigate('/dashboard')
    },[])
  return (

    <div className='live-main-container'>
      <div className='live-main-container__header header-live-coding-container'>
        <div className='header-live-coding-container__branding branding-header-live-coding-container'>
        <img className='branding-header-live-coding-container__image' src={codequery} alt="Brand Logo" />
        <p className='branding-header-live-coding-container__text'> Live Coding</p>
        </div>
        <div className='header-live-coding-container__actions actions-live-coding-container'>
          <div onClick={()=>handleRunCode(setIsRunning)} className='actions-live-coding-container__action action-live-coding'>
          {running ? <div className="loader"></div> :
          <>
            <svg className='action-live-coding__play' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            <p className='action-live-coding__run'>Run</p>
          </>
        }
          </div>
        </div>
        <button className='header-live-coding-container__plan plan-live-coding-container'>
               Get Premium
        </button>
       
      </div>
      <LiveCodingPanel answerId={answerId!} questionId={questionId!} running={running} setIsRunning={setIsRunning}></LiveCodingPanel>
     
    </div>
  )
}

export default LiveCoding
