import { Link } from "react-router-dom"
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
const Dashboard = () => {
    const controllerRef = useRef<AbortController | null>(null);
    const [dataChart, setDataChart] = useState<ChartDatasetType>({ labels: [], datasets: [] });
    const [dataChartInteractions, setDataChartInteractions] = useState<ChartDatasetType>({ labels: [], datasets: [] });
    const [indexSelected,setIndexSelected] = useState<number>(0)
    const [data] = useFetch<FetchedClassroomsType[]>({
        fetchOptions: {
            context: "classrooms",
            method: "GET",
            data: {},
            hasCredentials: true,
            bodyFormat: "row",
        }
    });

    async function getQuestionByClassroom(id: number) {
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
    async function getAnswersByClassroom(id: number) {
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
                        return <option value={index}>{element.classroom_name}</option>
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
                    <h2 className="dashboard-courses-container__h2">Classrooms</h2>
                    <Link className="dashboard-courses-link" to={'/courses'}>See more</Link>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;