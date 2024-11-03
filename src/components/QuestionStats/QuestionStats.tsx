import Stat from "../../atoms/stat/Stat";
import "./QuestionStats.css";

interface QuestionStatsProps {
  answers: number;
  votes: number;
  views: number;
  favorites: number;
  className?: string;
}

export default function QuestionStats({
  answers,
  votes,
  views,
  favorites,
  className = "",
}: QuestionStatsProps) {
  return (
    <div className={`question-stats ${className}`}>
      <Stat value={answers} label='Answers' />
      <Stat value={votes} label='Votes' />
      <Stat value={views} label='Views' />
      <Stat value={favorites} label='Favorites' />
    </div>
  );
}
