export interface Answer {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    timeAgo: string;
  };
  votes: number;
  isBestAnswer?: boolean;
}
