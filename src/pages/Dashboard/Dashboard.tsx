
import Button from "../../atoms/button/Button"
import './dashboard.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend ,Filler} from 'chart.js';
import useFetch from "../../hook/useFetch";
import { FetchedClassroomsType } from "../../types/classroom/fetchedClassrooms";
import { useEffect, useRef, useState } from "react";
import makeRequest from "../../services/api.service";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler);
import { ChartDatasetType } from "../../types/dashboard/dataDasboard.type";
import { dataChartReduce } from "../../utils/dataChartReduce";
import { handleSelectDashboard } from "./handlers/handleSelectDashboard.handler";
/* import ClassroomCard from "../../components/ClassroomCard/ClassroomCard"; */
import position from '../../assets/Position.svg'
import { handleClickMore } from "./handlers/handleClickMore.handler";
import CardList from "../../components/CardList/CardList";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const controllerRef = useRef<AbortController | null>(null);
    const [dataChart, setDataChart] = useState<ChartDatasetType>({ labels: [], datasets: [] });
    const [dataChartInteractions, setDataChartInteractions] = useState<ChartDatasetType>({ labels: [], datasets: [] });
    const [indexSelected,setIndexSelected] = useState<number>(0)
    const [data,setData] = useFetch<FetchedClassroomsType[]>({
        fetchOptions: {
            context: "classrooms",
            method: "GET",
            data: {},
            hasCredentials: true,
            bodyFormat: "row",
        }
    });

    async function getQuestionByClassroom(id: string) {
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        const response = await makeRequest(signal, `questions/classroom/${id}`, 'GET', {}, true)
        const { labels, dataPoints } = dataChartReduce(response.results.results)
        setDataChart({
            labels,
            datasets: [{
                label: 'Questions per Day',
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            }]
        })
    }
    async function getAnswersByClassroom(id: string) {
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        const response = await makeRequest(signal, `answers/classroom/${id}`, 'GET', {}, true)
        const { labels, dataPoints } = dataChartReduce(response.results.results)
        setDataChartInteractions({
            labels,
            datasets: [{
                label: 'Interactions per Day',
                data: dataPoints,
                backgroundColor: 'rgb(255 214 107)',
                borderColor: 'rgb(255 214 107)',
                borderWidth: 1,
                fill: true,
            }]
        })
    }

    useEffect(() => {
        if (data && data.length > 0) {
            getQuestionByClassroom(data[indexSelected].id)
            getAnswersByClassroom(data[indexSelected].id)
        }
        return () => {
            controllerRef.current?.abort();
        };
    }, [data,indexSelected]);

    return (
        <div className="dashboard-main-container">
            <h1 className="dashboard-main-container__h1">Dashboard</h1>
            <div className="dashboard-main-container__header dashboard-header-container">
                <select className="dashboard-header-container__select" onChange={(e)=>handleSelectDashboard(e,setIndexSelected)} name="Classrooms" id="classroom-select-box">
                    {data && data?.map((element,index)=>{
                        return <option key={`option${element.id}`} value={index}>{element.classroom_name}</option>
                    })}
                </select>
                <Button classText="dashboard-header-container__button" buttonText="Add Classroom"></Button>
            </div>
            <div className="dashboard-main-container__charts charts-container">
                <div className="charts-container__activity-posts">
                <Line data={dataChart} options={{scales: { y: { beginAtZero: true,ticks: { stepSize: 1, callback: function(value) 
                {if (Number.isInteger(value)) return value}}}}}}/>  
                    
                </div>
                <div className="charts-container__activity-interactions">
                <Line data={dataChartInteractions} options={{scales: { y: { beginAtZero: true,ticks: { stepSize: 1, callback: function(value) 
                {if (Number.isInteger(value)) return value}}}}}}/>     
                </div>
            </div>
            <div className="dashboard-main-container__courses dashboard-courses-container">
                <div className="dashboard-courses-container__header">
                    <h2 className="dashboard-courses-container__h2">Top Classrooms</h2>
                    <button onClick={()=>handleClickMore(controllerRef,setData)} className="dashboard-courses-link">See more</button>
                </div>
                <div className="dashboard-courses-container__list courses-list-dashboard">
                    <div className="courses-list-dashboard__header header-courses-list-dashboard">
                        <h3 className="header-courses-list-dashboard__h3 header-courses-list-dashboard__start">S/N</h3>
                        <h3 className="header-courses-list-dashboard__h3">Name</h3>
                        <h3 className="header-courses-list-dashboard__h3">Desciption</h3>
                        <h3 className="header-courses-list-dashboard__h3"></h3>
                    </div>
                    <div className="courses-list-dashboard__courses">
                        {data && data.map((element,index) =>{
                            return <CardList<FetchedClassroomsType> key={element.id} cardData = {element} index= {index} elementCard={[
                                (index === 0 || index === 1 || index ===2) ? <img className='classroom-card-container__image' src={position} alt='Top Logo'></img>: <p className="classroom-card-container__description">{index+1}</p>,
                                <p className="classroom-card-container__name"> {element.classroom_name}</p>,
                                <p className="classroom-card-container__description">{element.description}</p>,
                                 <Link className='classroom-card-container__link' to={`/classroom/`}>Enter</Link>
                            ]}></CardList>
                        })}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;