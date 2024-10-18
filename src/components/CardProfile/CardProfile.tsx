import avatar from '../../assets/avatar.svg'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend ,Filler,BarElement} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler,BarElement);
import { Bar } from "react-chartjs-2";
import { ChartDatasetType } from '../../types/dashboard/dataDasboard.type';
import { CardProfileType } from '../../types/profile/cardProfile.type';
import { dataChartReduce } from '../../utils/dataChartReduce';
import './cardProfile.css'
import mail from "../../assets/Mail.svg"
import timezone from "../../assets/Location.svg"
import { formatDate } from '../../utils/dateFormat';
import makeRequest from '../../services/api.service';
const CardProfile = ({classroom_id,userData}:CardProfileType) => {
    const controllerRef = useRef<AbortController|null>(null)
    const [dataDataChart,setDataChart] = useState<ChartDatasetType>({ labels: [], datasets: [] });
    async function getScoreStudent(){
        controllerRef.current = new AbortController()
        const response = await makeRequest(controllerRef.current.signal,`answers/classroom/${classroom_id}/student/${userData.id}`,"GET",{},true)
        const { labels, dataPoints } = dataChartReduce(response.results.results)
        setDataChart({
            labels,
            datasets: [{
                label: 'Answer per Day',
                data: dataPoints,
                backgroundColor: 'rgb(255 214 107)',
                borderColor: 'rgb(255 214 107)',
                borderWidth: 1,
                fill: true,
            }]
        })
    }
    useEffect(()=>{
        getScoreStudent()
    },[userData])
  return (
    <div className="classroom-students-main-container__information information-student-list-container">
    <div className='information-student-list-container__top top-information-student-container'>
      <img className='top-information-student-container__image' src={avatar} alt="avatar user" />
      <h2 className='top-information-student-container__h2'>{`${userData.name} ${userData.last_name}`}</h2>
      <h3 className='top-information-student-container__h3'>Student</h3>
    </div>
    <div className='information-student-list-container__sections sections-student-container'>
      <h1 className='sections-student-container__h1'>Contact Info</h1>
      <div className='section-profile-container'>
        <img className='section-profile-container__image' src={mail} alt="Email Logo" />  
        <p className='section-profile-container__paragraph'>{userData.email}</p>
      </div>
      <div  className='section-profile-container'>
      <img className='section-profile-container__image' src={timezone} alt="Date Logo" />
      <p className='section-profile-container__paragraph'>{formatDate(userData.created_at)}</p>
      </div>
    </div>
    <div className='information-student-list-container__performance performance-student-container'>
      <h2 className='performance-student-container__h2'>Performance</h2>
      <Bar data={dataDataChart}></Bar>
    </div>

  </div>
  )
}

export default CardProfile
