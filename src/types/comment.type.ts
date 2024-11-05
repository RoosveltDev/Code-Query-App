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
    question: string;
    createdAt: string;
    user: User;
    answers: Answer[];
  }
  