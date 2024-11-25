import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hook/useFetch';
import avatar from '../../assets/avatar.svg';
import './Classroom.css';
import Button from '../../atoms/button/Button';
import Card from '../../components/Card/Card';
import { Comment } from '../../types/comment.type';
import Tags  from '../../atoms/tags/Tags';
import { FetchedClassroomsType } from '../../types/classroom/fetchedClassrooms';
import { Student } from '../../types/user.type';
import { IoPersonAddSharp } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { MdChecklist } from "react-icons/md";


const ClassRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigator = useNavigate()
  // const [data, setData]
  const [data] = useFetch<Comment[]>({
    fetchOptions: {
      context: `questions/classroom/${id}?page=1&per_page=8`,
      method: 'GET',
      data: {},
      hasCredentials: true,
      bodyFormat: 'row',
    },
  });
  const [dataClassroom] = useFetch<FetchedClassroomsType>({
    fetchOptions: {
      context: `classrooms/${id}`,
      method: 'GET',
      data: {},
      hasCredentials: true,
      bodyFormat: 'row',
    },
  });

  const [dataStudents] = useFetch<Student[]>({
    fetchOptions: {
      context: `classrooms/${id}/students`,
      method: 'GET',
      data: {},
      hasCredentials: true,
      bodyFormat: 'row',
    },
  });

  return (
    <div className="classroom-container">
      <section  className="classroom-seccion">
        <div className="classroom-header">
        <h1> <SiGoogleclassroom /> Classroom</h1>
        <div onClick={()=>navigator(`/classroom/${id}/student`)}>

        <Button buttonText='Add Students'></Button>
        </div>
        <div onClick={()=>navigator(`classroom/${id}/question/create`)}>
        <Button buttonText='Add Question'></Button>
        </div>
        <hr />
        <h2>
        <MdChecklist /> Course List
        </h2>
        <p>
          <ol className='li-classroom'>
            <li>
              {dataClassroom?.classroom_name}
            </li>
          </ol>
        </p>
        <hr/>
        <h3>
         <IoPersonAddSharp /> Student List
        </h3>
        <p>
          {dataStudents?.length} students
        </p>
        </div>
      </section>

      {data&&data.length>0&&data.map((comment) => (
        <Card key={comment.id} className="classroom-card">
          <div className='classroom-body'>
          <div className="card-header">
            <img src={comment.user.avatar || avatar} alt="Avatar" className="avatar" />
            <div>
              <h2>{comment.user.name}</h2>
              <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="tags">
            {comment.tags&&comment.tags.length>0&&comment.tags.map((elementTags)=>{
              return <Tags key={`Tags${comment.id}${elementTags.name}`} text={elementTags.name} />
            }
            )}
          </div>
          </div>
          <div className="card-body">
            <h3>{comment.title}</h3>
            <p>{comment.body}</p>
          </div>
          
          <div className="card-footer">
            <div onClick={()=>navigator(`/classroom/${id}/question/${comment.id}/answers`)}>

            <Button buttonText="Responder" 
           
            />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClassRoom;
