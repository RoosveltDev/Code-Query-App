export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  votes: number;
  views: number;
  author: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  stats: {
    answers: number;
    votes: number;
    views: number;
    favorites: number;
  };
}
