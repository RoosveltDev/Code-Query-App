import Avatar from "../../atoms/avatar/Avatar";
import "./AuthorInfo.css";

interface AuthorInfoProps {
  name: string;
  avatar?: string;
  timeAgo?: string;
  location?: string;
  className?: string;
}

export default function AuthorInfo({
  name,
  avatar,
  timeAgo,
  location,
  className = "",
}: AuthorInfoProps) {
  return (
    <div className={`author-info ${className}`}>
      <Avatar src={avatar} alt={name} size='medium' />
      <div className='author-details'>
        <h3 className='author-name'>{name}</h3>
        <div className='author-meta'>
          {location && <span className='author-location'>{location}</span>}
          <span className='author-time'>{timeAgo} ago</span>
        </div>
      </div>
    </div>
  );
}
