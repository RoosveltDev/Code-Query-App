import { Student } from './user.type';
export interface User {
    id: string;
    name: string;
    avatar?: string;
  }
  
  export interface Answer {
    id: string;
    content: string;
    createdAt: string;
    user: User;
  }
  
  export interface Comment {
    id: string;
    title:string;
    body:string;
    image?: string;
    status: string;
    created_at:string;
    user: Student;
    tags: {name:string}[];
  }
  