import "./avatar.css";
import defaultAvatar from "../../assets/avatar.svg";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  isActive?: boolean;
  className?: string;
}

export default function Avatar({
  src = defaultAvatar,
  alt = "avatar profile",
  size = "medium",
  isActive = false,
  className = "",
}: AvatarProps) {
  return (
    <figure className={`avatar-container avatar-${size} ${className}`}>
      <img className='avatar-container__image' src={src} alt={alt} />
      <div
        className={
          !isActive
            ? "avatar-container__status"
            : "avatar-container__status avatar-container__status--active"
        }
      ></div>
    </figure>
  );
}
