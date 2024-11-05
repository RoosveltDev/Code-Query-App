import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hook/useFetch';
import avatar from '../../assets/avatar.svg';
import './Classroom.css';
import Button from '../../atoms/button/Button';
import Card from '../../components/Card/Card';
import { Comment } from '../../types/comment.type';

const ClassRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  // const [data, setData]
  const [data] = useFetch<Comment[]>({
    fetchOptions: {
      context: `classrooms/${id}/comments`,
      method: 'GET',
      data: {},
      hasCredentials: true,
      bodyFormat: 'row',
    },
  });

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  return (
    <div className="classroom-container">
      {comments.map((comment) => (
        <Card key={comment.id} className="classroom-card">
          <div className="card-header">
            <img src={comment.user.avatar || avatar} alt="Avatar" className="avatar" />
            <div>
              <h2>{comment.user.name}</h2>
              <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="card-body">
            <h3>{comment.question}</h3>
            <p>{`Respuestas: ${comment.answers.length}`}</p>
          </div>
          <div className="card-footer">
            <Button buttonText="Responder" 
            // onClick={() =>
            //   { /* Lógica para responder */ }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClassRoom;
