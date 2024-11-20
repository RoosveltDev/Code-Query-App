import "./Stat.css";

interface StatProps {
  value: number;
  label: string;
  className?: string;
}

export default function Stat({ value, label, className = "" }: StatProps) {
  return (
    <div className={`stat ${className}`}>
      <span className='stat-value'>{value}</span>
      <span className='stat-label'>{label}</span>
    </div>
  );
}
